'use client'

import { useState, useMemo } from 'react'
import { Header } from './DividendsTable/Header'
import { TableHeader } from './DividendsTable/TableHeader'
import { TableBody } from './DividendsTable/TableBody'
import { Pagination } from './DividendsTable/Pagination'
import type { SortField, SortDirection } from './DividendsTable/Reuse/SortIcon'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'
import { fadeUp } from '@/animations/variants'

interface DividendData {
    date: string
    amount: number
    change_percent: number
}

interface DividendsTableProps {
    dividends: DividendData[]
}

export const DividendsTable = ({ dividends }: DividendsTableProps) => {

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

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('desc')
        }
        setCurrentPage(1)
    }

    return (
        <MotionTag
            variants={fadeUp}
            className='w-full col-span-5 lg:col-span-2 text-primary bg-layer/20 rounded-xl block border border-border'>

            <>

                <Header
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalItems={sortedDividends.length}
                />

                <div className="overflow-x-auto">

                    <table className="min-w-full table-auto">

                        <TableHeader
                            onSort={handleSort}
                            sortField={sortField}
                            sortDirection={sortDirection}
                        />

                        <TableBody dividends={currentDividends} />

                    </table>

                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

            </>

        </MotionTag>
    )
}
