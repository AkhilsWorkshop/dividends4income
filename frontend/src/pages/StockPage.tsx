import { Layout } from '@/components/Stock/Layout'

interface StockPageProps {
    ticker?: string
}

export function StockPage({ ticker = 'AAPL' }: StockPageProps) {
    return <Layout ticker={ticker} />
}
