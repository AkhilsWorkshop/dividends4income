import { Router, Route } from 'preact-router'
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary'
import { Header } from '@/components/Layout/Header'
import { HomePage } from '@/pages/HomePage'
import { StockPage } from '@/pages/StockPage'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { TermsAndConditions } from '@/pages/TermsAndConditions'
import { Footer } from './components/Layout/Footer'

export function App() {
    return (
        <ErrorBoundary>

            <div className='min-h-screen'>

                <Header />

                <main className="mx-auto">
                    <Router>
                        <Route path="/" component={HomePage} />
                        <Route path="/stock/:ticker" component={StockPage} />
                        <Route path="/privacy-policy" component={PrivacyPolicy} />
                        <Route path="/terms-and-conditions" component={TermsAndConditions} />
                    </Router>
                </main>

                <Footer />

            </div>

        </ErrorBoundary>
    )
}
