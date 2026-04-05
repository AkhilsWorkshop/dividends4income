import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from 'react-icons/md'

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface TableBodyProps {
    dividends: DividendData[]
}

export const TableBody = ({ dividends }: TableBodyProps) => {
    return (
        <tbody>
            {dividends.map((dividend, index) => (

                <tr key={index} className="border-b border-border hover:bg-background transition-colors">

                    <td className="py-2 px-6 text-xs lg:text-sm">{dividend.date}</td>
                    <td className="py-2 px-6 text-sm lg:text-base">${dividend.amount.toFixed(2)}</td>

                    <td className="py-2 px-6">

                        {dividend.change_percent > 0 ?

                            <span className="bg-gain/10 text-gain px-2 rounded-md text-[10px] py-0.5 font-medium inline-flex items-center justify-center gap-1">
                                <MdTrendingUp size={13} /> {dividend.change_percent.toFixed(2)}%
                            </span>

                            :

                            dividend.change_percent < 0 ?

                                <span className="bg-loss/10 text-loss px-2 rounded-md text-[10px] py-0.5 font-medium inline-flex items-center justify-center gap-1">
                                    <MdTrendingDown size={13} /> {dividend.change_percent.toFixed(2)}%
                                </span>

                                :

                                <span className="bg-surface/30 text-secondary px-2 rounded-md text-[10px] py-0.5 font-medium inline-flex items-center justify-center gap-1">
                                    <MdTrendingFlat size={13} /> {dividend.change_percent.toFixed(2)}%
                                </span>

                        }

                    </td>

                </tr>

            ))}
        </tbody>
    )
}