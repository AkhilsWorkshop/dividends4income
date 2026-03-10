import type { BasicStockInfo } from '@/types'
import { Features } from './Sub/Features'
import { HowItWorks } from './Sub/HowItWorks'
import { PopularStocks } from './Sub/PopularStocks'
import { Hero } from './Sub/Hero'
import { FAQ } from './Sub/FAQ'
import { PreFooter } from './Sub/PreFooter'

interface HomepageLayoutProps {
    popularStocks: BasicStockInfo[]
}

export const HomepageLayout = ({ popularStocks }: HomepageLayoutProps) => {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <PopularStocks stocks={popularStocks} />
            <FAQ />
            <PreFooter />
        </>
    )
}
