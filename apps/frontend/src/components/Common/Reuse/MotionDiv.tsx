"use client"

import { LazyMotion } from "motion/react"
import * as motion from "motion/react-m"

const loadFeatures = () => import("../../../utils/features").then(res => res.default)

type MotionDivProps = React.ComponentProps<typeof motion.div>

const MotionDiv = ({ children, className, ...rest }: MotionDivProps) => {
    return (
        <LazyMotion features={loadFeatures}>
            <motion.div className={className} {...rest}>{children}</motion.div>
        </LazyMotion>
    )
}

export default MotionDiv