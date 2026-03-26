import { Suspense } from 'react'
import { DividendsChart } from '@/components/Stock/Sub/DividendsChart'
import { DividendsTable } from '@/components/Stock/Sub/DividendsTable'
import { Head } from './Sub/Head'
import { MdError } from 'react-icons/md'
import { KeyMetrics } from './Sub/KeyMetrics'
import { CompanyDetails } from './Sub/CompanyDetails'
import { InitialMetrics } from './Sub/InitialMetrics'
import { Analysis } from './Sub/Analysis'
import { ChartSkeleton, MetricCardSkeleton } from '@/components/Skeleton'
import type { StockDetail } from '@/types'

interface LayoutProps {
    ticker: string
    stockInfo: StockDetail | null
}

export const Layout = ({ ticker, stockInfo }: LayoutProps) => {

    if (!stockInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="glass-card p-8 flex items-center gap-3 text-loss">
                    <MdError size={24} />
                    <span>An error occurred while loading stock data.</span>
                </div>
            </div>
        )
    }

    const dividends = stockInfo.all_dividends || []

    return (
        <div className="max-w-7xl container mx-auto space-y-3 lg:space-y-5 p-3 lg:p-6 pt-20 lg:pt-22">

            <Head stock={stockInfo} />

            <InitialMetrics
                currentPrice={stockInfo.price || 'N/A'}
                dividendYield={stockInfo.dividend_yield || 'N/A'}
                dividendRate={stockInfo.dividend_rate || 'N/A'}
                dividendsLength={dividends.length}
            />

            {dividends.length === 0 ? (
                <div className="glass-card p-8 text-center text-secondary">
                    <p className="text-sm">No dividend history available for {ticker.toUpperCase()}.</p>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-3 lg:gap-5 w-full">
                    <DividendsTable dividends={dividends} />
                    <DividendsChart dividends={dividends} />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5">
                <KeyMetrics
                    marketCap={stockInfo.market_cap}
                    volume={stockInfo.volume}
                    averageVolume={stockInfo.average_volume}
                    fiftyTwoWeekHigh={stockInfo.fifty_two_week_high}
                    fiftyTwoWeekLow={stockInfo.fifty_two_week_low}
                    trailingPE={stockInfo.trailing_pe}
                    forwardPE={stockInfo.forward_pe}
                    trailingEPS={stockInfo.trailing_eps}
                    forwardEPS={stockInfo.forward_eps}
                    beta={stockInfo.beta}
                    currency={stockInfo.currency}
                    exchange={stockInfo.exchange}
                />
                <CompanyDetails
                    sector={stockInfo.sector}
                    industry={stockInfo.industry}
                    country={stockInfo.country}
                    fullTimeEmployees={stockInfo.full_time_employees}
                    businessSummary={stockInfo.long_business_summary}
                    logoURL={stockInfo.logo_url}
                    name={stockInfo.name}
                />
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                    <ChartSkeleton />
                    <MetricCardSkeleton />
                </div>
            }>
                <Analysis ticker={ticker} tickerName={stockInfo.name} />
            </Suspense>

        </div>
    )
}
