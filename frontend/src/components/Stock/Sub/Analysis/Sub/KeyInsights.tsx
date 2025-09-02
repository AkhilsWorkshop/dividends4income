import { MdForum, MdThumbUp, MdComment, MdAccessTime } from 'react-icons/md'
import { LoadingCard } from '../Reuse/LoadingCard'

interface Post {
    title: string
    url: string
    score: number
    num_comments: number
    created_utc: string
    selftext: string
    author: string
}

interface KeyInsightsProps {
    loading: boolean
    posts: Post[]
}

export const KeyInsights = ({ loading, posts }: KeyInsightsProps) => {
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

    const getTopPosts = (posts: Post[]) => {
        return posts
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
    }

    if (loading) {
        return (
            <LoadingCard
                title="Top Discussions"
                subtitle="Finding most engaging posts"
                items={3}
            />
        )
    }

    const topPosts = getTopPosts(posts)

    return (
        <div className="bg-layer rounded-xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <MdForum size={20} />
                </div>
                <h2 className="font-semibold text-lg text-primary">Top Discussions</h2>
            </div>

            {topPosts.length > 0 ? (
                <div className="space-y-3">
                    {topPosts.map((post, index) => (
                        <div key={index} className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-sm font-medium text-primary line-clamp-2 flex-1 mr-2">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-secondary whitespace-nowrap">
                                    <MdThumbUp size={12} />
                                    <span>{post.score}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-secondary">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <MdComment size={12} />
                                        <span>{post.num_comments}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MdAccessTime size={12} />
                                        <span>{formatTime(post.created_utc)}</span>
                                    </div>
                                </div>
                                <span className="text-xs">u/{post.author}</span>
                            </div>

                            {post.selftext && (
                                <p className="text-xs text-secondary mt-2 line-clamp-2">
                                    {post.selftext}
                                </p>
                            )}
                        </div>
                    ))}

                    {posts.length > 3 && (
                        <div className="text-center pt-2">
                            <span className="text-xs text-secondary">
                                +{posts.length - 3} more discussions
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 text-secondary">
                    <MdForum size={32} />
                    <p className="text-sm mt-2">No discussions found</p>
                </div>
            )}
        </div>
    )
}
