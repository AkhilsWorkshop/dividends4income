"use client"

import { LazyMotion, useInView } from "motion/react"
import * as motion from "motion/react-m"
import { useRef } from "react"

const loadFeatures = () => import("../../../../utils/features").then(res => res.default)

type MotionTagProps = React.ComponentProps<typeof motion.div> & {
    tag?: keyof typeof motion
    useDefaultInView?: boolean
    includeLazyMotion?: boolean
}

export const MotionTag = ({
    tag = 'div',
    children,
    className,
    useDefaultInView = true,
    includeLazyMotion = true,
    ...rest
}: MotionTagProps) => {

    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const { initial: restInitial, animate: restAnimate, ...otherProps } = rest as any

    const finalInitial = useDefaultInView ? 'hidden' : restInitial
    const finalAnimate = useDefaultInView ? (inView ? 'visible' : 'hidden') : restAnimate

    const Tag = (motion as any)[tag] as React.ComponentType<any>

    if (includeLazyMotion) {
        return (
            <LazyMotion features={loadFeatures}>

                <Tag
                    ref={useDefaultInView ? ref : undefined}
                    initial={finalInitial}
                    animate={finalAnimate}
                    className={className}
                    {...otherProps}>

                    {children}

                </Tag>

            </LazyMotion>
        )
    }

    return (
        <Tag
            ref={useDefaultInView ? ref : undefined}
            initial={finalInitial}
            animate={finalAnimate}
            className={className}
            {...otherProps}>

            {children}

        </Tag>
    )
}
