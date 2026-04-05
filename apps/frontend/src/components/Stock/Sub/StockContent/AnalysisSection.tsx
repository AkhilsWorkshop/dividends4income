import { Suspense } from 'react'
import { ChartSkeleton, MetricCardSkeleton } from '@/components/Skeleton'
import { Analysis } from './AnalysisSection/Analysis'

interface AnalysisSectionProps {
    ticker: string
    tickerName: string
}

export const AnalysisSection = ({ ticker, tickerName }: AnalysisSectionProps) => {
    return (
        <Suspense fallback={<LoadingState />}>
            <Analysis ticker={ticker} tickerName={tickerName} />
        </Suspense>
    )
}

const LoadingState = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
            <ChartSkeleton />
            <MetricCardSkeleton />
        </div>
    )
}