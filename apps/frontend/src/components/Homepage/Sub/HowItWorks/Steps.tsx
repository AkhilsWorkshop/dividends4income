import { fadeUp, staggerContainer } from "@/animations/variants"
import { MotionTag } from "@/components/Common/Reuse/MotionTag"
import { cn } from "@/utils"
import { LuMoveRight } from "react-icons/lu"

const STEPS = [
    {
        title: 'Search & Discover',
        description: 'Find stocks using our search bar or browse popular options',
        accent: 'text-purple-300',
        bg: 'bg-purple-300/20',
        border: 'border-purple-300/20',
        accentColor: 'rgba(0,45,156,0.18)'
    },
    {
        title: 'Analyze & Review Insights',
        description: 'View comprehensive stock information, history and AI-powered market analysis.',
        accent: 'text-accent',
        bg: 'bg-accent/20',
        border: 'border-accent/20',
        accentColor: 'rgba(255,217,0,0.18)'
    },
    {
        title: 'Make Decisions',
        description: 'Use the data and AI-powered market insights to make informed investment decisions',
        accent: 'text-gain',
        bg: 'bg-gain/20',
        border: 'border-gain/20',
        accentColor: 'rgba(0,208,156,0.18)'
    }
]

export const Steps = () => {
    return (
        <MotionTag
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

            {STEPS.map((step, index) => {

                return (
                    <EachStep
                        key={index}
                        index={index}
                        title={step.title}
                        description={step.description}
                        bg={step.bg}
                        border={step.border}
                        accent={step.accent}
                        accentColor={step.accentColor}
                    />
                )
            })}

        </MotionTag>
    )
}

type EachStepProps = {
    index: number
    title: string
    description: string
    bg: string
    border: string
    accent: string
    accentColor: string
}

const EachStep = ({ index, title, description, bg, border, accent, accentColor }: EachStepProps) => {

    return (
        <MotionTag
            key={index}
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="relative border border-border bg-layer/40 p-6 flex items-center justify-start gap-6 rounded-xl" >

            <div
                className={`w-20 h-20 rounded-md flex items-center justify-center shrink-0 ${bg} border ${border} accent-inset`}
                style={{ ['--accent-inset' as any]: accentColor }}>
                <span className={cn(accent, "font-bold text-5xl")}>{index + 1}</span>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-primary mb-1">{title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{description}</p>
            </div>

            {index < 2 && (
                <span className="hidden lg:flex absolute left-auto translate-x-0 rotate-0 bottom-auto -right-8 text-2xl text-secondary/30">
                    <LuMoveRight />
                </span>
            )}

        </MotionTag >
    )
}
