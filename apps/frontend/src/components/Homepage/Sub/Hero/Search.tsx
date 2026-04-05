"use client"

import { searchTickers, Suggestion } from "@/actions/search"
import { fadeUp } from "@/animations/variants"
import { MotionTag } from "@/components/Common/Reuse/Animation/MotionTag"
import { useDebounce } from "@/hooks/useDebounce"
import { cn } from "@/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { FiSearch } from "react-icons/fi"
import { toast } from "sonner"

const Search = () => {

    const router = useRouter()

    const [query, setQuery] = useState<string>('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const debouncedQuery = useDebounce<string>(query, 600)

    const fetchSuggestions = useCallback(async (searchQuery: string) => {

        if (!searchQuery.trim()) { setSuggestions([]); return }
        setLoading(true)

        try {
            const results = await searchTickers(searchQuery)
            setSuggestions(results)
        } catch {
            setSuggestions([])
            toast.error('Failed to fetch suggestions')
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        fetchSuggestions(debouncedQuery)
    }, [debouncedQuery, fetchSuggestions])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setShowDropdown(true)
    }

    const handleSuggestionClick = (symbol: string) => {
        setQuery('')
        setSuggestions([])
        setShowDropdown(false)
        router.push(`/stock/${symbol}`)
    }

    const focusSearchInput = () => {
        if (inputRef.current) {
            inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    if (typeof window !== 'undefined') {
        (window as any).focusHeroSearch = focusSearchInput
    }

    const showSuggestions = showDropdown && suggestions.length > 0 && !loading

    return (
        <MotionTag
            variants={fadeUp}
            useDefaultInView={false}
            includeLazyMotion={false}
            className="w-full">

            <div className="relative">

                <FiSearch size={25} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none z-10" />

                <input
                    ref={inputRef}
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search a ticker or company (e.g. AAPL)"
                    className={cn(
                        'w-full pl-12 pr-12 py-4 text-base border border-border/60 rounded-xl focus:outline-none focus:ring focus:ring-accent/50 placeholder:text-secondary/50 text-primary bg-layer/60 backdrop-blur-xs transition-all duration-200 ',
                        showSuggestions
                            ? 'rounded-b-none'
                            : 'hover:border-border'
                    )}
                />

                {loading && (
                    <div className="animate-spin text-secondary absolute right-4 top-1/2 -translate-y-1/2">
                        <AiOutlineLoading size={25} />
                    </div>
                )}

                {showSuggestions && (

                    <div ref={dropdownRef} className="absolute top-full w-full bg-layer rounded-b-xl border-t-0 shadow-xl z-50 overflow-hidden">

                        <div className="max-h-60 overflow-y-auto">

                            {suggestions.map((suggestion) => (

                                <div
                                    key={suggestion.ticker}
                                    onClick={() => handleSuggestionClick(suggestion.ticker)}
                                    className="px-4 py-3 hover:bg-surface/30 cursor-pointer border-b border-border/30 last:border-b-0 flex items-center gap-3 transition-colors duration-150">

                                    {suggestion.logo_url && (
                                        <Image
                                            loading="lazy"
                                            src={suggestion.logo_url}
                                            alt={`${suggestion.title} logo`}
                                            width={28}
                                            height={28}
                                            className="rounded-md"
                                        />
                                    )}

                                    <div>
                                        <div className="font-semibold text-primary text-sm">{suggestion.ticker}</div>
                                        <div className="text-xs text-secondary">{suggestion.title}</div>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </MotionTag>
    )
}

export default Search