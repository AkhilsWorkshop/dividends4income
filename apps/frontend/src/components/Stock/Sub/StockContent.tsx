import { Head } from './StockContent/Head'
import { InitialMetrics } from './StockContent/InitialMetrics'
import { DividendsSection } from './StockContent/DividendsSection'
import { MetricsSection } from './StockContent/MetricsSection'
import { AnalysisSection } from './StockContent/AnalysisSection'
import type { StockDetail } from '@/types'

interface StockContentProps {
    ticker: string
    stockInfo: StockDetail
}

export const StockContent = ({ ticker, stockInfo }: StockContentProps) => {

    const dividends = stockInfo.all_dividends || []

    return (
        <div className="max-w-7xl container mx-auto space-y-3 lg:space-y-5 p-3 lg:p-6 pt-20 lg:pt-22">

            <Head stock={stockInfo} />

            <InitialMetrics
                currentPrice={stockInfo.price || 'N/A'}
                dividendYield={stockInfo.dividend_yield || 'N/A'}
                dividendRate={stockInfo.dividend_rate || 'N/A'}
                dividendsLength={dividends.length}
                change={stockInfo.change || '0%'}
            />

            <DividendsSection dividends={dividends} ticker={ticker} />

            <MetricsSection stockInfo={stockInfo} />

            <AnalysisSection ticker={ticker} tickerName={stockInfo.name} />

        </div>
    )
}