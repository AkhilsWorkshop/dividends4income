'use client'

import { useState, useEffect, useRef } from 'react'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function useCountUp(
    target: number,
    duration = 1200,
    enabled = true
): number {
    const [value, setValue] = useState(0)
    const rafRef = useRef<number | undefined>(undefined)
    const hasRun = useRef(false)

    useEffect(() => {
        if (!enabled || hasRun.current) return
        hasRun.current = true
        const start = performance.now()

        const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            setValue(target * easeOutExpo(t))
            if (t < 1) {
                rafRef.current = requestAnimationFrame(animate)
            } else {
                setValue(target)
            }
        }

        rafRef.current = requestAnimationFrame(animate)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [target, duration, enabled])

    return value
}
