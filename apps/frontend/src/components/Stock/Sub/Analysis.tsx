import { fetchRedditAnalysis } from '@/lib/api'
import { RedditAnalysis } from './Analysis/Sub/RedditAnalysis'
import { Predictions } from './Analysis/Sub/Predictions'
import { RedditPosts } from './Analysis/Sub/RedditPosts'
import { Disclaimer } from './Analysis/Sub/Disclaimer'
import { GrAnalytics } from 'react-icons/gr'
import { MdError } from 'react-icons/md'

interface AnalysisProps {
    ticker: string
    tickerName: string
}

export const Analysis = async ({ ticker, tickerName }: AnalysisProps) => {

    const redditData = await fetchRedditAnalysis(ticker, tickerName)

    return (
        <div className="space-y-4 lg:space-y-6">

            <div className="flex items-center gap-3">

                <div className="p-3 glass-card text-accent">
                    <GrAnalytics size={20} />
                </div>

                <div>
                    <h2 className="font-bold text-xl text-primary">
                        Analysis
                    </h2>
                    <p className="text-sm text-secondary">
                        Reddit analysis and discussions for {ticker.toUpperCase()}
                    </p>
                </div>

            </div>

            {!redditData ?

                <div className="glass-card p-6 flex items-center gap-3 text-loss">
                    <MdError size={22} />
                    <span className="text-sm">{`An error occurred while analyzing ${ticker.toUpperCase()}`}</span>
                </div>

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
