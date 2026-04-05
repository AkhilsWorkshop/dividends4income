import { Skeleton } from '@/components/Common/Reuse/Animation/Skeleton'

const AnalysisHeadSkeleton = ({ subtitleWidth = 'w-64' }: { subtitleWidth?: string }) => (
    <div className="flex items-center gap-3">

        <Skeleton className="w-11 h-11 rounded-xl shrink-0" />

        <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className={`h-4 ${subtitleWidth}`} />
        </div>

    </div>
)

const DisclaimerSkeleton = () => (
    <Skeleton className="h-9 w-full rounded-lg" />
)

const AnalysisCardSkeleton = () => (
    <div className="p-4 lg:p-6 space-y-4 bg-layer/20 rounded-xl border border-border">

        <div className="flex justify-between items-center gap-4">

            <div className="space-y-1.5">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-3.5 w-48" />
            </div>

            <Skeleton className="h-6 w-18 rounded-full shrink-0" />

        </div>

        <div className="w-full h-px bg-border/40" />

        <div className="space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-[90%]" />
            <Skeleton className="h-3.5 w-[80%]" />
        </div>

        <div className="w-full h-px bg-border/40" />

        <Skeleton className="h-4 w-20" />

        <div className="space-y-2">

            {(['w-full', 'w-[85%]', 'w-[75%]', 'w-[88%]'] as const).map((w, i) => (
                <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-surface/40 mt-1.5 shrink-0" />
                    <Skeleton className={`h-3.5 ${w}`} />
                </div>
            ))}

        </div>

    </div>
)

const PostCardSkeleton = () => (
    <div className="border border-border bg-layer p-4 flex flex-col gap-2.5 rounded-xl">

        <div className="flex items-center justify-between gap-2">

            <div className="flex items-center gap-1.5">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3 w-12" />
            </div>

            <Skeleton className="h-5 w-14 rounded-md shrink-0" />

        </div>

        <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4.5 w-full" />
            <Skeleton className="h-4.5 w-4/5" />
        </div>

        <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
        </div>

        <div className="flex items-center gap-3 pt-1.5 border-t border-border/30">

            <Skeleton className="h-3 w-20" />

            <div className="ml-auto flex items-center gap-1 shrink-0">
                <Skeleton className="h-3 w-8" />
            </div>

            <Skeleton className="h-3 w-8 shrink-0" />

        </div>

    </div>
)

export const AnalysisSectionSkeleton = () => (
    <div className="space-y-4 lg:space-y-6">

        <AnalysisHeadSkeleton subtitleWidth="w-64" />

        <DisclaimerSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
            <AnalysisCardSkeleton />
            <AnalysisCardSkeleton />
        </div>

        <div className="space-y-4 lg:space-y-5">

            <AnalysisHeadSkeleton subtitleWidth="w-52" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </div>

        </div>

    </div>
)
