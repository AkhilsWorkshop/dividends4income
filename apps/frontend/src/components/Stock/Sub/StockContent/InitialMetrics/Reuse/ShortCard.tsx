import { memo } from 'react'
import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface ShortCardProps {
    heading: string
    value: string | number
    accent?: boolean
}

export const ShortCard = memo(({ heading, value, accent }: ShortCardProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="p-5 space-y-2 text-primary bg-layer/20 rounded-xl block border border-border">

            <p className="text-xs text-secondary font-medium uppercase tracking-wide">{heading}</p>
            <p className={`text-2xl lg:text-3xl font-semibold ${accent ? 'text-accent' : 'text-primary'}`}>{value}</p>

        </MotionTag>
    )
})

ShortCard.displayName = 'ShortCard'