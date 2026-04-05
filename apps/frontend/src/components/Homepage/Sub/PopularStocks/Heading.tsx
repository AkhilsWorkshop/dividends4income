import { fadeUp } from '@/animations/variants'
import { Highlighter } from '@/components/Common/Reuse/Effects/Highlighter'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

export const Heading = () => {
    return (
        <MotionTag
            variants={fadeUp}
            className="text-center space-y-3 mb-10">

            <div className="text-2xl lg:text-5xl font-semibold text-balance">
                <HightLight /> Dividend Stocks
            </div>

            <p className="text-secondary text-sm md:text-lg">Top dividend-paying companies trusted by investors worldwide</p>

        </MotionTag>
    )
}

const HightLight = () => {
    return (
        <Highlighter
            color="#ffd900"
            action="box"
            isView={true}
            delay={200}>Popular</Highlighter>
    )
}


