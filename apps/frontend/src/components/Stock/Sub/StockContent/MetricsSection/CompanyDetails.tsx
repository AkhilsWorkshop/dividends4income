import { memo } from 'react'
import { Header } from './CompanyDetails/Header'
import { InfoItems } from './CompanyDetails/InfoItems'
import { BusinessSummary } from './CompanyDetails/BusinessSummary'

interface CompanyDetailsProps {
    sector?: string
    industry?: string
    country?: string
    fullTimeEmployees?: number
    businessSummary?: string
    logoURL?: string
    name?: string
}

export const CompanyDetails = memo(({
    sector,
    industry,
    country,
    fullTimeEmployees,
    businessSummary = '',
    logoURL,
    name
}: CompanyDetailsProps) => {

    const formatEmployees = (num?: number) => {
        if (!num) return 'N/A'
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
        return num.toString()
    }

    const infoItems = [
        { label: 'Sector', value: sector ?? 'N/A' },
        { label: 'Industry', value: industry ?? 'N/A' },
        { label: 'Country', value: country ?? 'N/A' },
        { label: 'Employees', value: formatEmployees(fullTimeEmployees) }
    ]

    return (
        <div className="glass-card p-4 lg:p-6 text-primary space-y-6">

            <Header name={name} logoURL={logoURL} />

            <InfoItems items={infoItems} />

            <BusinessSummary businessSummary={businessSummary} />

        </div>
    )
})

CompanyDetails.displayName = 'CompanyDetails'
