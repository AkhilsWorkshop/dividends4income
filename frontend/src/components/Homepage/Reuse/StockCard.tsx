interface StockCardProps {
    stock: {
        symbol: string;
        name: string;
        price: string;
        change: string;
        dividend_rate: string;
        dividend_yield: string;
        logo_url: string;
    };
    onStockClick: (symbol: string) => void
}

export const StockCard = ({ stock, onStockClick }: StockCardProps) => {
    return (
        <div key={stock.symbol} onClick={() => onStockClick(stock.symbol)} className="group hover:shadow-md transition-shadow cursor-pointer bg-layer p-6 rounded-xl border border-[#edeeb0] dark:border-[#3a3b3a] shadow-sm space-y-6 text-primary">

            <div className="flex items-center space-x-4">

                <img src={stock.logo_url} alt={`${stock.name} logo`} className="w-12 h-12" />

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
