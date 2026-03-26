'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/utils'

export function Header() {

    const router = useRouter()
    const pathname = usePathname()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isOnHomepage, setIsOnHomepage] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [terminal, setTerminal] = useState(false)

    const headerRef = useRef<HTMLElement>(null)
    const scrollTimeoutRef = useRef<number | null>(null)
    const shouldReduce = useReducedMotion()

    const menuItems = useRef([
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Popular Stocks', href: '#popular-stocks' },
        { name: 'FAQ', href: '#faq' }
    ]).current

    useEffect(() => {
        const stored = localStorage.getItem('terminal-mode')
        if (stored === '1') {
            setTerminal(true)
            document.documentElement.classList.add('terminal')
        }
    }, [])

    const toggleTerminal = () => {
        const next = !terminal
        setTerminal(next)
        document.documentElement.classList.toggle('terminal', next)
        localStorage.setItem('terminal-mode', next ? '1' : '0')
    }

    useEffect(() => {
        const newIsOnHomepage = pathname === '/'
        setIsOnHomepage(newIsOnHomepage)
        if (!newIsOnHomepage) setActiveSection('')
    }, [pathname])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

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
                window.scrollTo({ top: targetPosition, behavior: 'smooth' })
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
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
                    setActiveSection(targetId)
                }
            }, 300)
        }
    }

    const handleScroll = useCallback(() => {
        if (!isOnHomepage) return
        if (scrollTimeoutRef.current !== null) clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = window.setTimeout(() => {
            const scrollPosition = window.scrollY + 100
            if (scrollPosition < 100) { setActiveSection(''); return }
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
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
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
            if (scrollTimeoutRef.current !== null) clearTimeout(scrollTimeoutRef.current)
        }
    }, [isOnHomepage, handleScroll])

    return (
        <header
            ref={headerRef}
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                scrolled
                    ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20'
                    : 'border-b border-transparent bg-transparent'
            )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <motion.a
                        href="/"
                        onClick={handleLogoClick}
                        className="hover:opacity-80 duration-300 transition-opacity flex-shrink-0"
                        initial={shouldReduce ? false : { opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="h-8 lg:h-10 w-auto aspect-auto"
                        />
                    </motion.a>

                    <nav className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) =>
                            <a
                                key={item.name}
                                href={isOnHomepage ? item.href : `/${item.href}`}
                                onClick={handleMenuClick(item.href)}
                                className={cn(
                                    'text-sm font-medium transition-colors duration-200 border-b-2 pb-0.5',
                                    effectiveActiveSection === item.href.substring(1)
                                        ? 'text-accent border-accent'
                                        : 'text-secondary hover:text-primary border-transparent'
                                )}>
                                {item.name}
                            </a>
                        )}
                    </nav>

                    <div className="flex items-center gap-2">

                        {/* Terminal mode toggle */}
                        <button
                            onClick={toggleTerminal}
                            title={terminal ? 'Exit terminal mode' : 'Enter terminal mode'}
                            className={cn(
                                'hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-all duration-200 border',
                                terminal
                                    ? 'text-accent border-accent/40 bg-accent/10'
                                    : 'text-secondary border-border/40 hover:text-primary hover:border-border'
                            )}>
                            {'>'}_
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-secondary hover:text-primary hover:bg-surface/20 transition-colors duration-200"
                            aria-label="Toggle menu">
                            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                                <span className={cn('block w-5 h-0.5 bg-current transition-all duration-300', isMenuOpen ? 'rotate-45 translate-y-2' : '')} />
                                <span className={cn('block w-5 h-0.5 bg-current transition-all duration-300', isMenuOpen ? 'opacity-0' : '')} />
                                <span className={cn('block w-5 h-0.5 bg-current transition-all duration-300', isMenuOpen ? '-rotate-45 -translate-y-2' : '')} />
                            </div>
                        </button>

                    </div>

                </div>

                <div className={cn('md:hidden overflow-hidden transition-all duration-300 ease-in-out', isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0')}>
                    <nav className="py-3 space-y-1 border-t border-border/40">
                        {menuItems.map((item) =>
                            <a
                                key={item.name}
                                href={isOnHomepage ? item.href : `/${item.href}`}
                                onClick={handleMenuClick(item.href)}
                                className={cn(
                                    'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                                    effectiveActiveSection === item.href.substring(1)
                                        ? 'text-accent bg-accent/10'
                                        : 'text-secondary hover:text-primary hover:bg-surface/20'
                                )}>
                                {item.name}
                            </a>
                        )}
                    </nav>
                </div>

            </div>
        </header>
    )
}
