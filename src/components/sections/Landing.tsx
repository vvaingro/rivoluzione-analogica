import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Landing() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-white dark:bg-black pt-[72px]">
            {/* Fullscreen background placeholder */}
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900">
                {/* Optional: Add a centered placeholder or leave empty for minimalism */}
                <div className="flex h-full items-center justify-center">
                    <div className="text-neutral-300 dark:text-neutral-700 text-8xl font-light tracking-widest" style={{ fontFamily: '"Times New Roman", serif' }}>
                        •
                    </div>
                </div>
            </div>
        </section>
    )
}
