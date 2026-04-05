"use client"

import { fadeUp, staggerContainer } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'

type FAQItem = {
    question: string
    answer: string
}

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

export const Questions = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <MotionTag
            variants={staggerContainer}
            className="space-y-3 max-w-3xl mx-auto">

            {faqs.map((faq, index) => (
                <QuestionItem
                    key={index}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                />

            ))}

        </MotionTag>
    )
}

type EachQuestionProps = FAQItem & {
    index: number
    openIndex: number | null
    setOpenIndex: (index: number | null) => void
}

const QuestionItem = ({ question, answer, index, openIndex, setOpenIndex }: EachQuestionProps) => {

    return (
        <MotionTag key={index} variants={fadeUp} className="bg-background rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-colors duration-200">

            <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between group cursor-pointer">

                <span className="font-medium text-primary pr-4 group-hover:text-accent transition-colors duration-200 text-sm">
                    {question}
                </span>

                <span className={`shrink-0 text-secondary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <FaAngleDown size={15} />
                </span>

            </button>

            <AnimatePresence initial={false}>

                {openIndex === index && (

                    <MotionTag
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                        useDefaultInView={false}
                        includeLazyMotion={false}>

                        <div className="px-6 pb-5">
                            <div className="w-full h-px bg-border/40 mb-4" />
                            <p className="text-secondary leading-relaxed text-sm">{answer}</p>
                        </div>

                    </MotionTag>

                )}

            </AnimatePresence>

        </MotionTag>
    )
}

