'use client'

import { memo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6'

interface SentimentAnalysisProps {
    redditPrediction?: string
    keyPoints?: string[]
}

export const RedditAnalysis = memo(({ redditPrediction, keyPoints }: SentimentAnalysisProps) => {

    const shouldReduce = useReducedMotion()

    if (!redditPrediction) {
        return (
            <div className="glass-card p-6 text-center py-10 text-secondary">
                <p className="text-sm">No Reddit analysis available</p>
            </div>
        )
    }

    return (
        <div className="glass-card p-4 lg:p-6 space-y-4">

            <div>
                <p className="font-bold text-lg text-primary">Reddit</p>
                <p className="text-sm text-secondary">Community discussions and analysis</p>
            </div>

            <p className="text-sm text-secondary leading-relaxed italic">&ldquo;{redditPrediction}&rdquo;</p>

            <div className="w-full h-px bg-border/40" />

            <div className="flex items-center gap-3">
                <p className="text-sm text-primary font-medium">Overall sentiment</p>
                <SentimentBadge sentiment={redditPrediction} shouldReduce={shouldReduce ?? false} />
            </div>

            <div className="w-full h-px bg-border/40" />

            {keyPoints && keyPoints.length > 0 && (
                <>
                    <p className="text-sm font-semibold text-primary">Key Points</p>
                    <motion.ul
                        variants={staggerContainer}
                        initial={shouldReduce ? false : 'hidden'}
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-2">
                        {keyPoints.map((point, index) => (
                            <motion.li key={index} variants={fadeUp} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                <span className="text-secondary">{point}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </>
            )}

        </div>
    )
})

RedditAnalysis.displayName = 'RedditAnalysis'

const SentimentBadge = ({ sentiment, shouldReduce }: { sentiment: string; shouldReduce: boolean }) => {
    const lower = sentiment.toLowerCase()
    const pulseProps = shouldReduce ? {} : {
        animate: { opacity: [1, 0.6, 1] },
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
    }

    if (lower === 'positive') {
        return (
            <motion.span {...pulseProps} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-gain/10 text-gain border border-gain/20">
                Positive <FaThumbsUp size={12} />
            </motion.span>
        )
    }
    if (lower === 'negative') {
        return (
            <motion.span {...pulseProps} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-loss/10 text-loss border border-loss/20">
                Negative <FaThumbsDown size={12} />
            </motion.span>
        )
    }
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-surface/30 text-secondary border border-border/60">
            Neutral ~
        </span>
    )
}
