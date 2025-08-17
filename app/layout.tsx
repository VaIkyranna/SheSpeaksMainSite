import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import BackToTop from "@/components/back-to-top"

// Optimize font loading with preload and better display strategy
const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "optional",
  preload: true,
  fallback: ['sans-serif']
})

export const metadata: Metadata = {
  title: "SheSpeaks - You Belong Here",
  description:
    "A safe, inclusive space for LGBTQ+ and transgender individuals. Find resources, support, stories, and community events.",
  generator: "v0.app",
  other: {
    'http-equiv': 'x-ua-compatible',
    'content': 'IE=edge',
  },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  manifest: '/site.webmanifest',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} 
      suppressHydrationWarning
      style={{
        '--font-inter': inter.style.fontFamily,
        '--font-space-grotesk': spaceGrotesk.style.fontFamily,
      } as React.CSSProperties}
    >
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 antialiased transition-colors duration-300 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-50 to-transparent opacity-30 dark:from-purple-900/20 dark:to-transparent" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.1))] opacity-10 dark:opacity-[0.02]" />
            </div>
            {children}
            <FloatingThemeToggle />
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
