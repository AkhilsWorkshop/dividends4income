import yfinance as yf
from typing import List, Dict, Any

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

            return {
                'symbol': ticker_symbol.upper(),
                'name': info.get('longName', info.get('shortName', ticker_symbol.upper())),
                'price': f"${current_price:.2f}" if current_price else "$0.00",
                'change': f"{change_percent:+.2f}%" if change_percent else "0.00%",
                'dividend_rate': f"{dividend_rate:.2f}" if dividend_rate else "0.00",
                'dividend_yield': f"{dividend_yield:.2f}%" if dividend_yield else "0.00%",
                'logo_url': logo_url,
                'all_dividends': dividends_data
            }
        
        except Exception as e:
            print(f"Error fetching stock info for {ticker_symbol}: {e}")
            return None
