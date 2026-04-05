import { fadeUp } from "@/animations/variants"
import { MotionTag } from "@/components/Common/Reuse/MotionTag"

export const Disclaimer = () => {
    return (
        <MotionTag
            variants={fadeUp}
            className="text-xs p-3 rounded-lg border border-loss/30 bg-loss/5 text-loss/80 text-center">
            <strong className="text-loss">Disclaimer:</strong> These predictions are for informational purposes only and should not be
            considered as financial advice. Always do your own research and consult with financial professionals.
        </MotionTag>
    )
}
