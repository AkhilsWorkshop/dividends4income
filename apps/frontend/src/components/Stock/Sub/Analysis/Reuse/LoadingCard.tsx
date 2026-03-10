interface LoadingCardProps {
    title: string
    subtitle: string
    items: number
}

export const LoadingCard = ({ items }: LoadingCardProps) => {
    return (
        <div className="bg-layer rounded-xl border border-border shadow-sm p-6">
            <div className="animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                    <div className="bg-surface/50 h-10 w-10 rounded-lg aspect-square" />
                    <div className="space-y-2 w-full">
                        <div className="h-5 bg-surface/75 rounded-sm w-1/3" />
                        <div className="h-4 bg-surface/50 rounded-sm w-1/2" />
                    </div>
                </div>
                <div className="space-y-3">
                    {[...Array(items)].map((_, i) => (
                        <div key={i} className="h-16 bg-surface/50 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    )
}
