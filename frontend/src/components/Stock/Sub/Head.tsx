import { route } from 'preact-router'
import { FaArrowLeft } from "react-icons/fa6";

interface HeadProps {
    stock: {
        logo_url: string;
        symbol: string;
        name: string;
    } | null;
    loading: boolean;
}

export const Head = ({ stock, loading }: HeadProps) => {

    const handleBack = () => {
        route('/')
    }

    return (
        <div className="flex justify-start items-center gap-3 lg:gap-6 lg:pt-2 lg:pb-2 text-primary">

            <button onClick={handleBack} className="flex justify-center items-center gap-2 cursor-pointer bg-transparent py-2 px-3 text-primary hover:text-background hover:bg-primary duration-300 transition-all rounded-sm">

                <FaArrowLeft size={15} />

                <h1 className="text-sm">Back</h1>

            </button>

            {loading ?

                <div className="flex items-center space-x-4">

                    <div className="w-12 h-12 rounded-sm bg-surface/50 animate-pulse" />

                    <div className="flex flex-col items-start justify-between gap-2">
                        <div className="w-20 h-5 bg-surface/50 animate-pulse rounded-sm" />
                        <div className="w-32 h-4 bg-surface/75 animate-pulse rounded-sm" />
                    </div>

                </div>

                :

                <div className="flex items-center space-x-4">

                    <img src={stock?.logo_url} alt={`${stock?.name} logo`} className="w-12 h-12 rounded-sm shadow-md" />

                    <div className="flex flex-col items-start justify-between">
                        <h1 className="text-lg font-bold">{stock?.symbol}</h1>
                        <p className="text-sm">{stock?.name}</p>
                    </div>

                </div>

            }

        </div>
    )
}

