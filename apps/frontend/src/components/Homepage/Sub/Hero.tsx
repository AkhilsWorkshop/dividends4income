'use client'

import { LazyMotion, useReducedMotion } from 'motion/react'
import { staggerContainer } from '@/animations/variants'
import Background from './Hero/Background'
import { Title } from './Hero/Title'
import Search from './Hero/Search'
import NavigateToStocks from './Hero/NavigateToStocks'
import * as motion from "motion/react-m"

const loadFeatures = () => import("../../../utils/features").then(res => res.default)

export const Hero = () => {

    const shouldReduce = useReducedMotion()

    return (
        <section className="relative min-h-[calc(100vh-46px)] flex items-center justify-center overflow-hidden pt-16">

            <LazyMotion features={loadFeatures}>

                <Background />

                <motion.div
                    variants={staggerContainer}
                    initial={shouldReduce ? false : 'hidden'}
                    animate="visible"
                    className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12 lg:py-20 space-y-14">

                    <Title />

                    <Search />

                    <NavigateToStocks />

                </motion.div>

            </LazyMotion>

        </section>
    )
}
