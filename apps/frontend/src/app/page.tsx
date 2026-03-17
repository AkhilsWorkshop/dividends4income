import { HomepageLayout } from '@/components/Homepage/Layout'
import { fetchPopularStocks } from '@/lib/api'

export const dynamic = 'force-static'

export const revalidate = 1800

export default async function HomePage() {

    const popularStocksData = await fetchPopularStocks()

    return <HomepageLayout popularStocks={popularStocksData.stocks} />
}
