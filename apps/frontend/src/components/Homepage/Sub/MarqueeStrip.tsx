import { fadeUp } from '@/animations/variants'
import Marquee from '@/components/Common/Reuse/Effects/Marquee'
import MotionDiv from '@/components/Common/Reuse/MotionDiv'
import type { MarqueeTicker } from '@/types'

const TickerItem = ({ symbol, price, change, up }: MarqueeTicker) => (
    <span className="inline-flex items-center gap-2 px-6 border-r border-border/30 whitespace-nowrap">
        <span className="font-semibold text-primary text-sm tracking-wide">{symbol}</span>
        <span className="text-secondary text-sm">{price}</span>
        <span className={`text-xs font-medium ${up ? 'text-gain' : 'text-loss'}`}>{change}</span>
    </span>
)

interface MarqueeStripProps {
    tickers?: MarqueeTicker[]
}

export const MarqueeStrip = ({ tickers }: MarqueeStripProps) => {

    if (!tickers || tickers.length === 0) {
        return null
    }

    return (
        <MotionDiv
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full bg-layer/60 border-y border-border/40 py-3 relative">

            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 lg:w-24 h-20 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 lg:w-24 h-20 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

            <Marquee pauseOnHover>
                {tickers.map((t, i) => (
                    <TickerItem key={i} {...t} />
                ))}
            </Marquee>

        </MotionDiv>
    )
}
