import 'server-only'

import { notFound } from 'next/navigation'
import type { PopularStocksData, RedditData, RedditPost, StockDetail, MarqueeTicker, UpcomingDividend } from '@/types'

export const BASE = () => {

    const url = process.env.SERVER_URL
    const apiKey = process.env.SERVER_API_KEY

    if (!apiKey) throw new Error('SERVER_API_KEY env var is not set')

    if (!url) throw new Error('SERVER_URL env var is not set')

    return { url, apiKey }
}

export const fetchPopularStocks = async (): Promise<PopularStocksData> => {

    const { url, apiKey } = BASE()

    if (!url || !apiKey) return { stocks: [] }

    const res = await fetch(`${url}/popular/stocks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Dividends4Income Frontend',
            'x-api-key': apiKey || '',
        },
        next: { revalidate: 3600 },
    })

    if (!res.ok) return { stocks: [] }

    return res.json()
}

export const fetchMarqueeTickers = async (): Promise<MarqueeTicker[]> => {

    const { url, apiKey } = BASE()

    if (!url || !apiKey) return []

    const res = await fetch(`${url}/marquee/tickers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Dividends4Income Frontend',
            'x-api-key': apiKey || '',
        },
        next: { revalidate: 300 },
    })

    if (!res.ok) return []

    return res.json()
}

export const fetchStockData = async (ticker: string): Promise<StockDetail | null> => {

    const { url, apiKey } = BASE()

    const res = await fetch(`${url}/stocks/${ticker}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Dividends4Income Frontend',
            'x-api-key': apiKey || '',
        },
        cache: 'no-store',
    })

    if (res.status === 404) notFound()
    if (!res.ok) return null

    return res.json()
}

export const fetchUpcomingDividends = async (): Promise<UpcomingDividend[]> => {

    const { url, apiKey } = BASE()

    if (!url || !apiKey) return []

    const res = await fetch(`${url}/upcoming/dividends`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Dividends4Income Frontend',
            'x-api-key': apiKey || '',
        },
        next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    return res.json()
}

export const fetchHomepageRedditPosts = async (): Promise<RedditPost[]> => {

    const { url, apiKey } = BASE()

    if (!url || !apiKey) return []

    const res = await fetch(`${url}/reddit/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Dividends4Income Frontend',
            'x-api-key': apiKey || '',
        },
        next: { revalidate: 1800 },
    })

    if (!res.ok) return []

    return res.json()
}

export const fetchRedditAnalysis = async (
    ticker: string,
    tickerName: string,
): Promise<RedditData | null> => {

    const { url, apiKey } = BASE()

    const res = await fetch(`${url}/stocks/analysis/reddit?ticker=${encodeURIComponent(ticker)}&tickerName=${encodeURIComponent(tickerName)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Dividends4Income Frontend',
            'x-api-key': apiKey || '',
        },
        cache: 'no-store'
    })

    if (!res.ok) return null

    return res.json()
}
