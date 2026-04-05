import { KeyMetrics } from './Sub/MetricsSection/KeyMetrics'
import { CompanyDetails } from './Sub/MetricsSection/CompanyDetails'
import type { StockDetail } from '@/types'

interface MetricsSectionProps {
    stockInfo: StockDetail
}

export const MetricsSection = ({ stockInfo }: MetricsSectionProps) => {
    return (
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
    )
}