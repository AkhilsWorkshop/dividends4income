'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {

    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const alreadyDark = document.documentElement.classList.contains('dark')
        setIsDark(alreadyDark)
    }, [])

    const toggleTheme = () => {

        const newTheme = !isDark

        setIsDark(newTheme)

        localStorage.setItem('theme', newTheme ? 'dark' : 'light')

        if (newTheme) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
