import yfinance as yf


def yfinance_info(ticker):
    ticker_name = "{}".format(ticker)
    yf_fn = yf.Ticker(ticker_name)
    yf_data = yf_fn.info
    return yf_data
