
import { useId } from "react"
import { MotionTag } from "@/components/Common/Reuse/Animation/MotionTag"

const Background = () => {

    const id = useId()
    const w = 10
    const h = 10

    return (
        <MotionTag
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
            useDefaultInView={false}>

            <svg

                aria-hidden="true"
                className="mask-[radial-gradient(300px_circle_at_center,white,transparent)] sm:mask-[radial-gradient(400px_circle_at_center,white,transparent)] md:mask-[radial-gradient(500px_circle_at_center,white,transparent)] lg:mask-[radial-gradient(800px_circle_at_center,white,transparent)] pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5] brightness-20"
                xmlns="http://www.w3.org/2000/svg">

                <defs>

                    <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">

                        <line x1="0" y1={h} x2={w} y2="0" stroke="currentColor" />
                        <line x1={-w} y1={h} x2="0" y2="0" stroke="currentColor" />
                        <line x1={w} y1={h} x2={w * 2} y2="0" stroke="currentColor" />

                    </pattern>

                </defs>

                <rect width="100%" height="100%" fill={`url(#${id})`} />

            </svg>

        </MotionTag>
    )
}

export default Background
