
type InitialMetricsProps = {
    currentPrice: string | number
    dividendYield: string | number
    dividendRate: string | number
    dividendsLength: number
    loading?: boolean
}

export const InitialMetrics = ({ currentPrice, dividendYield, dividendRate, dividendsLength, loading }: InitialMetricsProps) => {

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">

            <ShortCard
                loading={loading}
                heading="Current Price"
                value={currentPrice} />

            <ShortCard
                loading={loading}
                heading="Dividend Yield"
                value={dividendYield} />

            <ShortCard
                loading={loading}
                heading="Dividend Rate"
                value={dividendRate} />

            <ShortCard
                loading={loading}
                heading="Total Dividends"
                value={dividendsLength} />

        </div>
    )
}

type ShortCardProps = {
    heading: string
    value: string | number
    loading?: boolean
}

const ShortCard = ({ heading, value, loading }: ShortCardProps) => {
    return (
        <div className='bg-layer p-6 rounded-xl border border-border shadow-sm space-y-3 text-primary'>

            {loading ?

                <>
                    <div className="w-18 lg:w-20 h-5 bg-surface/50 animate-pulse rounded-sm"></div>
                    <div className="w-24 lg:w-32 h-8 lg:h-9 bg-surface/75 animate-pulse rounded-sm"></div>
                </>

                :

                <>
                    <p className="text-sm text-secondary">{heading}</p>
                    <p className="text-2xl lg:text-3xl font-semibold">{value}</p>
                </>

            }

        </div>
    )
}
