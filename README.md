# [Dividends4Income](https://d4i.akhilkumar.dev) 

A clean, fast web app for tracking dividend stocks and getting company insights. Built with Django + React, deployed on Vercel.

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel)](https://d4i.akhilkumar.dev)

## What it does

- **Stock Search** - Find any stock by ticker or company name
- **Dividend History** - See past dividend payments and yields
- **Company Info** - Get detailed company profiles and financials
- **Real-time Prices** - Live stock prices and market data
- **Reddit Sentiment** - Community discussions and sentiment analysis

## Tech Stack

**Frontend:**
- [Preact](https://preactjs.com/) - React alternative, faster and smaller
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool, insanely fast dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [ApexCharts](https://apexcharts.com/) - Beautiful charts

**Backend:**
- [Django](https://www.djangoproject.com/) - Python web framework
- [Redis](https://redis.io/) - Fast in-memory DB
- [OpenRouter](https://openrouter.ai/) - Language model API for company insights and analysis

**Data Sources:**
- [Yahoo Finance / Y Finance](https://finance.yahoo.com/) - Stock prices and fundamentals
- [SEC.gov](https://www.sec.gov/) - Company filings and tickers
- [Clearbit](https://clearbit.com/) - Company logos
- [Reddit API](https://www.reddit.com/dev/api/) - Community sentiment

**Deployment:**
- [Vercel](https://vercel.com/) - Hosting

## Quick Start

This repository is organized as a simple **monorepo** with two top‑level
packages: `backend` (Django) and `frontend` (Next.js). The root package uses
npm **workspaces** so you can install all JavaScript dependencies from the
repository root and share tooling.

```bash
# from the repository root (install once)
npm install             # installs frontend deps via workspace + dev tools
python -m pip install -r backend/requirements.txt

# start everything together
npm run dev:full        # runs frontend and Django side-by-side

# (or run each service manually if you prefer)
# Backend
cd backend
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm run dev
```

Everything runs from the correct working directory, so `npm run dev:full` no
longer throws missing-module errors.

Once running you can browse the app at `http://localhost:3000` and the API at
`http://localhost:8000`.

> **Tip:** the backend expects a Redis instance on `localhost:6379`. If you
> see `Connection refused` errors, start Redis (`brew services start redis` on
> macOS) or adjust `REDIS_URL` in `backend/.env`.

Visit `http://localhost:3000` for the app, `http://localhost:8000` for the API.

## Support

For questions or support, email me at [reachme@akhilkumar.dev](mailto:reachme@akhilkumar.dev)
