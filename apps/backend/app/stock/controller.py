from fastapi import APIRouter, Query

from app.stock.service import StockService, RedditSummaryService

router = APIRouter()

@router.get("/stocks/{tid}")
async def api_ticker(tid: str):
    return await StockService.get_stock_info(tid)

@router.get("/stocks/analysis/reddit")
async def api_reddit_data(ticker: str = Query(default=""), tickerName: str = Query(default="")):
    return await RedditSummaryService.get_reddit_posts_and_summary(ticker, tickerName)

