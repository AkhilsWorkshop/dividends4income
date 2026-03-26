'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'

const UPCOMING = [
    { symbol: 'AAPL', company: 'Apple Inc.', amount: '$0.25', date: 'Mar 14', days: 3 },
    { symbol: 'MSFT', company: 'Microsoft', amount: '$0.75', date: 'Mar 19', days: 8 },
    { symbol: 'JNJ', company: 'Johnson & Johnson', amount: '$1.19', date: 'Mar 22', days: 11 },
    { symbol: 'KO', company: 'Coca-Cola', amount: '$0.48', date: 'Mar 28', days: 17 },
    { symbol: 'PG', company: 'Procter & Gamble', amount: '$0.94', date: 'Apr 2', days: 22 },
    { symbol: 'MCD', company: "McDonald's", amount: '$1.67', date: 'Apr 5', days: 25 },
    { symbol: 'PEP', company: 'PepsiCo', amount: '$1.36', date: 'Apr 9', days: 29 },
    { symbol: 'T', company: 'AT&T', amount: '$0.27', date: 'Apr 12', days: 32 },
    { symbol: 'VZ', company: 'Verizon', amount: '$0.67', date: 'Apr 18', days: 38 },
    { symbol: 'ABBV', company: 'AbbVie', amount: '$1.55', date: 'Apr 24', days: 44 },
]

const SPARKLINE = [42, 58, 51, 74, 68, 89, 82, 107, 97, 118, 103, 134]

const Sparkline = () => {
    const max = Math.max(...SPARKLINE)
    const min = Math.min(...SPARKLINE)
    const range = max - min || 1
    const W = 200, H = 48
    const points = SPARKLINE.map((v, i) =>
        `${(i / (SPARKLINE.length - 1)) * W},${H - ((v - min) / range) * (H - 8)}`
    ).join(' ')

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-12" preserveAspectRatio="none">
            <defs>
                <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                </linearGradient>
            </defs>
            <polyline
                points={points}
                fill="none"
                stroke="#F5A623"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    )
}

const DemoBadge = () => (
    <span className="text-[9px] font-semibold uppercase tracking-widest text-secondary/60 bg-surface/40 px-2 py-0.5 rounded-full border border-border/30">
        Demo
    </span>
)

export const UpcomingFeed = () => {
    const ref = useRef<HTMLDivElement>(null)
    const shouldReduce = useReducedMotion()
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-[60px] lg:py-[100px]">
            <motion.div
                variants={fadeUp}
                initial={shouldReduce ? false : 'hidden'}
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-3 mb-10">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                    Upcoming <span className="text-accent">Dividends</span>
                </h2>
                <p className="text-secondary text-sm lg:text-lg">Your next 10 payments, scheduled and ready.</p>
            </motion.div>

            <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                <motion.div
                    variants={staggerContainer}
                    initial={shouldReduce ? false : 'hidden'}
                    animate={inView ? 'visible' : 'hidden'}
                    className="lg:col-span-2 space-y-2">
                    {UPCOMING.map((item) => (
                        <motion.div
                            key={item.symbol}
                            variants={fadeUp}
                            className="flex items-center gap-4 glass-card px-5 py-3.5 hover:border-accent/30 transition-colors duration-200">

                            <div className="flex flex-col items-center gap-1 min-w-[2px]">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-primary text-sm">{item.symbol}</span>
                                    <span className="text-xs text-secondary truncate">{item.company}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-secondary">{item.date}</span>
                                <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full border border-accent/20">
                                    {item.days}d
                                </span>
                                <span className="font-bold text-gain text-sm min-w-[48px] text-right">{item.amount}</span>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial={shouldReduce ? false : 'hidden'}
                    animate={inView ? 'visible' : 'hidden'}
                    className="glass-card p-7 flex flex-col justify-between gap-6">

                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-xs text-secondary uppercase tracking-widest mb-1">This Month Income</p>
                            <p className="font-playfair text-4xl font-bold text-accent">$847</p>
                            <p className="text-xs text-secondary mt-1">Across 4 payments</p>
                        </div>
                        <DemoBadge />
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-secondary uppercase tracking-wider">12-Month Income</p>
                        <Sparkline />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
                        <div>
                            <p className="text-[10px] text-secondary uppercase tracking-wider">Next Payment</p>
                            <p className="font-semibold text-sm text-primary mt-0.5">Mar 14</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-secondary uppercase tracking-wider">From</p>
                            <p className="font-semibold text-sm text-primary mt-0.5">AAPL</p>
                        </div>
                    </div>

                </motion.div>

            </div>
        </section>
    )
}
