"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Users, Sparkles, ArrowRight, Star } from "lucide-react"

export function SheSpeaksBanner() {
  const [backgroundImage, setBackgroundImage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Curated LGBT/Pride/Transgender images from Unsplash
    const prideImages = [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Pride flag
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Rainbow abstract
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Pride celebration
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Diversity hands
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Community
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Rainbow colors
      "https://images.unsplash.com/photo-1607344645866-009c7d0435c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80", // Pride march
    ]
    
    const randomImage = prideImages[Math.floor(Math.random() * prideImages.length)]
    setBackgroundImage(randomImage)
    
    // Preload image
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.src = randomImage
  }, [])

  return (
    <section className="banner-height relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900">
      {/* Dynamic Background Image */}
      {isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-100"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-800/60 to-blue-900/80 dark:from-purple-900/90 dark:via-pink-800/80 dark:to-blue-900/90 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" style={{
        backgroundSize: '100% 200%',
        backgroundPosition: 'center 70%'
      }} />
      
      {/* Animated Pride Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rainbow gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-red-400/30 via-yellow-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/20 via-red-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Floating pride elements */}
        <div className="absolute top-32 right-32 text-6xl animate-bounce" style={{ animationDelay: "0.5s" }}>🏳️‍🌈</div>
        <div className="absolute bottom-32 left-32 text-5xl animate-bounce" style={{ animationDelay: "1.5s" }}>🏳️‍⚧️</div>
        <div className="absolute top-1/2 right-1/4 text-4xl animate-bounce" style={{ animationDelay: "2.5s" }}>❤️</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading with Rainbow Gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 font-sans animate-fade-in-up leading-tight" style={{ animationDelay: "0.1s" }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-purple-400 to-pink-400 bg-size-400 animate-rainbow">
              SheSpeaks
            </span>
          </h1>

          {/* Powerful Subheading */}
          <h2 className="text-xl md:text-2xl text-white font-bold mb-6 leading-tight max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Your Voice. Your Story. Your Power.
          </h2>

          {/* Modern CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white border-0 px-6 py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              <Heart className="w-5 h-5 mr-2" />
              Join Community
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-md px-6 py-4 text-base font-bold rounded-xl transition-all"
            >
              <Users className="w-5 h-5 mr-2" />
              Explore
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}