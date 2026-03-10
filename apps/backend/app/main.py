from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from dotenv import load_dotenv

load_dotenv()

from app.config import CORS_ORIGINS
from app.homepage.controller import router as homepage_router
from app.stock.controller import router as stocks_router

app = FastAPI(title="Dividends 4 Income API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(homepage_router, tags=["Homepage"])
app.include_router(stocks_router, tags=["Stocks"])

@app.get("/")
def api_root():
    return {"message": "Not much to see here."}

handler = Mangum(app)
