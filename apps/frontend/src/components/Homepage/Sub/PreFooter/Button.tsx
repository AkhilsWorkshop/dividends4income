"use client"

import { MotionTag } from '@/components/Common/Reuse/MotionTag'

export const Button = () => {

    const handleCTAClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
            if ((window as any).focusHeroSearch) {
                (window as any).focusHeroSearch()
            }
        }, 500)
    }

    return (
        <MotionTag
            useDefaultInView={false}
            includeLazyMotion={false}
            className="text-center">

            <button
                onClick={handleCTAClick}
                className="border border-accent/50 hover:border-accent/60 text-accent font-semibold px-7 py-3.5 rounded-lg hover:rounded-2xl text-sm backdrop-blur-xs transition-all duration-200 cursor-pointer z-0">
                Explore Now
            </button>

        </MotionTag>
    )
}

