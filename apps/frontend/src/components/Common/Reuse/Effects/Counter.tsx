"use client"

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react"
import { useMotionValue, useSpring } from "motion/react"
import { cn } from "@/utils"

interface CounterProps extends ComponentPropsWithoutRef<"span"> {
    value: number
    startValue?: number
    direction?: "up" | "down"
}

export function Counter({
    value,
    startValue = 0,
    direction = "up",
    className
}: CounterProps) {

    const ref = useRef<HTMLSpanElement>(null)

    const [finished, setFinished] = useState(false)

    const motionValue = useMotionValue(direction === "down" ? value : startValue)

    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    })

    useEffect(() => {

        let timer: ReturnType<typeof setTimeout> | null = null

        timer = setTimeout(() => {
            motionValue.set(direction === "down" ? startValue : value)
        }, 0)

        return () => {
            if (timer !== null) {
                clearTimeout(timer)
            }
        }

    }, [motionValue, value, direction, startValue])

    useEffect(() => {

        const unsubscribe = springValue.on("change", (latest) => {

            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(Number(latest.toFixed(0)))
            }

            const rounded = Math.round(latest)

            const target = Math.round(direction === "down" ? startValue : value)

            if (rounded === target) {
                setFinished(true)
            }

        })

        return () => unsubscribe()

    }, [springValue, direction, startValue, value])

    useEffect(() => {
        setFinished(false)
    }, [value, startValue, direction])

    return (
        <span
            ref={ref}
            className={cn(
                "inline-block tracking-wider tabular-nums transform transition-transform duration-300 ease-out",
                finished && "scale-120",
                className
            )}>
            {startValue}
        </span>
    )
}
