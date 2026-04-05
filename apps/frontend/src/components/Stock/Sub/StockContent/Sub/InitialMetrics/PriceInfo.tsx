import { cn } from '@/utils'

interface PriceInfoProps {
    change: string
}

export const PriceInfo = ({ change }: PriceInfoProps) => {

    const isGain = change?.startsWith('+')

    return (
        <span className={cn(
            'text-sm font-semibold px-2.5 py-1 rounded-lg',
            isGain
                ? 'bg-gain/10 text-gain border border-gain/20'
                : 'bg-loss/10 text-loss border border-loss/20'
        )}>
            {change}
        </span>
    )
}