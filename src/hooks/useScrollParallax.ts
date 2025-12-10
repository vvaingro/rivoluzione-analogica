"use client"

import { useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"

interface UseScrollParallaxOptions {
    offset?: number
}

export function useScrollParallax({ offset = 50 }: UseScrollParallaxOptions = {}) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Map scroll progress (0 to 1) to a translateY value (-offset to +offset)
    // This creates a parallax effect relative to the document scroll
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

    return { ref, y }
}
