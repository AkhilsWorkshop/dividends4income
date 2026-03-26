'use client'

import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, scaleIn } from '@/animations/variants'
import type { BasicStockInfo } from '@/types'
import { StockCard } from '../Reuse/StockCard'
import { StockCardSkeleton } from '@/components/Skeleton'

interface PopularStocksProps {
    stocks: BasicStockInfo[]
}

export const PopularStocks = ({ stocks }: PopularStocksProps) => {

    const shouldReduce = useReducedMotion()

    return (
        <div id="popular-stocks" className="max-w-7xl container mx-auto space-y-6 py-[50px] lg:py-[100px] px-4 lg:px-6">

            <motion.div
                variants={fadeUp}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center space-y-4 pb-6">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                    <span className="text-accent">Popular</span> Dividend Stocks
                </h2>
                <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">Top dividend-paying companies trusted by investors worldwide</p>
            </motion.div>

            {stocks.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {[...Array(6)].map((_, i) => <StockCardSkeleton key={i} />)}
                </div>
            ) : (
                <motion.div
                    variants={staggerContainer}
                    initial={shouldReduce ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                    style={{ perspective: '1000px' }}>
                    {stocks.map((stock, i) => (
                        <StockCard key={stock.symbol} stock={stock} index={i} />
                    ))}
                </motion.div>
            )}

        </div>
    )
}

export { scaleIn }
