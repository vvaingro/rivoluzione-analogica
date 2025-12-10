"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type LayoutMode = "mobile-portrait" | "mobile-landscape" | "laptop-portrait" | "laptop-landscape"

interface LayoutContextType {
    isMobile: boolean
    isLandscape: boolean
    mode: LayoutMode
    toggleLayout: () => void
    showHeader: boolean // Nuovo: controlla se l'header è visibile
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false)
    const [isLandscape, setIsLandscape] = useState(true) // Default landscape
    const [showHeader, setShowHeader] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
        }

        const checkOrientation = () => {
            // Rileva l'orientamento reale dello schermo
            const screenIsLandscape = window.innerWidth > window.innerHeight
            setIsLandscape(screenIsLandscape)
        }

        checkMobile()
        checkOrientation()

        window.addEventListener("resize", () => {
            checkMobile()
            checkOrientation()
        })

        return () => {
            window.removeEventListener("resize", checkMobile)
            window.removeEventListener("resize", checkOrientation)
        }
    }, [])

    useEffect(() => {
        // Auto-hide header solo su mobile portrait
        if (!isMobile || isLandscape) {
            setShowHeader(true)
            return
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down - hide header
                setShowHeader(false)
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show header
                setShowHeader(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isMobile, isLandscape, lastScrollY])

    const toggleLayout = () => setIsLandscape((prev) => !prev)

    // Derive the specific mode
    let mode: LayoutMode = "laptop-landscape"
    if (isMobile) {
        mode = isLandscape ? "mobile-landscape" : "mobile-portrait"
    } else {
        mode = isLandscape ? "laptop-landscape" : "laptop-portrait"
    }

    return (
        <LayoutContext.Provider value={{ isMobile, isLandscape, mode, toggleLayout, showHeader }}>
            {children}
        </LayoutContext.Provider>
    )
}

export const useLayout = () => {
    const context = useContext(LayoutContext)
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider")
    }
    return context
}
