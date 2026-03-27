import { RedditPost } from "@/types"
import { FaReddit } from "react-icons/fa6"
import { Posts } from "./Posts"
import { MotionDiv } from "@/components/Common/Reuse/MotionDiv"
import { fadeUp } from "@/animations/variants"

interface PostsSectionProps {
    posts: RedditPost[]
}

export const PostsSection = ({ posts }: PostsSectionProps) => {

    const firstRow = posts?.filter((_, i) => i % 4 === 0)
    const secondRow = posts?.filter((_, i) => i % 4 === 1)
    const thirdRow = posts?.filter((_, i) => i % 4 === 2)
    const fourthRow = posts?.filter((_, i) => i % 4 === 3)

    return (

        posts.length === 0 ?

            <MotionDiv
                variants={fadeUp}
                className="bg-layer/40 border border-border rounded-xl p-12 py-20 text-center text-secondary my-12">
                <FaReddit size={32} className="mx-auto mb-3" color="#FF4500" />
                <p className="text-sm">Community posts unavailable right now. Check back soon!</p>
            </MotionDiv>

            :

            <Posts
                firstRow={firstRow}
                secondRow={secondRow}
                thirdRow={thirdRow}
                fourthRow={fourthRow} />

    )
}

