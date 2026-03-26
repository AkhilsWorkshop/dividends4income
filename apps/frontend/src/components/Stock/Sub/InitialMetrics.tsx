'use client'

import { memo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'

type InitialMetricsProps = {
    currentPrice: string | number
    dividendYield: string | number
    dividendRate: string | number
    dividendsLength: number
}

export const InitialMetrics = ({ currentPrice, dividendYield, dividendRate, dividendsLength }: InitialMetricsProps) => {

    const shouldReduce = useReducedMotion()

    return (
        <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <ShortCard heading="Current Price" value={currentPrice} accent />
            <ShortCard heading="Dividend Yield" value={dividendYield} accent />
            <ShortCard heading="Dividend Rate" value={dividendRate} />
            <ShortCard heading="Total Dividends" value={dividendsLength} />
        </motion.div>
    )
}

type ShortCardProps = {
    heading: string
    value: string | number
    accent?: boolean
}

const ShortCard = memo(({ heading, value, accent }: ShortCardProps) => {
    return (
        <motion.div variants={fadeUp} className="glass-card p-5 space-y-2 text-primary">
            <p className="text-xs text-secondary font-medium uppercase tracking-wide">{heading}</p>
            <p className={`text-2xl lg:text-3xl font-semibold ${accent ? 'text-accent' : 'text-primary'}`}>{value}</p>
        </motion.div>
    )
})

ShortCard.displayName = 'ShortCard'
