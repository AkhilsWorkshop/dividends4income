import { RiStockFill } from 'react-icons/ri'

interface HeaderProps {
    startIndex: number
    endIndex: number
    totalItems: number
}

export const Header = ({ startIndex, endIndex, totalItems }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center p-4 lg:p-6">

            <div className="flex items-center gap-3">

                <div className="p-3 glass-card text-accent">
                    <RiStockFill size={20} />
                </div>

                <div>
                    <h2 className="font-bold text-xl text-primary">
                        Dividends
                    </h2>
                    <p className="text-sm text-secondary">
                        Payments history
                    </p>
                </div>

            </div>

            <span className="text-[10px] text-secondary bg-background px-2 py-1 rounded-sm border border-border">
                Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, totalItems)}</span> of <span className="font-semibold">{totalItems}</span>
            </span>

        </div>
    )
}