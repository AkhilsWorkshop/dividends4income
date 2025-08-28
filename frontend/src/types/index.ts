export interface StockInfo {
    longName?: string;
    symbol?: string;
    sector?: string;
    industry?: string;
    marketCap?: number;
    currentPrice?: number;
    recommendationKey?: string;
    targetHighPrice?: number;
    targetLowPrice?: number;
    targetMeanPrice?: number;
    dividendYield?: number;
    payoutRatio?: number;
    fiveYearAvgDividendYield?: number;
    beta?: number;
    trailingPE?: number;
    forwardPE?: number;
    priceToBook?: number;
    enterpriseValue?: number;
    profitMargins?: number;
    floatShares?: number;
    sharesOutstanding?: number;
    bookValue?: number;
    earningsGrowth?: number;
    revenueGrowth?: number;
    totalCash?: number;
    totalDebt?: number;
    totalRevenue?: number;
    grossProfits?: number;
    freeCashflow?: number;
    operatingCashflow?: number;
    earningsQuarterlyGrowth?: number;
    netIncomeToCommon?: number;
    trailingEps?: number;
    forwardEps?: number;
    pegRatio?: number;
    lastSplitFactor?: string;
    lastSplitDate?: string;
    website?: string;
    phone?: string;
    address1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    fullTimeEmployees?: number;
    longBusinessSummary?: string;
}

export interface NewsArticle {
    title: string;
    link?: string;
    published?: string;
    summary?: string;
    publisher?: string;
    providerPublishTime?: string;
}

export interface StockData {
    ticker: string;
    info?: StockInfo;
    dividend?: string; // HTML string
    news?: NewsArticle[];
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    loading: boolean;
}

export interface ThemeConfig {
    isDark: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}
