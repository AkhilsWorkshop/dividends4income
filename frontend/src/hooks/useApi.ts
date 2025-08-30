import { useState, useCallback, useRef } from 'preact/hooks'

interface UseApiReturn<T> {
    data: T | null
    loading: boolean
    error: string | null
    fetchData: (url: string, useCache?: boolean) => Promise<void>
}

const apiCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000

export const clearApiCache = () => {
    apiCache.clear()
}

export const clearApiCacheEntry = (url: string) => {
    apiCache.delete(url)
}

export function useApi<T>(): UseApiReturn<T> {

    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const cacheRef = useRef(apiCache)

    const fetchData = useCallback(async (url: string, useCache: boolean = true) => {

        if (useCache) {

            const cached = cacheRef.current.get(url)

            if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
                setData(cached.data)
                setLoading(false)
                setError(null)
                return
            }
        }

        setLoading(true)
        setError(null)

        try {

            // Use backend domain in production, local in development
            const isProduction = (import.meta as any).env.PROD
            const backendUrl = isProduction
                ? `https://api.d4i.akhilkumar.dev${url}`
                : `${(import.meta as any).env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}${url}`

            const response = await fetch(backendUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (useCache) {
                cacheRef.current.set(url, {
                    data: result,
                    timestamp: Date.now()
                })
            }

            setData(result)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }

    }, [])

    return {
        data,
        loading,
        error,
        fetchData,
    }
}
