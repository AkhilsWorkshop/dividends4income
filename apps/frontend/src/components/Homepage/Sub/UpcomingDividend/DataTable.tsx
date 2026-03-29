import { fadeUp, staggerContainer } from "@/animations/variants"
import { MotionDiv } from "@/components/Common/Reuse/MotionDiv"
import type { UpcomingDividend } from '@/types'

type DataTableProps = {
    dividends: UpcomingDividend[]
}

export const DataTable = ({ dividends }: DataTableProps) => {
    return (
        <MotionDiv
            variants={staggerContainer}
            className="lg:col-span-2 space-y-2">

            {dividends?.map((item) => (

                <MotionDiv
                    key={item.symbol}
                    variants={fadeUp}
                    includeLazyMotion={false}
                    className="flex items-center gap-4 bg-layer p-6 rounded-xl border border-border px-5 py-3.5 hover:border-accent/30 transition-colors duration-200">

                    <div className="flex flex-col items-center gap-1 min-w-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-primary text-sm">{item.symbol}</span>
                            <span className="text-xs text-secondary truncate">{item.company}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        <span className="text-xs text-secondary">{item.ex_date}</span>

                        <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-md border border-accent/20">
                            In {item.days_until} days
                        </span>

                        <span className="font-bold text-gain text-sm min-w-12 text-right">
                            ${item.amount.toFixed(2)}
                        </span>

                    </div>

                </MotionDiv>

            ))}

        </MotionDiv>
    )
}

