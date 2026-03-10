import os
from decouple import config

REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

TICKER_URL = os.getenv("TICKER_URL")
SEC_USER_AGENT = os.getenv("SEC_USER_AGENT")
SEC_CONTACT_EMAIL = os.getenv("SEC_CONTACT_EMAIL")
LOGO_DEV_PUBLIC_KEY = os.getenv("LOGO_DEV_PUBLIC_KEY")

CORS_ORIGINS = [
    "https://d4i.akhilkumar.dev",
    "http://localhost:3000"
]
