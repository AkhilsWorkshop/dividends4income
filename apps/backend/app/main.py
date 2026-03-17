from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from app.homepage.controller import router as homepage_router
from app.stock.controller import router as stocks_router
from app.middleware.service import Middleware

app = FastAPI(title="Dividends 4 Income API")

Middleware.register_security(app)
Middleware.register_cors(app)

app.include_router(homepage_router, tags=["Homepage"])
app.include_router(stocks_router, tags=["Stocks"])

@app.get("/")
def api_root():
    return {"message": "Not much to see here."}