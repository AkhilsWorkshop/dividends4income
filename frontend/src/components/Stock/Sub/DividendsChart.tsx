import { useState, useEffect, useRef, useMemo } from 'preact/hooks'
import { cn } from '@/utils'
import { themeStore } from '@/stores/theme'

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface StockChartProps {
    dividends?: DividendData[]
    loading?: boolean
}

type TimePeriod = '5years' | '10years' | 'all'

export const DividendsChart = ({ dividends = [], loading }: StockChartProps) => {

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
            .filter(dividend => {
                const dividendDate = parseDate(dividend.date)
                return dividendDate >= cutoffDate
            })
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
            // height: "100%",
            // width: "100%",
            type: "area" as const,
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            background: 'transparent',
            offsetX: 0,
            offsetY: 0,
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
            y: {
                formatter: (value: number) => `$${value.toFixed(2)}`,
            },
            theme: themeStore.value.isDark ? 'dark' : 'light',
        },
        fill: {
            type: "gradient" as const,
            gradient: {
                opacityFrom: 0.70,
                opacityTo: 0,
                shade: themeStore.value.isDark ? "#65675c" : "#74774b",
                gradientToColors: themeStore.value.isDark ? "#65675c" : "#74774b",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 4,
            colors: themeStore.value.isDark ? ["#65675c"] : ["#74774b"],
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
        },
        series: [
            {
                name: "Dividend Amount",
                data: filteredData.map(d => d.amount),
                color: themeStore.value.isDark ? "#65675c" : "#74774b",
            },
        ],
        xaxis: {
            categories: filteredData.map(d => d.formattedDate),
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }), [filteredData])

    useEffect(() => {

        if (!chartRef.current || !filteredData.length) return

        import('apexcharts').then((ApexCharts) => {

            if (apexChartRef.current) {
                apexChartRef.current.destroy()
            }

            apexChartRef.current = new ApexCharts.default(chartRef.current, chartOptions)
            apexChartRef.current.render()
        })

        return () => {
            if (apexChartRef.current) {
                apexChartRef.current.destroy()
            }
        }

    }, [chartOptions, filteredData])

    const trendData = useMemo(() => {

        if (!dividends.length) {
            return {
                changePercent: 0,
                changeAmount: 0,
                trend: 'flat' as const,
                period: 'this month'
            }
        }

        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

        const monthlyTotals: { [key: string]: number } = {}

        dividends.forEach(dividend => {
            const date = parseDate(dividend.date)
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`
            monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + dividend.amount
        })

        const currentMonthKey = `${currentYear}-${currentMonth}`
        const prevMonthKey = `${prevYear}-${prevMonth}`

        const currentTotal = monthlyTotals[currentMonthKey] || 0
        const prevTotal = monthlyTotals[prevMonthKey] || 0

        let changePercent = 0
        let changeAmount = currentTotal - prevTotal

        if (prevTotal > 0) {
            changePercent = ((currentTotal - prevTotal) / prevTotal) * 100
        }

        let trend: 'up' | 'down' | 'flat' = 'flat'

        if (changeAmount > 0.01) trend = 'up'
        else if (changeAmount < -0.01) trend = 'down'

        return {
            changePercent: Math.abs(changePercent),
            changeAmount: Math.abs(changeAmount),
            trend,
            period: 'this month',
            hasPreviousData: prevTotal > 0
        }

    }, [dividends])

    return (
        <div className='w-full h-full col-span-5 lg:col-span-3 bg-layer rounded-xl border border-border shadow-sm space-y-6 text-primary'>

            {loading ?

                <div className="flex justify-between items-start p-6 min-h-[400px]">

                    <div className="flex flex-col gap-2">

                        <div className="bg-surface/50 h-6 lg:h-10 w-16 lg:w-32 animate-pulse rounded-sm" />

                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-1">

                            <div className="bg-surface/75 h-4 lg:h-6 w-18 animate-pulse rounded-sm" />

                            <div className="bg-surface/50 h-5 lg:h-6 w-24 lg:w-32 animate-pulse rounded-sm" />

                        </div>

                    </div>

                    <div className="bg-surface/75 h-8 lg:h-10 w-32 animate-pulse rounded-sm" />

                </div>

                :

                <>

                    <div className="flex justify-between items-center p-6">

                        <div className="flex flex-col items-start justify-center gap-2">

                            <h1 className="font-bold text-xl lg:text-3xl">Trend</h1>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-1">

                                {trendData.trend === 'up' &&
                                    <p className="text-sm font-bold">
                                        +${trendData.changeAmount.toFixed(2)} <span className="text-secondary font-normal">{trendData.period}</span>
                                    </p>
                                }

                                {trendData.trend === 'down' &&
                                    <p className="text-sm font-bold">
                                        -${trendData.changeAmount.toFixed(2)} <span className="text-secondary font-normal">{trendData.period}</span>
                                    </p>
                                }

                                {trendData.trend === 'flat' &&
                                    <p className="text-sm font-bold">
                                        {trendData.hasPreviousData ? 'No change' : 'No data'} <span className="text-secondary font-normal">{trendData.period}</span>
                                    </p>
                                }

                            </div>

                        </div>

                        <div className="flex space-x-1 p-1 rounded-lg">

                            {tabButton('all', selectedPeriod, setSelectedPeriod)}
                            {tabButton('10years', selectedPeriod, setSelectedPeriod)}
                            {tabButton('5years', selectedPeriod, setSelectedPeriod)}

                        </div>

                    </div>

                    <div ref={chartRef} className="h-fit w-full px-6" />

                </>

            }

        </div>
    )
}

const parseDate = (dateString: string): Date => {
    const [month, day, year] = dateString.split('/').map(Number)
    return new Date(year, month - 1, day)
}

const formatDate = (dateString: string): string => {
    const date = parseDate(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    })
}

const tabButton = (
    period: TimePeriod,
    selectedPeriod: TimePeriod,
    setSelectedPeriod: (period: TimePeriod) => void
) => {
    return (
        <button
            onClick={() => setSelectedPeriod(period)}
            className={cn(
                "px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors relative z-10 cursor-pointer",
                selectedPeriod === period
                    ? "bg-primary text-background shadow-sm"
                    : "text-primary hover:text-background hover:bg-primary/80"
            )}>
            {period === 'all' && 'All'}
            {period === '10years' && '10Y'}
            {period === '5years' && '5Y'}
        </button>
    )
}
