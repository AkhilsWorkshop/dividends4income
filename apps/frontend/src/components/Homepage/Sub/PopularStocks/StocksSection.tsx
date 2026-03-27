import { fadeUp } from "@/animations/variants"
import { MotionDiv } from "@/components/Common/Reuse/MotionDiv"
import { BasicStockInfo } from "@/types"
import { RiStockFill } from "react-icons/ri"
import { Stocks } from "./Stocks"

interface StocksSectionProps {
    stocks: BasicStockInfo[]
}

export const StocksSection = ({ stocks }: StocksSectionProps) => {
    return (

        stocks.length === 0 ?

            <MotionDiv
                variants={fadeUp}
                className="bg-layer/40 border border-border rounded-xl p-12 py-20 text-center text-secondary my-12">
                <RiStockFill size={32} className="mx-auto mb-3" color="#FF4500" />
                <p className="text-sm">Stocks data are unavailable right now. Check back soon!</p>
            </MotionDiv>

            :

            <Stocks stocks={stocks} />
    )
}
