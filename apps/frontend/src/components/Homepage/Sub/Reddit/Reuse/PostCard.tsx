import { formatDistanceToNow } from 'date-fns'
import { BiSolidUpvote } from 'react-icons/bi'
import { FaReddit } from 'react-icons/fa6'
import { MdComment } from 'react-icons/md'
import type { RedditPost } from '@/types'
import { cn } from '@/utils'

type PostCardProps = {
    post: RedditPost
    curvedRadius?: boolean
}

export const PostCard = ({ post, curvedRadius }: PostCardProps) => {

    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true })
        } catch {
            return 'Unknown'
        }
    }

    const formatScore = (score: number) =>
        score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score.toString()

    return (
        <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("border border-border bg-layer p-4 flex flex-col h-full gap-2.5 hover:border-accent/30 transition-colors duration-200 group/card",
                curvedRadius && 'rounded-xl'
            )}>

            <div className="flex items-center justify-between gap-2">

                <div className="flex items-center gap-1.5 min-w-0">

                    <span className="text-[11px] font-semibold text-accent/80 truncate">
                        r/{post.subreddit}
                    </span>

                    <span className="text-secondary/30 shrink-0">·</span>

                    <span className="text-[11px] text-secondary/50 shrink-0">
                        {formatTime(post.created_utc)}
                    </span>

                </div>

                <span className="shrink-0 flex items-center gap-1 text-[11px] font-medium py-0.5 px-2 rounded-md bg-surface/30 text-primary border border-border/30">
                    View <FaReddit size={12} color="#FF4500" />
                </span>

            </div>

            <h3 className="text-sm font-medium text-primary line-clamp-2 leading-snug flex-1 group-hover/card:text-accent/90 transition-colors duration-150">
                {post.title}
            </h3>

            {post.selftext && (
                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                    {post.selftext}
                </p>
            )}

            <div className="flex items-center gap-3 text-[11px] text-secondary pt-1.5 border-t border-border/30">

                <span className="truncate text-secondary/50 min-w-0">u/{post.author}</span>

                <div className="flex items-center gap-1 ml-auto shrink-0">
                    <BiSolidUpvote size={11} className="text-[#FF4500]" />
                    <span>{formatScore(post.score)}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <MdComment size={11} />
                    <span>{post.num_comments.toLocaleString()}</span>
                </div>

            </div>

        </a>
    )
}
