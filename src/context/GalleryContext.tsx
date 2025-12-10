"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { COLLECTIONS, shuffle } from "@/lib/collections"
import { useLayout } from "@/components/common/LayoutProvider"

type CollectionName = "default" | "bnw"

interface GalleryContextType {
    currentCollection: CollectionName
    setCollection: (name: CollectionName) => void
    currentImages: string[]
    isTransitioning: boolean
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: React.ReactNode }) {
    const [currentCollection, setCurrentCollection] = useState<CollectionName>("default")
    const [currentImages, setCurrentImages] = useState<string[]>([])
    const [isTransitioning, setIsTransitioning] = useState(false)
    const { isLandscape } = useLayout()

    useEffect(() => {
        // Get images for current collection and orientation
        const collection = COLLECTIONS[currentCollection]
        const images = isLandscape ? collection.landscape : collection.portrait

        let shuffled = shuffle(images)

        // Ensure first image is different from last session to prevent repetition on reload
        try {
            const lastFirst = localStorage.getItem('lastFirstImage')
            if (shuffled.length > 1 && shuffled[0] === lastFirst) {
                // Swap first with random other
                const swapIdx = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
                [shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]];
            }
            localStorage.setItem('lastFirstImage', shuffled[0])
        } catch (e) {
            // ignore localStorage errors (e.g. private mode)
        }

        setCurrentImages(shuffled)
    }, [currentCollection, isLandscape])

    const setCollection = (name: CollectionName) => {
        if (name === currentCollection) return

        // Trigger falling transition
        setIsTransitioning(true)

        setTimeout(() => {
            setCurrentCollection(name)
            setIsTransitioning(false)
            window.scrollTo({ top: 0, behavior: 'auto' })
        }, 600) // Match animation duration
    }

    return (
        <GalleryContext.Provider value={{
            currentCollection,
            setCollection,
            currentImages,
            isTransitioning
        }}>
            {children}
        </GalleryContext.Provider>
    )
}

export const useGallery = () => {
    const context = useContext(GalleryContext)
    if (!context) {
        throw new Error("useGallery must be used within GalleryProvider")
    }
    return context
}
