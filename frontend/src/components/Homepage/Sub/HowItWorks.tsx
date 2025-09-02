import { LuMoveRight } from 'react-icons/lu'
import { MdSearch, MdVisibility, MdAnalytics, MdLightbulb } from 'react-icons/md'

export const HowItWorks = () => {

    const steps = [
        {
            icon: <MdSearch />,
            title: "Search & Discover",
            description: "Find stocks using our search bar or browse popular options"
        },
        {
            icon: <MdVisibility />,
            title: "Analyze Details",
            description: "View comprehensive stock information, history and key metrics"
        },
        {
            icon: <MdAnalytics />,
            title: "Review Insights",
            description: "Examine Reddit community discussions and AI-powered market analysis"
        },
        {
            icon: <MdLightbulb />,
            title: "Make Decisions",
            description: "Use the data and insights to make informed investment decisions"
        }
    ]

    return (
        <div id="how-it-works" className="bg-layer/50 overflow-hidden relative border-y border-border/50">

            <div className="absolute inset-0 opacity-5">

                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, var(--color-secondary) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, var(--color-secondary) 2px, transparent 2px)
                    `,
                    backgroundSize: '40px 40px'
                }} />

            </div>

            {/* <div className="py-4 bg-[repeating-linear-gradient(315deg,var(--color-border)_0,var(--color-layer)_1px,transparent_0,transparent_50%)] bg-size-[15px_15px] [--pattern-foreground:var(--color-layer)]/56" /> */}

            <div className="max-w-7xl container mx-auto space-y-10 py-[50px] lg:py-[100px] px-10">

                <div className="text-center space-y-10 text-primary">
                    <h2 className="text-2xl lg:text-5xl font-semibold text-balance">How It <span className="text-secondary">Works</span></h2>
                    <p className="text-sm md:text-lg lg:text-xl text-secondary text-pretty max-w-2xl mx-auto">Simple steps to analyze dividend stocks and optimize your investment strategy</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-6">

                    {steps.map((step, index) => (

                        <div key={index} className="relative text-center space-y-6">

                            <div className="mx-auto w-16 h-16 bg-layer border border-border rounded-full flex items-center justify-center text-secondary shadow-sm font-bold text-xl">
                                0{index + 1}
                            </div>

                            {index < 3 && (
                                <span className="absolute -bottom-[45%] md:bottom-0 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 rotate-90 md:rotate-0 md:top-3 md:-right-8 text-3xl text-primary/50"><LuMoveRight /></span>
                            )}

                            <div className="space-y-2">

                                <h3 className="text-lg font-semibold text-primary inline-flex justify-center items-center gap-1">
                                    <span className="text-3xl text-secondary">{step.icon}</span>{step.title}
                                </h3>

                                <p className="text-secondary text-sm">
                                    {step.description}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* <div className="py-4 bg-[repeating-linear-gradient(315deg,var(--color-border)_0,var(--color-layer)_1px,transparent_0,transparent_50%)] bg-size-[15px_15px] [--pattern-foreground:var(--color-layer)]/56" /> */}

        </div>
    )
}
