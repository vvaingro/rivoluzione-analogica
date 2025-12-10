"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ y: '100vh', rotate: 5, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.55, 0.055, 0.675, 0.19] }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
