import { Suspense } from 'react'
import { Analysis } from './Sub/AnalysisSection/Analysis'
import { AnalysisSectionSkeleton } from './Sub/AnalysisSection/Skeleton'

interface AnalysisSectionProps {
    ticker: string
    tickerName: string
}

export const AnalysisSection = ({ ticker, tickerName }: AnalysisSectionProps) => {
    return (
        <Suspense fallback={<AnalysisSectionSkeleton />}>
            <Analysis ticker={ticker} tickerName={tickerName} />
        </Suspense>
    )
}