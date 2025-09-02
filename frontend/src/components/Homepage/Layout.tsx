import { route } from 'preact-router'
import { Features } from './Sub/Features'
import { HowItWorks } from './Sub/HowItWorks'
import { PopularStocks } from './Sub/PopularStocks'
import { Hero } from './Sub/Hero'
import { FAQ } from './Sub/FAQ'
import { PreFooter } from './Sub/PreFooter'

export const Layout = () => {

    const handleStockClick = (symbol: string) => {
        route(`/stock/${symbol}`)
    }

    const handleCTAClick = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' })

        setTimeout(() => {
            if ((window as any).focusHeroSearch) {
                (window as any).focusHeroSearch()
            }
        }, 500)
    }

    return (
        <>

            <Hero onSearch={handleStockClick} />

            <Features />

            <HowItWorks />

            <PopularStocks onStockClick={handleStockClick} />

            <FAQ />

            <PreFooter onCTAClick={handleCTAClick} />

        </>
    )
}
