import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/common/ThemeProvider"
import { LayoutProvider } from "@/components/common/LayoutProvider"
import { GalleryProvider } from "@/context/GalleryContext"
import { Header } from "@/components/common/Header"
import { ControlsPanel } from "@/components/common/ControlsPanel"
import { ThemeTransitionProvider as ThemeTransitionWrapper } from "@/components/common/ThemeTransitionProvider"
import { PageTransitionProvider } from "@/components/common/PageTransitionProvider"

export const metadata: Metadata = {
  title: "Rivoluzione Analogica – Portfolio",
  description: "Portfolio di fotografia analogica. Un viaggio attraverso la grana e la luce.",
  openGraph: {
    title: "Rivoluzione Analogica",
    description: "Portfolio di fotografia analogica.",
    type: "website",
    locale: "it_IT",
    siteName: "Rivoluzione Analogica",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>
            <GalleryProvider>
              <Header />
              <ControlsPanel />
              <ThemeTransitionWrapper>
                <main className="flex min-h-screen flex-col">
                  <PageTransitionProvider>
                    {children}
                  </PageTransitionProvider>
                </main>
              </ThemeTransitionWrapper>
            </GalleryProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
