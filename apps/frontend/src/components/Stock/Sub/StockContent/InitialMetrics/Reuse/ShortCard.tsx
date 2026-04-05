import { memo } from 'react'
import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'
import { cn } from '@/utils'

interface ShortCardProps {
    heading: string
    value: string | number
    accent?: boolean
    valueChildren?: React.ReactNode
}

export const ShortCard = memo(({ heading, value, accent, valueChildren }: ShortCardProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            className="p-5 space-y-2 text-primary bg-layer/20 rounded-xl border border-border flex flex-col items-start">

            <p className="text-xs text-secondary font-medium uppercase tracking-wide">{heading}</p>
            <p className={cn('text-2xl lg:text-3xl font-semibold',
                accent ? 'text-accent' : 'text-primary',
                valueChildren ? 'flex items-center justify-center gap-2' : ''
            )}>{value}{valueChildren && <span>{valueChildren}</span>}</p>

        </MotionTag>
    )
})

ShortCard.displayName = 'ShortCard'