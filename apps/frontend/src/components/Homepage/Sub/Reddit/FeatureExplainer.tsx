import { staggerContainer, scaleIn } from '@/animations/variants'
import { MdTrendingUp, MdGroups } from 'react-icons/md'
import { LuSparkles } from 'react-icons/lu'
import { MotionDiv } from '@/components/Common/Reuse/MotionDiv'
import { cn } from '@/utils'

const FEATURES = [
    {
        icon: MdGroups,
        title: 'Community Pulse',
        description: 'Real investor conversations from r/dividends and other financial communities — unfiltered and up to date.',
        accent: 'text-accent',
        bg: 'bg-accent/20',
        border: 'border-accent/20',
        accentColor: 'rgba(255,217,0,0.18)'
    },
    {
        icon: MdTrendingUp,
        title: 'Trending Discussions',
        description: 'Posts sorted by community activity, so you always see what dividend investors are talking about right now.',
        accent: 'text-[#FF4500]',
        bg: 'bg-[#FF4500]/20',
        border: 'border-[#FF4500]/20',
        accentColor: 'rgba(255,69,0,0.18)'
    },
    {
        icon: LuSparkles,
        title: 'Sentiment Analysis',
        description: 'Quickly gauge market mood — upvotes, comment counts, and discussion depth surface what the crowd truly thinks.',
        accent: 'text-gain',
        bg: 'bg-gain/20',
        border: 'border-gain/20',
        accentColor: 'rgba(0,208,156,0.18)'
    },
]

export const FeatureExplainer = () => {

    return (
        <MotionDiv
            variants={staggerContainer}
            initial='hidden'
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            useDefaultInView={false}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

            {FEATURES.map((feature, i) => {

                const Icon = feature.icon

                return (
                    <Feature
                        key={i}
                        i={i}
                        icon={Icon}
                        title={feature.title}
                        description={feature.description}
                        accent={feature.accent}
                        bg={feature.bg}
                        border={feature.border} />
                )
            })}

        </MotionDiv>
    )
}

interface FeatureProps {
    i: number
    icon: any
    title: string
    description: string
    accent: string
    bg: string
    border: string
    accentColor?: string
}

const Feature = ({ i, icon: Icon, title, description, accent, bg, border, accentColor }: FeatureProps) => {

    return (
        <MotionDiv
            key={i}
            variants={scaleIn}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="border border-border bg-layer/40 p-6 flex items-center justify-center gap-10 hover:border-accent/30 transition-colors duration-300 rounded-xl" >

            <div>
                <h3 className="text-sm font-semibold text-primary mb-1">{title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{description}</p>
            </div>

            <div
                className={`w-20 h-20 rounded-md flex items-center justify-center shrink-0 ${bg} border ${border} accent-inset`}
                style={{ ['--accent-inset' as any]: accentColor }}
            >
                <Icon className={cn(accent, "size-10")} />
            </div>


        </MotionDiv >
    )
}
