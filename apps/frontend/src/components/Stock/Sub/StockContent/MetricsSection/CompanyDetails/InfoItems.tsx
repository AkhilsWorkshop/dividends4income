import { staggerContainer, fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface InfoItem {
    label: string
    value: string
}

interface InfoItemsProps {
    items: InfoItem[]
}

export const InfoItems = ({ items }: InfoItemsProps) => {
    return (
        <MotionTag
            variants={staggerContainer}>

            {items.map((item, index) => (
                <InfoItem
                    key={index}
                    label={item.label}
                    value={item.value} />
            ))}

        </MotionTag>
    )
}

const InfoItem = ({ label, value }: InfoItem) => {
    return (
        <MotionTag
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="flex justify-between items-center py-2.5 border-b border-border/40 last:border-b-0">

            <span className="text-sm text-secondary">{label}</span>
            <span className="text-sm font-semibold text-primary">{value}</span>

        </MotionTag>
    )
}