import { HomepageLayout } from '@/components/Homepage/Layout'
import { fetchPopularStocks, fetchMarqueeTickers, fetchUpcomingDividends, fetchHomepageRedditPosts } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function HomePage() {

    const [popularStocksData, marqueeTickers, upcomingDividends, redditPosts] = await Promise.all([
        fetchPopularStocks(),
        fetchMarqueeTickers(),
        fetchUpcomingDividends(),
        fetchHomepageRedditPosts(),
    ])

    return <HomepageLayout popularStocks={popularStocksData.stocks} marqueeTickers={marqueeTickers} upcomingDividends={upcomingDividends} redditPosts={redditPosts} />
}
