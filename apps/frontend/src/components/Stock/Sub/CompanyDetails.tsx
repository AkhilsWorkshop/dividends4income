'use client'

import { memo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { FaBuilding } from 'react-icons/fa6'
import { MdExpandMore } from 'react-icons/md'
import { cn } from '@/utils'

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

    const [isExpanded, setIsExpanded] = useState(false)
    const shouldReduce = useReducedMotion()

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
        <div className="glass-card p-4 lg:p-6 text-primary space-y-6">

            <div className="flex items-center gap-3">
                <div className="p-3 glass-card text-accent">
                    <FaBuilding size={20} />
                </div>
                <div className="flex-1 overflow-hidden">
                    <h2 className="font-bold text-xl text-primary">Company Details</h2>
                    <p className="text-sm text-secondary truncate">About {name}</p>
                </div>
                {logoURL && <img src={logoURL} alt={`${name} logo`} className="w-9 h-9 rounded-lg ml-auto" />}
            </div>

            <motion.div
                variants={staggerContainer}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}>
                {infoItems.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        className="flex justify-between items-center py-2.5 border-b border-border/40 last:border-b-0">
                        <span className="text-sm text-secondary">{item.label}</span>
                        <span className="text-sm font-semibold text-primary">{item.value ?? 'N/A'}</span>
                    </motion.div>
                ))}
            </motion.div>

            {businessSummary && (
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wide">About</h3>
                    <p className={cn('text-sm text-secondary leading-relaxed', isExpanded ? '' : 'line-clamp-[6]')}>
                        {businessSummary}
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-xs text-accent font-medium cursor-pointer hover:brightness-110 transition-all duration-200">
                        Show {isExpanded ? 'Less' : 'More'}
                        <span className={cn(isExpanded ? 'rotate-180' : '', 'transition-transform duration-300')}>
                            <MdExpandMore size={14} />
                        </span>
                    </button>
                </div>
            )}

        </div>
    )
})

CompanyDetails.displayName = 'CompanyDetails'
