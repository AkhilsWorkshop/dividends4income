'use server'

export interface Suggestion {
    ticker: string
    title: string
    logo_url?: string
}

export async function searchTickers(query: string): Promise<Suggestion[]> {

    if (!query.trim()) return []

    const base = process.env.API_BASE_URL

    if (!base) return []

    try {
        
        const res = await fetch(
            `${base}/tickers/search?q=${encodeURIComponent(query)}`,
            { cache: 'no-store' },
        )

        if (!res.ok) return []

        const data = await res.json()
        return data ?? []

    } catch {
        return []
    }
}
