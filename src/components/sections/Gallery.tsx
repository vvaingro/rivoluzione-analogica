"use client"

import { useLayoutMode } from "@/hooks/useLayoutMode"
import { cn } from "@/lib/utils"
import { useGallery } from "@/context/GalleryContext"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useScrollParallax } from "@/hooks/useScrollParallax"
import { motion } from "framer-motion"

// Create a sub-component for the card to isolate the hook usage per item
function GalleryItem({ img, index, isLandscapeMode }: { img: string, index: number, isLandscapeMode: boolean }) {
    // Stagger effect: Even items move differently than odd items - increased for more visible parallax
    const offset = index % 2 === 0 ? 100 : -100
    const { ref, y } = useScrollParallax({ offset })

    // Se siamo in landscape mode e mostriamo foto portrait, usa contain
    // Altrimenti usa cover
    const objectFit = isLandscapeMode ? "object-contain" : "object-cover"
    const aspectRatio = isLandscapeMode ? "aspect-[3/4]" : "aspect-[4/5]"

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className="h-full"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1, // Stagger delay based on index
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth fall
            }}
        >
            <Card className="group h-full overflow-hidden rounded-xl bg-muted border-0 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className={cn("relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900", aspectRatio)}>
                    {/* Fallback placeholder logic integrated with Image */}
                    <Image
                        src={img}
                        alt="Analog Photography"
                        fill // Fill container
                        className={cn(
                            "transition-transform duration-700 ease-out group-hover:scale-105",
                            objectFit
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                    />
                    {/* Overlay text on hover */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/60 to-transparent p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
                        <p className="font-mono text-sm truncated font-bold">Analog Photography</p>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

export function Gallery() {
    const { mode, isLandscape } = useLayoutMode()
    const { currentImages } = useGallery()

    const gridClass = cn(
        "grid w-full gap-8 p-4 transition-all duration-500 mx-auto max-w-[2000px] pb-32", // Added pb-32 for parallax space at bottom
        {
            "grid-cols-1 max-w-lg": mode === "mobile-portrait",
            "grid-cols-2 md:grid-cols-3": mode === "mobile-landscape",
            "grid-cols-2 max-w-4xl": mode === "laptop-portrait",
            "grid-cols-3": mode === "laptop-landscape",
        }
    )

    return (
        <section className="min-h-screen w-full bg-background relative z-10" id="gallery">
            <div className={gridClass}>
                {currentImages.map((img, i) => (
                    <GalleryItem key={`${img}-${i}`} img={img} index={i} isLandscapeMode={isLandscape} />
                ))}
            </div>
        </section>
    )
}
