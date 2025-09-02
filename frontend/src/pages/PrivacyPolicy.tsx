export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen">

            <div className="max-w-4xl mx-auto py-12 pt-22">

                <div className="lg:bg-layer lg:rounded-lg p-4 lg:p-6 lg:shadow-sm text-sm">

                    <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-secondary text-sm mb-8">Last Updated: September 1, 2025</p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">1. Introduction</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            Dividends4Income ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our dividend investing platform (the "Service").
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">2. Information We Collect</h2>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">2.1 Information Collected Automatically</h3>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>IP Address</strong>: Used for rate limiting and security purposes</li>
                            <li><strong>User Agent</strong>: Browser and device information for compatibility and security</li>
                            <li><strong>Referer and Origin Headers</strong>: To validate legitimate access from our website</li>
                        </ul>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">2.2 Information from Third-Party Services</h3>
                        <p className="text-secondary leading-relaxed mb-4">
                            We integrate with the following third-party services to provide our features:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Yahoo Finance API</strong>: Stock prices, dividend data, and company information</li>
                            <li><strong>SEC API</strong>: Company ticker search functionality</li>
                            <li><strong>Reddit API</strong>: Community discussions and sentiment analysis</li>
                            <li><strong>OpenRouter API</strong>: AI-powered market insights and predictions</li>
                            <li><strong>Clearbit API</strong>: Company logo images</li>
                        </ul>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">2.3 Cookies and Local Storage</h3>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>API Response Caching</strong>: We cache API responses locally in your browser for up to 10 minutes to improve performance</li>
                            <li><strong>No Tracking Cookies</strong>: We do not use cookies for tracking or analytics</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">3. How We Use Your Information</h2>
                        <p className="text-secondary leading-relaxed mb-4">We use the collected information for:</p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Service Delivery</strong>: Providing real-time stock data, dividend information, and analysis</li>
                            <li><strong>Security</strong>: Rate limiting to prevent abuse and ensure fair access</li>
                            <li><strong>Performance</strong>: Caching responses to reduce load times</li>
                            <li><strong>Platform Integrity</strong>: Validating legitimate access and preventing unauthorized API usage</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">4. Information Sharing and Disclosure</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            We do not sell, trade, or otherwise transfer your information to third parties except in the following limited circumstances:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Service Providers</strong>: Third-party APIs (Yahoo Finance, Reddit, OpenRouter, etc.) receive requests containing search terms and stock symbols</li>
                            <li><strong>Legal Requirements</strong>: When required by law or to protect our rights</li>
                            <li><strong>Platform Security</strong>: To prevent fraud, abuse, or security threats</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">5. Data Retention</h2>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Automatic Data</strong>: IP addresses and user agents are retained only for the duration of your session and security purposes</li>
                            <li><strong>Cached Data</strong>: API responses are cached in your browser for a limited time to improve performance</li>
                            <li><strong>No Personal Data Storage</strong>: We do not store personal information, user accounts, or historical usage data</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">6. Third-Party Services</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            Our Service integrates with several third-party APIs. Each has its own privacy policy and we encourage you to review these policies as we are not responsible for their data practices.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">7. Data Security</h2>
                        <p className="text-secondary leading-relaxed mb-4">We implement appropriate security measures:</p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Rate Limiting</strong>: We limit request frequency to ensure fair access for all users</li>
                            <li><strong>Access Validation</strong>: We validate requests to ensure they come from legitimate sources</li>
                            <li><strong>API Key Protection</strong>: Third-party API credentials are securely managed</li>
                            <li><strong>HTTPS Encryption</strong>: All data transmission is encrypted</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">8. International Data Transfers</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            Stock data and analysis may be processed by third-party services located outside your country. By using our Service, you consent to such transfers.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">9. Children's Privacy</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">10. Changes to This Privacy Policy</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            We may update this Privacy Policy from time to time. We will notify users of material changes by updating the "Last Updated" date.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">11. Contact Us</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <strong>Email</strong>: <a href="mailto:reachme@akhilkumar.dev" className="text-primary hover:text-secondary transition-colors">reachme@akhilkumar.dev</a>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">12. Your Rights</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            Depending on your location, you may have certain rights regarding your data:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Access</strong>: Request information about what data we have</li>
                            <li><strong>Correction</strong>: Request correction of inaccurate data</li>
                            <li><strong>Deletion</strong>: Request deletion of your data (though we collect minimal data)</li>
                            <li><strong>Opt-out</strong>: Stop using the service</li>
                        </ul>
                        <p className="text-secondary leading-relaxed">
                            Since we collect minimal data and no personal information, most data rights requests will result in no action needed.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}
