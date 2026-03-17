import { HomepageLayout } from '@/components/Homepage/Layout'
import { fetchPopularStocks } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function HomePage() {

    const popularStocksData = await fetchPopularStocks()

    return <HomepageLayout popularStocks={popularStocksData.stocks} />
}
