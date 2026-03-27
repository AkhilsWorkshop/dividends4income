import type { RedditPost } from '@/types'
import { FeatureExplainer } from './Reddit/FeatureExplainer'
import { Heading } from './Reddit/Heading'
import { PostsSection } from './Reddit/PostsSection'

interface RedditSectionProps {
    posts: RedditPost[]
}

export const Reddit = ({ posts }: RedditSectionProps) => {
    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-15 lg:py-25">

            <Heading />

            <PostsSection posts={posts} />

            <FeatureExplainer />

        </section>
    )
}
