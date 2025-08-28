import { useEffect } from 'preact/hooks'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
// import { StockChart } from '@/components/StockChart'
import { useApi } from '@/hooks/useApi'
import { cn } from '@/utils'
import { themeStore } from '@/stores/theme'
import type { StockInfo } from '@/types'

interface StockPageProps {
    ticker?: string
}

export function StockPage({ ticker = 'AAPL' }: StockPageProps) {

    const { data: stockInfo, loading, error, fetchData } = useApi<StockInfo>()

    useEffect(() => {
        fetchData(`/api/stocks/${ticker}`)
    }, [ticker, fetchData])

    // Sample chart data for demonstration
    const chartData = [
        { x: '2024-01-01', y: 150 },
        { x: '2024-02-01', y: 155 },
        { x: '2024-03-01', y: 148 },
        { x: '2024-04-01', y: 162 },
        { x: '2024-05-01', y: 158 },
        { x: '2024-06-01', y: 165 },
    ]

    if (loading) return <LoadingSkeleton />

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Error: {error}
            </div>
        )
    }

    if (!stockInfo) {
        return (
            <div className="text-center py-8">
                <p>No stock information found for {ticker}</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">

            <div className={cn(
                'p-6 rounded-lg shadow',
                themeStore.value.isDark
                    ? 'bg-gray-800'
                    : 'bg-white'
            )}>

                <h2 className="text-2xl font-bold mb-4">
                    {stockInfo.longName} ({stockInfo.symbol})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div>
                        <p className="text-sm text-gray-500">Current Price</p>
                        <p className="text-xl font-semibold">${stockInfo.currentPrice?.toFixed(2)}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Dividend Yield</p>
                        <p className="text-xl font-semibold">
                            {stockInfo.dividendYield ? (stockInfo.dividendYield * 100).toFixed(2) : 'N/A'}%
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Market Cap</p>
                        <p className="text-xl font-semibold">
                            {stockInfo.marketCap ? `$${(stockInfo.marketCap / 1e9).toFixed(2)}B` : 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">P/E Ratio</p>
                        <p className="text-xl font-semibold">{stockInfo.trailingPE?.toFixed(2) || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Sector</p>
                        <p className="text-xl font-semibold">{stockInfo.sector || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Industry</p>
                        <p className="text-xl font-semibold">{stockInfo.industry || 'N/A'}</p>
                    </div>

                </div>

            </div>

            <div className={cn(
                'p-6 rounded-lg shadow',
                themeStore.value.isDark
                    ? 'bg-gray-800'
                    : 'bg-white'
            )}>

                <h3 className="text-lg font-semibold mb-4">Price Chart</h3>

                {/* <div className="h-64">
                    <StockChart
                        data={chartData}
                        title={`${ticker} Price History`}
                    />
                </div> */}

            </div>

        </div>
    )
}
