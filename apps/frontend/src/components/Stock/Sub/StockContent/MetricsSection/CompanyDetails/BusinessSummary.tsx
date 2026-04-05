"use client"

import { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { cn } from '@/utils'
import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

interface BusinessSummaryProps {
    businessSummary: string
}

export const BusinessSummary = ({ businessSummary }: BusinessSummaryProps) => {

    const [isExpanded, setIsExpanded] = useState(false)

    if (!businessSummary) return null

    return (
        <MotionTag
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="space-y-2 pt-6">

            <h3 className="text-xs font-semibold text-primary uppercase tracking-wide">About</h3>

            <p className={cn('text-sm text-secondary leading-relaxed', isExpanded ? '' : 'line-clamp-6')}>
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

        </MotionTag>
    )
}