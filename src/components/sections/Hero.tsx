"use client"

import { useTypewriter } from "@/hooks/useTypewriter"
import { motion } from "framer-motion"

export function Hero() {
    const { displayedText } = useTypewriter({ text: "RIVOLUZIONE ANALOGICA" })

    return (
        <section className="flex min-h-[50vh] w-full items-center justify-center p-8">
            <div className="text-center">
                <h1 className="text-4xl font-black tracking-tighter sm:text-6xl md:text-8xl lg:text-9xl">
                    {displayedText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-[0.8em] w-4 translate-y-[0.1em] bg-foreground ml-2 align-baseline"
                    />
                </h1>
                <p className="mt-4 text-muted-foreground text-sm sm:text-xl uppercase tracking-widest">
                    Portfolio 2025
                </p>
            </div>
        </section>
    )
}
