import { HomepageLayout } from '@/components/Homepage/Layout'
import { fetchPopularStocks } from '@/lib/api'

export const revalidate = 86400 

export default async function HomePage() {

    const popularStocksData = await fetchPopularStocks()
    
    return <HomepageLayout popularStocks={popularStocksData.stocks} />
}
