'use client'

import React, { Component } from 'react'
import type { ErrorBoundaryState } from '@/types'

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: (error: Error) => React.ReactNode
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
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="glass-card max-w-md w-full p-8 text-center">
                        <div className="text-loss mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-primary">
                            Something went wrong
                        </h2>
                        <p className="text-secondary mb-6">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: undefined })}
                            className="px-6 py-2.5 rounded-lg font-medium bg-accent text-background hover:brightness-110 transition-all duration-200">
                            Try again
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}
