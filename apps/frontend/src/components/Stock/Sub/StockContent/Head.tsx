import { BackButton } from './Sub/Head/BackButton'
import { CompanyInfo } from './Sub/Head/CompanyInfo'

interface HeadProps {
    stock: {
        logo_url: string
        symbol: string
        name: string
        price: string
        change: string
    }
}

export const Head = ({ stock }: HeadProps) => {

    return (
        <section className="flex flex-wrap items-center gap-4 py-2">

            <BackButton />

            <CompanyInfo
                logoUrl={stock.logo_url}
                symbol={stock.symbol}
                name={stock.name}
            />

        </section>
    )
}
