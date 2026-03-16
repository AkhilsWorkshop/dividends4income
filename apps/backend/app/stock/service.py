import asyncio
import yfinance as yf
from typing import List, Dict, Any
import praw
from datetime import datetime
import httpx
import json
import re
from fastapi import HTTPException

from app.cache import get_redis
from app.config import REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT, GROQ_API_KEY, LOGO_DEV_PUBLIC_KEY

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_PRIMARY_MODEL = "compound-beta"
GROQ_FALLBACK_MODEL = "llama-3.1-8b-instant"

EMPTY_SUMMARY = {
    "reddit_key_points": [],
    "reddit_prediction": None,
    "reddit_overall_sentiment": None,
    "ai_key_points": [],
    "ai_prediction": None,
    "ai_overall_sentiment": None
}

class StockService:

    @staticmethod
    def get_stock_info_from_tickers(tickers: yf.Tickers, ticker_symbol: str) -> Dict[str, Any]:

        try:

            ticker = tickers.tickers[ticker_symbol.upper()]
            info = ticker.info

            current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))

            previous_close = info.get('previousClose', current_price)
            change = current_price - previous_close if current_price and previous_close else 0
            change_percent = (change / previous_close * 100) if previous_close else 0

            dividend_yield = info.get('dividendYield', 0)

            if dividend_yield:
                dividend_yield = round(dividend_yield * 100, 2)

            dividend_rate = info.get('dividendRate', 0)

            logo_url = f"https://img.logo.dev/ticker/{ticker_symbol}?token={LOGO_DEV_PUBLIC_KEY}"

            return {
                'symbol': ticker_symbol.upper(),
                'name': info.get('longName', info.get('shortName', ticker_symbol.upper())),
                'price': f"${current_price:.2f}" if current_price else "$0.00",
                'change': f"{change_percent:+.2f}%" if change_percent else "0.00%",
                'dividend_rate': f"{dividend_rate:.2f}" if dividend_rate else "0.00",
                'dividend_yield': f"{dividend_yield:.2f}%" if dividend_yield else "0.00%",
                'logo_url': logo_url
            }

        except KeyError:
            print(f"Ticker {ticker_symbol} not found in Tickers object")
            return None

        except Exception as e:
            print(f"Error extracting data for {ticker_symbol}: {e}")
            return None

    @staticmethod
    def serialize_dividends(dividends_series) -> List[Dict[str, Any]]:

        if dividends_series is None or dividends_series.empty:
            return []

        try:
            dividends_list = []

            sorted_dividends = sorted(dividends_series.items(), key=lambda x: x[0])

            previous_amount = None

            for date, amount in sorted_dividends:

                amount_float = float(amount)
                change_percent = 0.00

                if previous_amount is not None and previous_amount != 0:
                    change_percent = round(((amount_float - previous_amount) / previous_amount) * 100, 2)

                dividends_list.append({
                    'date': date.strftime('%m/%d/%Y'),
                    'amount': amount_float,
                    'change_percent': change_percent
                })

                previous_amount = amount_float

            dividends_list.reverse()

            return dividends_list

        except Exception as e:
            print(f"Error serializing dividends: {e}")
            return []

    @staticmethod
    async def get_stock_info(ticker_symbol: str) -> Dict[str, Any]:

        def _fetch():

            ticker = yf.Ticker(ticker_symbol.upper())
            info = ticker.info

            current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))
            previous_close = info.get('previousClose', current_price)
            change = current_price - previous_close if current_price and previous_close else 0
            change_percent = (change / previous_close * 100) if previous_close else 0

            dividend_yield = info.get('dividendYield', 0)

            if dividend_yield:
                dividend_yield = round(dividend_yield * 100, 2)

            dividend_rate = info.get('dividendRate', 0)
            dividends_data = StockService.serialize_dividends(ticker.dividends)

            return {
                'symbol': ticker_symbol.upper(),
                'name': info.get('longName', info.get('shortName', ticker_symbol.upper())),
                'price': f"${current_price:.2f}" if current_price else "$0.00",
                'change': f"{change_percent:+.2f}%" if change_percent else "0.00%",
                'dividend_rate': f"{dividend_rate:.2f}" if dividend_rate else "0.00",
                'dividend_yield': f"{dividend_yield:.2f}%" if dividend_yield else "0.00%",
                'logo_url': f"https://img.logo.dev/ticker/{ticker_symbol}?token={LOGO_DEV_PUBLIC_KEY}",
                'all_dividends': dividends_data,
                'market_cap': info.get('marketCap'),
                'volume': info.get('volume'),
                'average_volume': info.get('averageVolume'),
                'fifty_two_week_high': info.get('fiftyTwoWeekHigh'),
                'fifty_two_week_low': info.get('fiftyTwoWeekLow'),
                'trailing_pe': info.get('trailingPE'),
                'forward_pe': info.get('forwardPE'),
                'trailing_eps': info.get('trailingEps'),
                'forward_eps': info.get('forwardEps'),
                'beta': info.get('beta'),
                'sector': info.get('sector'),
                'industry': info.get('industry'),
                'long_business_summary': info.get('longBusinessSummary'),
                'currency': info.get('currency'),
                'exchange': info.get('exchange'),
                'country': info.get('country'),
                'full_time_employees': info.get('fullTimeEmployees')
            }

        try:
            return await asyncio.to_thread(_fetch)
        
        except Exception as e:
            print(f"Error fetching stock info for {ticker_symbol}: {e}")
            return None


class RedditSummaryService:

    @staticmethod
    async def generate_reddit_summary(texts: List[str], ticker_symbol: str) -> Dict[str, Any]:

        if not texts:
            return EMPTY_SUMMARY

        combined_text = ' '.join(texts)

        prompt = f"""
            Analyze Reddit posts about {ticker_symbol} stock. Return JSON with:
            - reddit_key_points: 3 key points from posts
            - reddit_prediction: Community outlook
            - reddit_overall_sentiment: positive/negative/neutral
            - ai_key_points: 3 AI insights (not including Reddit posts but real market data)
            - ai_prediction: AI market outlook (not including Reddit posts but real market data)
            - ai_overall_sentiment: positive/negative/neutral (not including Reddit posts but real market data)

            Posts: {combined_text[:3000]}

            Return only valid JSON.
        """

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": GROQ_PRIMARY_MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1500,
            "temperature": 0.3
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:

                print(f"Trying Groq model: {GROQ_PRIMARY_MODEL}")
                response = await client.post(GROQ_URL, headers=headers, json=payload)

                if response.status_code == 429:

                    print(f"Rate limited on {GROQ_PRIMARY_MODEL}, falling back to {GROQ_FALLBACK_MODEL}...")

                    payload["model"] = GROQ_FALLBACK_MODEL
                    response = await client.post(GROQ_URL, headers=headers, json=payload)

                if response.status_code != 200:

                    print(f"Groq API error: {response.status_code} - {response.text}")
                    return EMPTY_SUMMARY

                result = response.json()
                content = result['choices'][0]['message']['content'].strip()

            try:
                return json.loads(content)
            
            except json.JSONDecodeError:

                json_match = re.search(r'\{.*\}', content, re.DOTALL)

                if json_match:
                    try:
                        return json.loads(json_match.group())
                    
                    except json.JSONDecodeError:
                        pass

                return EMPTY_SUMMARY

        except Exception as e:
            print(f"Error calling Groq API: {e}")
            return EMPTY_SUMMARY

    @staticmethod
    def _fetch_reddit_posts_sync(ticker: str, tickerName: str) -> Dict[str, Any]:

        try:
            reddit = praw.Reddit(
                client_id=REDDIT_CLIENT_ID,
                client_secret=REDDIT_CLIENT_SECRET,
                user_agent=REDDIT_USER_AGENT
            )

            subreddits = reddit.subreddit('stocks+investing+wallstreetbets+StockMarket')

            if len(ticker) == 1:
                search_query = f'"{ticker}" "{tickerName.split()[0]}"'
            else:
                search_query = f'"{ticker}"'

            posts = []

            try:
                posts = list(subreddits.search(search_query, sort='hot', time_filter='all', limit=15))
            except Exception:

                try:
                    posts = list(subreddits.search(ticker, sort='hot', time_filter='all', limit=15))

                except Exception:
                    posts = []

            if not posts:
                return {'serialized_posts': [], 'all_text': []}

            relevant_posts = []

            for post in posts:

                post_text = f"{post.title} {post.selftext}".lower()
                ticker_pattern = r'\b' + re.escape(ticker.lower()) + r'\b'
                has_ticker = bool(re.search(ticker_pattern, post_text))

                if has_ticker:

                    company_words = [word.lower() for word in tickerName.split() if len(word) > 2]
                    has_company_match = any(word in post_text for word in company_words)

                    ticker_pos = post_text.find(ticker.lower())
                    context_relevance = False

                    if ticker_pos != -1:
                        start = max(0, ticker_pos - 100)
                        end = min(len(post_text), ticker_pos + len(ticker) + 100)
                        context = post_text[start:end]
                        financial_keywords = ['stock', 'price', 'buy', 'sell', 'invest', 'earnings', 'revenue', 'market', 'shares']
                        context_relevance = any(keyword in context for keyword in financial_keywords)

                    is_relevant = (
                        (has_ticker and has_company_match) or
                        (has_ticker and context_relevance) or
                        (has_ticker and len(post.selftext or '') > 50)
                    )

                    if is_relevant:
                        relevant_posts.append(post)

            if not relevant_posts:
                return {'serialized_posts': [], 'all_text': []}

            relevant_posts = relevant_posts[:10]

            serialized_posts = []
            all_text = []

            for post in relevant_posts:
                serialized_posts.append({
                    'title': post.title,
                    'url': post.url,
                    'score': post.score,
                    'num_comments': post.num_comments,
                    'created_utc': datetime.fromtimestamp(post.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
                    'selftext': post.selftext[:300] if post.selftext else '',
                    'author': str(post.author) if post.author else 'Unknown',
                    'subreddit': str(post.subreddit) if post.subreddit else 'Unknown'
                })
                all_text.append(f"{post.title} {post.selftext}")

            return {'serialized_posts': serialized_posts, 'all_text': all_text}

        except Exception as e:
            print(f"Error fetching Reddit posts for {ticker}: {e}")
            return {'serialized_posts': [], 'all_text': []}

    @staticmethod
    async def get_reddit_posts_and_summary(ticker: str, tickerName: str) -> Dict[str, Any]:

        cache_key = f"stocks/{ticker}/reddit"

        try:

            redis = await get_redis()
            cached = await redis.get(cache_key)

            if cached:
                return json.loads(cached)
            
        except Exception as e:
            print(f"Redis read error (reddit): {e}")

        ticker = ticker.strip()
        tickerName = tickerName.strip()

        if not ticker:
            raise HTTPException(status_code=400, detail="Ticker parameter is required")

        posts_data = await asyncio.to_thread(
            RedditSummaryService._fetch_reddit_posts_sync, ticker, tickerName
        )

        if not posts_data['serialized_posts']:
            return {"posts": [], **EMPTY_SUMMARY}

        summary = await RedditSummaryService.generate_reddit_summary(posts_data['all_text'], ticker)

        data = {
            'posts': posts_data['serialized_posts'],
            'reddit_key_points': summary.get('reddit_key_points', []),
            'reddit_prediction': summary.get('reddit_prediction', None),
            'reddit_overall_sentiment': summary.get('reddit_overall_sentiment', None),
            'ai_key_points': summary.get('ai_key_points', []),
            'ai_prediction': summary.get('ai_prediction', None),
            'ai_overall_sentiment': summary.get('ai_overall_sentiment', None)
        }

        if data:

            try:
                redis = await get_redis()
                await redis.setex(cache_key, 3600, json.dumps(data))
                
            except Exception as e:
                print(f"Redis write error (reddit): {e}")

        return data
