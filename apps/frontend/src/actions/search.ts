'use server'

import { BASE } from "@/lib/api"

export interface Suggestion {
    ticker: string
    title: string
    logo_url?: string
}

export const searchTickers = async (query: string): Promise<Suggestion[]> => {

    if (!query.trim()) return []

    const { url, apiKey } = BASE()

    if (!url || !apiKey) return []

    try {

        const res = await fetch(`${url}/tickers/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Dividends4Income Frontend',
                'x-api-key': apiKey || '',
            },
            cache: 'no-store'
        })

        if (!res.ok) return []

        const data = await res.json()

        return data ?? []

    } catch {
        return []
    }
}
