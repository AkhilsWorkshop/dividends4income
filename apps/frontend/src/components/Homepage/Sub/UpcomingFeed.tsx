'use client'

import { useRef, useEffect, useMemo } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import type { UpcomingDividend } from '@/types'

interface UpcomingFeedProps {
    dividends: UpcomingDividend[]
}

const CHART_COLOR = '#F5A623'

export const UpcomingFeed = ({ dividends }: UpcomingFeedProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const chartRef = useRef<HTMLDivElement>(null)
    const apexChartRef = useRef<any>(null)
    const shouldReduce = useReducedMotion()
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const chartOptions = useMemo(() => ({
        chart: {
            type: 'bar' as const,
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: !shouldReduce },
            height: 180,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '60%',
            },
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                formatter: (_: unknown, opts: { dataPointIndex: number }) =>
                    dividends[opts.dataPointIndex]?.ex_date ?? '',
            },
            y: { formatter: (value: number) => `$${value.toFixed(2)}` },
        },
        dataLabels: { enabled: false },
        colors: [CHART_COLOR],
        grid: {
            show: true,
            borderColor: 'rgba(30,42,58,0.4)',
            strokeDashArray: 4,
        },
        series: [{
            name: 'Dividend',
            data: dividends.map(d => d.amount),
        }],
        xaxis: {
            categories: dividends.map(d => d.symbol),
            labels: {
                style: { colors: Array(dividends.length).fill('#8492A6'), fontSize: '9px' },
                rotate: 0,
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: (value: number) => `$${value.toFixed(2)}`,
                style: { colors: ['#8492A6'], fontSize: '9px' },
            },
        },
        theme: { mode: 'dark' as const },
    }), [dividends, shouldReduce])

    useEffect(() => {
        if (!chartRef.current || !dividends.length) return
        const container = chartRef.current
        import('apexcharts').then((ApexCharts) => {
            if (apexChartRef.current) apexChartRef.current.destroy()
            apexChartRef.current = new ApexCharts.default(container, chartOptions)
            apexChartRef.current.render()
        })
        return () => {
            if (apexChartRef.current) apexChartRef.current.destroy()
        }
    }, [chartOptions, dividends])

    const next = dividends[0]

    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-15 lg:py-25">
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
                    {dividends.map((item) => (
                        <motion.div
                            key={item.symbol}
                            variants={fadeUp}
                            className="flex items-center gap-4 glass-card px-5 py-3.5 hover:border-accent/30 transition-colors duration-200">

                            <div className="flex flex-col items-center gap-1 min-w-0.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-primary text-sm">{item.symbol}</span>
                                    <span className="text-xs text-secondary truncate">{item.company}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-secondary">{item.ex_date}</span>
                                <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full border border-accent/20">
                                    {item.days_until}d
                                </span>
                                <span className="font-bold text-gain text-sm min-w-12 text-right">
                                    ${item.amount.toFixed(2)}
                                </span>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial={shouldReduce ? false : 'hidden'}
                    animate={inView ? 'visible' : 'hidden'}
                    className="glass-card p-5 flex flex-col justify-between gap-4">

                    <div>
                        <p className="text-xs text-secondary uppercase tracking-widest mb-3">Payment Schedule</p>
                        <div ref={chartRef} className="w-full" />
                    </div>

                    {next && (
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40">
                            <div>
                                <p className="text-[10px] text-secondary uppercase tracking-wider">Next Ex-Date</p>
                                <p className="font-semibold text-sm text-primary mt-0.5">{next.ex_date}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-secondary uppercase tracking-wider">From</p>
                                <p className="font-semibold text-sm text-primary mt-0.5">{next.symbol}</p>
                            </div>
                        </div>
                    )}

                </motion.div>

            </div>
        </section>
    )
}
