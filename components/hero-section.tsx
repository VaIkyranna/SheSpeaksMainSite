"use client"

import { useEffect, useRef } from "react"

export function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPos = (clientX / innerWidth - 0.5) * 20
      const yPos = (clientY / innerHeight - 0.5) * 20

      parallaxRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative py-8 md:py-12 flex items-center justify-center overflow-hidden parallax-container">
      <div className="absolute inset-0 -z-10" ref={parallaxRef}>
        <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-br from-primary/20 to-rose-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-lime-accent/20 to-primary/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight animate-fade-in-up">
            <span className="gradient-text">You belong here.</span>
            <br />
            <span className="text-foreground">Your story matters.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-black mb-6 leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Welcome to SheSpeaks - a vibrant community where LGBTQ+ and transgender individuals can find resources,
            share experiences, and celebrate their authentic selves.
          </p>
        </div>
      </div>
    </section>
  )
}
