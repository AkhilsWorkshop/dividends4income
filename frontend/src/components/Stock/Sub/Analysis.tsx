import { useEffect } from 'preact/hooks'
import { useApi } from '@/hooks/useApi'
import { RedditAnalysis } from './Analysis/Sub/RedditAnalysis'
import { Predictions } from './Analysis/Sub/Predictions'
import { RedditPosts } from './Analysis/Sub/RedditPosts'
import { Disclaimer } from './Analysis/Sub/Disclaimer'
import { GrAnalytics } from 'react-icons/gr'
import { MdError } from 'react-icons/md'

interface RedditData {
    reddit: {
        posts: {
            title: string
            url: string
            score: number
            num_comments: number
            created_utc: string
            selftext: string
            author: string
            subreddit: string
        }[]
        reddit_key_points: string[]
        reddit_prediction: string
        ai_key_points: string[]
        ai_prediction: string
    }
}

interface AnalysisProps {
    ticker: string
    tickerName: string
    prevLoading: boolean
}

export const Analysis = ({ ticker, tickerName, prevLoading }: AnalysisProps) => {

    const { data: redditData, loading, error, fetchData } = useApi<RedditData>()

    useEffect(() => {
        fetchData(`/stocks/analysis/reddit?ticker=${encodeURIComponent(ticker)}&tickerName=${encodeURIComponent(tickerName)}`)
    }, [ticker, fetchData])

    if (error) {
        return (
            <div className="bg-layer rounded-xl border border-border shadow-sm p-6 flex items-center justify-center text-red-600">
                <MdError size={24} />
                <span className="ml-2">{error || `An error occurred while analyzing ${ticker.toUpperCase()}`}</span>
            </div>
        )
    }

    return (
        <div className="space-y-3 lg:space-y-6">

            {prevLoading ?

                <div className="animate-pulse flex items-center gap-3 max-w-xl">

                    <div className="bg-surface/50 h-10 lg:h-14 w-10 lg:w-14 animate-pulse rounded-lg aspect-square" />

                    <div className="space-y-2 w-full">
                        <div className="h-6 bg-surface/75 rounded-sm w-1/3" />
                        <div className="h-4 bg-surface/50 rounded-sm w-1/2" />
                    </div>

                </div>

                :

                <div className="flex items-center gap-3">

                    <div className="p-2 lg:p-4 bg-layer border border-border rounded-lg shadow-sm text-primary">
                        <GrAnalytics size={24} />
                    </div>

                    <div>
                        <h1 className="font-bold text-xl lg:text-2xl text-primary">
                            Analysis
                        </h1>
                        <p className="text-sm text-secondary">
                            Reddit analysis and discussions for {ticker.toUpperCase()}
                        </p>
                    </div>

                </div>

            }

            {loading ?

                <div className="flex items-center justify-center gap-2 text-secondary bg-layer rounded-xl border border-border shadow-sm p-6">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                    <span className="text-sm">Analyzing, please wait...</span>
                </div>

                :

                <>

                    <Disclaimer />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">

                        <RedditAnalysis
                            keyPoints={redditData?.reddit?.reddit_key_points}
                            redditPrediction={redditData?.reddit?.reddit_prediction}
                        />

                        <Predictions
                            keyPoints={redditData?.reddit?.ai_key_points}
                            aiPrediction={redditData?.reddit?.ai_prediction}
                        />

                    </div>

                    <RedditPosts
                        posts={redditData?.reddit?.posts || []}
                        ticker={ticker}
                    />

                </>

            }

        </div>
    )
}
