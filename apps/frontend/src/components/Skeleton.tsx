'use client'

import { motion, useReducedMotion } from 'motion/react'
import { shimmer } from '@/animations/variants'

export const Skeleton = ({ className = '' }: { className?: string }) => {
    const shouldReduce = useReducedMotion()

    if (shouldReduce) {
        return <div className={`bg-surface/40 rounded-lg ${className}`} />
    }

    return (
        <motion.div
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className={`bg-surface/40 rounded-lg ${className}`}
        />
    )
}

export const StockCardSkeleton = () => {
    return (
        <div className="glass-card p-6 space-y-5">
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-14 rounded-lg" />
                <Skeleton className="h-14 rounded-lg" />
                <Skeleton className="h-14 rounded-lg" />
                <Skeleton className="h-14 rounded-lg" />
            </div>
            <Skeleton className="h-10 rounded-lg" />
        </div>
    )
}

export const MetricCardSkeleton = () => {
    return (
        <div className="glass-card p-6 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
        </div>
    )
}

export const ChartSkeleton = () => {
    return (
        <div className="glass-card p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-12 rounded-md" />
                    <Skeleton className="h-8 w-12 rounded-md" />
                    <Skeleton className="h-8 w-12 rounded-md" />
                </div>
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
        </div>
    )
}

export const RedditPostSkeleton = () => {
    return (
        <div className="glass-card p-4 space-y-3">
            <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-20 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <div className="flex gap-4 pt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}
