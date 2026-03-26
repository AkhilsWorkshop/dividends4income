'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { FaAngleDown } from 'react-icons/fa'

interface FAQItem {
    question: string
    answer: string
}

export const FAQ = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const shouldReduce = useReducedMotion()

    const faqs: FAQItem[] = [
        {
            question: 'How do I search for dividend stocks?',
            answer: 'Simply type a stock ticker (like AAPL) or company name in the search bar. Our platform will show you real-time suggestions and detailed dividend information including yield, history and analytics.'
        },
        {
            question: 'What makes this different from other investing platforms?',
            answer: 'Unlike complex trading platforms, we focus on dividend investing with simplified analytics, AI-powered insights and community discussions - all without overwhelming charts or jargon.'
        },
        {
            question: 'Is the dividend data accurate and up-to-date?',
            answer: 'Yes! We provide real-time data from Yahoo Finance with price updates, dividend history spanning 10+ years and comprehensive financial metrics for informed decision-making.'
        },
        {
            question: 'How does the AI analysis work?',
            answer: 'Our AI analyzes Reddit discussions, market trends and historical data to provide sentiment analysis, predictions and key insights - making complex analysis simple and actionable.'
        },
        {
            question: 'Do I need to pay for advanced features?',
            answer: 'No! Everything is completely free. Access all dividend analytics, AI insights, community discussions and real-time data without any subscription or payment required.'
        }
    ]

    return (
        <div id="faq" className="relative border-y border-border/40 overflow-hidden">

            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            <div className="max-w-7xl container mx-auto space-y-10 py-[50px] lg:py-[100px] px-4 lg:px-6 relative z-10">

                <motion.div
                    variants={fadeUp}
                    initial={shouldReduce ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center space-y-4">
                    <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                        Frequently Asked <span className="text-accent">Questions</span>
                    </h2>
                    <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">
                        Everything you need to know about dividend investing with our platform
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial={shouldReduce ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="space-y-3 max-w-3xl mx-auto">

                    {faqs.map((faq, index) => (
                        <motion.div key={index} variants={fadeUp} className="glass-card overflow-hidden">

                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-surface/10 transition-colors duration-200 group cursor-pointer">
                                <span className="font-medium text-primary pr-4 group-hover:text-accent transition-colors duration-200 text-sm">
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 text-secondary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <FaAngleDown size={15} />
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={shouldReduce ? false : { height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}>
                                        <div className="px-6 pb-5 pt-1">
                                            <div className="w-full h-px bg-border/40 mb-4" />
                                            <p className="text-secondary leading-relaxed text-sm">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    ))}

                </motion.div>

            </div>
        </div>
    )
}
