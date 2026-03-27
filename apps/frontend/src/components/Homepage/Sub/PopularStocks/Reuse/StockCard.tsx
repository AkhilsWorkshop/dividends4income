import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import type { BasicStockInfo } from '@/types'
import { cardHover, fadeUp, flipInFromLeft, flipInFromRight } from '@/animations/variants'
import { cn } from '@/utils'
import { MotionDiv } from '@/components/Common/Reuse/MotionDiv'

interface StockCardProps {
    stock: BasicStockInfo
    index?: number
}

export const StockCard = memo(({ stock, index }: StockCardProps) => {

    const isGain = stock.change.startsWith('+')

    const useFlip = typeof index === 'number'

    const variant = useFlip
        ? (index % 2 === 0 ? flipInFromLeft : flipInFromRight)
        : fadeUp

    const ambientHover = {
        ...cardHover,
        boxShadow: isGain
            ? '0 0 0 1px rgba(0,208,156,0.25), 0 8px 32px rgba(0,208,156,0.12)'
            : '0 0 0 1px rgba(235,87,87,0.25), 0 8px 32px rgba(235,87,87,0.12)',
    }

    return (
        <MotionDiv
            variants={variant}
            whileHover={ambientHover}
            style={{ willChange: 'transform', perspective: useFlip ? '800px' : undefined }}>

            <Link
                href={`/stock/${stock.symbol}`}
                className="bg-layer p-6 rounded-xl hover:rounded-none space-y-5 text-primary block border border-border hover:border-none transition-all duration-200">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Image
                            src={stock.logo_url}
                            alt={`${stock.name} logo`}
                            width={44}
                            height={44}
                            className="rounded-sm bg-surface/20"
                        />

                        <div>

                            <h2 className="text-base font-bold text-primary leading-tight">{stock.symbol}</h2>

                            <p className="text-xs text-secondary">{stock.name}</p>

                        </div>

                    </div>

                    <span className={cn(
                        'text-xs font-semibold px-2 py-1 rounded-md shrink-0',
                        isGain
                            ? 'bg-gain/10 text-gain border border-gain/20'
                            : 'bg-loss/10 text-loss border border-loss/20'
                    )}>
                        {stock.change}
                    </span>

                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">

                    <div className="space-y-0.5">
                        <p className="text-xs text-secondary">Price</p>
                        <p className="font-semibold text-primary">{stock.price}</p>
                    </div>

                    <div className="space-y-0.5">
                        <p className="text-xs text-secondary">Dividend Rate</p>
                        <p className="font-semibold text-primary">${stock.dividend_rate}</p>
                    </div>

                    <div className="space-y-0.5">
                        <p className="text-xs text-secondary">Yield</p>
                        <p className="font-semibold text-gain text-sm">{stock.dividend_yield}</p>
                    </div>

                </div>

                <div className="pt-5 border-t border-border/40 w-full flex">
                    <span className="text-xs text-secondary/60 font-medium uppercase tracking-wide ml-auto">View Details →</span>
                </div>

            </Link>

        </MotionDiv>
    )
})

StockCard.displayName = 'StockCard'
