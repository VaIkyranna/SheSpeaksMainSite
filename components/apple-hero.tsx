"use client"

import { useEffect, useState } from "react"

export function AppleHero() {
  const [backgroundImage, setBackgroundImage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Create dynamic LGBT-themed backgrounds using CSS
    const prideBackgrounds = [
      'linear-gradient(45deg, #e40303 0%, #ff8c00 16.66%, #ffed00 33.33%, #00811f 50%, #004cff 66.66%, #732982 100%)', // Pride flag
      'linear-gradient(135deg, #55cdfc 0%, #f7a8b8 33%, #ffffff 50%, #f7a8b8 66%, #55cdfc 100%)', // Trans flag
      'linear-gradient(90deg, #d60270 0%, #9b59b6 50%, #0038a8 100%)', // Bisexual flag
      'linear-gradient(45deg, #ff1b8d 0%, #ffda00 50%, #1bb3ff 100%)', // Pansexual colors
      'linear-gradient(135deg, #e40303 0%, #ff8c00 20%, #ffed00 40%, #00811f 60%, #004cff 80%, #732982 100%)', // Rainbow diagonal
      'radial-gradient(circle, #ff1b8d 0%, #9b59b6 50%, #0038a8 100%)', // Radial pride
    ]
    
    const randomBackground = prideBackgrounds[Math.floor(Math.random() * prideBackgrounds.length)]
    setBackgroundImage(randomBackground)
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-[180px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Pride Backgrounds */}
      {isLoaded && backgroundImage && (
        <div 
          className="absolute inset-0"
          style={{ 
            background: backgroundImage,
          }}
        />
      )}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Smaller floating orbs */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading in White */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-3 animate-fade-in-up leading-none text-white tracking-tight" style={{ animationDelay: "0.1s", fontFamily: "SFUIDisplay-Semibold" }}>
        SheSpeaks
          </h1>

          {/* Inspiring Description */}
          <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s", fontFamily: "SFUIDisplay-Light" }}>
          The latest LGBTQ+ news and resources — all in one place
          </p>
        </div>
      </div>


    </section>
  )
}