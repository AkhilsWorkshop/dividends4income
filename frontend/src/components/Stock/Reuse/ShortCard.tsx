type ShortCardProps = {
    heading: string
    value: string | number
    loading?: boolean
}

export const ShortCard = ({ heading, value, loading }: ShortCardProps) => {
    return (
        <div className='bg-layer p-6 rounded-xl border border-border shadow-sm space-y-3 text-primary'>

            {loading ?

                <>
                    <div className="w-20 h-5 bg-surface/50 animate-pulse rounded-sm"></div>
                    <div className="w-32 h-9 bg-surface/75 animate-pulse rounded-sm"></div>
                </>

                :

                <>
                    <p className="text-sm text-secondary">{heading}</p>
                    <p className="text-3xl font-semibold">{value}</p>
                </>

            }

        </div>
    )
}