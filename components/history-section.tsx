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

  // LGBTQ+ related keywords for filtering events
  const lgbtqKeywords = [
    'gay', 'lesbian', 'homosexual', 'transgender', 'bisexual', 'queer', 'lgbt', 'lgbtq',
    'same-sex', 'pride', 'stonewall', 'harvey milk', 'marriage equality', 'don\'t ask don\'t tell',
    'section 28', 'aids', 'hiv', 'act up', 'glaad', 'human rights campaign', 'pflag',
    'drag', 'ballroom', 'voguing', 'trans', 'gender identity', 'sexual orientation',
    'homophobia', 'transphobia', 'discrimination', 'civil rights', 'equality',
    'oscar wilde', 'alan turing', 'marsha p. johnson', 'sylvia rivera', 'bayard rustin',
    'james baldwin', 'audre lorde', 'virginia woolf', 'gertrude stein', 'radclyffe hall',
    'mattachine society', 'daughters of bilitis', 'gay liberation', 'pink triangle',
    'rainbow flag', 'coming out', 'closet', 'outing', 'conversion therapy',
    'gender dysphoria', 'hormone therapy', 'sex reassignment', 'deadnaming',
    'chosen family', 'found family', 'ballroom culture', 'house system',
    'leather community', 'bear community', 'twink', 'butch', 'femme',
    'genderqueer', 'non-binary', 'pansexual', 'asexual', 'demisexual',
    'intersex', 'two-spirit', 'third gender', 'gender fluid', 'agender'
  ]

  const isLGBTQRelated = (event: HistoricalEvent): boolean => {
    const searchText = `${event.text} ${event.html}`.toLowerCase()
    return lgbtqKeywords.some(keyword => searchText.includes(keyword.toLowerCase()))
  }

  const fetchHistoricalEvents = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const today = new Date()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      const cacheKey = `history-${month}-${day}`
      
      const cachedEvents = cache.get<HistoricalEvent[]>(cacheKey)
      if (cachedEvents && cachedEvents.length > 0) {
        setEvents(cachedEvents)
        setLoading(false)
        return
      }

      // Fetch from Wikipedia API
      const response = await fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`,
        {
          headers: {
            'User-Agent': 'SheSpeaks-LGBTQ-Website/1.0 (https://shespeaks.example.com)',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: WikipediaResponse = await response.json()
      
      // Combine events from different categories
      const allEvents = [
        ...(data.selected || []),
        ...(data.events || [])
      ]

      // Filter for LGBTQ+ related events
      const lgbtqEvents = allEvents
        .filter(isLGBTQRelated)
        .sort((a, b) => b.year - a.year) // Sort by year, most recent first
        .slice(0, 5) // Limit to 5 events

      // If no LGBTQ+ events found, add some fallback historical events
      if (lgbtqEvents.length === 0) {
        const fallbackEvents: HistoricalEvent[] = [
          {
            year: 1969,
            text: "The Stonewall riots began in New York City, marking a pivotal moment in the LGBTQ+ rights movement.",
            html: "The <a href='https://en.wikipedia.org/wiki/Stonewall_riots'>Stonewall riots</a> began in New York City, marking a pivotal moment in the LGBTQ+ rights movement.",
            no_year_html: "The Stonewall riots began in New York City, marking a pivotal moment in the LGBTQ+ rights movement.",
            links: [{ title: "Stonewall riots", link: "https://en.wikipedia.org/wiki/Stonewall_riots" }]
          }
        ]
        setEvents(fallbackEvents)
      } else {
        setEvents(lgbtqEvents)
        // Cache the results for 24 hours
        cache.set(cacheKey, lgbtqEvents)
      }
    } catch (err) {
      console.error('Error fetching historical events:', err)
      setError('Failed to load historical events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistoricalEvents()
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
    if (event.links && event.links.length > 0) {
      return event.links[0].link
    }
    
    // Try to extract link from HTML
    const linkMatch = event.html.match(/href=['"]([^'"]*wikipedia[^'"]*)['"]/i)
    if (linkMatch) {
      return linkMatch[1].startsWith('http') ? linkMatch[1] : `https://en.wikipedia.org${linkMatch[1]}`
    }
    
    return null
  }

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '')
  }

  if (loading) {
    return (
      <section id="history" className="pt-4 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-pink-200">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">This Day in History</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">LGBTQ+ History</span>
              <br />
              <span className="text-gray-800">for {formatDate()}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discovering important moments in LGBTQ+ history that happened on this day...
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="history" className="pt-4 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-pink-200">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">This Day in History</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">LGBTQ+ History</span>
              <br />
              <span className="text-gray-800">for {formatDate()}</span>
            </h2>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={handleRetry} 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
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
    <section id="history" className="pt-4 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-pink-200">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">This Day in History</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">LGBTQ+ History</span>
            <br />
            <span className="text-gray-800">for {formatDate()}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Important moments in LGBTQ+ history that happened on this day throughout the years.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No LGBTQ+ historical events found for today.</p>
            <Button 
              onClick={handleRetry} 
              variant="outline"
              className="border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Check Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event, index) => {
              const wikipediaLink = extractWikipediaLink(event)
              const cleanText = stripHtml(event.text)
              
              return (
                <Card
                  key={`${event.year}-${index}`}
                  className="group relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full border border-purple-200">
                        <Calendar className="w-3 h-3 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700">{event.year}</span>
                      </div>
                      {wikipediaLink && (
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-600 transition-colors" />
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors leading-tight">
                      Historical Event
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {cleanText}
                    </CardDescription>

                    <div className="flex items-center justify-between mt-auto">
                      {wikipediaLink ? (
                        <button
                          className="custom-button text-xs"
                          style={{
                            padding: '8px 16px',
                            fontSize: '12px',
                            borderRadius: '10px',
                            gap: '4px',
                            fontFamily: 'SFUIDisplay-Semibold'
                          }}
                          onClick={() => window.open(wikipediaLink, "_blank", "noopener,noreferrer")}
                        >
                          Learn More
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <div className="text-xs text-gray-500">
                          Historical record
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 font-medium">
                        {formatDate()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Events
          </Button>
        </div>
      </div>
    </section>
  )
}