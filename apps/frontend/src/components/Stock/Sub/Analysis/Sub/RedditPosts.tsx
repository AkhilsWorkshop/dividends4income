import { BiSolidUpvote } from 'react-icons/bi'
import { FaReddit } from 'react-icons/fa6'
import { MdForum, MdComment } from 'react-icons/md'

interface Post {
    title: string
    url: string
    score: number
    num_comments: number
    created_utc: string
    selftext: string
    author: string
    subreddit: string
}

interface RedditPostsProps {
    posts: Post[]
    ticker: string
}

export const RedditPosts = ({ posts, ticker }: RedditPostsProps) => {

    const formatTime = (dateString: string) => {
        try {

            const date = new Date(dateString)
            const now = new Date()
            const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

            if (diffInHours < 24) {
                return `${diffInHours}h ago`
            } else {
                const diffInDays = Math.floor(diffInHours / 24)
                return `${diffInDays}d ago`
            }

        } catch {
            return 'Unknown'
        }
    }

    return (

        <div className="space-y-3 lg:space-y-6">

            <div className="flex items-center gap-3">

                <div className="p-2 lg:p-4 bg-layer border border-border rounded-lg shadow-sm text-primary">
                    <MdForum size={24} />
                </div>

                <div>
                    <h1 className="font-bold text-xl lg:text-2xl text-primary">
                        Recent Discussions
                    </h1>
                    <p className="text-sm text-secondary">
                        Latest Reddit posts about {ticker.toUpperCase()}
                    </p>
                </div>

            </div>

            <div className="lg:bg-layer lg:rounded-xl lg:border lg:border-border lg:shadow-sm lg:p-6">

                {posts?.length > 0 ?

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">

                        {posts.map((post, index) => {

                            return (
                                <div key={index} className="p-4 bg-layer lg:bg-border/50 rounded-xl lg:rounded-sm shadow-sm lg:shadow-none border border-border">

                                    <div className="flex items-center justify-between gap-1 mb-3">

                                        <div className="flex items-start justify-start gap-1">

                                            <p className='text-xs text-secondary'>r/{post.subreddit}</p>

                                            <p className='text-xs text-secondary/50'>{formatTime(post.created_utc)}</p>

                                        </div>

                                        <a
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex justify-center items-center gap-1 cursor-pointer py-1 px-2 text-background bg-primary duration-300 hover:brightness-75 transition-all rounded-sm w-fit">

                                            <h1 className="font-semibold text-xs">View on</h1>

                                            <span className=""><FaReddit size={18} color="#FF4500" /></span>

                                        </a>

                                    </div>

                                    <h3 className="text-sm font-medium text-primary line-clamp-1">
                                        {post.title}
                                    </h3>

                                    <p className='line-clamp-1 text-xs text-secondary'>
                                        {post.selftext || "No description available"}
                                    </p>

                                    <div className="flex items-center justify-start text-xs text-secondary mt-3 gap-2">

                                        <span>u/{post.author}</span>

                                        <div className="flex items-center gap-1">
                                            <BiSolidUpvote size={12} />
                                            <span>{post.score}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <MdComment size={12} />
                                            <span>{post.num_comments}</span>
                                        </div>

                                    </div>

                                </div>
                            )

                        })}

                    </div>

                    :

                    <div className="text-center py-12 text-secondary">
                        <p className="text-sm">
                            There are no recent Reddit discussions about {ticker.toUpperCase()}.
                            <br />
                            Check back later or try a different stock.
                        </p>
                    </div>

                }

            </div>

        </div>
    )
}
