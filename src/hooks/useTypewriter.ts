"use client"

import { useState, useEffect } from "react"

interface UseTypewriterProps {
    text: string
    enabled?: boolean
}

export function useTypewriter({ text, enabled = true }: UseTypewriterProps) {
    const [displayedText, setDisplayedText] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (!enabled) return

        let currentIndex = 0
        let timeoutId: NodeJS.Timeout

        const typeNextChar = () => {
            if (currentIndex >= text.length) {
                setIsComplete(true)
                return
            }

            // Check if we just finished "Rivoluzione" (length 11) to add pause
            // "Rivoluzione" is 11 chars. "Rivoluzione " is 12.
            // Based on prompt: "1 second pause between 'rivoluzione' and 'analogica'"
            // Assuming text input is "Rivoluzione Analogica" or similar.
            // Let's make it generic: check for space? Or specifically target the word break if known?
            // The prompt specifically asks for: "1 second pause between 'rivoluzione' and 'analogica'"

            const currentChar = text[currentIndex]
            const nextChar = text[currentIndex + 1]

            // Random delay < 800ms
            let delay = Math.random() * 800

            // If current char is space, it might be the gap between words
            // The prompt says "between 'rivoluzione' and 'analogica'". 
            // If the input string contains that sequence.
            if (currentChar === " " && text.substring(0, currentIndex).toLowerCase().endsWith("rivoluzione")) {
                delay = 1000
            }

            setDisplayedText((prev) => prev + currentChar)
            currentIndex++

            timeoutId = setTimeout(typeNextChar, delay)
        }

        // Start typing
        timeoutId = setTimeout(typeNextChar, 500)

        return () => clearTimeout(timeoutId)
    }, [text, enabled])

    return { displayedText, isComplete }
}
