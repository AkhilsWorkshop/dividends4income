import { fadeUp } from "@/animations/variants"
import { Highlighter } from "@/components/Common/Reuse/Effects/Highlighter"
import { MotionTag } from "@/components/Common/Reuse/MotionTag"
import { FaReddit } from "react-icons/fa6"

export const Heading = () => {
    return (
        <MotionTag
            variants={fadeUp}
            className="flex justify-between gap-4 mb-10">

            <div className="space-y-3">

                <div className="text-2xl lg:text-5xl font-semibold text-balance">
                    What <HightLight /> Investors are saying
                </div>

                <p className="text-secondary text-sm lg:text-lg">
                    Live discussions from investing communities - straight from Reddit.
                </p>

            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-secondary/60 uppercase tracking-widest">
                <FaReddit size={20} color="#FF4500" />
                Community
            </div>

        </MotionTag>
    )
}

const HightLight = () => {
    return (
        <div className="relative inline-block">

            <MotionTag
                initial={{ opacity: 0, scale: 0, bottom: 0 }}
                whileInView={{ opacity: 1, scale: 1, bottom: 56 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 500, damping: 20, duration: 0.6, delay: 0.5 }}
                useDefaultInView={false}
                includeLazyMotion={false}
                className="absolute left-1/2 -translate-x-1/2 bottom-14 -rotate-5 text-accent uppercase font-bold">
                Real
            </MotionTag>

            <Highlighter
                color="#ffd900"
                action="crossed-off"
                isView={true}
                delay={200}>Paid</Highlighter>

        </div>
    )
}

