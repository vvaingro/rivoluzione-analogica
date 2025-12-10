"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTypewriter } from "@/hooks/useTypewriter"
import { useGallery } from "@/context/GalleryContext"
import { useLayout } from "@/components/common/LayoutProvider"

export function Header() {
    const { displayedText } = useTypewriter({ text: "rivoluzione analogica" })
    const { setCollection } = useGallery()
    const { showHeader } = useLayout()

    const pathname = usePathname()

    // Hide header on non-home pages
    if (pathname !== '/') return null

    return (
        <header
            className="fixed inset-x-0 top-0 z-[9999] h-[72px] border-b border-black/5 bg-white dark:bg-black dark:border-white/5 transition-transform duration-300 ease-in-out"
            style={{ transform: showHeader ? 'translateY(0)' : 'translateY(-100%)' }}
        >
            <div className="flex h-full items-center justify-between px-[18px]">
                {/* Typewriter Logo */}
                <Link
                    href="/"
                    className="font-serif text-xl text-[#111] dark:text-white no-underline whitespace-nowrap"
                    style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                    onClick={(e) => {
                        e.preventDefault()
                        setCollection('default')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    {displayedText}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-[18px] font-serif">
                    <button
                        onClick={() => setCollection('bnw')}
                        className="text-[#111] dark:text-white/70 no-underline opacity-70 hover:opacity-100 transition-opacity text-[13px] tracking-[1px] bg-transparent border-none cursor-pointer"
                        style={{ fontFamily: '"Times New Roman", serif', fontVariant: 'small-caps' }}
                    >
                        Black & White
                    </button>
                    <button
                        onClick={() => setCollection('default')}
                        className="text-[#111] dark:text-white/70 no-underline opacity-70 hover:opacity-100 transition-opacity text-[13px] tracking-[1px] bg-transparent border-none cursor-pointer"
                        style={{ fontFamily: '"Times New Roman", serif', fontVariant: 'small-caps' }}
                    >
                        Color
                    </button>
                    <Link
                        href="/about"
                        className="text-[#111] dark:text-white/70 no-underline opacity-70 hover:opacity-100 transition-opacity text-[13px] tracking-[1px]"
                        style={{ fontFamily: '"Times New Roman", serif', fontVariant: 'small-caps' }}
                    >
                        About
                    </Link>
                </nav>
            </div>
        </header>
    )
}
