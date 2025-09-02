import { useState } from 'preact/hooks'
import { FaAngleDown } from 'react-icons/fa'

interface FAQItem {
    question: string
    answer: string
}

export const FAQ = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs: FAQItem[] = [
        {
            question: "How do I search for dividend stocks?",
            answer: "Simply type a stock ticker (like AAPL) or company name in the search bar. Our platform will show you real-time suggestions and detailed dividend information including yield, history and analytics."
        },
        {
            question: "What makes this different from other investing platforms?",
            answer: "Unlike complex trading platforms, we focus on dividend investing with simplified analytics, AI-powered insights and community discussions - all without overwhelming charts or jargon."
        },
        {
            question: "Is the dividend data accurate and up-to-date?",
            answer: "Yes! We provide real-time data from Yahoo Finance with price updates, dividend history spanning 10+ years and comprehensive financial metrics for informed decision-making."
        },
        {
            question: "How does the AI analysis work?",
            answer: "Our AI analyzes Reddit discussions, market trends and historical data to provide sentiment analysis, predictions and key insights - making complex analysis simple and actionable."
        },
        {
            question: "Do I need to pay for advanced features?",
            answer: "No! Everything is completely free. Access all dividend analytics, AI insights, community discussions and real-time data without any subscription or payment required."
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div id="faq" className="bg-layer/50 overflow-hidden relative border-y border-border/50">

            <div className="absolute inset-0 opacity-5">

                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, var(--color-secondary) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, var(--color-secondary) 2px, transparent 2px)
                    `,
                    backgroundSize: '40px 40px'
                }} />

            </div>

            <div className="max-w-7xl container mx-auto space-y-10 py-[50px] lg:py-[100px] px-3 lg:px-6">

                <div className="text-center space-y-10 text-primary">

                    <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                        Frequently Asked <span className="text-secondary">Questions</span>
                    </h2>

                    <p className="text-sm md:text-lg lg:text-xl text-secondary text-pretty max-w-2xl mx-auto">
                        Everything you need to know about dividend investing with our platform
                    </p>

                </div>

                <div className="space-y-3 max-w-3xl mx-auto">

                    {faqs.map((faq, index) =>

                        <div key={index} className="bg-layer/80 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative z-10">

                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-layer/90 transition-all duration-200 group cursor-pointer">

                                <span className="font-semibold text-primary pr-4 group-hover:text-secondary transition-colors duration-200">{faq.question}</span>

                                <div className="flex-shrink-0">

                                    <span className={`transform transition-all duration-300 group-hover:scale-110 text-secondary ${openIndex === index ? 'rotate-180' : ''}`}>
                                        <FaAngleDown size={20} />
                                    </span>

                                </div>

                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

                                <div className="px-6 pb-5 pt-2">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"></div>
                                    <p className="text-secondary leading-relaxed text-sm md:text-base">{faq.answer}</p>
                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}
