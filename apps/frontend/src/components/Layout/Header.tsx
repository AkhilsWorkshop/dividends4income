'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/Layout/Header/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils'

export function Header() {

    const router = useRouter()
    const pathname = usePathname()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isOnHomepage, setIsOnHomepage] = useState(false)

    const headerRef = useRef<HTMLElement>(null)
    const scrollTimeoutRef = useRef<number | null>(null)
    const { isDark } = useTheme()

    const menuItems = useRef([
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Popular Stocks', href: '#popular-stocks' },
        { name: 'FAQ', href: '#faq' }
    ]).current

    useEffect(() => {
        const newIsOnHomepage = pathname === '/'
        setIsOnHomepage(newIsOnHomepage)
        if (!newIsOnHomepage) setActiveSection('')
    }, [pathname])

    const effectiveActiveSection = isOnHomepage ? activeSection : ''

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setActiveSection('')
    }

    const handleMenuClick = (href: string) => (e: React.MouseEvent) => {

        e.preventDefault()
        setIsMenuOpen(false)

        if (isOnHomepage) {

            const targetId = href.substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {

                const headerHeight = headerRef.current?.offsetHeight || 64
                const targetPosition = targetElement.offsetTop - headerHeight - 20

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })

                setActiveSection(targetId)
            }
        } else {

            router.push('/')

            setTimeout(() => {
                const targetId = href.substring(1)
                const targetElement = document.getElementById(targetId)

                if (targetElement) {
                    const headerHeight = headerRef.current?.offsetHeight || 64
                    const targetPosition = targetElement.offsetTop - headerHeight - 20

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    })

                    setActiveSection(targetId)
                }
            }, 300)
        }
    }

    const handleScroll = useCallback(() => {

        if (!isOnHomepage) return

        if (scrollTimeoutRef.current !== null) {
            clearTimeout(scrollTimeoutRef.current)
        }

        scrollTimeoutRef.current = window.setTimeout(() => {
            const scrollPosition = window.scrollY + 100

            if (scrollPosition < 100) {
                setActiveSection('')
                return
            }

            const sections = menuItems.map(item => item.href.substring(1))

            for (const sectionId of sections) {

                const element = document.getElementById(sectionId)

                if (element) {

                    const { offsetTop, offsetHeight } = element

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }, 50)

    }, [isOnHomepage, menuItems])

    useEffect(() => {

        if (!isOnHomepage) return

        const hash = window.location.hash

        if (hash) {

            const targetId = hash.substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {

                setTimeout(() => {
                    const headerHeight = headerRef.current?.offsetHeight || 64
                    const targetPosition = targetElement.offsetTop - headerHeight - 20

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    })

                    setActiveSection(targetId)
                }, 100)
            }
        }
    }, [isOnHomepage])

    useEffect(() => {

        if (!isOnHomepage) return

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (scrollTimeoutRef.current !== null) {
                clearTimeout(scrollTimeoutRef.current)
            }
        }

    }, [isOnHomepage, handleScroll])

    return (
        <header ref={headerRef} className='border-b transition-colors duration-200 border-border bg-background fixed top-0 z-50 w-full'>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-16">

                    <a href="/" onClick={handleLogoClick} className="hover:opacity-75 duration-300 transition-opacity">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className={cn('h-8 lg:h-10 w-auto flex-shrink-0 aspect-auto transition-all duration-300',
                                isDark ? '' : 'brightness-0'
                            )}
                        />
                    </a>

                    <nav className="hidden md:flex items-center space-x-8">

                        {menuItems.map((item) =>

                            <a
                                key={item.name}
                                href={isOnHomepage ? item.href : `/${item.href}`}
                                onClick={handleMenuClick(item.href)}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-secondary border-b-2 ${effectiveActiveSection === item.href.substring(1)
                                    ? 'text-secondary border-secondary'
                                    : 'text-primary/80 border-transparent'
                                    }`}>
                                {item.name}
                            </a>

                        )}

                    </nav>

                    <div className="flex items-center space-x-4">

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-primary hover:text-secondary hover:bg-primary/10 transition-colors duration-200"
                            aria-label="Toggle menu">

                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`}></span>
                            </div>

                        </button>

                        <ThemeToggle />

                    </div>

                </div>

                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>

                    <nav className="py-4 space-y-2">

                        {menuItems.map((item) =>
                            <a
                                key={item.name}
                                href={isOnHomepage ? item.href : `/${item.href}`}
                                onClick={handleMenuClick(item.href)}
                                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-primary/10 hover:text-secondary ${effectiveActiveSection === item.href.substring(1)
                                    ? 'text-secondary bg-primary/5'
                                    : 'text-primary/80'
                                    }`}>
                                {item.name}
                            </a>
                        )}

                    </nav>

                </div>

            </div>

        </header>
    )
}
