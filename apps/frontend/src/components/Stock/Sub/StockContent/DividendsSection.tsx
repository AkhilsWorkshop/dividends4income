import { ErrorBox } from '@/components/Common/Reuse/MessageBox/ErrorBox'
import { DividendsChart } from '@/components/Stock/Sub/StockContent/Sub/DividendsSection/DividendsChart'
import { DividendsTable } from '@/components/Stock/Sub/StockContent/Sub/DividendsSection/DividendsTable'

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
        return <ErrorBox message={`No dividend history available for ${ticker.toUpperCase()}`} />
    }

    return (
        <div className="grid grid-cols-5 gap-3 lg:gap-5 w-full">
            <DividendsTable dividends={dividends} />
            <DividendsChart dividends={dividends} />
        </div>
    )
}