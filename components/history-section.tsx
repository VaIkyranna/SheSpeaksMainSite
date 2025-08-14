"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Clock, RefreshCw } from "lucide-react"
import { cache } from "@/lib/cache"

interface HistoricalEvent {
  year: number
  text: string
  html: string
  no_year_html: string
  links?: Array<{
    title: string
    link: string
  }>
  image?: string
}

interface WikipediaResponse {
  selected?: HistoricalEvent[]
  events?: HistoricalEvent[]
}

export function HistorySection() {
  const [events, setEvents] = useState<HistoricalEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)


  const fetchHistoricalEvents = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const today = new Date()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      const todayStr = today.toISOString().split('T')[0]
      const cacheKey = `history-${todayStr}`

      const cachedEvents = cache.get<HistoricalEvent[]>(cacheKey)
      if (cachedEvents && cachedEvents.length > 0) {
        setEvents(cachedEvents)
        setLoading(false)
        return
      }

      // Fetch from our local API endpoint
      const apiUrl = `/api/wikipedia?month=${month}&day=${day}`
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch events (${response.status})`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from API')
      }

      // The API now ensures we get exactly 3 events
      const sortedEvents = data.slice(0, 3)

      setEvents(sortedEvents)
      cache.set(cacheKey, sortedEvents)

    } catch (err) {
      console.error('Error fetching historical events:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(`Failed to load historical events: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistoricalEvents()

    // Set up an interval to check for date changes every hour
    const interval = setInterval(() => {
      const now = new Date()
      const currentDateStr = now.toISOString().split('T')[0]

      // Check if we have cached data for today
      const cacheKey = `history-${currentDateStr}`
      const cachedEvents = cache.get<HistoricalEvent[]>(cacheKey)

      // If no cached data for today, fetch new events
      if (!cachedEvents) {
        fetchHistoricalEvents()
      }
    }, 3600000) // Check every hour

    return () => clearInterval(interval)
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  const formatDate = () => {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    })
  }

  const extractWikipediaLink = (event: HistoricalEvent): string | null => {
    try {
      // First try to get link from the links array
      if (event?.links?.length > 0) {
        return event.links[0].link;
      }

      // Then try to extract link from HTML if it exists
      if (event?.html) {
        const linkMatch = event.html.match(/href=['"]([^'"]*wikipedia[^'"]*)['"]/i);
        if (linkMatch) {
          return linkMatch[1].startsWith('http') ? linkMatch[1] : `https://en.wikipedia.org${linkMatch[1]}`;
        }
      }

      // Finally, try to find any link in the text
      if (event?.text) {
        const linkMatch = event.text.match(/https?:\/\/[^\s]+/i);
        if (linkMatch) {
          return linkMatch[0];
        }
      }

      return null;
    } catch (error) {
      console.error('Error extracting Wikipedia link:', error);
      return null;
    }
  }

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '')
  }

  if (loading) {
    return (
      <section id="history" className="apple-content-section bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="apple-headline mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">LGBTQ+ History</span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">This Week</span>
            </h2>
            <p className="apple-subheadline max-w-2xl mx-auto">
              Discovering important moments in LGBTQ+ history that happened this week...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="apple-card overflow-hidden">
                <div className="loading-shimmer h-48 w-full rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="loading-shimmer h-4 w-16 rounded mb-3"></div>
                  <div className="loading-shimmer h-6 w-full rounded mb-2"></div>
                  <div className="loading-shimmer h-4 w-3/4 rounded mb-4"></div>
                  <div className="loading-shimmer h-10 w-24 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="history" className="apple-content-section bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="apple-headline mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">LGBTQ+ History</span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">This Week</span>
            </h2>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <Button
              onClick={handleRetry}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 apple-transition"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="history" className="apple-content-section bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="apple-headline mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">LGBTQ+ History</span>
            <br />
            <span className="text-gray-800 dark:text-gray-200">This Week</span>
          </h2>
          <p className="apple-subheadline max-w-2xl mx-auto">
            Important moments in LGBTQ+ history that happened this week throughout the years.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center fade-in">
            <div className="apple-card p-12 max-w-lg mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-200 dark:border-pink-800">
                <Clock className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">No Events Found This Week</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                No LGBTQ+ historical events found for this week, but every day is an opportunity to make history and create positive change.
              </p>
              <Button
                onClick={handleRetry}
                className="bg-pink-500 text-white hover:bg-pink-600 apple-transition"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${events.length === 1 ? 'grid-cols-1 max-w-xl mx-auto' : events.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {events.map((event, index) => {
              const wikipediaLink = extractWikipediaLink(event)
              const cleanText = stripHtml(event.text)

              return (
                <Card
                  key={`${event.year}-${index}`}
                  className="apple-card group overflow-hidden fade-in bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-600 flex flex-col h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {event.image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={cleanText.split('.')[0]}
                        className="object-cover w-full h-full group-hover:scale-105 apple-transition"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-grow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-3 py-1.5 rounded-full border border-pink-200 dark:border-pink-800">
                          <Calendar className="w-3 h-3 text-pink-600 dark:text-pink-400" />
                          <span className="text-sm font-semibold text-pink-700 dark:text-pink-300">{event.year}</span>
                        </div>
                        {wikipediaLink && (
                          <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-pink-600 dark:group-hover:text-pink-400 apple-transition" />
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-pink-700 dark:group-hover:text-pink-400 apple-transition leading-tight">
                        {cleanText.split('.')[0].split(',')[0]}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-grow">
                      <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-4">
                        {cleanText.length > 120 ? `${cleanText.substring(0, 120)}...` : cleanText}
                      </CardDescription>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
                        {wikipediaLink ? (
                          <button
                            className="custom-button"
                            onClick={() => window.open(wikipediaLink, "_blank", "noopener,noreferrer")}
                          >
                            Learn More
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Historical record
                          </span>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                          {formatDate()}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>
        )}


      </div>
    </section>
  )
}