import { cn } from '@/utils';

interface SkeletonProps {
    className?: string;
    children?: never;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
                className
            )}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className={cn(
            'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
            'border border-gray-200 dark:border-gray-700'
        )}>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

export function TableSkeleton() {
    return (
        <div className={cn(
            'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
            'border border-gray-200 dark:border-gray-700'
        )}>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex space-x-4">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function NewsSkeleton() {
    return (
        <div className={cn(
            'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
            'border border-gray-200 dark:border-gray-700'
        )}>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-l-4 border-gray-200 dark:border-gray-600 pl-4">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ))}
            </div>
        </div>
    );
}
