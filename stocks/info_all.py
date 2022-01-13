import yfinance as yf



#def yfinance_info(ticker):
    #ticker_name = "{}".format(ticker)
yf_fn = yf.Ticker("AAPL")
yf_data = yf_fn.info
print(yf_data)
