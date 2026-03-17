import { Layout } from '@/components/Stock/Layout'
import { fetchStockData } from '@/lib/api'

type Props = {
    params: Promise<{ ticker: string }>
}

export const dynamic = 'force-dynamic'

export default async function StockPage({ params }: Props) {

    const { ticker } = await params
    const stockInfo = await fetchStockData(ticker)

    return <Layout ticker={ticker} stockInfo={stockInfo} />
}

export async function generateMetadata({ params }: Props) {

    const { ticker } = await params
    
    return {
        title: `${ticker.toUpperCase()} - Dividends4Income`,
        description: `Dividend history, analytics, and AI insights for ${ticker.toUpperCase()}.`,
    }
}
