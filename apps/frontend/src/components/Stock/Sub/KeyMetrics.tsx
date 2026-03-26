'use client'

import { memo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { MdOutlineInsertChart } from 'react-icons/md'

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

    const shouldReduce = useReducedMotion()

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
        <div className="glass-card p-4 lg:p-6 text-primary space-y-6">

            <div className="flex items-center gap-3">
                <div className="p-3 glass-card text-accent">
                    <MdOutlineInsertChart size={22} />
                </div>
                <div>
                    <h2 className="font-bold text-xl text-primary">Key Metrics</h2>
                    <p className="text-sm text-secondary">Important financial metrics and ratios</p>
                </div>
            </div>

            <motion.div
                variants={staggerContainer}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4">
                {metrics.map((item) => (
                    <motion.div key={item.label} variants={fadeUp} className="space-y-1">
                        <p className="text-xs text-secondary uppercase tracking-wide">{item.label}</p>
                        <p className="text-lg font-semibold text-primary">{item.value}</p>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    )
})

KeyMetrics.displayName = 'KeyMetrics'
