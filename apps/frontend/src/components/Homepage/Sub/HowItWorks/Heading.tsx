import { fadeUp } from '@/animations/variants'
import { Highlighter } from '@/components/Common/Reuse/Effects/Highlighter'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

export const Heading = () => {
    return (
        <MotionTag
            variants={fadeUp}
            className="text-center space-y-3 mb-10">

            <div className="text-2xl lg:text-5xl font-semibold text-balance">
                <HightLight />
            </div>

            <p className="text-secondary text-sm md:text-lg">Simple steps to analyze dividend stocks and optimize your investment strategy</p>

        </MotionTag>
    )
}

const HightLight = () => {
    return (
        <Highlighter
            color="#ffd900"
            action="circle"
            isView={true}
            delay={200}>How It Works</Highlighter>
    )
}


