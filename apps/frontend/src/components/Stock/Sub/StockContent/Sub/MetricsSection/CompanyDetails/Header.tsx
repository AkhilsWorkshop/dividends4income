import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/Animation/MotionTag'
import Image from 'next/image'
import { FaBuilding } from 'react-icons/fa6'

interface HeaderProps {
    name?: string
    logoURL?: string
}

export const Header = ({ name, logoURL }: HeaderProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            className="flex items-center gap-3">

            <div className="p-3 rounded-xl block border border-border text-accent">
                <FaBuilding size={20} />
            </div>

            <div className="flex-1 overflow-hidden">
                <h2 className="font-bold text-xl text-primary">Company Details</h2>
                <p className="text-sm text-secondary truncate">About {name}</p>
            </div>

            {logoURL &&
                <Image
                    src={logoURL}
                    alt={`${name} logo`}
                    height={36}
                    width={36}
                    className="w-9 h-9 rounded-lg ml-auto" />}

        </MotionTag>
    )
}