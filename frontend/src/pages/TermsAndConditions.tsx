export const TermsAndConditions = () => {
    return (
        <div className="min-h-screen">

            <div className="max-w-4xl mx-auto py-12 pt-22">

                <div className="lg:bg-layer lg:rounded-lg p-4 lg:p-6 lg:shadow-sm text-sm">

                    <h1 className="text-3xl font-bold text-primary mb-8">Terms & Conditions</h1>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-secondary text-sm mb-8">Last Updated: September 1, 2025</p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            By accessing and using Dividends4Income ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">2. Description of Service</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            Dividends4Income is a dividend investing platform that provides:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li>Real-time stock data and dividend information from Yahoo Finance</li>
                            <li>Company ticker search using SEC data</li>
                            <li>Reddit community sentiment analysis</li>
                            <li>AI-powered market insights and predictions via OpenRouter</li>
                            <li>Dividend tracking and analysis tools</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">3. User Responsibilities</h2>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">3.1 Acceptable Use</h3>
                        <p className="text-secondary leading-relaxed mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li>Use the Service for any illegal or unauthorized purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Use automated tools, bots, or scrapers to access the Service</li>
                            <li>Exceed reasonable usage limits</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use the Service to transmit harmful or malicious content</li>
                        </ul>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">3.2 Investment Decisions</h3>
                        <p className="text-secondary leading-relaxed mb-6">
                            <strong>Investment Risk Disclaimer:</strong> All investment decisions are made at your own risk. The information provided by Dividends4Income is for educational and informational purposes only. We do not provide investment advice, recommendations, or endorsements. Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">4. Intellectual Property</h2>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">4.1 Our Content</h3>
                        <p className="text-secondary leading-relaxed mb-4">
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Dividends4Income and its licensors. The Service is protected by copyright, trademark, and other laws.
                        </p>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">4.2 Third-Party Content</h3>
                        <p className="text-secondary leading-relaxed mb-6">
                            Stock data, company information, and other content from third-party providers (Yahoo Finance, SEC, Reddit, etc.) remain the property of their respective owners. We do not claim ownership of this content and provide it to you under their respective terms of service.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">5. Privacy and Data</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                        </p>
                        <p className="text-secondary leading-relaxed mb-6">
                            By using the Service, you consent to the collection and use of information as outlined in our Privacy Policy.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">6. Third-Party Services</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            The Service integrates with various third-party APIs and services:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li><strong>Yahoo Finance</strong>: Stock data and financial information</li>
                            <li><strong>SEC EDGAR</strong>: Company filings and ticker data</li>
                            <li><strong>Reddit</strong>: Community discussions and sentiment</li>
                            <li><strong>OpenRouter</strong>: AI analysis and predictions</li>
                            <li><strong>Clearbit</strong>: Company logo images</li>
                        </ul>
                        <p className="text-secondary leading-relaxed mb-6">
                            Your use of these third-party services is subject to their respective terms of service and privacy policies. We are not responsible for their content, availability, or practices.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">7. Service Availability and Limitations</h2>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">7.1 Rate Limiting</h3>
                        <p className="text-secondary leading-relaxed mb-4">
                            To ensure fair access for all users, we implement rate limiting. Excessive usage may result in temporary or permanent access restrictions.
                        </p>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">7.2 Service Interruptions</h3>
                        <p className="text-secondary leading-relaxed mb-6">
                            We strive for high availability but cannot guarantee uninterrupted access to the Service. The Service may be temporarily unavailable due to maintenance, third-party service outages, or other factors beyond our control.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">8. Disclaimers</h2>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">8.1 No Investment Advice</h3>
                        <p className="text-secondary leading-relaxed mb-4">
                            <strong>THE SERVICE IS PROVIDED FOR INFORMATIONAL PURPOSES ONLY.</strong> We do not provide investment advice, financial planning, or recommendations. All content is for educational purposes and should not be considered as professional financial advice.
                        </p>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">8.2 Accuracy of Information</h3>
                        <p className="text-secondary leading-relaxed mb-4">
                            While we strive for accuracy, we cannot guarantee the completeness, timeliness, or accuracy of information provided by third-party services. Stock prices and market data may be delayed or inaccurate.
                        </p>

                        <h3 className="text-lg font-medium text-primary mt-6 mb-3">8.3 AI-Generated Content</h3>
                        <p className="text-secondary leading-relaxed mb-6">
                            AI-powered analysis and predictions are generated using third-party AI services and should not be considered as professional financial advice. AI responses may contain errors or biases.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">9. Limitation of Liability</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            <strong>IN NO EVENT SHALL DIVIDENDS4INCOME</strong> be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <li>Your use of or inability to use the Service</li>
                            <li>Any unauthorized access to or use of our servers</li>
                            <li>Any interruption or cessation of transmission to or from the Service</li>
                            <li>Any bugs, viruses, trojan horses, or the like</li>
                            <li>Any errors or omissions in any content or for any loss or damage incurred</li>
                            <li>Investment decisions made based on Service information</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">10. Indemnification</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            You agree to defend, indemnify, and hold harmless Dividends4Income and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, or b) a breach of these Terms.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">11. Termination</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">12. Governing Law</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            These Terms shall be interpreted and governed by the laws of the jurisdiction in which Dividends4Income operates, without regard to conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">13. Changes to Terms</h2>
                        <p className="text-secondary leading-relaxed mb-6">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">14. Contact Information</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            If you have any questions about these Terms & Conditions, please contact us:
                        </p>
                        <ul className="text-secondary leading-relaxed mb-6 list-disc list-inside space-y-2">
                            <strong>Email</strong>: <a href="mailto:reachme@akhilkumar.dev" className="text-primary hover:text-secondary transition-colors">reachme@akhilkumar.dev</a>
                        </ul>

                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">15. Severability</h2>
                        <p className="text-secondary leading-relaxed">
                            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}
