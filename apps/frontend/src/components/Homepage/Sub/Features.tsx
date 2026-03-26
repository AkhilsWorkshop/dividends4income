'use client'

import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, scaleIn } from '@/animations/variants'

const features = [
    {
        title: 'Live Market Data',
        description: 'Access real-time stock prices, dividend yields, market capitalization, P/E ratios and essential financial metrics to stay ahead of market movements.',
        url: '/images/homepage/features/data'
    },
    {
        title: 'AI-Powered Insights',
        description: 'Leverage AI-driven predictions, sentiment analysis and community discussions to uncover hidden opportunities and make data-informed decisions.',
        url: '/images/homepage/features/insights'
    },
    {
        title: 'Reddit Community Hub',
        description: 'Dive into the latest Reddit threads and discussions with direct links, giving you real-time investor sentiment and trending topics.',
        url: '/images/homepage/features/reddit'
    },
    {
        title: 'Simple Table View',
        description: 'Compare dividends side-by-side in an intuitive tabular format, perfect for quick analysis and spotting the best investment opportunities.',
        url: '/images/homepage/features/table'
    },
    {
        title: 'Dividend Analytics',
        description: 'Explore dividend histories with interactive charts, tracking payment trends, growth patterns and historical performance.',
        url: '/images/homepage/features/analytics'
    },
]

export const Features = () => {

    const shouldReduce = useReducedMotion()

    return (
        <div id="features" className="max-w-7xl container mx-auto space-y-4 lg:space-y-6 py-[50px] lg:py-[100px] px-4 lg:px-6">

            <motion.div
                variants={fadeUp}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center space-y-4 pb-8">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                    Simple Features for <span className="text-accent">Smart Investing</span>
                </h2>
                <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">
                    Easily understand and analyze dividend stocks to optimize your investment strategy
                </p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {features.slice(0, 3).map((feature, index) => (
                    <motion.div key={index} variants={scaleIn} className="glass-card p-4 overflow-hidden hover:border-border/60 transition-colors duration-300">
                        <div className="overflow-hidden border border-border/40 rounded-lg">
                            <img src={`${feature.url}-dark.png`} alt={feature.title} className="w-full h-full object-cover rounded-lg aspect-square" />
                        </div>
                        <div className="p-2 pt-4">
                            <h3 className="text-base font-semibold text-primary pb-1">{feature.title}</h3>
                            <p className="text-secondary text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {features.slice(3, 5).map((feature, index) => (
                    <motion.div key={index} variants={scaleIn} className="glass-card p-4 overflow-hidden hover:border-border/60 transition-colors duration-300">
                        <div className="overflow-hidden border border-border/40 rounded-lg">
                            <img src={`${feature.url}-dark.png`} alt={feature.title} className="w-full h-full object-cover rounded-lg aspect-video" />
                        </div>
                        <div className="p-2 pt-4">
                            <h3 className="text-base font-semibold text-primary pb-1">{feature.title}</h3>
                            <p className="text-secondary text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    )
}
