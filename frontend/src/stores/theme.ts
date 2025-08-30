import { signal } from '@preact/signals'
import type { ThemeConfig } from '@/types'

const getInitialTheme = (): boolean => {

    if (typeof window === 'undefined') return false

    const stored = localStorage.getItem('theme')

    if (stored) {
        return stored === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const themeStore = signal<ThemeConfig>({
    isDark: getInitialTheme(),
})

export const toggleTheme = () => {

    const newTheme = !themeStore.value.isDark
    themeStore.value = { isDark: newTheme }

    localStorage.setItem('theme', newTheme ? 'dark' : 'light')

    if (newTheme) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

if (typeof window !== 'undefined') {
    if (themeStore.value.isDark) {
        document.documentElement.classList.add('dark')
    }
}
