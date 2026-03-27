from fastapi import APIRouter, Query

from app.homepage.service import HomePageService

router = APIRouter()

@router.get("/tickers/search")
async def api_ticker_search(q: str = Query("", description="Search query")):
    return HomePageService.search_ticker(q)

@router.get("/popular/stocks")
async def api_popular_stocks():
    return HomePageService.get_popular_stocks()

@router.get("/marquee/tickers")
async def api_marquee_tickers():
    return HomePageService.get_marquee_tickers()

@router.get("/upcoming/dividends")
async def api_upcoming_dividends():
    return HomePageService.get_upcoming_dividends()

@router.get("/reddit/posts")
async def api_homepage_reddit_posts():
    return HomePageService.get_homepage_reddit_posts()
