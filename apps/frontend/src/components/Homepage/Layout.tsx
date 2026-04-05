import type { BasicStockInfo, MarqueeTicker, RedditPost, UpcomingDividend } from '@/types'
import { HowItWorks } from './Sub/HowItWorks'
import { PopularStocks } from './Sub/PopularStocks'
import { Hero } from './Sub/Hero'
import { FAQ } from './Sub/FAQ'
import { PreFooter } from './Sub/PreFooter'
import { MarqueeStrip } from './Sub/MarqueeStrip'
import { Reddit } from './Sub/Reddit'
import { UpcomingDividends } from './Sub/UpcomingDividends'

interface HomepageLayoutProps {
    popularStocks: BasicStockInfo[]
    marqueeTickers: MarqueeTicker[]
    upcomingDividends: UpcomingDividend[]
    redditPosts: RedditPost[]
}

export const HomepageLayout = ({ popularStocks, marqueeTickers, upcomingDividends, redditPosts }: HomepageLayoutProps) => {
    return (
        <>
            <Hero />
            <MarqueeStrip tickers={marqueeTickers} />
            <PopularStocks stocks={popularStocks} />
            <Reddit posts={redditPosts} />
            <HowItWorks />
            <UpcomingDividends dividends={upcomingDividends} />
            <FAQ />
            <PreFooter />
        </>
    )
}
