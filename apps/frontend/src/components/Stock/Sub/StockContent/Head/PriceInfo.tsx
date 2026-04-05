import { fadeUp } from '@/animations/variants'
import { cn } from '@/utils'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface PriceInfoProps {
    price: string
    change: string
}

export const PriceInfo = ({ price, change }: PriceInfoProps) => {

    const isGain = change?.startsWith('+')

    return (
        <MotionTag
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="ml-auto flex items-center gap-3">

            <p className="text-2xl font-bold text-primary">{price}</p>

            <span className={cn(
                'text-sm font-semibold px-2.5 py-1 rounded-lg',
                isGain
                    ? 'bg-gain/10 text-gain border border-gain/20'
                    : 'bg-loss/10 text-loss border border-loss/20'
            )}>
                {change}
            </span>

        </MotionTag>
    )
}