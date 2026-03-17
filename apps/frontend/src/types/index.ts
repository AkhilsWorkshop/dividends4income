export interface BasicStockInfo {
    symbol: string;
    name: string;
    price: string;
    change: string;
    dividend_rate: string;
    dividend_yield: string;
    logo_url: string;
}

export interface ThemeConfig {
    isDark: boolean;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
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
