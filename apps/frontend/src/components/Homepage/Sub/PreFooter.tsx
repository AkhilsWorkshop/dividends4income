'use client'

import { motion, useReducedMotion } from 'motion/react'
import { fadeUp } from '@/animations/variants'
import { MdCreditCard } from 'react-icons/md'

export const PreFooter = () => {

    const shouldReduce = useReducedMotion()

    const handleCTAClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
            if ((window as any).focusHeroSearch) {
                (window as any).focusHeroSearch()
            }
        }, 500)
    }

    return (
        <div className="max-w-7xl container mx-auto space-y-10 py-[50px] lg:py-[100px] px-4 lg:px-6">

            <motion.div
                variants={fadeUp}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center space-y-8">

                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                    Ready to discover dividends? <br />
                    <span className="text-accent">Let&apos;s begin.</span>
                </h2>

                <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">Completely free with no hidden costs</p>

                <div className="flex flex-col items-center gap-3">
                    <motion.button
                        onClick={handleCTAClick}
                        whileHover={shouldReduce ? undefined : { scale: 1.04 }}
                        whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                        style={{ willChange: 'transform' }}
                        className="bg-accent hover:brightness-110 text-background font-semibold px-10 py-3 rounded-xl text-base transition-all duration-200 cursor-pointer">
                        Explore Now
                    </motion.button>
                    <p className="text-xs text-secondary/60 inline-flex items-center gap-1.5">
                        <MdCreditCard size={14} /> No credit card required
                    </p>
                </div>

            </motion.div>

        </div>
    )
}
