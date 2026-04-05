import { MdError } from 'react-icons/md'
import { MotionTag } from '../MotionTag'
import { fadeUp } from '@/animations/variants'

type ErrorBoxProps = {
    message: string
}

export const ErrorBox = ({ message }: ErrorBoxProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            className="p-8 text-center text-secondary bg-layer/20 rounded-xl border border-border flex items-center justify-center gap-3">
            <MdError size={22} />
            <span className="text-sm">{message}</span>
        </MotionTag>
    )
}

