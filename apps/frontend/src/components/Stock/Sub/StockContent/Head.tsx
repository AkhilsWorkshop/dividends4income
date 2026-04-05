import { staggerContainer } from '@/animations/variants'
import { BackButton } from './Head/BackButton'
import { CompanyInfo } from './Head/CompanyInfo'
import { PriceInfo } from './Head/PriceInfo'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

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
        <MotionTag
            variants={staggerContainer}
            className="flex flex-wrap items-center gap-4 py-2">

            <BackButton />

            <CompanyInfo
                logoUrl={stock.logo_url}
                symbol={stock.symbol}
                name={stock.name}
            />

            <PriceInfo
                price={stock.price}
                change={stock.change}
            />

        </MotionTag>
    )
}
