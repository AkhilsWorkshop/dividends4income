import type { BasicStockInfo } from '@/types'
import { StockCard } from '../Reuse/StockCard'

interface PopularStocksProps {
    stocks: BasicStockInfo[]
}

export const PopularStocks = ({ stocks }: PopularStocksProps) => {

    return (

        <div id="popular-stocks" className="max-w-7xl container mx-auto space-y-3 lg:space-y-6 py-[50px] lg:py-[100px] px-3 lg:px-6">

            <div className="text-center space-y-10 text-primary pb-10">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance"><span className="text-secondary">Popular</span> Dividend Stocks</h2>
                <p className="text-sm md:text-lg lg:text-xl text-secondary text-pretty max-w-2xl mx-auto">Top dividend-paying companies trusted by investors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">

                {stocks.map((stock) => (
                    <StockCard key={stock.symbol} stock={stock} />
                ))}

            </div>

        </div>
    )
}
