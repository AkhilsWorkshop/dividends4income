import { staggerContainer } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/Animation/MotionTag'
import { BasicStockInfo } from '@/types'
import { StockCard } from './Reuse/StockCard'

interface StocksProps {
    stocks: BasicStockInfo[]
}

export const Stocks = ({ stocks }: StocksProps) => {
    return (
        <MotionTag
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

            {stocks.map((stock, i) => (
                <StockCard key={stock.symbol} stock={stock} index={i} />
            ))}

        </MotionTag>
    )
}

