import { fadeUp } from "@/animations/variants"
import { Highlighter } from "@/components/Common/Reuse/Effects/Highlighter"
import { MotionTag } from "@/components/Common/Reuse/Animation/MotionTag"

export const Heading = () => {
    return (
        <MotionTag
            variants={fadeUp}
            className="flex justify-between gap-4 mb-10">

            <div className="space-y-3">

                <div className="text-2xl lg:text-5xl font-semibold text-balance">
                    Upcoming <HightLight />
                </div>

                <p className="text-secondary text-sm lg:text-lg">
                    Your next 10 payments, scheduled and ready.
                </p>

            </div>

        </MotionTag>
    )
}

const HightLight = () => {
    return (
        <Highlighter
            color="#ffd900"
            action="highlight"
            isView={true}
            delay={200}><span className="text-background">Dividends</span></Highlighter>
    )
}

