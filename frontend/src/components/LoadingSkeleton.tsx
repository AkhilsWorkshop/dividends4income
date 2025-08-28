import { cn } from '@/utils';

interface SkeletonProps {
    className?: string;
    lines?: number;
}

export function LoadingSkeleton({ className, lines = 3 }: SkeletonProps) {
    return (
        <div className={cn('animate-pulse space-y-4', className)}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        'bg-gray-300 dark:bg-gray-700 rounded h-4',
                        index === lines - 1 ? 'w-3/4' : 'w-full'
                    )}
                />
            ))}
        </div>
    );
}

export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn(
            'animate-pulse p-6 rounded-lg bg-gray-200 dark:bg-gray-800 space-y-4',
            className
        )}>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            </div>
        </div>
    );
}
