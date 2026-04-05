import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6"

type SentimentBadgeProps = {
    sentiment?: string
}

export const SentimentBadge = ({ sentiment }: SentimentBadgeProps) => {

    const lower = sentiment?.toLowerCase()

    if (lower === 'positive') {
        return (
            <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-gain/10 text-gain border border-gain/20">
                Positive <FaThumbsUp size={12} />
            </span>
        )
    }

    if (lower === 'negative') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-loss/10 text-loss border border-loss/20">
                Negative <FaThumbsDown size={12} />
            </span>
        )
    }

    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-surface/30 text-secondary border border-border/60">
            Neutral ~
        </span>
    )
}

