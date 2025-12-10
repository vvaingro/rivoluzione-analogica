"use client"

import * as React from "react"
import { RectangleVertical, RectangleHorizontal } from "lucide-react"
import { useLayoutMode } from "@/hooks/useLayoutMode"
import { Button } from "@/components/ui/button"

export function LayoutModeToggle() {
    const { toggleLayout, isLandscape } = useLayoutMode()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleLayout}
            className="hover:scale-110 transition-transform duration-300"
            title={isLandscape ? "Passa a Portrait Mode" : "Passa a Landscape Mode"}
        >
            <RectangleVertical className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ${isLandscape ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <RectangleHorizontal className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ${isLandscape ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} />
            <span className="sr-only">Toggle Layout Mode</span>
        </Button>
    )
}
