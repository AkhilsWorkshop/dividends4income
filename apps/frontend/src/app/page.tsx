import { HomepageLayout } from '@/components/Homepage/Layout'
import { fetchPopularStocks, fetchMarqueeTickers } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function HomePage() {

    const [popularStocksData, marqueeTickers] = await Promise.all([
        fetchPopularStocks(),
        fetchMarqueeTickers(),
    ])

    return <HomepageLayout popularStocks={popularStocksData.stocks} marqueeTickers={marqueeTickers} />
}
