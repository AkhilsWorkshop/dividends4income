# [Dividends4Income](https://d4i.akhilkumar.dev) 

A clean, fast web app for tracking dividend stocks and getting company insights. Built with Django + React, deployed on Vercel.

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![Livse Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel)](https://d4i.akhilkumar.dev)

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

**Data Sources:**
- [Yahoo Finance / Y Finance](https://finance.yahoo.com/) - Stock prices and fundamentals
- [SEC.gov](https://www.sec.gov/) - Company filings and tickers
- [Clearbit](https://clearbit.com/) - Company logos
- [Reddit API](https://www.reddit.com/dev/api/) - Community sentiment

**Deployment:**
- [Vercel](https://vercel.com/) - Hosting

## Quick Start

```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` for the app, `http://localhost:8000` for the API.

## Support

For questions or support, email me at [reachme@akhilkumar.dev](mailto:reachme@akhilkumar.dev)
