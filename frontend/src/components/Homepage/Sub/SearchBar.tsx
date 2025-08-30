import { LuSearch } from 'react-icons/lu'

interface SearchBarProps {
    onSearch?: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {

    const handleSubmit = (e: Event) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement
        const input = form.querySelector('input') as HTMLInputElement

        if (input.value.trim() && onSearch) {
            onSearch(input.value.trim())
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative">

            <input
                placeholder="Search AAPL or Apple"
                className="w-full pl-3 pr-20 py-3 text-sm lg:text-lg border border-primary/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder:truncate placeholder:text-primary text-primary"
            />

            <button
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm lg:text-lg bg-primary text-background rounded hover:bg-primary/90 inline-flex justify-center items-center gap-1 cursor-pointer">
                <LuSearch size={20} /> Search
            </button>

        </form>
    )
}
