import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import { route } from 'preact-router'
import { ThemeToggle } from '@/components/Layout/Header/ThemeToggle'
import { themeStore } from '@/stores/theme'
import { cn } from '@/utils'

export function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isOnHomepage, setIsOnHomepage] = useState(window.location.pathname === '/')

    const headerRef = useRef<HTMLElement>(null)
    const scrollTimeoutRef = useRef<number | null>(null)

    const menuItems = useRef([
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Popular Stocks', href: '#popular-stocks' },
        { name: 'FAQ', href: '#faq' }
    ]).current

    const checkHomepage = useCallback(() => {

        const newIsOnHomepage = window.location.pathname === '/'

        if (newIsOnHomepage !== isOnHomepage) {

            setIsOnHomepage(newIsOnHomepage)

            if (!newIsOnHomepage) {
                setActiveSection('')
            }
        }

    }, [isOnHomepage])

    useEffect(() => {

        checkHomepage()

        const handlePopState = () => {
            checkHomepage()
        }

        const handleNavigation = () => {
            checkHomepage()
        }

        window.addEventListener('popstate', handlePopState)

        let currentPath = window.location.pathname

        const pathCheckInterval = setInterval(() => {
            if (window.location.pathname !== currentPath) {
                currentPath = window.location.pathname
                handleNavigation()
            }
        }, 100)

        return () => {
            window.removeEventListener('popstate', handlePopState)
            clearInterval(pathCheckInterval)
        }
    }, [checkHomepage])

    const effectiveActiveSection = isOnHomepage ? activeSection : ''

    const handleLogoClick = (e: Event) => {
        e.preventDefault()
        route('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setActiveSection('')
        checkHomepage()
    }

    const handleMenuClick = (href: string) => (e: Event) => {

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

            const targetUrl = `/${href}`

            window.history.pushState(null, '', targetUrl)

            checkHomepage()

            route('/')

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
                                themeStore.value.isDark ? '' : 'brightness-0'
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
