import { useState } from 'preact/hooks'

export interface PopularStock {
    symbol: string
    name: string
    price: string
    change: string
    dividend_yield: string
    dividend_rate: string
    market_cap: number
    sector: string
    logo_url: string
}

interface UsePopularStocksReturn {
    stocks: PopularStock[]
    loading: boolean
    error: string | null
    fetchStocks: (limit?: number) => Promise<void>
}

export function usePopularStocks(): UsePopularStocksReturn {

    const [stocks, setStocks] = useState<PopularStock[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchStocks = async () => {

        setLoading(true)
        setError(null)

        try {
            const backendUrl = `http://127.0.0.1:8000/api/popular-stocks`
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
            setStocks(result.stocks || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            setStocks([])
        } finally {
            setLoading(false)
        }
    }

    return {
        stocks,
        loading,
        error,
        fetchStocks
    }
}
