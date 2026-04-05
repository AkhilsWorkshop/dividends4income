'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { fadeUp } from '@/animations/variants'
import { cn } from '@/utils'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { MotionTag } from '@/components/Common/Reuse/Animation/MotionTag'

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface StockChartProps {
    dividends?: DividendData[]
}

type TimePeriod = '5years' | '10years' | 'all'

const CHART_COLOR = '#00d09c'

export const DividendsChart = ({ dividends = [] }: StockChartProps) => {

    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('all')

    const chartRef = useRef<HTMLDivElement>(null)
    const apexChartRef = useRef<any>(null)

    const filteredData = useMemo(() => {

        if (!dividends.length) return []

        const now = new Date()
        let cutoffDate: Date

        switch (selectedPeriod) {
            case '5years':
                cutoffDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate())
                break
            case '10years':
                cutoffDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate())
                break
            case 'all':
            default:
                cutoffDate = new Date(2000, 0, 1)
                break
        }

        return dividends
            .filter(dividend => parseDate(dividend.date) >= cutoffDate)
            .map(dividend => ({
                date: dividend.date,
                amount: dividend.amount,
                changePercent: dividend.change_percent,
                formattedDate: formatDate(dividend.date),
            }))
            .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())

    }, [dividends, selectedPeriod])

    const chartOptions = useMemo(() => ({
        chart: {
            type: 'area' as const,
            fontFamily: 'Inter, sans-serif',
            dropShadow: { enabled: false },
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: true },
        },
        tooltip: {
            enabled: true,
            x: { show: false },
            y: { formatter: (value: number) => `$${value.toFixed(2)}` },
            theme: 'dark',
        },
        fill: {
            type: 'gradient' as const,
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0.02,
                shade: CHART_COLOR,
                gradientToColors: [CHART_COLOR],
            },
        },
        dataLabels: { enabled: false },
        stroke: { width: 2.5, colors: [CHART_COLOR] },
        grid: {
            show: true,
            borderColor: 'rgba(30,42,58,0.4)',
            strokeDashArray: 4,
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
        },
        series: [{
            name: 'Dividend Amount',
            data: filteredData.map(d => d.amount),
            color: CHART_COLOR,
        }],
        xaxis: {
            categories: filteredData.map(d => d.formattedDate),
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { show: false },
        theme: { mode: 'dark' as const },
    }), [filteredData])

    useEffect(() => {

        if (!chartRef.current || !filteredData.length) return

        const container = chartRef.current

        import('apexcharts').then((ApexCharts) => {
            if (apexChartRef.current) apexChartRef.current.destroy()
            apexChartRef.current = new ApexCharts.default(container, chartOptions)
            apexChartRef.current.render()
        })

        return () => {
            if (apexChartRef.current) apexChartRef.current.destroy()
        }

    }, [chartOptions, filteredData])

    const trendData = useMemo(() => {

        if (!dividends.length) return { changePercent: 0, changeAmount: 0, trend: 'flat' as const, period: 'this month', hasPreviousData: false }

        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

        const monthlyTotals: Record<string, number> = {}
        dividends.forEach(dividend => {
            const date = parseDate(dividend.date)
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`
            monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + dividend.amount
        })

        const currentTotal = monthlyTotals[`${currentYear}-${currentMonth}`] || 0
        const prevTotal = monthlyTotals[`${prevYear}-${prevMonth}`] || 0
        const changeAmount = currentTotal - prevTotal
        const changePercent = prevTotal > 0 ? ((currentTotal - prevTotal) / prevTotal) * 100 : 0
        const trend: 'up' | 'down' | 'flat' = changeAmount > 0.01 ? 'up' : changeAmount < -0.01 ? 'down' : 'flat'

        return {
            changePercent: Math.abs(changePercent),
            changeAmount: Math.abs(changeAmount),
            trend,
            period: 'this month',
            hasPreviousData: prevTotal > 0
        }

    }, [dividends])

    return (
        <MotionTag
            variants={fadeUp}
            className="w-full h-full col-span-5 lg:col-span-3 space-y-4 text-primary bg-layer/20 rounded-xl block border border-border">

            <div className="flex flex-col lg:flex-row gap-3 justify-between items-start p-4 lg:p-6">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl block border border-border text-accent">
                        <FaArrowTrendUp size={20} />
                    </div>

                    <div>

                        <h2 className="font-bold text-xl text-primary">Trend</h2>

                        <div className="flex items-center gap-1.5 text-sm">
                            {trendData.trend === 'up' && <span className="font-bold text-gain">+${trendData.changeAmount.toFixed(2)}</span>}
                            {trendData.trend === 'down' && <span className="font-bold text-loss">-${trendData.changeAmount.toFixed(2)}</span>}
                            {trendData.trend === 'flat' && <span className="text-secondary">{trendData.hasPreviousData ? 'No change' : 'No data'}</span>}
                            <span className="text-secondary">{trendData.period}</span>
                        </div>

                    </div>

                </div>

                <div className="flex gap-1 p-1 glass-card rounded-lg">
                    {tabButton('all', selectedPeriod, setSelectedPeriod)}
                    {tabButton('10years', selectedPeriod, setSelectedPeriod)}
                    {tabButton('5years', selectedPeriod, setSelectedPeriod)}
                </div>

            </div>

            <div ref={chartRef} className="h-fit w-full" />

        </MotionTag>
    )
}

const parseDate = (dateString: string): Date => {
    const [month, day, year] = dateString.split('/').map(Number)
    return new Date(year, month - 1, day)
}

const formatDate = (dateString: string): string => {
    const date = parseDate(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const tabButton = (
    period: TimePeriod,
    selectedPeriod: TimePeriod,
    setSelectedPeriod: (period: TimePeriod) => void
) => (
    <button
        key={period}
        onClick={() => setSelectedPeriod(period)}
        className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer',
            selectedPeriod === period
                ? 'bg-accent text-background shadow-sm'
                : 'text-secondary hover:text-primary'
        )}>
        {period === 'all' && 'All'}
        {period === '10years' && '10Y'}
        {period === '5years' && '5Y'}
    </button>
)
