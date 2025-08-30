import { Hero } from './Sub/Hero'
import { PopularStocks } from './Sub/PopularStocks'
import { SearchBar } from './Sub/SearchBar'

export const Layout = () => {

    const handleTickerSubmit = (ticker: string) => {
        const newPath = `/stock/${ticker}`
        window.history.pushState({}, '', newPath)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    const handleStockClick = (symbol: string) => {
        const newPath = `/stock/${symbol}`
        window.history.pushState({}, '', newPath)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <div className="min-h-screen p-3 lg:p-6">

            <Hero />

            <SearchBar onSearch={handleTickerSubmit} />

            <PopularStocks onStockClick={handleStockClick} />

        </div>
    )
}
