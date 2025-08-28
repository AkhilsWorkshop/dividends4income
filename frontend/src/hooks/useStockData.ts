import { useState } from 'preact/hooks'
import type { StockData, LoadingState } from '@/types'
import { getErrorMessage } from '@/utils'

export function useStockData() {

    const [data, setData] = useState<StockData | null>(null)
    const [loadingState, setLoadingState] = useState<LoadingState>('idle')
    const [error, setError] = useState<string | null>(null)

    const fetchStockData = async (ticker: string) => {

        if (!ticker.trim()) return

        setLoadingState('loading')
        setError(null)

        try {

            const response = await fetch(`/api/stocks/${ticker.toUpperCase()}`)

            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${ticker}`)
            }

            const stockData: StockData = await response.json()

            setData(stockData)
            setLoadingState('success')

        } catch (err) {

            const errorMessage = getErrorMessage(err)

            setError(errorMessage)
            setData(null)
            setLoadingState('error')
        }
    }

    const reset = () => {
        setData(null)
        setLoadingState('idle')
        setError(null)
    }

    return {
        data,
        loadingState,
        error,
        isLoading: loadingState === 'loading',
        isSuccess: loadingState === 'success',
        isError: loadingState === 'error',
        fetchStockData,
        reset,
    }
}
