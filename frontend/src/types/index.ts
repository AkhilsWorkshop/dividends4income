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
