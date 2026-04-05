import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/MotionTag'
import { MdOutlineInsertChart } from 'react-icons/md'

export const Header = () => {
    return (
        <MotionTag
            variants={fadeUp}
            className="flex items-center gap-3">

            <div className="p-3 rounded-xl block border border-border text-accent">
                <MdOutlineInsertChart size={22} />
            </div>

            <div>
                <h2 className="font-bold text-xl text-primary">Key Metrics</h2>
                <p className="text-sm text-secondary">Important financial metrics and ratios</p>
            </div>

        </MotionTag>
    )
}