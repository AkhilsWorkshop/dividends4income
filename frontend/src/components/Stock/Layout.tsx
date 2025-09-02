import { useEffect } from 'preact/hooks'
import { DividendsChart } from '@/components/Stock/Sub/DividendsChart'
import { useApi } from '@/hooks/useApi'
import { BasicStockInfo } from '@/types'
import { DividendsTable } from '@/components/Stock/Sub/DividendsTable'
import { Head } from './Sub/Head'
import { MdError } from 'react-icons/md'
import { KeyMetrics } from './Sub/KeyMetrics'
import { CompanyDetails } from './Sub/CompanyDetails'
import { InitialMetrics } from './Sub/InitialMetrics'
import { Analysis } from './Sub/Analysis'

interface StockPageProps {
    ticker: string
}

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface StockInfo {
    stock: BasicStockInfo & {
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
}

export const Layout = ({ ticker }: StockPageProps) => {

    const { data: stockData, loading, error, fetchData } = useApi<StockInfo>()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        fetchData(`/stocks/${ticker}`)
    }, [ticker, fetchData])

    if (error) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center my-8 text-red-600">
                <MdError size={24} />
                <span className="ml-2">{error || 'An error occurred while loading stocks'}</span>
            </div>
        )
    }

    const stockInfo = stockData?.stock
    const dividends = stockInfo?.all_dividends || []

    return (
        <div className="max-w-7xl container mx-auto space-y-3 lg:space-y-6 p-3 lg:p-6 pt-20 lg:pt-22">

            <Head
                loading={loading}
                stock={stockInfo || null} />

            <InitialMetrics
                currentPrice={stockInfo?.price || 'N/A'}
                dividendYield={stockInfo?.dividend_yield || 'N/A'}
                dividendRate={stockInfo?.dividend_rate || 'N/A'}
                dividendsLength={dividends.length}
                loading={loading}
            />

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">

                <KeyMetrics
                    loading={loading}
                    marketCap={stockInfo?.market_cap}
                    volume={stockInfo?.volume}
                    averageVolume={stockInfo?.average_volume}
                    fiftyTwoWeekHigh={stockInfo?.fifty_two_week_high}
                    fiftyTwoWeekLow={stockInfo?.fifty_two_week_low}
                    trailingPE={stockInfo?.trailing_pe}
                    forwardPE={stockInfo?.forward_pe}
                    trailingEPS={stockInfo?.trailing_eps}
                    forwardEPS={stockInfo?.forward_eps}
                    beta={stockInfo?.beta}
                    currency={stockInfo?.currency}
                    exchange={stockInfo?.exchange}
                />

                <CompanyDetails
                    loading={loading}
                    sector={stockInfo?.sector}
                    industry={stockInfo?.industry}
                    country={stockInfo?.country}
                    fullTimeEmployees={stockInfo?.full_time_employees}
                    businessSummary={stockInfo?.long_business_summary}
                    logoURL={stockInfo?.logo_url}
                    name={stockInfo?.name}
                />

            </div>

            {!loading &&

                <Analysis
                    prevLoading={loading}
                    ticker={ticker || ''}
                    tickerName={stockInfo?.name || ''} />

            }

        </div>
    )
}
