import type { BasicStockInfo, MarqueeTicker } from '@/types'
import { Features } from './Sub/Features'
import { HowItWorks } from './Sub/HowItWorks'
import { PopularStocks } from './Sub/PopularStocks'
import { Hero } from './Sub/Hero'
import { FAQ } from './Sub/FAQ'
import { PreFooter } from './Sub/PreFooter'
import { MarqueeStrip } from './Sub/MarqueeStrip'
import { UpcomingFeed } from './Sub/UpcomingFeed'
import { DividendCalendar } from './Sub/DividendCalendar'
import { Insights } from './Sub/Insights'

interface HomepageLayoutProps {
    popularStocks: BasicStockInfo[]
    marqueeTickers: MarqueeTicker[]
}

export const HomepageLayout = ({ popularStocks, marqueeTickers }: HomepageLayoutProps) => {
    return (
        <>
            <Hero />
            <MarqueeStrip tickers={marqueeTickers} />
            {/* <UpcomingFeed />
            <PopularStocks stocks={popularStocks} />
            <DividendCalendar />
            <Features />
            <Insights />
            <HowItWorks />
            <FAQ />
            <PreFooter /> */}
        </>
    )
}
