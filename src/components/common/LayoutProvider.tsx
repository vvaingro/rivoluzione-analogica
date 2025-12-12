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

        // Robust listener for orientation changes
        const mediaQuery = window.matchMedia("(orientation: landscape)")
        const handleOrientationChange = (e: MediaQueryListEvent) => {
            setIsLandscape(e.matches)
        }

        // Modern browsers
        try {
            mediaQuery.addEventListener("change", handleOrientationChange)
        } catch (e1) {
            // Fallback for older Safari
            try {
                mediaQuery.addListener(handleOrientationChange)
            } catch (e2) {
                console.warn("Media Query listener not supported")
            }
        }

        window.addEventListener("resize", () => {
            checkMobile()
            checkOrientation()
        })

        return () => {
            window.removeEventListener("resize", checkMobile)
            window.removeEventListener("resize", checkOrientation)
            try {
                mediaQuery.removeEventListener("change", handleOrientationChange)
            } catch (e) {
                mediaQuery.removeListener(handleOrientationChange)
            }
        }
    }, [])

    useEffect(() => {
        // Auto-hide header solo su mobile portrait
        if (!isMobile || isLandscape) {
            setShowHeader(true)
            return
        }

        let lastScrollY = window.scrollY
        let ticking = false
        const HIDE_THRESHOLD = 100 // Pixel di scroll in giù prima di nascondere
        const SHOW_THRESHOLD = 50  // Pixel di scroll in su prima di mostrare

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

                    // Ignore rubber-banding (iOS)
                    if (currentScrollY < 0 || currentScrollY > maxScroll) {
                        ticking = false
                        return
                    }

                    const diff = currentScrollY - lastScrollY

                    // Logic with Hysteresis
                    if (diff > HIDE_THRESHOLD && currentScrollY > 50) {
                        // User scrapped down significantly -> Hide
                        setShowHeader(false)
                        lastScrollY = currentScrollY
                    } else if (diff < -SHOW_THRESHOLD) {
                        // User scrapped up significantly -> Show
                        setShowHeader(true)
                        lastScrollY = currentScrollY
                    } else {
                        // Minor movement, update ref point only if direction changed significantly
                        // or keep anchor. For simplicity here we don't update anchor on small moves
                        // to create the "dead zone" effect. 
                        // Actually, to implement proper hysteresis, we usually track a "pivot" point.
                        // Simplified approach: Just delay update of lastScrollY until threshold met?
                        // No, let's keep it simple: 
                        // If we are scrolling down, we want to hide.
                        // If we are scrolling up, we want to show.
                    }

                    // Simple Hysteresis Implementation:
                    // Reset 'lastScrollY' only when direction changes or threshold met.
                    // This is complex to get perfect without a ref. 
                    // Let's use a standard robust sticky header logic:

                    if (currentScrollY > lastScrollY + 10) {
                        // Scrolling DOWN
                        if (currentScrollY > 100 && showHeader) setShowHeader(false)
                    } else if (currentScrollY < lastScrollY - 20) {
                        // Scrolling UP
                        if (!showHeader) setShowHeader(true)
                    }

                    lastScrollY = currentScrollY
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isMobile, isLandscape, showHeader]) // Added showHeader dependency for correct state read

    useEffect(() => {
        // Update body dataset for Global CSS to detect mode
        let computedMode = 'laptop-landscape'
        if (isMobile) {
            computedMode = isLandscape ? 'mobile-landscape' : 'mobile-portrait'
        } else {
            computedMode = isLandscape ? 'laptop-landscape' : 'laptop-portrait'
        }
        document.body.dataset.layoutMode = computedMode
    }, [isMobile, isLandscape])

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
