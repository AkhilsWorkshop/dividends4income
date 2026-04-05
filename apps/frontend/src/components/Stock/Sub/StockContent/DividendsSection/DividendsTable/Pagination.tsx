import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { cn } from "@/utils"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

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

    if (totalPages <= 1) return null

    return (
        <div className="flex justify-between items-center p-6">

            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
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
                            onClick={() => onPageChange(page as number)}
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
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 text-sm disabled:cursor-not-allowed text-primary not-disabled:hover:text-background not-disabled:hover:bg-primary duration-300 transition-all rounded-sm cursor-pointer flex justify-center items-center">
                <FaArrowRight size={15} />
            </button>

        </div>
    )
}