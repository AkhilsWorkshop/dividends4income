import { UpcomingDividend } from "@/types"
import { Heading } from "./UpcomingDividend/Heading"
import { DataTable } from "./UpcomingDividend/DataTable"

type UpcomingDividendsProps = {
    dividends: UpcomingDividend[]
}

export const UpcomingDividends = ({ dividends }: UpcomingDividendsProps) => {
    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-15 lg:py-25">

            <Heading />

            <DataTable dividends={dividends} />

        </section>
    )
}

