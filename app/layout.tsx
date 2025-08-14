import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import BackToTop from "@/components/back-to-top"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SheSpeaks - You Belong Here",
  description:
    "A safe, inclusive space for LGBTQ+ and transgender individuals. Find resources, support, stories, and community events.",
  generator: "v0.app",
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
