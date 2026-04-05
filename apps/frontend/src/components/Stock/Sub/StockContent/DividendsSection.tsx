import { DividendsChart } from '@/components/Stock/Sub/StockContent/DividendsSection/DividendsChart'
import { DividendsTable } from '@/components/Stock/Sub/StockContent/DividendsSection/DividendsTable'

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface DividendsSectionProps {
    dividends: DividendData[]
    ticker: string
}

export const DividendsSection = ({ dividends, ticker }: DividendsSectionProps) => {

    if (dividends.length === 0) {
        return (
            <div className="p-8 text-center text-secondary bg-layer/20 rounded-xl block border border-border">
                <p className="text-sm">No dividend history available for {ticker.toUpperCase()}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-5 gap-3 lg:gap-5 w-full">
            <DividendsTable dividends={dividends} />
            <DividendsChart dividends={dividends} />
        </div>
    )
}