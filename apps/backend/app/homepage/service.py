from fastapi import HTTPException
import requests
import time
import yfinance as yf
from typing import List, Dict, Any

from app.config import TICKER_URL, SEC_USER_AGENT, SEC_CONTACT_EMAIL
from app.stock.service import StockService

class HomePageService:
    
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
                    {'ticker': t['ticker'], 'title': t['title']}
                    for t in all_tickers
                    if query_lower in t['ticker'].lower() or query_lower in t['title'].lower()
                ][:10]

                return {'suggestions': filtered_tickers}

            return {'suggestions': []}

        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch ticker data from SEC: {str(e)}")
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
        
    POPULAR_TICKERS = [
        'AAPL', 'MSFT', 'JNJ', 'PG', 'KO',
        'JPM', 'V', 'VZ', 'PFE'
    ]

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
