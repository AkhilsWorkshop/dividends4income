import { cn } from '@/utils';
import { themeStore } from '@/stores/theme';

export function AboutPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">About Dividends4Income</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Your trusted companion for dividend stock analysis
                </p>
            </div>

            <div className={cn(
                'p-6 rounded-lg shadow',
                themeStore.value.isDark
                    ? 'bg-gray-800'
                    : 'bg-white'
            )}>
                <h2 className="text-2xl font-bold mb-4">What We Do</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Dividends4Income is a comprehensive stock analysis platform focused on dividend-paying stocks.
                    We provide investors with essential tools and information to make informed decisions about their
                    dividend investment strategies.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    Our platform aggregates real-time financial data, provides interactive visualizations, and
                    offers detailed analysis of dividend-focused stocks to help you build and manage your income portfolio.
                </p>
            </div>

            <div className={cn(
                'p-6 rounded-lg shadow',
                themeStore.value.isDark
                    ? 'bg-gray-800'
                    : 'bg-white'
            )}>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📊 Real-time Stock Data</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Access up-to-date information on stock prices, dividend yields, payout ratios, and more.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📈 Interactive Charts</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Visualize stock performance with responsive, interactive charts powered by Chart.js.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🔍 Detailed Analysis</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Get comprehensive information including P/E ratios, market cap, sector analysis, and dividend history.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🌙 Modern Interface</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Enjoy a clean, responsive design with dark mode support and smooth transitions.
                        </p>
                    </div>
                </div>
            </div>

            <div className={cn(
                'p-6 rounded-lg shadow',
                themeStore.value.isDark
                    ? 'bg-gray-800'
                    : 'bg-white'
            )}>
                <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Preact with TypeScript</li>
                            <li>Tailwind CSS for styling</li>
                            <li>Chart.js for data visualization</li>
                            <li>Vite for fast development</li>
                            <li>Preact Router for navigation</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Backend</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Django REST Framework</li>
                            <li>Python for data processing</li>
                            <li>yfinance for stock data</li>
                            <li>Pandas for data analysis</li>
                            <li>RESTful API architecture</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
