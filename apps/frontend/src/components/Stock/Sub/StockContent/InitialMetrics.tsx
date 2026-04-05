import { staggerContainer } from '@/animations/variants'
import { ShortCard } from './InitialMetrics/Reuse/ShortCard'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

type InitialMetricsProps = {
    currentPrice: string | number
    dividendYield: string | number
    dividendRate: string | number
    dividendsLength: number
}

export const InitialMetrics = ({ currentPrice, dividendYield, dividendRate, dividendsLength }: InitialMetricsProps) => {

    return (
        <MotionTag
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">

            <ShortCard heading="Current Price" value={currentPrice} accent />
            <ShortCard heading="Dividend Yield" value={dividendYield} accent />
            <ShortCard heading="Dividend Rate" value={dividendRate} />
            <ShortCard heading="Total Dividends" value={dividendsLength} />

        </MotionTag>
    )
}
