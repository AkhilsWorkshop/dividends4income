import type { Variants } from 'motion/react'

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
        },
    },
}

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
}

export const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

export const shimmer: Variants = {
    hidden: { opacity: 0.4 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
        },
    },
}

export const cardHover = {
    scale: 1.02,
    y: -4,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
}

export const flipInFromLeft: Variants = {
    hidden: { opacity: 0, x: -40, rotateY: 8 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
}

export const flipInFromRight: Variants = {
    hidden: { opacity: 0, x: 40, rotateY: -8 },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
}
