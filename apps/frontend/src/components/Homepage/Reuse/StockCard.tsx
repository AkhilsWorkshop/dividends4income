'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { BasicStockInfo } from '@/types'
import { cardHover, fadeUp, flipInFromLeft, flipInFromRight } from '@/animations/variants'
import { cn } from '@/utils'
import { FaCrown } from 'react-icons/fa6'

const ARISTOCRATS = new Set([
    'JNJ', 'KO', 'PG', 'MCD', 'MMM', 'EMR', 'GPC', 'CINF', 'ABT', 'CL',
    'DOV', 'PH', 'SWK', 'BDX', 'GWW', 'ITW', 'NDSN', 'SPGI', 'WMT', 'TGT',
    'TROW', 'AFL', 'ADP', 'LOW', 'CVX', 'CAT', 'NEE', 'ABBV', 'VFC', 'REYN',
])

interface StockCardProps {
    stock: BasicStockInfo
    index?: number
}

export const StockCard = memo(({ stock, index }: StockCardProps) => {
    const shouldReduce = useReducedMotion()
    const isGain = stock.change.startsWith('+')
    const isAristocrat = ARISTOCRATS.has(stock.symbol.toUpperCase())

    const yieldNum = parseFloat(stock.dividend_yield?.replace('%', '') ?? '0') || 0
    const yieldBarPct = Math.min((yieldNum / 8) * 100, 100)

    const useFlip = typeof index === 'number'
    const variant = useFlip
        ? (index % 2 === 0 ? flipInFromLeft : flipInFromRight)
        : fadeUp

    const ambientHover = shouldReduce ? undefined : {
        ...cardHover,
        boxShadow: isGain
            ? '0 0 0 1px rgba(0,208,156,0.25), 0 8px 32px rgba(0,208,156,0.12)'
            : '0 0 0 1px rgba(235,87,87,0.25), 0 8px 32px rgba(235,87,87,0.12)',
    }

    return (
        <motion.div
            variants={variant}
            whileHover={ambientHover}
            style={{ willChange: 'transform', perspective: useFlip ? '800px' : undefined }}>
            <Link
                href={`/stock/${stock.symbol}`}
                className="glass-card p-6 space-y-5 text-primary block hover:border-accent/30 transition-all duration-300">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src={stock.logo_url}
                            alt={`${stock.name} logo`}
                            width={44}
                            height={44}
                            className="rounded-lg bg-surface/20"
                        />
                        <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <h2 className="text-base font-bold text-primary leading-tight">{stock.symbol}</h2>
                                {isAristocrat && (
                                    <span className="aristocrat-badge inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-full">
                                        <FaCrown size={8} />
                                        Aristocrat
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-secondary truncate max-w-[120px]">{stock.name}</p>
                        </div>
                    </div>
                    <span className={cn(
                        'text-xs font-semibold px-2 py-1 rounded-md flex-shrink-0',
                        isGain
                            ? 'bg-gain/10 text-gain border border-gain/20'
                            : 'bg-loss/10 text-loss border border-loss/20'
                    )}>
                        {stock.change}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-0.5">
                        <p className="text-xs text-secondary">Price</p>
                        <p className="font-semibold text-primary">{stock.price}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-xs text-secondary">Dividend Rate</p>
                        <p className="font-semibold text-primary">${stock.dividend_rate}</p>
                    </div>
                    <div className="col-span-2 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-secondary">Yield</p>
                            <p className="font-semibold text-gain text-sm">{stock.dividend_yield}</p>
                        </div>
                        <div className="h-1 bg-surface/60 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gain rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${yieldBarPct}%` }}
                                transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-1 border-t border-border/40">
                    <span className="text-xs text-secondary/60 font-medium uppercase tracking-wide">View Details →</span>
                </div>

            </Link>
        </motion.div>
    )
})

StockCard.displayName = 'StockCard'
