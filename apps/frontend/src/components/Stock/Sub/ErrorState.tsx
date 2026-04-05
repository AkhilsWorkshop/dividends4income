import { MdError } from 'react-icons/md'

interface ErrorStateProps {
    message?: string
}

export const ErrorState = ({ message = 'An error occurred while loading stock data.' }: ErrorStateProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="glass-card p-8 flex items-center gap-3 text-loss">
                <MdError size={24} />
                <span>{message}</span>
            </div>
        </div>
    )
}