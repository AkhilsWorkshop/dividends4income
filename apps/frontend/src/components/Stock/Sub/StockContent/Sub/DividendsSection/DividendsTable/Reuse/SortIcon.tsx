type SortField = 'date' | 'amount' | 'change_percent'
type SortDirection = 'asc' | 'desc'

interface SortIconProps {
    field: SortField
    sortField: SortField
    sortDirection: SortDirection
}

export const SortIcon = ({ field, sortField, sortDirection }: SortIconProps) => {
    if (sortField !== field) return null

    return (
        <span className="ml-1">
            {sortDirection === 'asc' ? '↑' : '↓'}
        </span>
    )
}

export type { SortField, SortDirection }