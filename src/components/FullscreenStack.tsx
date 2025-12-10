"use client"

import { useEffect, useRef, useState } from "react"
import { useGallery } from "@/context/GalleryContext"
import { useLayout } from "@/components/common/LayoutProvider"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"

function FullscreenFrame({ src, index }: { src: string; index: number }) {
    const ref = useRef<HTMLElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPortrait, setIsPortrait] = useState(false)
    const { isMobile, isLandscape } = useLayout()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Parallax effect: move image slower than scroll
    const y = useTransform(scrollYProgress, [0, 1], [-25, 25])

    return (
        <motion.section
            ref={ref}
            className="relative h-[100dvh] w-full overflow-hidden bg-white dark:bg-black"
            style={{
                scrollSnapAlign: 'start',
                paddingTop: index === 0 ? '72px' : '0'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: '150vh', rotate: 5, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.55, 0.055, 0.675, 0.19] }}
        >
            <motion.div
                className="absolute inset-0"
                style={{ y }}
            >
                <Image
                    src={src}
                    alt={`Photo ${index + 1}`}
                    fill
                    className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isPortrait ? 'object-contain' : 'object-cover'}`}
                    sizes="100vw"
                    priority={index < 3}
                    onLoad={(e) => {
                        setIsLoaded(true)
                        const img = e.target as HTMLImageElement
                        setIsPortrait(img.naturalHeight > img.naturalWidth)
                    }}
                />
            </motion.div>
        </motion.section>
    )
}

export function FullscreenStack() {
    const { currentImages, isTransitioning } = useGallery()
    const stackRef = useRef<HTMLDivElement>(null)

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()
            const allowedKeys = ['arrowdown', 'arrowup', 's', 'w']

            if (allowedKeys.includes(key)) {
                e.preventDefault()

                const frames = document.querySelectorAll('section')
                if (!frames.length) return

                const navH = 72
                const viewportCenter = navH + (window.innerHeight - navH) / 2

                // Find current frame
                let currentIdx = 0
                let minDiff = Infinity

                frames.forEach((frame, i) => {
                    const rect = frame.getBoundingClientRect()
                    const center = (rect.top + rect.bottom) / 2
                    const diff = Math.abs(center - viewportCenter)
                    if (diff < minDiff) {
                        minDiff = diff
                        currentIdx = i
                    }
                })

                // Navigate
                let targetIdx = currentIdx
                if (key === 'arrowdown' || key === 's') {
                    targetIdx = Math.min(frames.length - 1, currentIdx + 1)
                } else {
                    targetIdx = Math.max(0, currentIdx - 1)
                }

                const targetFrame = frames[targetIdx]
                const targetRect = targetFrame.getBoundingClientRect()
                const delta = (targetRect.top + targetRect.bottom) / 2 - viewportCenter

                window.scrollBy({ top: delta, behavior: 'smooth' })
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Note: Removed early return for isTransitioning

    return (
        <AnimatePresence>
            {!isTransitioning && (
                <motion.div
                    key="stack"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ y: '150vh', rotate: 5, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.55, 0.055, 0.675, 0.19] }}
                    ref={stackRef}
                    className="scroll-smooth"
                    style={{
                        scrollSnapType: 'y proximity',
                        overscrollBehaviorY: 'contain'
                    }}
                >
                    {currentImages.map((src, index) => (
                        <FullscreenFrame key={`${src}-${index}`} src={src} index={index} />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
