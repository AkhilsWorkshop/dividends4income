import { BasicStockInfo } from "@/types";

interface StockCardProps {
    stock: BasicStockInfo;
    onStockClick: (symbol: string) => void
}

export const StockCard = ({ stock, onStockClick }: StockCardProps) => {
    return (
        <div key={stock.symbol} onClick={() => onStockClick(stock.symbol)} className="group hover:shadow-md transition-shadow cursor-pointer bg-layer p-6 rounded-xl border border-border shadow-sm space-y-6 text-primary">

            <div className="flex items-center space-x-4">

                <img src={stock.logo_url} alt={`${stock.name} logo`} className="w-12 h-12 rounded-sm" />

                <div className="flex flex-col items-start justify-between">
                    <h1 className="text-lg font-bold">{stock.symbol}</h1>
                    <p className="text-sm">{stock.name}</p>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

                <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-semibold text-lg">{stock.price}</p>
                </div>

                <div>

                    <p className="text-muted-foreground">Change</p>
                    <p className={`font-semibold ${stock.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {stock.change}
                    </p>

                </div>

                <div>
                    <p className="text-muted-foreground">Dividend</p>
                    <p className="font-semibold">${stock.dividend_rate}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Yield</p>
                    <p className="font-semibold text-primary">{stock.dividend_yield}</p>
                </div>

            </div>

            <p className="text-center p-2 border border-primary text-primary group-hover:text-background group-hover:bg-primary duration-300 transition-all rounded-sm">View Details</p>

        </div>
    )
}

export const StockCardLoading = () => {

    return (
        <div className="bg-layer p-6 rounded-xl border border-border shadow-sm space-y-6 text-primary">

            <div className="flex items-center space-x-4">

                <div className="w-12 h-12 rounded-sm bg-surface/50 animate-pulse" />

                <div className="flex flex-col items-start justify-between gap-2">
                    <div className="w-20 h-5 bg-surface/50 animate-pulse rounded-sm" />
                    <div className="w-32 h-4 bg-surface/75 animate-pulse rounded-sm" />
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

                <div className="h-10 w-[85%] bg-surface/50 animate-pulse rounded-sm" />

                <div className="h-10 w-[75%] bg-surface/75 animate-pulse rounded-sm" />

                <div className="h-10 w-[75%] bg-surface/75 animate-pulse rounded-sm" />

                <div className="h-10 w-[65%] bg-surface/50 animate-pulse rounded-sm" />

            </div>

            <div className="h-10 w-full p-2 bg-surface/75 animate-pulse rounded-sm" />

        </div>
    )
}
