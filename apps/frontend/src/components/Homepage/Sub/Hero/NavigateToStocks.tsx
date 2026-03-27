"use client"

import { fadeUp } from '@/animations/variants'
import { MotionDiv } from '@/components/Common/Reuse/MotionDiv'

const NavigateToStocks = () => {

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <MotionDiv
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="text-center">

            <button
                onClick={() => scrollTo('popular-stocks')}
                className="border border-accent/50 hover:border-accent/60 text-accent font-semibold px-7 py-3.5 rounded-lg hover:rounded-2xl text-sm backdrop-blur-xs transition-all duration-200 cursor-pointer z-0">
                Explore Stocks →
            </button>

        </MotionDiv>
    )
}

export default NavigateToStocks