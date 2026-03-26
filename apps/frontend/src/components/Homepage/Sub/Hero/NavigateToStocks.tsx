import { fadeUp } from '@/animations/variants'
import * as motion from "motion/react-m"

const NavigateToStocks = () => {

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <motion.div variants={fadeUp} className="text-center">

            <button
                onClick={() => scrollTo('popular-stocks')}
                className="border border-border/60 hover:border-accent/50 text-primary font-semibold px-7 py-3.5 rounded-xl text-sm hover:bg-linear-to-br from-accent/10 via-accent/30 to-accent/10 backdrop-blur-xs transition-all duration-200 cursor-pointer z-0">
                Explore Stocks →
            </button>

        </motion.div>
    )
}

export default NavigateToStocks