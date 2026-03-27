import { fadeUp } from '@/animations/variants'
import { Highlighter } from '@/components/Common/Reuse/Effects/Highlighter'
import { MotionDiv } from '@/components/Common/Reuse/MotionDiv'

export const Heading = () => {
    return (
        <MotionDiv
            variants={fadeUp}
            className="text-center space-y-3 mb-10">

            <div className="text-2xl lg:text-5xl font-semibold text-balance">
                <HightLight /> Dividend Stocks
            </div>

            <p className="text-secondary text-sm md:text-lg">Top dividend-paying companies trusted by investors worldwide</p>

        </MotionDiv>
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


