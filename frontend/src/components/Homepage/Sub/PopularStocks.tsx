import { StockCard } from '../Reuse/StockCard'
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

interface PopularStocksProps {
    onStockClick: (symbol: string) => void
}

export const PopularStocks = ({ onStockClick }: PopularStocksProps) => {

    const { data: stocks, loading, error, fetchData } = useApi<Stock[]>()

    useEffect(() => {
        fetchData('/api/popular-stocks')
    }, [fetchData])

    if (loading) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-6">Popular Dividend Stocks</h2>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-2">Loading stocks...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-6">Popular Dividend Stocks</h2>
                <div className="flex items-center justify-center py-8 text-red-600">
                    <MdError size={24} />
                    <span className="ml-2">Error loading stocks: {error}</span>
                </div>
            </div>
        )
    }


    return (

        <div className="container mx-auto space-y-10">

            <div className="text-center space-y-10 pt-[50px] lg:pt-[150px] text-primary">
                <h2 className="text-2xl lg:text-5xl font-bold text-balance"><span className="text-secondary">Popular</span> Dividend Stocks</h2>
                <p className="text-secondary dark:text-primary/75 text-lg">Top dividend-paying companies trusted by investors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {stocks?.map((stock) => (
                    <StockCard
                        key={stock.symbol}
                        stock={stock}
                        onStockClick={onStockClick}
                    />
                )) || <div>No stocks available</div>}

            </div>

        </div>
    )
}
