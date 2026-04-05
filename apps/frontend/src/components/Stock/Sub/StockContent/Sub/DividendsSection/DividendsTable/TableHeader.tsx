import { SortIcon, type SortField } from './Reuse/SortIcon'

interface TableHeaderProps {
    onSort: (field: SortField) => void
    sortField: SortField
    sortDirection: 'asc' | 'desc'
}

export const TableHeader = ({ onSort, sortField, sortDirection }: TableHeaderProps) => {
    return (
        <thead>
            <tr className="bg-background border-y border-border text-xs lg:text-sm">

                <th
                    className="text-left py-2 px-6 font-semibold cursor-pointer transition-colors"
                    onClick={() => onSort('date')}>
                    Date <SortIcon field="date" sortField={sortField} sortDirection={sortDirection} />
                </th>

                <th
                    className="text-left py-2 px-6 font-semibold cursor-pointer transition-colors"
                    onClick={() => onSort('amount')}>
                    Amount <SortIcon field="amount" sortField={sortField} sortDirection={sortDirection} />
                </th>

                <th
                    className="text-left py-2 px-6 font-semibold cursor-pointer transition-colors"
                    onClick={() => onSort('change_percent')}>
                    Change % <SortIcon field="change_percent" sortField={sortField} sortDirection={sortDirection} />
                </th>

            </tr>
        </thead>
    )
}