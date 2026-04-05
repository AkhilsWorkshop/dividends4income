import { memo } from 'react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { MdForum } from 'react-icons/md'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'
import { ErrorBox } from '@/components/Common/Reuse/MessageBox/ErrorBox'
import { PostCard } from '@/components/Homepage/Sub/Reddit/Reuse/PostCard'

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

export const RedditPosts = memo(({ posts, ticker }: RedditPostsProps) => {

    return (
        <div className="space-y-4 lg:space-y-5">

            <MotionTag
                variants={fadeUp}
                className="flex items-center gap-3">

                <div className="p-3 rounded-xl block border border-border text-accent">
                    <MdForum size={20} />
                </div>

                <div>
                    <h2 className="font-bold text-xl text-primary">Recent Discussions</h2>
                    <p className="text-sm text-secondary">Latest Reddit posts about {ticker.toUpperCase()}</p>
                </div>

            </MotionTag>

            {posts.length === 0 ? (

                <ErrorBox message={`No recent Reddit discussions about ${ticker.toUpperCase()}. Please check back later or try a different stock.`} />

            ) : (

                <MotionTag
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">

                    {posts.map((post, index) => (

                        <MotionTag
                            key={index}
                            variants={fadeUp}
                            useDefaultInView={false}
                            includeLazyMotion={false}>

                            <PostCard
                                post={post}
                                curvedRadius />

                        </MotionTag>

                    ))}

                </MotionTag>

            )}

        </div>
    )
})

RedditPosts.displayName = 'RedditPosts'
