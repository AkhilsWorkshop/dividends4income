import { MdOutlineInsertChart } from "react-icons/md"

interface KeyMetricsProps {
    loading: boolean
    marketCap?: number
    volume?: number
    averageVolume?: number
    fiftyTwoWeekHigh?: number
    fiftyTwoWeekLow?: number
    trailingPE?: number
    forwardPE?: number
    trailingEPS?: number
    forwardEPS?: number
    beta?: number
    currency?: string
    exchange?: string
}

export const KeyMetrics = ({
    loading,
    marketCap,
    volume,
    averageVolume,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    trailingPE,
    forwardPE,
    trailingEPS,
    forwardEPS,
    beta,
    currency,
    exchange
}: KeyMetricsProps) => {

    const formatNumber = (num?: number) => {
        if (!num) return 'N/A'
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
        if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
        return `$${num.toFixed(2)}`
    }

    const formatVolume = (num?: number) => {
        if (!num) return 'N/A'
        if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
        if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
        return num.toString()
    }

    return (
        <div className="bg-layer rounded-xl border border-border shadow-sm p-4 lg:p-6 text-primary space-y-6">

            {loading ?

                <div className="animate-pulse space-y-6">

                    <div className="animate-pulse flex items-center gap-3 max-w-xl">

                        <div className="bg-surface/50 h-10 lg:h-14 w-10 lg:w-14 animate-pulse rounded-lg aspect-square" />

                        <div className="space-y-2 w-full">
                            <div className="h-6 bg-surface/75 rounded-sm w-1/3" />
                            <div className="h-4 bg-surface/50 rounded-sm w-1/2" />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 bg-surface/75 rounded-sm w-1/3" />
                                <div className="h-6 bg-surface/50 rounded-sm w-1/2" />
                            </div>
                        ))}
                    </div>

                </div>

                :

                <>

                    <div className="flex items-center gap-3">

                        <div className="p-2 lg:p-4 bg-layer border border-border rounded-lg shadow-sm text-primary">
                            <MdOutlineInsertChart size={24} />
                        </div>

                        <div>
                            <h1 className="font-bold text-xl lg:text-2xl text-primary">
                                Key Metrics
                            </h1>
                            <p className="text-sm text-secondary">
                                Important financial metrics and ratios
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <DataItem
                            label="Market Cap"
                            value={formatNumber(marketCap)}
                        />

                        <DataItem
                            label="Beta"
                            value={beta ? beta.toFixed(2) : 'N/A'}
                        />

                        <DataItem
                            label="Volume"
                            value={formatVolume(volume)}
                        />

                        <DataItem
                            label="Avg Volume"
                            value={formatVolume(averageVolume)}
                        />

                        <DataItem
                            label="52W High"
                            value={fiftyTwoWeekHigh ? `$${fiftyTwoWeekHigh.toFixed(2)}` : 'N/A'}
                        />

                        <DataItem
                            label="52W Low"
                            value={fiftyTwoWeekLow ? `$${fiftyTwoWeekLow.toFixed(2)}` : 'N/A'}
                        />

                        <DataItem
                            label="Trailing P/E"
                            value={trailingPE ? trailingPE.toFixed(2) : 'N/A'}
                        />

                        <DataItem
                            label="Forward P/E"
                            value={forwardPE ? forwardPE.toFixed(2) : 'N/A'}
                        />

                        <DataItem
                            label="Trailing EPS"
                            value={trailingEPS ? `$${trailingEPS.toFixed(2)}` : 'N/A'}
                        />

                        <DataItem
                            label="Forward EPS"
                            value={forwardEPS ? `$${forwardEPS.toFixed(2)}` : 'N/A'}
                        />

                        <DataItem
                            label="Currency"
                            value={currency ? currency : 'N/A'}
                        />

                        <DataItem
                            label="Exchange"
                            value={exchange ? exchange : 'N/A'}
                        />

                    </div>

                </>

            }

        </div>
    )
}

const DataItem = ({ label, value }: { label: string; value: string | number }) => {
    return (
        <div className="space-y-1">
            <p className="text-sm text-secondary">{label}</p>
            <p className="text-xl font-semibold text-primary">{value}</p>
        </div>
    )
}
