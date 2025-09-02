import { themeStore } from "@/stores/theme"

export const Features = () => {

    const isDark = themeStore.value.isDark

    const features = [
        {
            title: "Live Market Data",
            description: "Access real-time stock prices, dividend yields, market capitalization, P/E ratios and essential financial metrics to stay ahead of market movements.",
            url: "/images/homepage/features/data"
        },
        {
            title: "AI-Powered Insights",
            description: "Leverage AI-driven predictions, sentiment analysis and community discussions to uncover hidden opportunities and make data-informed decisions.",
            url: "/images/homepage/features/insights"
        },
        {
            title: "Reddit Community Hub",
            description: "Dive into the latest Reddit threads and discussions with direct links, giving you real-time investor sentiment and trending topics.",
            url: "/images/homepage/features/reddit"
        },
        {
            title: "Simple Table View",
            description: "Compare dividends side-by-side in an intuitive tabular format, perfect for quick analysis and spotting the best investment opportunities.",
            url: "/images/homepage/features/table"
        },
        {
            title: "Dividend Analytics",
            description: "Explore dividend histories with interactive charts, tracking payment trends, growth patterns and historical performance.",
            url: "/images/homepage/features/analytics"
        },
    ]

    return (
        <div id="features" className="max-w-7xl container mx-auto space-y-3 lg:space-y-6 py-[50px] lg:py-[100px] px-3 lg:px-6">

            <div className="text-center space-y-10 text-primary pb-10">
                <h2 className="text-2xl lg:text-5xl font-semibold text-balance">Simple Features <br />for <span className="text-secondary">Smart Investing</span></h2>
                <p className="text-sm md:text-lg lg:text-xl text-secondary text-pretty max-w-2xl mx-auto">Easily understand and analyze dividend stocks to optimize your investment strategy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">

                {features?.slice(0, 3)?.map((feature, index) =>

                    <div key={index} className="bg-layer/50 rounded-xl border border-border shadow-sm p-4 overflow-hidden">

                        <div className="overflow-hidden border border-border rounded-md">

                            <img src={`${feature.url}${isDark ? "-dark" : ""}.png`} alt={feature.title} className="w-full h-full object-cover rounded-md aspect-square" />

                        </div>

                        <div className="p-2">

                            <h3 className="text-lg font-semibold text-primary pt-3 pb-2">
                                {feature.title}
                            </h3>

                            <p className="text-secondary text-sm">
                                {feature.description}
                            </p>

                        </div>

                    </div>

                )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">

                {features?.slice(3, 5)?.map((feature, index) =>

                    <div key={index} className="bg-layer/50 rounded-xl border border-border shadow-sm p-4 overflow-hidden">

                        <div className="overflow-hidden border border-border rounded-md">

                            <img src={`${feature.url}${isDark ? "-dark" : ""}.png`} alt={feature.title} className="w-full h-full object-cover rounded-md aspect-video" />

                        </div>

                        <div className="p-2">

                            <h3 className="text-lg font-semibold text-primary pt-3 pb-2">
                                {feature.title}
                            </h3>

                            <p className="text-secondary text-sm">
                                {feature.description}
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}
