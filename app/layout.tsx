import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import BackToTop from "@/components/back-to-top"

// Optimize font loading with preload and better display strategy
const inter = Inter({
  subsets: ["latin"],
  display: "optional", // Better for LCP than 'swap'
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true
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
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          {children}
          <FloatingThemeToggle />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
