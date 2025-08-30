import { Component } from 'preact'
import type { ComponentChildren } from 'preact'
import type { ErrorBoundaryState } from '@/types'
import { cn } from '@/utils'

interface ErrorBoundaryProps {
    children: ComponentChildren
    fallback?: (error: Error) => ComponentChildren
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {

        if (this.state.hasError) {

            if (this.props.fallback && this.state.error) {
                return this.props.fallback(this.state.error)
            }

            return (
                <div className={cn(
                    'min-h-screen flex items-center justify-center',
                    'bg-gray-50 dark:bg-gray-900'
                )}>

                    <div className={cn(
                        'max-w-md w-full p-6 text-center',
                        'bg-white dark:bg-gray-800 rounded-lg shadow-md'
                    )}>

                        <div className="text-red-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>

                        <h2 className={cn(
                            'text-xl font-bold mb-2',
                            'text-gray-900 dark:text-white'
                        )}>
                            Something went wrong
                        </h2>

                        <p className={cn(
                            'text-gray-600 dark:text-gray-300 mb-4'
                        )}>
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>

                        <button
                            onClick={() => this.setState({ hasError: false, error: undefined })}
                            className={cn(
                                'px-4 py-2 rounded-lg font-medium',
                                'bg-blue-600 hover:bg-blue-700 text-white',
                                'transition-colors duration-200'
                            )}>
                            Try again
                        </button>

                    </div>

                </div>
            )
        }

        return this.props.children
    }
}
