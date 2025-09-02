import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6'

interface SentimentAnalysisProps {
    redditPrediction?: string
    keyPoints?: string[]
}

export const RedditAnalysis = ({ redditPrediction, keyPoints }: SentimentAnalysisProps) => {

    return (
        <div className="bg-layer rounded-xl border border-border shadow-sm p-4 lg:p-6">

            {redditPrediction ?

                <>

                    <div className="flex justify-start items-center gap-2">

                        <div className="flex flex-col justify-center items-start">

                            <p className="font-bold text-lg lg:text-xl text-primary">
                                Reddit
                            </p>

                            <p className="text-sm text-secondary">Community discussions and analysis</p>

                        </div>

                    </div>

                    <p className="text-sm text-secondary leading-relaxed italic pt-3">"{redditPrediction}"</p>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mt-3" />

                    <Sentiment sentiment={redditPrediction} />

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <p className="font-semibold text-primary pt-3 pb-2">
                        Why?
                    </p>

                    {keyPoints && keyPoints.length > 0 &&
                        <ul className="space-y-2 text-sm">
                            {keyPoints?.map((point, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 text-primary" />
                                    <span className='text-secondary'>{point}</span>
                                </li>
                            ))}
                        </ul>
                    }

                </>

                :

                <div className="text-center py-8 text-secondary">
                    <p className="text-sm mt-2">No analysis available</p>
                </div>

            }

        </div>
    )
}

const Sentiment = ({ sentiment }: { sentiment: string }) => {
    return (
        <div className="flex justify-center items-center gap-2 pt-3 bg-gradient-to-r from-transparent via-border to-transparent pb-3">

            <p className="text-primary text-sm font-bold">
                Overall sentiment
            </p>

            {sentiment?.toLowerCase() === "positive" ?

                <p className="bg-green-100 text-green-800 w-fit flex justify-center items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-sm border border-green-800/20">Positive <FaThumbsUp size={15} /> </p>

                : sentiment?.toLowerCase() === "negative" ?

                    <p className="bg-red-100 text-red-800 w-fit flex justify-center items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-sm border border-red-800/20">Negative <FaThumbsDown size={15} /> </p>

                    :

                    <p className="bg-gray-100 text-gray-800 w-fit flex justify-center items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-sm border border-gray-800/20">Neutral <span className="font-bold">~</span> </p>

            }

        </div>
    )
}
