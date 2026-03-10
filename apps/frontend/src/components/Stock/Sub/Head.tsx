import Link from 'next/link'
import { FaArrowLeft } from "react-icons/fa6"

interface HeadProps {
    stock: {
        logo_url: string
        symbol: string
        name: string
    }
}

export const Head = ({ stock }: HeadProps) => {
    return (
        <div className="flex justify-start items-center gap-3 lg:gap-6 lg:pt-2 lg:pb-2 text-primary">

            <Link href="/" className="flex justify-center items-center gap-2 cursor-pointer bg-transparent py-2 px-3 text-primary hover:text-background hover:bg-primary duration-300 transition-all rounded-sm">

                <FaArrowLeft size={15} />

                <h1 className="text-sm">Back</h1>

            </Link>

            <div className="flex items-center space-x-4">

                <img src={stock.logo_url} alt={`${stock.name} logo`} className="w-12 h-12 rounded-sm" />

                <div className="flex flex-col items-start justify-between">
                    <h1 className="text-lg font-bold">{stock.symbol}</h1>
                    <p className="text-sm">{stock.name}</p>
                </div>

            </div>

        </div>
    )
}
