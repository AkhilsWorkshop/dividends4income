import { fadeIn } from "@/animations/variants"
import { Counter } from "@/components/Common/Reuse/Effects/Counter"
import { Highlighter } from "@/components/Common/Reuse/Effects/Highlighter"
import { MotionTag } from "@/components/Common/Reuse/MotionTag"

export const Title = () => {
    return (
        <MotionTag
            variants={fadeIn}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="text-center space-y-4">

            <div className="flex justify-center items-center gap-1 font-sans text-4xl lg:text-6xl font-black text-primary tracking-wider">
                <span>Dividends</span> <NumberCounter /> <span>Income</span>
            </div>

            <p className="text-lg lg:text-xl text-secondary font-light">
                Every dividend.{' '}
                <HightLight />{' '}
                Every day.
            </p>

        </MotionTag>
    )
}

const HightLight = () => {
    return (
        <Highlighter
            color="#ffd900"
            action="underline"
            delay={400}>Every cent.</Highlighter>
    )
}

const NumberCounter = () => {
    return (
        <Counter
            startValue={9}
            value={4}
            direction="up"
            className="text-accent" />
    )
}