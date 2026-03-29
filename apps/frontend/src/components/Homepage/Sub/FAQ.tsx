import { Heading } from './FAQ/Heading'
import { Questions } from './FAQ/Questions'

export const FAQ = () => {
    return (
        <section id="faq" className="relative border-y border-border bg-layer">

            <div className='absolute top-0 w-full h-5 bg-linear-to-b from-black/20 to-transparent' />
            <div className='absolute bottom-0 w-full h-5 bg-linear-to-t from-black/20 to-transparent' />

            <div className='max-w-7xl mx-auto px-4 lg:px-6 py-15 lg:py-25'>

                <Heading />

                <Questions />

            </div>

        </section>
    )
}
