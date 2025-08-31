import { useState, useEffect, useRef } from 'preact/hooks'
import { useDebounce } from '../../../hooks/useDebounce'
import { cn } from '@/utils'
import { AiOutlineLoading } from "react-icons/ai"

interface SearchBarProps {
    onSearch?: (query: string) => void
}

interface Suggestion {
    ticker: string
    title: string
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {

    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const debouncedQuery = useDebounce(query, 600)

    const fetchSuggestions = async (searchQuery: string) => {

        if (!searchQuery.trim()) {
            setSuggestions([])
            return
        }

        setLoading(true)

        abortControllerRef.current?.abort()
        abortControllerRef.current = new AbortController()

        try {

            const backendUrl = `${(import.meta as any).env.VITE_API_BASE_URL}/tickers/search?q=${encodeURIComponent(searchQuery)}`
            const response = await fetch(backendUrl, {
                signal: abortControllerRef.current.signal
            })

            if (!response.ok) throw new Error('Failed to fetch suggestions')

            const data = await response.json()
            setSuggestions(data.suggestions || [])

        } catch (error) {

            if (error instanceof Error && error.name !== 'AbortError') {
                setSuggestions([])
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSuggestions(debouncedQuery)
    }, [debouncedQuery])

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [])

    const handleInputChange = (e: Event) => {
        const value = (e.target as HTMLInputElement).value
        setQuery(value)
        setShowDropdown(true)
    }

    const handleSuggestionClick = (symbol: string) => {
        setQuery('')
        setSuggestions([])
        setShowDropdown(false)
        if (onSearch) onSearch(symbol)
    }

    return (
        <div className="max-w-xl mx-auto relative">

            <input
                ref={inputRef}
                value={query}
                onInput={handleInputChange}
                placeholder="Search AAPL or Apple"
                className={cn('w-full pl-3 pr-20 py-3 text-base lg:text-lg border border-primary/10 rounded-lg focus:outline-none placeholder:truncate placeholder:text-primary text-primary',
                    (showDropdown && (suggestions.length > 0) && !loading) ? 'rounded-b-none' : 'rounded-b-lg'
                )}
            />

            {loading &&
                <h1 className="animate-spin text-primary absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2"><AiOutlineLoading size={20} /></h1>
            }

            {showDropdown && (suggestions.length > 0) &&

                <div ref={dropdownRef} className="absolute top-full w-full bg-background border border-primary/10 rounded-b-lg shadow-lg z-10 overflow-hidden">

                    <div className="max-h-60 overflow-y-auto">

                        {suggestions.map((suggestion) => (
                            <div
                                key={suggestion.ticker}
                                onClick={() => handleSuggestionClick(suggestion.ticker)}
                                className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-primary border-b border-primary/5 last:border-b-0">
                                <div className="font-semibold">{suggestion.ticker}</div>
                                <div className="text-sm text-secondary">{suggestion.title}</div>
                            </div>
                        ))}

                    </div>

                </div>

            }

        </div>
    )
}
