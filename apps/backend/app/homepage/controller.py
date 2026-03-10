from fastapi import APIRouter, Query

from app.homepage.service import HomePageService

router = APIRouter()

@router.get("/tickers/search")
async def api_ticker_search(q: str = Query("", description="Search query")):
    return HomePageService.search_ticker(q)

@router.get("/popular/stocks")
async def api_popular_stocks():
    return HomePageService.get_popular_stocks()
    