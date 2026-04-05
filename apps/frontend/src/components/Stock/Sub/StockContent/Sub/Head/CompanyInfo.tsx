import { fadeUp } from '@/animations/variants'
import { MotionTag } from '@/components/Common/Reuse/Animation/MotionTag'
import Image from 'next/image'

interface CompanyInfoProps {
    logoUrl: string
    symbol: string
    name: string
}

export const CompanyInfo = ({ logoUrl, symbol, name }: CompanyInfoProps) => {
    return (
        <MotionTag
            variants={fadeUp}
            className="flex items-center gap-3">

            <Image
                src={logoUrl}
                alt={`${name} logo`}
                height={44}
                width={44}
                className="w-11 h-11 rounded-xl"
            />

            <div>
                <h1 className="text-xl font-bold text-primary">{symbol}</h1>
                <p className="text-sm text-secondary">{name}</p>
            </div>

        </MotionTag>
    )
}