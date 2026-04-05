import Link from 'next/link'
import Image from 'next/image'
import type { BasicStockInfo } from '@/types'
import { fadeUp } from '@/animations/variants'
import { cn } from '@/utils'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface StockCardProps {
    stock: BasicStockInfo
    index?: number
}

export const StockCard = (({ stock, index }: StockCardProps) => {

    const isGain = stock.change.startsWith('+')

    const useFlip = typeof index === 'number'

    return (
        <MotionTag
            variants={fadeUp}
            style={{ willChange: 'transform', perspective: useFlip ? '800px' : undefined }}>

            <Link
                href={`/stock/${stock.symbol}`}
                className={cn("bg-layer p-6 rounded-xl space-y-5 text-primary block border border-border transition-all duration-200",
                    isGain ? 'hover:border-gain/20' : 'hover:border-loss/20'
                )}>

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

        </MotionTag>
    )
})
