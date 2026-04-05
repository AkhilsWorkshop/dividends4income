import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/Animation/MotionTag'
import { UpcomingDividend } from '@/types'
import Link from 'next/link'

type TableValueProps = {
    dividend: UpcomingDividend
}

export const TableValue = ({ dividend }: TableValueProps) => {
    return (
        <MotionTag
            key={dividend.symbol}
            variants={fadeUp}
            includeLazyMotion={false}>

            <Link
                href={`/stock/${dividend.symbol}`}
                className="flex items-center gap-4 bg-layer p-6 rounded-xl border border-border px-5 py-3.5 hover:border-accent/30 transition-colors duration-200">

                <div className="flex flex-col items-center gap-1 min-w-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-primary text-sm">{dividend.symbol}</span>
                        <span className="text-xs text-secondary truncate">{dividend.company}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">

                    <span className="text-xs text-secondary">{dividend.ex_date}</span>

                    <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-md border border-accent/20">
                        In {dividend.days_until} days
                    </span>

                    <span className="font-bold text-gain text-sm min-w-12 text-right">
                        ${dividend.amount.toFixed(2)}
                    </span>

                </div>

            </Link>

        </MotionTag>
    )
}
