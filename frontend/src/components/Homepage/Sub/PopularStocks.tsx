import { StockCard, StockCardLoading } from '../Reuse/StockCard'
import { useEffect } from 'preact/hooks'
import { MdError } from 'react-icons/md'
import { useApi } from '@/hooks/useApi'

interface Stock {
    symbol: string
    name: string
    price: string
    change: string
    dividend_rate: string
    dividend_yield: string
    logo_url: string
}

interface StockApiResponse {
    stocks: Stock[]
}

interface PopularStocksProps {
    onStockClick: (symbol: string) => void
}

export const PopularStocks = ({ onStockClick }: PopularStocksProps) => {

    const { data, loading, error, fetchData } = useApi<StockApiResponse>()

    useEffect(() => {

        if (!data) {
            fetchData('/popular/stocks')
        }

    }, [fetchData, data])

    return (

        <div id="popular-stocks" className="max-w-7xl container mx-auto space-y-3 lg:space-y-6 py-[50px] lg:py-[100px] px-3 lg:px-6">

            <div className="text-center space-y-10 text-primary pb-10">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance"><span className="text-secondary">Popular</span> Dividend Stocks</h2>
                <p className="text-sm md:text-lg lg:text-xl text-secondary text-pretty max-w-2xl mx-auto">Top dividend-paying companies trusted by investors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">

                {loading ?

                    [...Array(9)].map((_, index) => (
                        <StockCardLoading key={index} />
                    ))

                    :

                    error ?

                        <div className="flex items-center justify-center py-8 text-red-600 col-span-3">
                            <MdError size={24} />
                            <span className="ml-2">{error || 'An error occurred while loading stocks'}</span>
                        </div>

                        :

                        data?.stocks?.map((stock) => (
                            <StockCard
                                key={stock.symbol}
                                stock={stock}
                                onStockClick={onStockClick}
                            />
                        ))

                }

            </div>

        </div>
    )
}


