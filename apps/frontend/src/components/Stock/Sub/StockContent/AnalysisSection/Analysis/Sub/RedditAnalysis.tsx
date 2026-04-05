import { memo } from 'react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'
import { ErrorBox } from '@/components/Common/Reuse/MessageBox/ErrorBox'
import { SentimentBadge } from '../Reuse/SentimentBadge'

interface SentimentAnalysisProps {
    redditPrediction?: string
    keyPoints?: string[]
}

export const RedditAnalysis = memo(({ redditPrediction, keyPoints }: SentimentAnalysisProps) => {

    if (!redditPrediction) {
        return <ErrorBox message='No Reddit analysis available for this stock. Please check back later!' />
    }

    return (
        <MotionTag
            variants={fadeUp}
            className="p-4 lg:p-6 space-y-4 bg-layer/20 rounded-xl block border border-border">

            <div className='flex justify-between items-center gap-4'>

                <div>
                    <p className="font-bold text-lg text-primary">Reddit</p>
                    <p className="text-sm text-secondary">Community discussions and analysis</p>
                </div>

                <SentimentBadge sentiment={redditPrediction} />

            </div>

            <div className="w-full h-px bg-border/40" />

            <p className="text-sm text-secondary leading-relaxed italic">&ldquo;{redditPrediction}&rdquo;</p>

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

        </MotionTag>
    )
})

RedditAnalysis.displayName = 'RedditAnalysis'

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
