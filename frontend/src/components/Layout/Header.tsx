import { ThemeToggle } from '@/components/Layout/Header/ThemeToggle'

export function Header() {

    return (
        <header className='border-b transition-colors duration-200 border-border bg-[#3E3F29] dark:bg-[#282c26]'>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-16">

                    <a href="/" className="hover:opacity-75 duration-300 transition-opacity">
                        <img src="/images/logo.png" alt="Logo" className="h-8 lg:h-10 w-fit" />
                    </a>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                    </div>

                </div>

            </div>

        </header>
    )
}
