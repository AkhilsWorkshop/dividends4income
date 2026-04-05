type SkeletonProps = {
    className?: string
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
    return <div className={`bg-surface/40 rounded-lg animate-pulse ${className}`} />
}
