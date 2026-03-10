import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Layout/Header'
import { Footer } from '@/components/Layout/Footer'
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
    title: 'Dividends4Income - Stock Dividend Tracker',
    description: 'Making dividend investing simple with real-time data, advanced analytics and expert insights.',
    openGraph: {
        title: 'Dividends4Income - Stock Dividend Tracker',
        description: 'Making dividend investing simple with real-time data, advanced analytics and expert insights.',
        images: ['https://d4i.akhilkumar.dev/images/og-image.png'],
        url: 'https://d4i.akhilkumar.dev',
        type: 'website',
    },
    icons: {
        icon: '/images/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

    return (
        <html lang="en" suppressHydrationWarning>

            <head>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var stored = localStorage.getItem('theme');
                                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    var isDark = stored ? stored === 'dark' : prefersDark;
                                    if (isDark) document.documentElement.classList.add('dark');
                                } catch(e) {}
                            })();
                        `,
                    }}
                />

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

                <ThemeProvider>

                    <ErrorBoundary>
                        <div className="min-h-screen">

                            <Header />

                            <main className="mx-auto">
                                {children}
                            </main>

                            <Footer />

                        </div>

                    </ErrorBoundary>

                </ThemeProvider>

            </body>

        </html>
    )
}
