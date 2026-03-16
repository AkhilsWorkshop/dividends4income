'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '../../../hooks/useDebounce'
import { cn } from '@/utils'
import { AiOutlineLoading } from "react-icons/ai"
import { searchTickers } from '@/actions/search'
import type { Suggestion } from '@/actions/search'
import Image from 'next/image'

export const Hero = () => {

    const router = useRouter()
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const debouncedQuery = useDebounce(query, 600)

    const fetchSuggestions = async (searchQuery: string) => {

        if (!searchQuery.trim()) {
            setSuggestions([])
            return
        }

        setLoading(true)

        try {
            const results = await searchTickers(searchQuery)
            setSuggestions(results)
        } catch {
            setSuggestions([])
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
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

    return (

        <div className="relative py-12.5 lg:py-0 pt-22 lg:min-h-screen flex flex-col justify-center items-center text-primary px-3 lg:px-6 pb-10 space-y-12 bg-linear-to-br from-secondary/10 via-transparent to-secondary/10">

            <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">

                <div className="space-y-4">

                    <h1 className="text-4xl lg:text-7xl font-semibold text-balance leading-tight dark:[text-shadow:0_0_20px_rgba(0,0,0,0.3),0_0_40px_rgba(0,0,0,0.2)]">
                        Dividend Investing <br />
                        <span className="bg-linear-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                            Made Simple
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg lg:text-xl text-secondary/80 max-w-2xl mx-auto leading-relaxed text-pretty dark:[text-shadow:0_0_10px_rgba(0,0,0,0.5)]">
                        No overwhelming charts or complex jargon. Just clear, actionable insights for confident investing.
                    </p>

                </div>

                <div className="max-w-xl mx-auto relative w-full space-y-4">

                    <div className="relative">

                        <input
                            ref={inputRef}
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search a Ticker or Company"
                            className={cn('w-full pl-3 pr-20 py-4 text-base border border-primary/40 rounded-lg focus:outline-none placeholder:truncate placeholder:text-primary text-primary bg-layer/10 backdrop-blur-lg',
                                (showDropdown && (suggestions.length > 0) && !loading) ? 'rounded-b-none' : 'rounded-b-lg'
                            )}
                        />

                        {loading &&
                            <div className="animate-spin text-primary absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2"><AiOutlineLoading size={20} /></div>
                        }

                        {showDropdown && (suggestions.length > 0) &&

                            <div ref={dropdownRef} className="absolute top-full w-full bg-background border border-primary/10 rounded-b-lg shadow-lg z-10 overflow-hidden">

                                <div className="max-h-60 overflow-y-auto">

                                    {suggestions.map((suggestion) => (

                                        <div
                                            key={suggestion.ticker}
                                            onClick={() => handleSuggestionClick(suggestion.ticker)}
                                            className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-primary border-b border-primary/5 last:border-b-0 flex justify-start items-center gap-2">
                                                
                                            {suggestion.logo_url &&

                                                <Image 
                                                    loading='lazy'
                                                    src={suggestion.logo_url} 
                                                    alt={`${suggestion.title} logo`} 
                                                    width={32} 
                                                    height={32} 
                                                    className="rounded-sm"
                                                 />

                                            }

                                            <div className='flex flex-col items-start justify-start'>

                                                <div className="font-semibold text-left">{suggestion.ticker}</div>
                                                <div className="text-sm text-secondary text-left">{suggestion.title}</div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        }

                    </div>

                </div>

            </div>

        </div>
    )
}
