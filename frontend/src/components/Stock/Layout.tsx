import { useEffect } from 'preact/hooks'
import { DividendsChart } from '@/components/Stock/Sub/DividendsChart'
import { useApi } from '@/hooks/useApi'
import { BasicStockInfo } from '@/types'
import { DividendsTable } from '@/components/Stock/Sub/DividendsTable'
import { Head } from './Sub/Head'
import { ShortCard } from './Reuse/ShortCard'
import { MdError } from 'react-icons/md'

interface StockPageProps {
    ticker?: string
}

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface StockInfo {
    stock: BasicStockInfo & {
        all_dividends: DividendData[]
    }
}

export const Layout = ({ ticker }: StockPageProps) => {

    const { data: stockData, loading, error, fetchData } = useApi<StockInfo>()

    useEffect(() => {
        fetchData(`/api/stocks/${ticker}`)
    }, [ticker, fetchData])

    if (error) {
        return (
            <div className="flex items-center justify-center py-8 text-red-600">
                <MdError size={24} />
                <span className="ml-2">An error occurred while loading stocks</span>
            </div>
        )
    }

    const stockInfo = stockData?.stock
    const dividends = stockInfo?.all_dividends || []

    const currentPrice = stockInfo?.price || 'N/A'
    const dividendYield = stockInfo?.dividend_yield || 'N/A'
    const dividendRate = stockInfo?.dividend_rate || 'N/A'

    return (
        <div className="space-y-3 lg:space-y-6 p-3 lg:p-6">

            <Head
                loading={loading}
                stock={stockInfo || null} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">

                <ShortCard
                    loading={loading}
                    heading="Current Price"
                    value={currentPrice} />

                <ShortCard
                    loading={loading}
                    heading="Dividend Yield"
                    value={dividendYield} />

                <ShortCard
                    loading={loading}
                    heading="Dividend Rate"
                    value={dividendRate} />

                <ShortCard
                    loading={loading}
                    heading="Total Dividends"
                    value={dividends.length} />

            </div>

            {(dividends.length === 0) && !loading ?

                <div className="w-full bg-layer rounded-xl border border-border shadow-sm text-primary p-6">
                    <p className="text-center">No dividends found.</p>
                </div>

                :

                <div className="grid grid-cols-5 gap-3 lg:gap-6 w-full">

                    <DividendsTable
                        loading={loading}
                        dividends={dividends}
                    />

                    <DividendsChart
                        loading={loading}
                        dividends={dividends}
                    />

                </div>

            }

        </div>
    )
}
