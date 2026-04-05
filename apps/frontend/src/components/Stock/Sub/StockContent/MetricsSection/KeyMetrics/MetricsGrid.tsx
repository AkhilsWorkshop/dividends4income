import { staggerContainer } from '@/animations/variants'
import { MetricItem } from './Reuse/MetricItem'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface Metric {
    label: string
    value: string
}

interface MetricsGridProps {
    metrics: Metric[]
}

export const MetricsGrid = ({ metrics }: MetricsGridProps) => {
    return (
        <MotionTag
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4">

            {metrics.map((item) => (
                <MetricItem key={item.label} label={item.label} value={item.value} />
            ))}

        </MotionTag>
    )
}