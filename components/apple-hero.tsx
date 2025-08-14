"use client"

import { useEffect, useState, useRef } from "react"

export function AppleHero() {
  const [backgroundImage, setBackgroundImage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<Array<HTMLDivElement | null>>([])
  const menuRef = useRef<HTMLDivElement>(null)
  const tabs = ["Home", "News", "Resources", "Events", "Community", "About"]

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

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0]
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="relative min-h-[120px] md:min-h-[140px] flex flex-col items-center overflow-visible z-10">
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

      {/* Tabs Navigation - Mobile (Hamburger) */}
      <div className="md:hidden fixed top-2 right-2 z-[9999]" ref={menuRef}>
        <div className="relative">
          <button 
            className="text-white p-1 focus:outline-none bg-black/30 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-black/95 backdrop-blur-md rounded-md shadow-xl py-1 z-[10000] border border-white/10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-3 py-1.5 text-sm ${
                    index === activeIndex 
                      ? 'text-white font-medium' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsMenuOpen(false);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Navigation - Desktop */}
      <div className="hidden md:block absolute top-6 right-6 z-20">
        <div className="relative">
          {/* Hover Highlight */}
          <div
            className="absolute h-8 transition-all duration-200 ease-out bg-white/10 rounded-md -z-10"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
              transform: hoveredIndex !== null ? 'scale(1.02)' : 'scale(1)',
              transitionProperty: 'all',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '200ms',
            }}
          />

          {/* Active Indicator */}
          <div
            className="absolute bottom-0 h-[1.5px] bg-white/90 transition-all duration-300 ease-out"
            style={{
              ...activeStyle,
              opacity: activeIndex !== null ? 1 : 0,
              transitionProperty: 'all',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '300ms',
            }}
          />

          {/* Tabs */}
          <div className="relative flex items-center space-x-1">
            {tabs.map((tab, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  tabRefs.current[index] = el
                }}
                className={`px-3 py-1.5 cursor-pointer transition-all duration-200 h-8 text-sm ${
                  index === activeIndex 
                    ? 'text-white font-medium' 
                    : 'text-white/70 hover:text-white/90'
                }`}
                style={{ 
                  fontFamily: 'SFUIDisplay-Light',
                  paddingBottom: '0.35rem',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="relative">
                  {tab}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center pt-3">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading in White */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mb-1" style={{ fontFamily: "SFUIDisplay-Semibold" }}>
            SheSpeaks
          </h1>

          {/* Inspiring Description */}
          <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto mt-2" style={{ fontFamily: "SFUIDisplay-Light" }}>
            The latest LGBTQ+ news and resources — all in one place
          </p>
        </div>
      </div>
    </section>
  )
}