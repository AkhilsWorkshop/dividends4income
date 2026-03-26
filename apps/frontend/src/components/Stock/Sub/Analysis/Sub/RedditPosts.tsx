'use client'

import { memo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { formatDistanceToNow } from 'date-fns'
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

export const RedditPosts = memo(({ posts, ticker }: RedditPostsProps) => {

    const shouldReduce = useReducedMotion()

    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true })
        } catch {
            return 'Unknown'
        }
    }

    return (
        <div className="space-y-4 lg:space-y-5">

            <div className="flex items-center gap-3">
                <div className="p-3 glass-card text-accent">
                    <MdForum size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-xl text-primary">Recent Discussions</h2>
                    <p className="text-sm text-secondary">Latest Reddit posts about {ticker.toUpperCase()}</p>
                </div>
            </div>

            {posts.length === 0 ? (
                <div className="glass-card p-8 text-center text-secondary">
                    <p className="text-sm">
                        No recent Reddit discussions about {ticker.toUpperCase()}.
                        <br />
                        Check back later or try a different stock.
                    </p>
                </div>
            ) : (
                <motion.div
                    variants={staggerContainer}
                    initial={shouldReduce ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="glass-card p-4 space-y-2.5 hover:border-border/60 transition-colors duration-200">

                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-xs text-secondary truncate">r/{post.subreddit}</span>
                                    <span className="text-xs text-secondary/40 flex-shrink-0">{formatTime(post.created_utc)}</span>
                                </div>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-md bg-surface/30 hover:bg-surface/50 text-primary transition-colors duration-150">
                                    View <FaReddit size={13} color="#FF4500" />
                                </a>
                            </div>

                            <h3 className="text-sm font-medium text-primary line-clamp-2 leading-snug">
                                {post.title}
                            </h3>

                            {post.selftext && (
                                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                                    {post.selftext}
                                </p>
                            )}

                            <div className="flex items-center gap-3 text-xs text-secondary pt-1 border-t border-border/30">
                                <span className="truncate">u/{post.author}</span>
                                <div className="flex items-center gap-1 ml-auto">
                                    <BiSolidUpvote size={11} />
                                    <span>{post.score}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdComment size={11} />
                                    <span>{post.num_comments}</span>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>
            )}

        </div>
    )
})

RedditPosts.displayName = 'RedditPosts'
