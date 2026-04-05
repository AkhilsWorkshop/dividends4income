import { PriceInfo } from './Sub/InitialMetrics/PriceInfo'
import { ShortCard } from './Sub/InitialMetrics/Reuse/ShortCard'

type InitialMetricsProps = {
    currentPrice: string | number
    dividendYield: string | number
    dividendRate: string | number
    dividendsLength: number
    change: string
}

export const InitialMetrics = ({ currentPrice, dividendYield, dividendRate, dividendsLength, change }: InitialMetricsProps) => {

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">

            <ShortCard heading="Current Price" value={currentPrice} accent valueChildren={<PriceInfo change={change} />} />
            <ShortCard heading="Dividend Yield" value={dividendYield} accent />
            <ShortCard heading="Dividend Rate" value={dividendRate} />
            <ShortCard heading="Total Dividends" value={dividendsLength} />

        </div>
    )
}
