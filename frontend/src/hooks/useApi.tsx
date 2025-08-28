import { useState, useCallback } from 'preact/hooks'

interface UseApiReturn<T> {
    data: T | null
    loading: boolean
    error: string | null
    fetchData: (url: string) => Promise<void>
}

export function useApi<T>(): UseApiReturn<T> {

    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async (url: string) => {

        setLoading(true)
        setError(null)

        try {

            const backendUrl = url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`
            const response = await fetch(backendUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            // For popular stocks API, use result.stocks, for other APIs use result.info
            if (url.includes('popular-stocks')) {
                setData(result.stocks || result)
            } else {
                setData(result.info || result)
            }

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
