import { Contact } from "@/components/sections/Contact"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center relative pt-20 pb-20">
            <div className="absolute top-6 left-6 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-60 transition-opacity"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Gallery
                </Link>
            </div>

            <div className="w-full max-w-2xl px-4 text-center">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-normal mb-8" style={{ fontFamily: '"Times New Roman", serif' }}>
                        About Me
                    </h1>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                        <p>
                            Ciao, sono un fotografo appassionato di analogico e digitale.
                            Questo spazio raccoglie la mia visione del mondo attraverso l'obiettivo.
                        </p>
                        <p>
                            Mi concentro su ritratti, paesaggi e dettagli che spesso passano inosservati.
                            Ogni scatto è una storia, un momento congelato nel tempo.
                        </p>
                    </div>
                </div>
                <Contact />
            </div>
        </main>
    )
}
