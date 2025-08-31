import { cn } from "@/utils"
import { useState } from "preact/hooks"
import { FaBuilding } from "react-icons/fa6"
import { MdExpandMore } from "react-icons/md"

interface CompanyDetailsProps {
    loading: boolean
    sector?: string
    industry?: string
    country?: string
    fullTimeEmployees?: number
    businessSummary?: string
    logoURL?: string
    name?: string
}

export const CompanyDetails = ({
    loading,
    sector,
    industry,
    country,
    fullTimeEmployees,
    businessSummary = "",
    logoURL,
    name
}: CompanyDetailsProps) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const formatEmployees = (num?: number) => {
        if (!num) return 'N/A'
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
        return num.toString()
    }

    const infoItems = [
        { label: 'Sector', value: sector },
        { label: 'Industry', value: industry },
        { label: 'Country', value: country },
        { label: 'Employees', value: formatEmployees(fullTimeEmployees) }
    ]

    return (
        <div className="bg-layer rounded-xl border border-border shadow-sm p-4 lg:p-6 text-primary space-y-6">

            {loading ?

                <div className="animate-pulse space-y-6">

                    <div className="animate-pulse flex items-center gap-3 max-w-xl">

                        <div className="bg-surface/50 h-10 lg:h-14 w-10 lg:w-14 animate-pulse rounded-lg aspect-square" />

                        <div className="space-y-2 w-full">
                            <div className="h-6 bg-surface/75 rounded-sm w-1/3" />
                            <div className="h-4 bg-surface/50 rounded-sm w-1/2" />
                        </div>

                        <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-sm bg-surface/50 aspect-square" />

                    </div>

                    <div className="grid grid-cols-1 gap-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                                <div className="h-4 bg-primary/10 rounded w-1/3" />
                                <div className="h-4 bg-primary/10 rounded w-1/4" />
                            </div>
                        ))}
                    </div>

                </div>

                :

                <>

                    <div className="flex items-center gap-3">

                        <div className="p-2 lg:p-4 bg-layer border border-border rounded-lg shadow-sm text-primary">
                            <FaBuilding size={24} />
                        </div>

                        <div className="w-fit overflow-hidden">
                            <h1 className="font-bold text-xl lg:text-2xl text-primary">
                                Company Details
                            </h1>
                            <p className="text-sm text-secondary truncate">
                                About {name}
                            </p>
                        </div>

                        <img src={logoURL} alt={`${name} logo`} className="w-8 lg:w-10 h-8 lg:h-10 rounded-sm shadow-md ml-auto" />

                    </div>

                    <div className="grid grid-cols-1">

                        {infoItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-y border-border first:border-t-0 last:border-b-0">
                                <span className="text-sm text-secondary">{item.label}</span>
                                <span className="text-sm font-bold text-primary">{item.value}</span>
                            </div>
                        ))}

                    </div>

                    <div className="grid grid-cols-1">

                        <h3 className="text-lg font-semibold text-primary">About</h3>

                        <p className={cn("text-sm text-secondary leading-relaxed", isExpanded ? '' : 'line-clamp-[9]')}>
                            {businessSummary}
                        </p>

                        <span
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-sm text-primary transition-colors font-bold cursor-pointer">
                            Show {isExpanded ? 'Less' : 'More'} <span className={cn(isExpanded ? 'rotate-180' : 'rotate-0', 'duration-300 transition-all')}><MdExpandMore size={16} /></span>
                        </span>

                    </div>

                </>

            }

        </div>
    )
}
