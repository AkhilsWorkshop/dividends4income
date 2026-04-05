import { staggerContainer } from "@/animations/variants"
import { MotionTag } from "@/components/Common/Reuse/MotionTag"
import type { UpcomingDividend } from '@/types'
import { TableValue } from "./Reuse/TableValue"

type DataTableProps = {
    dividends: UpcomingDividend[]
}

export const DataTable = ({ dividends }: DataTableProps) => {
    return (
        <MotionTag
            variants={staggerContainer}
            className="lg:col-span-2 space-y-2">

            {dividends?.map((item) => (

                <TableValue
                    key={item.symbol}
                    dividend={item}
                />

            ))}

        </MotionTag>
    )
}

