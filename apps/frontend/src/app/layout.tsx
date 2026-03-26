import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import './globals.css'
import { Header } from '@/components/Layout/Header'
import { Footer } from '@/components/Layout/Footer'
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary'

export const metadata: Metadata = {
    title: 'Dividends4Income - Stock Dividend Tracker',
    description: 'Making dividend investing simple with real-time data, advanced analytics and expert insights.',
    openGraph: {
        title: 'Dividends4Income - Stock Dividend Tracker',
        description: 'Making dividend investing simple with real-time data, advanced analytics and expert insights.',
        images: [`${process.env.DOMAIN}/images/og-image.png`],
        url: process.env.DOMAIN,
        type: 'website',
    },
    icons: {
        icon: '/images/favicon.ico',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    const gaMeasurementId = process.env.GA_MEASUREMENT_ID

    return (
        <html lang="en" className="dark" suppressHydrationWarning>

            <head>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {gaMeasurementId && (

                    <>

                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                        />

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${gaMeasurementId}');
                                `,
                            }}
                        />

                    </>

                )}

            </head>

            <body>

                <Toaster
                    theme="dark"
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: '#161b22',
                            border: '1px solid #1e2a3a',
                            color: '#e6edf3',
                        },
                    }}
                />

                <ErrorBoundary>

                    <div className="min-h-screen relative z-0">

                        <Header />

                        <main className="mx-auto">
                            {children}
                        </main>

                        <Footer />

                    </div>

                </ErrorBoundary>

            </body>

        </html>
    )
}
