"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "./ThemeToggle"
import { LayoutModeToggle } from "./LayoutModeToggle"
import { useLayout } from "./LayoutProvider"

export function ControlsPanel() {
    const { showHeader, isMobile, isLandscape } = useLayout()

    // Nascondi il toggle landscape/portrait su mobile portrait
    const showLayoutToggle = !(isMobile && !isLandscape)

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
                opacity: showHeader ? 1 : 0,
                x: showHeader ? 0 : 100
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:bottom-6 md:right-6"
            style={{ pointerEvents: showHeader ? 'auto' : 'none' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-xl bg-background/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 p-2"
            >
                <ThemeToggle />
            </motion.div>

            {showLayoutToggle && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="rounded-xl bg-background/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 p-2"
                >
                    <LayoutModeToggle />
                </motion.div>
            )}
        </motion.div>
    )
}
