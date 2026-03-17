# [Dividends4Income](https://d4i.akhilkumar.dev)

A clean, fast web app for tracking dividend stocks and getting company insights. Built with FastAPI + Next.js, deployed on Vercel.

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel)](https://d4i.akhilkumar.dev)

## What it does

- **Stock Search** - Find any stock by ticker or company name via SEC EDGAR
- **Dividend History** - See past dividend payments, yields, and per-payment change %
- **Company Info** - Detailed profiles: sector, industry, employees, business summary
- **Key Metrics** - P/E ratio, EPS, beta, market cap, 52-week range, volume
- **Real-time Prices** - Live stock prices and market data
- **Reddit Sentiment** - AI-powered analysis of community discussions across r/stocks, r/investing, r/wallstreetbets, and r/StockMarket

## Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) 16 (App Router) / [React](https://react.dev/) 19 - React framework with server components and Turbopack
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) v4 - Utility-first styling
- [ApexCharts](https://apexcharts.com/) - Dividend history charts
- [react-icons](https://react-icons.github.io/react-icons/) - Icon library

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [Mangum](https://mangum.fastapiexpert.com/) - Serverless adapter for Vercel/Lambda
- [Redis](https://redis.io/) - Server-side caching
- [Groq](https://groq.com/) - LLM inference for Reddit sentiment analysis

**Data Sources:**
- [Yahoo Finance / yfinance](https://finance.yahoo.com/) - Stock prices, dividend history, and fundamentals
- [SEC EDGAR](https://www.sec.gov/cgi-bin/browse-edgar) - Company tickers and search
- [logo.dev](https://logo.dev/) - Company logos by ticker symbol
- [Reddit API / PRAW](https://www.reddit.com/dev/api/) - Community posts for sentiment analysis

**Monorepo & Deployment:**
- [Vercel](https://vercel.com/) - Hosting for both frontend and backend

## Quick Start

This repository is organized as a **Monorepo** with two apps under `apps/`: `frontend` (Next.js) and `backend` (FastAPI). The root uses npm **workspaces** so you can install all JavaScript dependencies from the repository root.

```bash
# from the repository root (install once)
npm install
python -m pip install -r apps/backend/requirements.txt

# start everything together
npm run dev:full        # runs frontend (port 3000) and backend (port 3001) side-by-side

# (or run each service manually if you prefer)
# Backend
cd apps/backend
python dev_server.py

# Frontend (new terminal)
cd apps/frontend
npm run dev
```

Once running, browse the app at `http://localhost:3000` and the API at `http://localhost:3001`.

> **Tip:** The backend expects a Redis instance on `localhost:6379`. If you
> see `Connection refused` errors, start Redis (`brew services start redis` on
> macOS) or adjust `REDIS_URL` in `apps/backend/.env`.

## Environment Variables

**Backend (`apps/backend/.env`):**

| Variable | Description |
|---|---|
| `TICKER_URL` | SEC company tickers JSON URL |
| `SEC_USER_AGENT` | SEC EDGAR request user-agent |
| `SEC_CONTACT_EMAIL` | SEC EDGAR contact email |
| `REDDIT_CLIENT_ID` | Reddit OAuth app client ID |
| `REDDIT_CLIENT_SECRET` | Reddit OAuth app client secret |
| `REDDIT_USER_AGENT` | Reddit API user-agent string |
| `GROQ_API_KEY` | Groq LLM API key |
| `LOGO_DEV_PUBLIC_KEY` | logo.dev public token |
| `REDIS_URL` | Redis connection URL |
| `CORS_ORIGINS` | Comma-separated allowed origins |
| `SERVER_API_KEY` | Shared secret between frontend and backend |
| `ENVIRONMENT` | `production` or `local` (controls user-agent blocking) |

**Frontend (`apps/frontend/.env.local`):**

| Variable | Description |
|---|---|
| `SERVER_URL` | Backend base URL (e.g. `http://localhost:3001`) |
| `SERVER_API_KEY` | Must match backend's `SERVER_API_KEY` |
| `DOMAIN` | Public domain for OG meta tags |
| `GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |

## Support

For questions or support, email me at [reachme@akhilkumar.dev](mailto:reachme@akhilkumar.dev)
