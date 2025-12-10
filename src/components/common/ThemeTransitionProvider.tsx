"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // We need to track the "previous" theme to trigger animation only on change
    const prevTheme = useRef<string | undefined>(undefined)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            prevTheme.current = theme
        }
    }, [theme, mounted])

    if (!mounted) return <>{children}</>

    // The prompt says "Theme: Dark/Light toggle with falling transition (0.4s, rotate 2deg, slide 50px)"
    // "Transition must wrap entire layout in AnimatePresence"
    // This implies we re-mount the children with a specific key when theme changes? 
    // Or we overlay a falling curtain?
    // "Falling transition" usually suggests the OLD screen falls down or the NEW screen falls in?
    // "Falling": typically y: -100% -> y: 0% or similar. 
    // "Rotate 2deg, slide 50px": 
    // Let's interpret: The OLD content slides DOWN (+50px) and ROTATES (2deg) and FADES OUT.
    // The NEW content enters.

    // To do this effectively on the WHOLE body, we wrap children in <motion.div> with key={theme}.

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={theme}
                initial={{ y: -50, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 50, opacity: 0, rotate: 2 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="min-h-screen w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
