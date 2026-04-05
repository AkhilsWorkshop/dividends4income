import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface MetricItemProps {
    label: string
    value: string
}

export const MetricItem = ({ label, value }: MetricItemProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="space-y-1">
            <p className="text-xs text-secondary uppercase tracking-wide">{label}</p>
            <p className="text-lg font-semibold text-primary">{value}</p>
        </MotionTag>
    )
}