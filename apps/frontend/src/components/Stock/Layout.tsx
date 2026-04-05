import { ErrorState } from './Sub/ErrorState'
import { StockContent } from './Sub/StockContent'
import type { StockDetail } from '@/types'

interface LayoutProps {
    ticker: string
    stockInfo: StockDetail | null
}

export const Layout = ({ ticker, stockInfo }: LayoutProps) => {
    
    if (!stockInfo) {
        return <ErrorState />
    }

    return <StockContent ticker={ticker} stockInfo={stockInfo} />
}
