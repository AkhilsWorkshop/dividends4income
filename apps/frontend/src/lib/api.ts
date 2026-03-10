import 'server-only'

import { notFound } from 'next/navigation'
import type { BasicStockInfo } from '@/types'

const BASE = () => {
    const url = process.env.API_BASE_URL
    if (!url) throw new Error('API_BASE_URL env var is not set')
    return url
}

export interface DividendData {
    date: string
    amount: number
    change_percent: number
}

export interface StockDetail extends BasicStockInfo {
    market_cap?: number
    volume?: number
    average_volume?: number
    fifty_two_week_high?: number
    fifty_two_week_low?: number
    trailing_pe?: number
    forward_pe?: number
    trailing_eps?: number
    forward_eps?: number
    beta?: number
    sector?: string
    industry?: string
    long_business_summary?: string
    currency?: string
    exchange?: string
    country?: string
    full_time_employees?: number
    all_dividends: DividendData[]
}

export interface RedditData {
    posts: RedditPost[]
    reddit_key_points: string[]
    reddit_prediction: string
    ai_key_points: string[]
    ai_prediction: string
}

export interface RedditPost {
    title: string
    url: string
    score: number
    num_comments: number
    created_utc: string
    selftext: string
    author: string
    subreddit: string
}

export interface PopularStocksData {
    stocks: BasicStockInfo[]
}

export async function fetchPopularStocks(): Promise<PopularStocksData> {

    const base = process.env.API_BASE_URL

    if (!base) return { stocks: [] }

    const res = await fetch(`${base}/popular/stocks`, {
        next: { revalidate: 3600 },
    })

    if (!res.ok) return { stocks: [] }

    return res.json()
}

export async function fetchStockData(ticker: string): Promise<StockDetail | null> {

    const res = await fetch(`${BASE()}/stocks/${ticker}`, {
        cache: 'no-store',
    })

    if (res.status === 404) notFound()
    if (!res.ok) return null

    return res.json()
}

export async function fetchRedditAnalysis(
    ticker: string,
    tickerName: string,
): Promise<RedditData | null> {

    const res = await fetch(
        `${BASE()}/stocks/analysis/reddit?ticker=${encodeURIComponent(ticker)}&tickerName=${encodeURIComponent(tickerName)}`,
        { cache: 'no-store' },
    )

    if (!res.ok) return null
    return res.json()
}
