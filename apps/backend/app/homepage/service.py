from fastapi import HTTPException
import requests
import time
import yfinance as yf
import praw
from datetime import datetime, timezone
from typing import List, Dict, Any

from app.config import LOGO_DEV_PUBLIC_KEY, TICKER_URL, SEC_USER_AGENT, SEC_CONTACT_EMAIL, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT
from app.stock.service import StockService

class HomePageService:

    POPULAR_TICKERS = [
        'AAPL', 'MSFT', 'JNJ', 'PG', 'KO',
        'JPM', 'V', 'VZ', 'PFE'
    ]

    MARQUEE_TICKERS = [
        'AAPL', 'MSFT', 'JNJ', 'KO', 'PG', 'VZ', 'T', 'MCD', 'MMM', 'PEP',
        'ABBV', 'CVX', 'XOM', 'ENB', 'O', 'MO', 'AVGO', 'TXN', 'BMY', 'WMT'
    ]
    
    @staticmethod
    def search_ticker(q: str) -> dict:

        try:
            query = q.strip()

            headers = {
                'User-Agent': SEC_USER_AGENT,
                'From': SEC_CONTACT_EMAIL,
                'Accept': 'application/json'
            }

            url = TICKER_URL
            max_retries = 3
            backoff = 1
            response = None

            for attempt in range(max_retries):

                try:

                    response = requests.get(url, headers=headers, timeout=10)

                    if response.status_code == 429:

                        if attempt < max_retries - 1:
                            time.sleep(backoff)
                            backoff *= 2
                            continue

                        response.raise_for_status()

                    response.raise_for_status()            
                    break

                except requests.RequestException:

                    if attempt < max_retries - 1:
                        time.sleep(backoff)
                        backoff *= 2
                        continue
                    
                    raise

            data = response.json()

            all_tickers = [
                {
                    'cik_str': value['cik_str'],
                    'ticker': value['ticker'],
                    'title': value['title']
                }
                for value in data.values()
            ]

            if query:

                query_lower = query.lower()

                filtered_tickers = [
                    {'ticker': t['ticker'], 'title': t['title'], 'logo_url': f"https://img.logo.dev/ticker/{t['ticker']}?token={LOGO_DEV_PUBLIC_KEY}"}
                    for t in all_tickers
                    if query_lower in t['ticker'].lower() or query_lower in t['title'].lower()
                ][:10]

                return filtered_tickers

            return []

        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch ticker data from SEC: {str(e)}")
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
        
    @staticmethod
    def get_marquee_tickers() -> List[Dict[str, Any]]:

        result = []

        try:
            tickers = yf.Tickers(' '.join(HomePageService.MARQUEE_TICKERS))

            for symbol in HomePageService.MARQUEE_TICKERS:

                try:
                    ticker = tickers.tickers[symbol.upper()]
                    info = ticker.info

                    current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))
                    previous_close = info.get('previousClose', current_price)
                    change = current_price - previous_close if current_price and previous_close else 0
                    change_percent = (change / previous_close * 100) if previous_close else 0

                    result.append({
                        'symbol': symbol.upper(),
                        'price': f"${current_price:.2f}" if current_price else "$0.00",
                        'change': f"{change_percent:+.2f}%" if change_percent else "0.00%",
                        'up': change_percent >= 0,
                    })

                except Exception as e:
                    print(f"Error processing marquee ticker {symbol}: {e}")
                    continue

        except Exception as e:
            print(f"Error fetching marquee tickers: {e}")
            return []

        return result

    @staticmethod
    def get_popular_stocks() -> List[Dict[str, Any]]:

        stocks_data = []

        try:
            tickers = yf.Tickers(' '.join(HomePageService.POPULAR_TICKERS))

            for ticker_symbol in HomePageService.POPULAR_TICKERS:

                try:

                    stock_data = StockService.get_stock_info_from_tickers(tickers, ticker_symbol)

                    if stock_data:
                        stocks_data.append(stock_data)

                except Exception as e:
                    print(f"Error processing data for {ticker_symbol}: {e}")
                    continue

        except Exception as e:
            print(f"Error fetching tickers data: {e}")
            return {
                'stocks': []
            }

        return {
            'stocks': stocks_data
        }

    UPCOMING_SCAN_TICKERS = [
        'AAPL', 'MSFT', 'JNJ', 'KO', 'PG', 'VZ', 'T', 'MCD', 'MMM', 'PEP',
        'ABBV', 'CVX', 'XOM', 'ENB', 'O', 'MO', 'AVGO', 'TXN', 'BMY', 'WMT',
        'JPM', 'V', 'PFE', 'HD', 'AMGN', 'IBM', 'MRK', 'CAT', 'GPC', 'CSCO',
    ]

    @staticmethod
    def get_upcoming_dividends() -> List[Dict[str, Any]]:
        today = datetime.now(timezone.utc).date()
        upcoming = []

        try:
            tickers = yf.Tickers(' '.join(HomePageService.UPCOMING_SCAN_TICKERS))

            for symbol in HomePageService.UPCOMING_SCAN_TICKERS:
                try:
                    info = tickers.tickers[symbol.upper()].info

                    ex_date_ts = info.get('exDividendDate')
                    if not ex_date_ts:
                        continue

                    ex_date = datetime.fromtimestamp(ex_date_ts, tz=timezone.utc).date()
                    days_until = (ex_date - today).days

                    if days_until < 0:
                        continue

                    amount = info.get('lastDividendValue', 0) or 0
                    company = info.get('longName') or info.get('shortName') or symbol

                    upcoming.append({
                        'symbol': symbol.upper(),
                        'company': company,
                        'amount': round(float(amount), 4),
                        'ex_date': ex_date.strftime('%b %d'),
                        'days_until': days_until,
                    })

                except Exception as e:
                    print(f"Error processing upcoming dividend for {symbol}: {e}")
                    continue

            upcoming.sort(key=lambda x: x['days_until'])
            return upcoming[:10]

        except Exception as e:
            print(f"Error fetching upcoming dividends: {e}")
            return []

    @staticmethod
    def get_homepage_reddit_posts() -> List[Dict[str, Any]]:

        try:

            reddit = praw.Reddit(
                client_id=REDDIT_CLIENT_ID,
                client_secret=REDDIT_CLIENT_SECRET,
                user_agent=REDDIT_USER_AGENT,
            )

            subreddit = reddit.subreddit('dividends+dividendinvesting+investing+stocks+wallstreetbets+StockMarket')
            posts_raw = list(subreddit.hot(limit=20))

            results = []

            for post in posts_raw:

                if post.stickied:
                    continue

                results.append({
                    'title': post.title,
                    'url': post.url,
                    'score': post.score,
                    'num_comments': post.num_comments,
                    'created_utc': datetime.fromtimestamp(post.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
                    'selftext': post.selftext[:300] if post.selftext else '',
                    'author': str(post.author) if post.author else 'Unknown',
                    'subreddit': str(post.subreddit) if post.subreddit else 'Unknown',
                })

            return results

        except Exception as e:
            print(f"Error fetching homepage Reddit posts: {e}")
            return []
