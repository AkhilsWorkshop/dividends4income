'use client'

import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { LuMoveRight } from 'react-icons/lu'
import { MdSearch, MdVisibility, MdAnalytics, MdLightbulb } from 'react-icons/md'

export const HowItWorks = () => {

    const shouldReduce = useReducedMotion()

    const steps = [
        { icon: <MdSearch />, title: 'Search & Discover', description: 'Find stocks using our search bar or browse popular options' },
        { icon: <MdVisibility />, title: 'Analyze Details', description: 'View comprehensive stock information, history and key metrics' },
        { icon: <MdAnalytics />, title: 'Review Insights', description: 'Examine Reddit community discussions and AI-powered market analysis' },
        { icon: <MdLightbulb />, title: 'Make Decisions', description: 'Use the data and insights to make informed investment decisions' }
    ]

    return (
        <div id="how-it-works" className="relative border-y border-border/40 overflow-hidden">

            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            <div className="max-w-7xl container mx-auto space-y-12 py-[50px] lg:py-[100px] px-6 lg:px-10 relative z-10">

                <motion.div
                    variants={fadeUp}
                    initial={shouldReduce ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center space-y-4">
                    <h2 className="text-2xl lg:text-5xl font-semibold">
                        How It <span className="text-accent">Works</span>
                    </h2>
                    <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">
                        Simple steps to analyze dividend stocks and optimize your investment strategy
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial={shouldReduce ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-6">
                    {steps.map((step, index) => (
                        <motion.div key={index} variants={fadeUp} className="relative text-center space-y-5">

                            <div className="mx-auto w-16 h-16 glass-card flex items-center justify-center text-secondary font-bold text-xl">
                                0{index + 1}
                            </div>

                            {index < 3 && (
                                <span className="absolute -bottom-[50%] md:bottom-0 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 rotate-90 md:rotate-0 md:top-4 md:-right-8 text-2xl text-secondary/30">
                                    <LuMoveRight />
                                </span>
                            )}

                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-primary inline-flex justify-center items-center gap-1.5">
                                    <span className="text-2xl text-accent">{step.icon}</span>
                                    {step.title}
                                </h3>
                                <p className="text-secondary text-sm leading-relaxed">{step.description}</p>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    )
}
