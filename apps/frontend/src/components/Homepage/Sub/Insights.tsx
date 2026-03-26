import { FaQuoteLeft } from 'react-icons/fa6'

const INSIGHTS = [
    {
        quote: 'MSFT has increased its dividend for over 20 consecutive years, compounding at roughly 10% annually.',
        stat: '20+ years',
        statLabel: 'Consecutive growth',
        symbol: 'MSFT',
    },
    {
        quote: 'Johnson & Johnson is a Dividend King — 60+ years of consecutive dividend growth, an elite group of 50+ companies.',
        stat: '60+ years',
        statLabel: 'Years of growth',
        symbol: 'JNJ',
    },
    {
        quote: "The S&P 500's top 10 dividend payers account for over 35% of the index's total annual dividend yield.",
        stat: '>35%',
        statLabel: 'Of S&P 500 yield',
        symbol: 'INDEX',
    },
]

export const Insights = () => (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-[60px] lg:py-[100px]">

        <div className="space-y-3 mb-10">
            <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                Dividend <span className="text-accent">Insights</span>
            </h2>
            <p className="text-secondary text-sm lg:text-lg max-w-xl">
                Perspectives from the world of dividend investing.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {INSIGHTS.map((item, i) => (
                <div key={i} className="glass-card p-7 flex flex-col gap-6 hover:border-accent/30 transition-colors duration-300">

                    <FaQuoteLeft size={28} className="text-accent/60 flex-shrink-0" />

                    <p className="text-primary/90 text-sm lg:text-base leading-relaxed flex-1">
                        {item.quote}
                    </p>

                    <div className="pt-4 border-t border-border/40 flex items-end justify-between">
                        <div>
                            <p className="font-playfair text-2xl font-bold text-accent">{item.stat}</p>
                            <p className="text-xs text-secondary mt-0.5">{item.statLabel}</p>
                        </div>
                        <span className="text-xs font-bold text-secondary/50 bg-surface/30 px-2.5 py-1 rounded-full border border-border/30">
                            {item.symbol}
                        </span>
                    </div>

                </div>
            ))}
        </div>

    </section>
)
