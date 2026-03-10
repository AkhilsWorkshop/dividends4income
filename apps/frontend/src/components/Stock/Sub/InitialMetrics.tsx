
type InitialMetricsProps = {
    currentPrice: string | number
    dividendYield: string | number
    dividendRate: string | number
    dividendsLength: number
}

export const InitialMetrics = ({ currentPrice, dividendYield, dividendRate, dividendsLength }: InitialMetricsProps) => {

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">

            <ShortCard heading="Current Price" value={currentPrice} />

            <ShortCard heading="Dividend Yield" value={dividendYield} />

            <ShortCard heading="Dividend Rate" value={dividendRate} />

            <ShortCard heading="Total Dividends" value={dividendsLength} />

        </div>
    )
}

type ShortCardProps = {
    heading: string
    value: string | number
}

const ShortCard = ({ heading, value }: ShortCardProps) => {
    return (
        <div className='bg-layer p-6 rounded-xl border border-border shadow-sm space-y-3 text-primary'>
            <p className="text-sm text-secondary">{heading}</p>
            <p className="text-2xl lg:text-3xl font-semibold">{value}</p>
        </div>
    )
}
