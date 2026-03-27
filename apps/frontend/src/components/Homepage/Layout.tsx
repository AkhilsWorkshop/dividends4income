import type { BasicStockInfo, MarqueeTicker, RedditPost, UpcomingDividend } from '@/types'
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
import { Reddit } from './Sub/Reddit'

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
            <UpcomingFeed dividends={upcomingDividends} />
            <Features />
            {/* 
            <DividendCalendar />
            
            <Insights />
            <HowItWorks />
            <FAQ />
            <PreFooter /> */}
        </>
    )
}
