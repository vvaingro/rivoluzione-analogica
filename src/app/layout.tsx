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
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://analog-revolution.vercel.app"),
  title: {
    default: "Rivoluzione Analogica",
    template: "%s | Rivoluzione Analogica",
  },
  description: "Rivoluzione Analogica - new worlds through old eyes",
  keywords: ["Analog Photography", "Black & White", "Film Portfolio", "Fotografia Analogica", "Bianco e Nero"],
  openGraph: {
    title: "Rivoluzione Analogica",
    description: "Rivoluzione Analogica - new worlds through old eyes",
    url: "https://analog-revolution.vercel.app", // Assuming Vercel deployment or env var, using hardcoded for now or NEXT_PUBLIC_SITE_URL if available
    siteName: "Rivoluzione Analogica",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rivoluzione Analogica Portfolio",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivoluzione Analogica",
    description: "Rivoluzione Analogica - new worlds through old eyes",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rivoluzione Analogica",
  url: "https://analog-revolution.vercel.app",
  description: "Rivoluzione Analogica - new worlds through old eyes",
  sameAs: [], // Add social links here if available
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>
            <GalleryProvider>
              <div
                id="app-wrapper"
                className={`transition-all duration-500 ease-in-out ${
                  // Logic handled via global CSS on body[data-layout-mode] -> #app-wrapper
                  ''
                  }`}
              >
                <Header />
                <ControlsPanel />
                <ThemeTransitionWrapper>
                  <main className="flex min-h-screen flex-col">
                    <PageTransitionProvider>
                      {children}
                      <SpeedInsights />
                    </PageTransitionProvider>
                  </main>
                </ThemeTransitionWrapper>
              </div>
            </GalleryProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
