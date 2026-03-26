'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, scaleIn } from '@/animations/variants'
import { FaArrowLeft } from 'react-icons/fa6'
import { cn } from '@/utils'

interface HeadProps {
    stock: {
        logo_url: string
        symbol: string
        name: string
        price: string
        change: string
    }
}

export const Head = ({ stock }: HeadProps) => {

    const shouldReduce = useReducedMotion()
    const isGain = stock.change?.startsWith('+')

    return (
        <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? false : 'hidden'}
            animate="visible"
            className="flex flex-wrap items-center gap-4 py-2">

            <motion.div variants={scaleIn}>
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-secondary hover:text-primary glass-card py-2 px-3 rounded-lg transition-colors duration-200">
                    <FaArrowLeft size={12} />
                    Back
                </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
                <img src={stock.logo_url} alt={`${stock.name} logo`} className="w-11 h-11 rounded-xl" />
                <div>
                    <h1 className="text-xl font-bold text-primary">{stock.symbol}</h1>
                    <p className="text-sm text-secondary">{stock.name}</p>
                </div>
            </motion.div>

            <motion.div variants={fadeUp} className="ml-auto flex items-center gap-3">
                <p className="text-2xl font-bold text-primary">{stock.price}</p>
                <span className={cn(
                    'text-sm font-semibold px-2.5 py-1 rounded-lg',
                    isGain
                        ? 'bg-gain/10 text-gain border border-gain/20'
                        : 'bg-loss/10 text-loss border border-loss/20'
                )}>
                    {stock.change}
                </span>
            </motion.div>

        </motion.div>
    )
}
