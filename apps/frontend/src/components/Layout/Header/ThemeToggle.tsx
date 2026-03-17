'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export const ThemeToggle = () => {

    const { isDark, toggleTheme } = useTheme()

    const changeTheme = async () => {

        if (!document.startViewTransition) {
            toggleTheme()
            return
        }

        const isCurrentlyDark = isDark
        const switchingToDark = !isCurrentlyDark

        await document.startViewTransition(() => {
            toggleTheme()
        }).ready

        document.documentElement.animate(
            {
                clipPath: [
                    `inset(0% ${switchingToDark ? '100%' : '0%'} 0% ${switchingToDark ? '0%' : '100%'})`,
                    `inset(0% 0% 0% 0%)`
                ]
            },
            {
                duration: 600,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `inset(0% 0% 0% 0%)`,
                    `inset(0% ${switchingToDark ? '0%' : '100%'} 0% ${switchingToDark ? '100%' : '0%'})`
                ]
            },
            {
                duration: 600,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-old(root)",
            }
        )
    }

    return (
        <button
            onClick={changeTheme}
            className='p-2 rounded-sm transition-all duration-200 cursor-pointer bg-layer text-primary border border-border hover:brightness-75'
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>

            {isDark ? <MdLightMode size={15} /> : <MdDarkMode size={15} />}

        </button>
    )
}
