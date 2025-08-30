import { Router, Route } from 'preact-router'
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary'
import { Header } from '@/components/Layout/Header'
import { HomePage } from '@/pages/HomePage'
import { StockPage } from '@/pages/StockPage'

export function App() {
    return (
        <ErrorBoundary>
            <div className='min-h-screen'>
                <Header />
                <main className="max-w-7xl mx-auto">
                    <Router>
                        <Route path="/" component={HomePage} />
                        <Route path="/stock/:ticker" component={StockPage} />
                    </Router>
                </main>
            </div>
        </ErrorBoundary>
    )
}
