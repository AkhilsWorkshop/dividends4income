import { memo } from 'react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { FaThumbsUp } from 'react-icons/fa6'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface PredictionsProps {
    aiPrediction?: string
    keyPoints?: string[]
}

export const Predictions = memo(({ aiPrediction, keyPoints }: PredictionsProps) => {

    if (!aiPrediction) {
        return (
            <div className="glass-card p-6 text-center py-10 text-secondary">
                <p className="text-sm">No AI analysis available</p>
            </div>
        )
    }

    return (
        <div className="glass-card p-4 lg:p-6 space-y-4">

            <div>
                <p className="font-bold text-lg text-primary">Our Prediction</p>
                <p className="text-sm text-secondary">AI-powered insights and analysis</p>
            </div>

            <p className="text-sm text-secondary leading-relaxed italic">&ldquo;{aiPrediction}&rdquo;</p>

            <div className="w-full h-px bg-border/40" />

            <div className="flex items-center gap-3">

                <p className="text-sm text-primary font-medium">Overall sentiment</p>

                <MotionTag
                    tag='span'
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-gain/10 text-gain border border-gain/20">
                    Positive <FaThumbsUp size={12} />
                </MotionTag>

            </div>

            <div className="w-full h-px bg-border/40" />

            {keyPoints && keyPoints.length > 0 && (

                <>

                    <p className="text-sm font-semibold text-primary">Key Points</p>

                    <MotionTag
                        tag='ul'
                        variants={staggerContainer}
                        className="space-y-2">

                        {keyPoints.map((point, index) => (
                            <KeyPoint key={index} point={point} />
                        ))}

                    </MotionTag>

                </>

            )}

        </div>
    )
})

Predictions.displayName = 'Predictions'

const KeyPoint = ({ point }: { point: string }) => {
    return (
        <MotionTag
            tag='li'
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="flex items-start gap-2 text-sm">

            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
            <span className="text-secondary">{point}</span>

        </MotionTag>
    )
}
