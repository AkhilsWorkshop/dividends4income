import { useState, useEffect } from 'preact/hooks'
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary'
import { Header } from '@/components/Layout/Header'
import { HomePage } from '@/pages/HomePage'
import { StockPage } from '@/pages/StockPage'

export function App() {

    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {

        const handlePopstate = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', handlePopstate)
        return () => window.removeEventListener('popstate', handlePopstate)

    }, [])

    const renderPage = () => {
        if (currentPath === '/') {
            return <HomePage />
        } else if (currentPath.startsWith('/stock/')) {
            const ticker = currentPath.split('/stock/')[1]
            return <StockPage ticker={ticker} />
        } else {
            return <HomePage />
        }
    }

    return (
        <ErrorBoundary>

            <div className='min-h-screen'>

                <Header />

                <main className="max-w-7xl mx-auto">
                    {renderPage()}
                </main>

            </div>

        </ErrorBoundary>
    )
}
