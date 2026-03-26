'use client'

import { useMemo } from 'react'
import { cn } from '@/utils'

const PAYMENT_DAYS: Record<number, { symbol: string; amount: string; color: string }> = {
    6: { symbol: 'ABBV', amount: '$1.55', color: 'bg-accent' },
    14: { symbol: 'AAPL', amount: '$0.25', color: 'bg-accent' },
    19: { symbol: 'MSFT', amount: '$0.75', color: 'bg-accent' },
    22: { symbol: 'JNJ', amount: '$1.19', color: 'bg-loss' },
    28: { symbol: 'KO', amount: '$0.48', color: 'bg-accent' },
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const DividendCalendar = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const today = now.getDate()
    const monthName = now.toLocaleString('default', { month: 'long' })

    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1)
        // Monday-based: getDay() is 0=Sun, need Mon=0
        const startOffset = (firstDay.getDay() + 6) % 7
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const cells: (number | null)[] = []
        for (let i = 0; i < startOffset; i++) cells.push(null)
        for (let d = 1; d <= daysInMonth; d++) cells.push(d)
        // Pad to full weeks
        while (cells.length % 7 !== 0) cells.push(null)
        return cells
    }, [year, month])

    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-[60px] lg:py-[100px]">

            <div className="space-y-3 mb-10">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                    Dividend <span className="text-accent">Calendar</span>
                </h2>
                <p className="text-secondary text-sm lg:text-lg">
                    See which days bring income.
                    <span className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-secondary/60 bg-surface/40 px-2 py-0.5 rounded-full border border-border/30">Demo</span>
                </p>
            </div>

            <div className="glass-card p-6 lg:p-8">

                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-playfair text-xl font-bold text-primary">{monthName} {year}</h3>
                    <div className="flex items-center gap-4 text-xs text-secondary">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            Payment day
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS_OF_WEEK.map(d => (
                        <div key={d} className="text-center text-xs text-secondary/60 font-medium uppercase tracking-wider py-1">
                            {d}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => {
                        if (!day) return <div key={`empty-${i}`} />
                        const payment = PAYMENT_DAYS[day]
                        const isToday = day === today
                        return (
                            <div
                                key={`day-${day}`}
                                className={cn(
                                    'relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors duration-150 group',
                                    isToday
                                        ? 'bg-accent/20 border border-accent/40 font-bold text-accent'
                                        : payment
                                            ? 'hover:bg-surface/40 cursor-default'
                                            : 'hover:bg-surface/20 text-secondary/70'
                                )}>
                                <span className={cn(
                                    'text-xs lg:text-sm',
                                    isToday ? 'text-accent font-bold' : payment ? 'text-primary font-semibold' : 'text-secondary/70'
                                )}>
                                    {day}
                                </span>

                                {payment && (
                                    <>
                                        <span className={cn('w-1.5 h-1.5 rounded-full mt-0.5', payment.color)} />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface border border-border rounded-lg px-3 py-2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10 shadow-xl">
                                            <span className="font-bold text-accent">{payment.symbol}</span>
                                            <span className="text-secondary ml-1">{payment.amount}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>

            </div>

        </section>
    )
}
