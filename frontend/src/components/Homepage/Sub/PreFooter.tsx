import { MdCreditCard } from "react-icons/md"

interface PreFooterProps {
    onCTAClick: () => void
}

export const PreFooter = ({ onCTAClick }: PreFooterProps) => {
    return (
        <div className="max-w-7xl container mx-auto space-y-10 py-[50px] lg:py-[100px] px-3 lg:px-6">

            <div className="text-center space-y-10 text-primary">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">Ready to discover <br /> dividends? <span className="text-secondary">Let's begin.</span></h2>
                <p className="text-sm md:text-lg lg:text-xl text-secondary text-pretty max-w-2xl mx-auto">Completely free with no hidden costs</p>
            </div>

            <div className="flex flex-col justify-center items-center">

                <button
                    onClick={onCTAClick}
                    className="bg-primary hover:bg-primary/90 text-background font-semibold px-10 py-3 rounded-md text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none w-fit cursor-pointer">
                    Explore Now
                </button>

                <p className="text-sm text-secondary/70 mt-4 inline-flex justify-center items-center gap-2"><MdCreditCard size={16} /> No credit card required</p>

            </div>

        </div>
    )
}
