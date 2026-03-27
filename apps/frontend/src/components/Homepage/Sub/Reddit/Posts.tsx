"use client"

import Marquee from "@/components/Common/Reuse/Effects/Marquee"
import { PostCard } from "./Reuse/PostCard"
import { RedditPost } from "@/types"
import { MotionDiv } from "@/components/Common/Reuse/MotionDiv"
import { useScroll, useTransform } from "motion/react"

interface PostsProps {
    firstRow: RedditPost[]
    secondRow: RedditPost[]
    thirdRow: RedditPost[]
    fourthRow: RedditPost[]
}

export const Posts = ({ firstRow, secondRow, thirdRow, fourthRow }: PostsProps) => {

    const { scrollYProgress } = useScroll()

    const translateX = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 0])
    const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 0])
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 0])
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 0])
    const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 0])

    return (

        <div className="relative flex h-160 w-full flex-row items-center justify-center gap-4 overflow-hidden perspective-near my-12">

            <MotionDiv
                className="flex flex-row items-center gap-4"
                style={{
                    x: translateX,
                    z: translateZ,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    rotateZ: rotateZ,
                }}>

                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstRow.map((post) => (
                        <PostCard key={post.url} post={post} />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                    {secondRow.map((post) => (
                        <PostCard key={post.url} post={post} />
                    ))}
                </Marquee>

                <Marquee pauseOnHover className="[--duration:20s]" vertical>
                    {thirdRow.map((post) => (
                        <PostCard key={post.url} post={post} />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover className="[--duration:10s]" vertical>
                    {fourthRow.map((post) => (
                        <PostCard key={post.url} post={post} />
                    ))}
                </Marquee>

            </MotionDiv>

            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>

        </div>

    )
}

