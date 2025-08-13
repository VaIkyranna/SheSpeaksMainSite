"use client"

import { useState } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export function AppleNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Logo */}

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#news" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                News
              </a>
              <a href="#resources" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Resources
              </a>
              <a href="#events" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Events
              </a>
              <a href="#support" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Support
              </a>
              <button
                onClick={toggleTheme}
                className="ml-4 p-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#news" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              News
            </a>
            <a href="#resources" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Resources
            </a>
            <a href="#events" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Events
            </a>
            <a href="#support" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Support
            </a>
            <button
              onClick={toggleTheme}
              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={16} className="mr-2" /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2" /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
