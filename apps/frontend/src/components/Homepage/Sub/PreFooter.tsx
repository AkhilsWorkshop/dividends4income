import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/Animation/MotionTag'
import { Button } from './PreFooter/Button'

export const PreFooter = () => {

    return (
        <section className="max-w-7xl container mx-auto space-y-6 px-4 lg:px-6 py-15 lg:py-25">

            <MotionTag
                variants={fadeUp}
                className="text-center space-y-8">

                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">
                    Ready to discover dividends? <br />
                    <span className="text-accent">Let&apos;s begin.</span>
                </h2>

                <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">Completely free with no hidden costs</p>

                <Button />

            </MotionTag>

        </section>
    )
}
