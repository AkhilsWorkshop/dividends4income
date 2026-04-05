import { fadeUp } from "@/animations/variants"
import { MotionTag } from "@/components/Common/Reuse/Animation/MotionTag"
import { GrAnalytics } from "react-icons/gr"

type HeadProps = {
    ticker: string
}

export const Head = ({ ticker }: HeadProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            className="flex items-center gap-3">

            <div className="p-3 rounded-xl block border border-border text-accent">
                <GrAnalytics size={20} />
            </div>

            <div>

                <h2 className="font-bold text-xl text-primary">
                    Analysis
                </h2>

                <p className="text-sm text-secondary">
                    Reddit analysis and discussions for {ticker.toUpperCase()}
                </p>

            </div>

        </MotionTag>
    )
}

