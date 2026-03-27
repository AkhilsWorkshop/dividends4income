"use client"

import { LazyMotion, useInView } from "motion/react"
import * as motion from "motion/react-m"
import { useRef } from "react"

const loadFeatures = () => import("../../../utils/features").then(res => res.default)

type MotionDivProps = React.ComponentProps<typeof motion.div>

type Props = MotionDivProps & {
    useDefaultInView?: boolean
    includeLazyMotion?: boolean
}

export const MotionDiv = ({ children, className, useDefaultInView = true, includeLazyMotion = true, ...rest }: Props) => {

    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const { initial: restInitial, animate: restAnimate, ...otherProps } = rest as any

    const finalInitial = useDefaultInView ? 'hidden' : restInitial
    const finalAnimate = useDefaultInView ? (inView ? 'visible' : 'hidden') : restAnimate

    if (includeLazyMotion) {
        return (
            <LazyMotion features={loadFeatures}>

                <motion.div
                    ref={useDefaultInView ? ref : undefined}
                    initial={finalInitial}
                    animate={finalAnimate}
                    className={className}
                    {...otherProps}>

                    {children}

                </motion.div>

            </LazyMotion>
        )
    }

    return (
        <motion.div
            ref={useDefaultInView ? ref : undefined}
            initial={finalInitial}
            animate={finalAnimate}
            className={className}
            {...otherProps}>

            {children}

        </motion.div>
    )
}