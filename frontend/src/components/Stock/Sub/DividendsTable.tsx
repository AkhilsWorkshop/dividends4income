import { useState, useMemo } from 'preact/hooks'
import { cn } from "@/utils"
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from 'react-icons/md'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { RiStockFill } from 'react-icons/ri'

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

type SortField = 'date' | 'amount' | 'change_percent'
type SortDirection = 'asc' | 'desc'

interface DividendsTableProps {
    dividends: DividendData[]
    loading: boolean
}

export const DividendsTable = ({ dividends, loading }: DividendsTableProps) => {

    const [sortField, setSortField] = useState<SortField>('date')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const sortedDividends = useMemo(() => {

        const sorted = [...dividends].sort((a, b) => {

            let aValue: any
            let bValue: any

            switch (sortField) {
                case 'date':
                    aValue = new Date(a.date).getTime()
                    bValue = new Date(b.date).getTime()
                    break
                case 'amount':
                    aValue = a.amount
                    bValue = b.amount
                    break
                case 'change_percent':
                    aValue = a.change_percent
                    bValue = b.change_percent
                    break
                default:
                    return 0
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

        return sorted

    }, [dividends, sortField, sortDirection])

    const totalPages = Math.ceil(sortedDividends.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentDividends = sortedDividends.slice(startIndex, endIndex)

    const getVisiblePages = () => {

        const maxButtons = 4

        if (totalPages <= maxButtons) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const pages = []

        pages.push(1)

        const remainingSlots = maxButtons - 2

        let start, end

        if (currentPage <= 2) {

            start = 2
            end = Math.min(totalPages - 1, 1 + remainingSlots)
        } else if (currentPage >= totalPages - 1) {

            start = Math.max(2, totalPages - remainingSlots)
            end = totalPages - 1
        } else {

            start = currentPage
            end = Math.min(totalPages - 1, currentPage + remainingSlots - 1)
        }

        if (start > 2) {
            pages.push('...')
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages - 1) {
            pages.push('...')
        }

        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('desc')
        }
        setCurrentPage(1)
    }

    const SortIcon = ({ field }: { field: SortField }) => {

        if (sortField !== field) return null

        return (
            <span className="ml-1">
                {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
        )
    }

    return (
        <div className='w-full col-span-5 lg:col-span-2 bg-layer rounded-xl border border-border shadow-sm text-primary'>

            {loading ?

                <>

                    <div className="flex justify-between items-center p-4 lg:p-6">

                        <div className="animate-pulse flex items-center gap-3 max-w-md w-full">

                            <div className="bg-surface/50 h-10 lg:h-14 w-10 lg:w-14 animate-pulse rounded-lg aspect-square" />

                            <div className="space-y-2 w-full">
                                <div className="h-6 bg-surface/75 rounded-sm w-1/3" />
                                <div className="h-4 bg-surface/50 rounded-sm w-1/2" />
                            </div>

                        </div>

                        <div className="bg-surface/50 h-5 w-20 lg:w-22 animate-pulse rounded-sm" />

                    </div>

                    <div className="px-6 py-3 space-y-3">

                        {[...Array(5)].map((_, index) => (

                            <div key={index} className="w-full h-6 bg-surface/50 odd:bg-surface/75 animate-pulse rounded-sm"></div>

                        ))}

                    </div>

                </>

                :

                <>

                    <div className="flex justify-between items-center p-4 lg:p-6">

                        <div className="flex items-center gap-3">

                            <div className="p-2 lg:p-4 bg-layer border border-border rounded-lg shadow-sm text-primary">
                                <RiStockFill size={24} />
                            </div>

                            <div>
                                <h1 className="font-bold text-xl lg:text-2xl text-primary">
                                    Dividends
                                </h1>
                                <p className="text-sm text-secondary">
                                    Payments history
                                </p>
                            </div>

                        </div>

                        <span className="text-[10px] text-secondary bg-background px-2 py-1 rounded-sm border border-border">
                            Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, sortedDividends.length)}</span> of <span className="font-semibold">{sortedDividends.length}</span>
                        </span>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full table-auto">

                            <thead>

                                <tr className="bg-background border-y border-border text-xs lg:text-sm">

                                    <th
                                        className="text-left py-2 px-6 font-semibold cursor-pointer transition-colors"
                                        onClick={() => handleSort('date')}>
                                        Date <SortIcon field="date" />
                                    </th>

                                    <th
                                        className="text-left py-2 px-6 font-semibold cursor-pointer transition-colors"
                                        onClick={() => handleSort('amount')}>
                                        Amount <SortIcon field="amount" />
                                    </th>

                                    <th
                                        className="text-left py-2 px-6 font-semibold cursor-pointer transition-colors"
                                        onClick={() => handleSort('change_percent')}>
                                        Change % <SortIcon field="change_percent" />
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentDividends.map((dividend, index) => (

                                    <tr key={index} className="border-b border-border hover:bg-background transition-colors">

                                        <td className="py-2 px-6 text-xs lg:text-sm">{dividend.date}</td>
                                        <td className="py-2 px-6 text-sm lg:text-base">${dividend.amount.toFixed(2)}</td>

                                        <td className="py-2 px-6">

                                            {dividend.change_percent > 0 ?

                                                <span className="bg-green-500/40 text-green-900 dark:bg-green-500/20 dark:text-green-500 px-2 rounded-md text-[10px] py-0.5 font-medium inline-flex items-center justify-center gap-1">
                                                    <MdTrendingUp size={13} /> {dividend.change_percent.toFixed(2)}%
                                                </span>

                                                :

                                                dividend.change_percent < 0 ?

                                                    <span className="bg-red-500/40 text-red-900 dark:bg-red-500/20 dark:text-red-500 px-2 rounded-md text-[10px] py-0.5 font-medium inline-flex items-center justify-center gap-1">
                                                        <MdTrendingDown size={13} /> {dividend.change_percent.toFixed(2)}%
                                                    </span>

                                                    :

                                                    <span className="bg-yellow-500/40 text-yellow-900 dark:bg-yellow-500/20 dark:text-yellow-500 px-2 rounded-md text-[10px] py-0.5 font-medium inline-flex items-center justify-center gap-1">
                                                        <MdTrendingFlat size={13} /> {dividend.change_percent.toFixed(2)}%
                                                    </span>

                                            }

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {totalPages > 1 && (

                        <div className="flex justify-between items-center p-6">

                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="h-8 w-8 text-sm text-primary not-disabled:hover:text-background not-disabled:hover:bg-primary not-disabled:cursor-pointer duration-300 transition-all rounded-sm flex justify-center items-center">
                                <FaArrowLeft size={15} />
                            </button>

                            <div className="flex space-x-1">

                                {visiblePages.map((page, index) =>

                                    page === '...' ?

                                        <span key={`ellipsis-${index}`} className="px-2 text-primary">
                                            ...
                                        </span>

                                        :

                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page as number)}
                                            className={cn(
                                                "h-8 w-8 text-xs lg:text-sm duration-300 transition-all rounded-sm cursor-pointer",
                                                currentPage === page
                                                    ? "bg-primary text-background"
                                                    : "bg-transparent hover:bg-primary/80 hover:text-background"
                                            )}>
                                            {page}
                                        </button>

                                )}

                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="h-8 w-8 text-sm disabled:cursor-not-allowed text-primary not-disabled:hover:text-background not-disabled:hover:bg-primary duration-300 transition-all rounded-sm cursor-pointer flex justify-center items-center">
                                <FaArrowRight size={15} />
                            </button>

                        </div>
                    )}

                </>

            }

        </div>
    )
}
