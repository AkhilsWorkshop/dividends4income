import type { BasicStockInfo } from '@/types'
import { Heading } from './PopularStocks/Heading'
import { StocksSection } from './PopularStocks/StocksSection'

interface PopularStocksProps {
    stocks: BasicStockInfo[]
}

export const PopularStocks = ({ stocks }: PopularStocksProps) => {
    return (
        <section id="popular-stocks" className="max-w-7xl container mx-auto space-y-6 px-4 lg:px-6 py-15 lg:py-25">

            <Heading />

            <StocksSection stocks={stocks} />

        </section>
    )
}
