import { route } from 'preact-router'
import { Hero } from './Sub/Hero'
import { PopularStocks } from './Sub/PopularStocks'
import { SearchBar } from './Sub/SearchBar'

export const Layout = () => {

    const handleStockClick = (symbol: string) => {
        route(`/stock/${symbol}`)
    }

    return (
        <div className="min-h-screen p-3 lg:p-6">

            <Hero />

            <SearchBar onSearch={handleStockClick} />

            <PopularStocks onStockClick={handleStockClick} />

        </div>
    )
}
