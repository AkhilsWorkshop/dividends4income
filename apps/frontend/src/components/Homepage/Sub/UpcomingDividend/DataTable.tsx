import { staggerContainer } from "@/animations/variants"
import { MotionDiv } from "@/components/Common/Reuse/MotionDiv"
import type { UpcomingDividend } from '@/types'
import { TableValue } from "./Reuse/TableValue"

type DataTableProps = {
    dividends: UpcomingDividend[]
}

export const DataTable = ({ dividends }: DataTableProps) => {
    return (
        <MotionDiv
            variants={staggerContainer}
            className="lg:col-span-2 space-y-2">

            {dividends?.map((item) => (

                <TableValue
                    key={item.symbol}
                    dividend={item}
                />

            ))}

        </MotionDiv>
    )
}

