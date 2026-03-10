from fastapi import APIRouter, Query

from app.stock.service import StockService, RedditSummaryService

router = APIRouter()

@router.get("/stocks/{tid}")
async def api_ticker(tid: str):
    return StockService.get_stock_info(tid)

@router.get("/stocks/analysis/reddit")
def api_reddit_data(ticker: str = Query(default=""), tickerName: str = Query(default="")):
    return RedditSummaryService.get_reddit_posts_and_summary(ticker, tickerName)

