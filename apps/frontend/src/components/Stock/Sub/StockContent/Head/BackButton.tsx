import Link from 'next/link'
import { scaleIn } from '@/animations/variants'
import { FaArrowLeft } from 'react-icons/fa6'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'

export const BackButton = () => {
    return (
        <MotionTag
            variants={scaleIn}
            useDefaultInView={false}
            includeLazyMotion={false}>

            <Link
                href="/"
                className="flex items-center gap-2 text-sm text-secondary hover:text-primary glass-card py-2 px-3 rounded-lg transition-colors duration-200">
                <FaArrowLeft size={12} />
                Back
            </Link>

        </MotionTag>
    )
}