import yfinance as yf
import pandas as pd
from typing import List, Dict, Any


class PopularStocksService:

    POPULAR_TICKERS = [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA',
        'JNJ', 'JPM', 'V', 'PG', 'KO', 'PFE', 'VZ'
    ]

    @staticmethod
    def get_popular_stocks() -> List[Dict[str, Any]]:
        stocks_data = []

        for ticker_symbol in PopularStocksService.POPULAR_TICKERS:
            try:
                stock_data = PopularStocksService.get_stock_info(ticker_symbol)
                if stock_data:
                    stocks_data.append(stock_data)
            except Exception as e:
                print(f"Error fetching data for {ticker_symbol}: {e}")
                continue

        return stocks_data

    @staticmethod
    def get_stock_info(ticker_symbol: str) -> Dict[str, Any]:
        """
        Get basic information for a single stock

        Args:
            ticker_symbol: Stock ticker symbol

        Returns:
            Dictionary containing stock information
        """
        ticker = yf.Ticker(ticker_symbol)

        # Get basic info
        info = ticker.info

        # Get current price
        try:
            current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))
        except:
            current_price = 0

        # Get previous close for change calculation
        try:
            previous_close = info.get('previousClose', current_price)
            change = current_price - previous_close if current_price and previous_close else 0
            change_percent = (change / previous_close * 100) if previous_close else 0
        except:
            change = 0
            change_percent = 0

        # Get dividend information
        try:
            dividend_yield = info.get('dividendYield', 0)
            if dividend_yield:
                dividend_yield = round(dividend_yield * 100, 2)  # Convert to percentage
            else:
                dividend_yield = 0
        except:
            dividend_yield = 0

        # Get dividend rate (annual dividend per share)
        try:
            dividend_rate = info.get('dividendRate', 0)
        except:
            dividend_rate = 0

        return {
            'symbol': ticker_symbol,
            'name': info.get('longName', info.get('shortName', ticker_symbol)),
            'price': f"${current_price:.2f}" if current_price else "$0.00",
            'change': f"{change_percent:+.2f}%" if change_percent else "0.00%",
            'dividend_rate': f"{dividend_rate:.2f}" if dividend_rate else "0.00",
            'dividend_yield': f"{dividend_yield:.2f}%" if dividend_yield else "0.00%",
            'market_cap': info.get('marketCap', 0),
            'sector': info.get('sector', 'Unknown'),
            'logo_url': f"https://logo.clearbit.com/{info.get('website', '').replace('https://', '').replace('http://', '').split('/')[0] if info.get('website') else f'{ticker_symbol}.com'}"
        }
