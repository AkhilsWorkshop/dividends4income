import { memo } from 'react'
import { Header } from './KeyMetrics/Header'
import { MetricsGrid } from './KeyMetrics/MetricsGrid'

interface KeyMetricsProps {
    marketCap?: number
    volume?: number
    averageVolume?: number
    fiftyTwoWeekHigh?: number
    fiftyTwoWeekLow?: number
    trailingPE?: number
    forwardPE?: number
    trailingEPS?: number
    forwardEPS?: number
    beta?: number
    currency?: string
    exchange?: string
}

export const KeyMetrics = memo(({
    marketCap,
    volume,
    averageVolume,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    trailingPE,
    forwardPE,
    trailingEPS,
    forwardEPS,
    beta,
    currency,
    exchange
}: KeyMetricsProps) => {

    const formatNumber = (num?: number) => {
        if (!num) return 'N/A'
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
        if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
        return `$${num.toFixed(2)}`
    }

    const formatVolume = (num?: number) => {
        if (!num) return 'N/A'
        if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
        if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
        return num.toString()
    }

    const metrics = [
        { label: 'Market Cap', value: formatNumber(marketCap) },
        { label: 'Beta', value: beta ? beta.toFixed(2) : 'N/A' },
        { label: 'Volume', value: formatVolume(volume) },
        { label: 'Avg Volume', value: formatVolume(averageVolume) },
        { label: '52W High', value: fiftyTwoWeekHigh ? `$${fiftyTwoWeekHigh.toFixed(2)}` : 'N/A' },
        { label: '52W Low', value: fiftyTwoWeekLow ? `$${fiftyTwoWeekLow.toFixed(2)}` : 'N/A' },
        { label: 'Trailing P/E', value: trailingPE ? trailingPE.toFixed(2) : 'N/A' },
        { label: 'Forward P/E', value: forwardPE ? forwardPE.toFixed(2) : 'N/A' },
        { label: 'Trailing EPS', value: trailingEPS ? `$${trailingEPS.toFixed(2)}` : 'N/A' },
        { label: 'Forward EPS', value: forwardEPS ? `$${forwardEPS.toFixed(2)}` : 'N/A' },
        { label: 'Currency', value: currency ?? 'N/A' },
        { label: 'Exchange', value: exchange ?? 'N/A' },
    ]

    return (
        <div className="py-4 lg:py-6 text-primary space-y-6">

            <Header />

            <MetricsGrid metrics={metrics} />

        </div>
    )
})

KeyMetrics.displayName = 'KeyMetrics'
