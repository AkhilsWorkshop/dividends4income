import yfinance as yf
from typing import List, Dict, Any
import praw 
from datetime import datetime
from decouple import config
import requests
import json 
import re 

class PopularStocksService:

    POPULAR_TICKERS = [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA',
         'JPM', 'V',  'KO',  'VZ'
    ]

    @staticmethod
    def get_popular_stocks() -> List[Dict[str, Any]]:
        
        stocks_data = []

        try:
            tickers = yf.Tickers(' '.join(PopularStocksService.POPULAR_TICKERS))
            
            for ticker_symbol in PopularStocksService.POPULAR_TICKERS:
                try:
                    stock_data = PopularStocksService.get_stock_info_from_tickers(tickers, ticker_symbol)
                    if stock_data:
                        stocks_data.append(stock_data)
                except Exception as e:
                    print(f"Error processing data for {ticker_symbol}: {e}")
                    continue
                    
        except Exception as e:
            print(f"Error fetching tickers data: {e}")
            return None

        return stocks_data

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
            
            website = info.get('website', '')

            if website:
                domain = website.replace('https://', '').replace('http://', '').split('/')[0]
                logo_url = f"https://logo.clearbit.com/{domain}"
            else:
                logo_url = f"https://logo.clearbit.com/{ticker_symbol}.com"
            
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
    def get_stock_info(ticker_symbol: str) -> Dict[str, Any]:

        try:

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

            website = info.get('website', '')

            if website:
                domain = website.replace('https://', '').replace('http://', '').split('/')[0]
                logo_url = f"https://logo.clearbit.com/{domain}"
            else:
                logo_url = f"https://logo.clearbit.com/{ticker_symbol}.com"

            dividends_data = PopularStocksService.serialize_dividends(ticker.dividends)

            market_cap = info.get('marketCap')
            volume = info.get('volume')
            average_volume = info.get('averageVolume')
            fifty_two_week_high = info.get('fiftyTwoWeekHigh')
            fifty_two_week_low = info.get('fiftyTwoWeekLow')
            trailing_pe = info.get('trailingPE')
            forward_pe = info.get('forwardPE')
            trailing_eps = info.get('trailingEps')
            forward_eps = info.get('forwardEps')
            beta = info.get('beta')
            sector = info.get('sector')
            industry = info.get('industry')
            long_business_summary = info.get('longBusinessSummary')
            currency = info.get('currency')
            exchange = info.get('exchange')
            country = info.get('country')
            full_time_employees = info.get('fullTimeEmployees')

            return {
                'symbol': ticker_symbol.upper(),
                'name': info.get('longName', info.get('shortName', ticker_symbol.upper())),
                'price': f"${current_price:.2f}" if current_price else "$0.00",
                'change': f"{change_percent:+.2f}%" if change_percent else "0.00%",
                'dividend_rate': f"{dividend_rate:.2f}" if dividend_rate else "0.00",
                'dividend_yield': f"{dividend_yield:.2f}%" if dividend_yield else "0.00%",
                'logo_url': logo_url,
                'all_dividends': dividends_data,
                'market_cap': market_cap,
                'volume': volume,
                'average_volume': average_volume,
                'fifty_two_week_high': fifty_two_week_high,
                'fifty_two_week_low': fifty_two_week_low,
                'trailing_pe': trailing_pe,
                'forward_pe': forward_pe,
                'trailing_eps': trailing_eps,
                'forward_eps': forward_eps,
                'beta': beta,
                'sector': sector,
                'industry': industry,
                'long_business_summary': long_business_summary,
                'currency': currency,
                'exchange': exchange,
                'country': country,
                'full_time_employees': full_time_employees
            }
        
        except Exception as e:
            print(f"Error fetching stock info for {ticker_symbol}: {e}")
            return None
        
    @staticmethod
    def get_reddit_posts_and_summary(ticker_symbol: str) -> Dict[str, Any]:

        try:

            reddit = praw.Reddit(
                client_id=config('REDDIT_CLIENT_ID'),
                client_secret=config('REDDIT_CLIENT_SECRET'), 
                user_agent=config('REDDIT_USER_AGENT')
            )

            subreddits = reddit.subreddit('stocks+investing+wallstreetbets+StockMarket')
            
            search_query = f'"{ticker_symbol}"'
            posts = list(subreddits.search(search_query, sort='new', time_filter='week', limit=10))
            
            if not posts:
                return {
                    "posts": [],
                    "summary": None,
                    "reddit_key_points": [],
                    "reddit_prediction": None,
                    "reddit_overall_sentiment": None,
                    "ai_key_points": [],
                    "ai_prediction": None,
                    "ai_overall_sentiment": None
                }

            serialized_posts = []
            all_text = []
            
            for post in posts[:10]:
                post_data = {
                    'title': post.title,
                    'url': post.url,
                    'score': post.score,
                    'num_comments': post.num_comments,
                    'created_utc': datetime.fromtimestamp(post.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
                    'selftext': post.selftext[:500] if post.selftext else '',
                    'author': str(post.author) if post.author else 'Unknown',
                    'subreddit': str(post.subreddit) if post.subreddit else 'Unknown'
                }
                serialized_posts.append(post_data)
                all_text.append(f"{post.title} {post.selftext}")

            summary = PopularStocksService.generate_reddit_summary(all_text, ticker_symbol)
            
            return {
                'posts': serialized_posts,
                'summary': summary.get('summary', None),
                'reddit_key_points': summary.get('reddit_key_points', []),
                'reddit_prediction': summary.get('reddit_prediction', None),
                'reddit_overall_sentiment': summary.get('reddit_overall_sentiment', None),
                'ai_key_points': summary.get('ai_key_points', []),
                'ai_prediction': summary.get('ai_prediction', None),
                'ai_overall_sentiment': summary.get('ai_overall_sentiment', None)
            }
        
        except Exception as e:
            print(f"Error fetching Reddit data for {ticker_symbol}: {e}")
            return {
                "posts": [],
                "summary": None,
                "reddit_key_points": [],
                "reddit_prediction": None,
                "reddit_overall_sentiment": None,
                "ai_key_points": [],
                "ai_prediction": None,
                "ai_overall_sentiment": None
            }

    @staticmethod
    def generate_reddit_summary(texts: List[str], ticker_symbol: str) -> Dict[str, Any]:

        if not texts:
            return {
                "summary": None,
                "reddit_key_points": [],
                "reddit_prediction": None,
                "reddit_overall_sentiment": None,
                "ai_key_points": [],
                "ai_prediction": None,
                "ai_overall_sentiment": None
            }

        try:

            combined_text = ' '.join(texts)
            
            prompt = f"""
                Analyze the following Reddit posts discussing the stock {ticker_symbol} and return a comprehensive analysis in the specified JSON format.

                - Focus exclusively on information found in the provided Reddit posts and objective, widely-known facts about the stock.
                - Do NOT include any markdown formatting, explanatory text, or comments.
                - The reddit_key_points should detail the reasons behind their respective sentiment scores based upon the provided reddit posts content. 
                - The ai_key_points should detail the reasons behind their respective sentiment scores based upon your own analysis and not based upon reddit posts content. 
                - Avoid repeating points between the two sections; each set must contain distinct insights or analysis supporting its sentiment value.
                - All key points must clearly justify the overall_sentiment value for their respective section.
                - Use professional, analytic, and objective language throughout each key point and summary.
                - Ensure the returned JSON strictly matches the following schema and contains no extraneous content.

                Input:
                Reddit Posts Content:
                {combined_text[:4000]}

                Required JSON output:
                {{
                    "summary": "A concise summary of the overall discussion and sentiment",
                    "reddit_key_points": ["Key point 1", "Key point 2", "Key point 3", "Key point 4", "Key point 5"],
                    "reddit_prediction": "Reddit users' collective view on the stock's future performance",
                    "reddit_overall_sentiment": "Overall sentiment derived from Reddit discussions: positive, negative, or neutral",
                    "ai_key_points": ["AI key point 1", "AI key point 2", "AI key point 3", "AI key point 4", "AI key point 5"],
                    "ai_prediction": "Objective AI analysis of the stock's potential future based on both the Reddit discussion and general market knowledge",
                    "ai_overall_sentiment": "Overall sentiment derived from AI analysis: positive, negative, or neutral"
                }}
            """

            api_key = config('OPENROUTER_API_KEY')
            url = "https://openrouter.ai/api/v1/chat/completions"
            
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": "deepseek/deepseek-chat",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 4000,
                "temperature": 0.3
            }
            
            response = requests.post(url, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            content = result['choices'][0]['message']['content'].strip()
            
            try:
                parsed_response = json.loads(content)
                return parsed_response
            
            except json.JSONDecodeError:

                json_match = re.search(r'\{.*\}', content, re.DOTALL)

                if json_match:
                    try:
                        parsed_response = json.loads(json_match.group())
                        return parsed_response
                    except json.JSONDecodeError:
                        pass
                
                return {
                    "summary": None,
                    "reddit_key_points": [],
                    "reddit_prediction": None,
                    "reddit_overall_sentiment": None,
                    "ai_key_points": [],
                    "ai_prediction": None,
                    "ai_overall_sentiment": None
                }
        
        except requests.RequestException as e:
            print(f"Error calling OpenRouter API: {e}")
            return {
                "summary": None,
                "reddit_key_points": [],
                "reddit_prediction": None,
                "reddit_overall_sentiment": None,
                "ai_key_points": [],
                "ai_prediction": None,
                "ai_overall_sentiment": None
            }

        except requests.RequestException as e:
            print(f"Error calling OpenRouter API: {e}")
            return {
                "summary": None,
                "reddit_key_points": [],
                "reddit_prediction": None,
                "reddit_overall_sentiment": None,
                "ai_key_points": [],
                "ai_prediction": None,
                "ai_overall_sentiment": None
            }
        except Exception as e:
            print(f"Error generating Reddit summary: {e}")
            return {
                "summary": None,
                "reddit_key_points": [],
                "reddit_prediction": None,
                "reddit_overall_sentiment": None,
                "ai_key_points": [],
                "ai_prediction": None,
                "ai_overall_sentiment": None
            }
