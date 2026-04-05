import { fetchRedditAnalysis } from '@/lib/api'
import { RedditAnalysis } from './Analysis/Sub/RedditAnalysis'
import { Predictions } from './Analysis/Sub/Predictions'
import { RedditPosts } from './Analysis/Sub/RedditPosts'
import { Disclaimer } from './Analysis/Sub/Disclaimer'
import { ErrorBox } from '@/components/Common/Reuse/MessageBox/ErrorBox'
import { Head } from './Analysis/Sub/Head'

interface AnalysisProps {
    ticker: string
    tickerName: string
}

export const Analysis = async ({ ticker, tickerName }: AnalysisProps) => {

    const redditData = await fetchRedditAnalysis(ticker, tickerName)

    return (
        <div className="space-y-4 lg:space-y-6">

            <Head ticker={ticker} />

            {!redditData ?

                <ErrorBox message={`An error occurred while analyzing ${ticker.toUpperCase()}. Please try again later!`} />

                :

                <>

                    <Disclaimer />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">

                        <RedditAnalysis
                            keyPoints={redditData.reddit_key_points}
                            redditPrediction={redditData.reddit_prediction}
                        />

                        <Predictions
                            keyPoints={redditData.ai_key_points}
                            aiPrediction={redditData.ai_prediction}
                        />

                    </div>

                    <RedditPosts
                        posts={redditData.posts || []}
                        ticker={ticker}
                    />

                </>

            }

        </div>
    )
}
