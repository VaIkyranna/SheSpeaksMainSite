"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Clock, RefreshCw } from "lucide-react"

interface HistoricalEvent {
  year: number
  title: string
  description: string
  category: 'Civil Rights' | 'Entertainment' | 'Politics' | 'Medical' | 'Culture' | 'Legal'
  image?: string
  wikipediaLink?: string
  significance: 'High' | 'Medium' | 'Low'
  location?: string
  keyFigures?: string[]
}

export function HistorySection() {
  const [events, setEvents] = useState<HistoricalEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Monthly LGBTQ+ historical events - focused on "This Month in History"
  const monthlyEvents: { [key: number]: HistoricalEvent[] } = {
    1: [ // January
      { 
        year: 1895, 
        title: "Oscar Wilde's Trial Begins", 
        description: "The first trial of Oscar Wilde for 'gross indecency' begins in London, marking a pivotal moment in LGBTQ+ legal history.",
        category: 'Legal',
        significance: 'High',
        location: 'London, UK',
        keyFigures: ['Oscar Wilde'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/400px-Oscar_Wilde_Sarony.jpg',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Trials_of_Oscar_Wilde'
      },
      { 
        year: 1972, 
        title: "Sweden Pioneers Trans Rights", 
        description: "Sweden becomes the first country to allow transgender people to legally change gender and access hormone therapy.",
        category: 'Medical',
        significance: 'High',
        location: 'Sweden',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/400px-Flag_of_Sweden.svg.png',
        wikipediaLink: 'https://en.wikipedia.org/wiki/LGBT_rights_in_Sweden'
      },
      { 
        year: 1978, 
        title: "Harvey Milk Takes Office", 
        description: "Harvey Milk is sworn in as one of the first openly gay elected officials in the U.S., becoming a beacon of hope for the community.",
        category: 'Politics',
        significance: 'High',
        location: 'San Francisco, USA',
        keyFigures: ['Harvey Milk'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Harvey_Milk_in_1978_at_Gay_Pride_Parade_cropped.jpg/400px-Harvey_Milk_in_1978_at_Gay_Pride_Parade_cropped.jpg',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Harvey_Milk'
      }
    ],
    2: [ // February
      { 
        year: 1869, 
        title: "Term 'Homosexual' First Used", 
        description: "Karl-Maria Kertbeny coins the term 'homosexual' in a German-Hungarian pamphlet, creating language that would shape LGBTQ+ discourse.",
        category: 'Culture',
        significance: 'High',
        location: 'Germany',
        keyFigures: ['Karl-Maria Kertbeny'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/400px-Flag_of_Germany.svg.png',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Karl-Maria_Kertbeny'
      },
      { 
        year: 1988, 
        title: "UK Section 28 Enacted", 
        description: "The UK introduces Section 28 legislation banning the 'promotion' of homosexuality, sparking widespread protests and activism.",
        category: 'Legal',
        significance: 'High',
        location: 'United Kingdom',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/400px-Flag_of_the_United_Kingdom.svg.png',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Section_28'
      },
      { 
        year: 2004, 
        title: "San Francisco Marriage Licenses", 
        description: "San Francisco begins issuing the first legal same-sex marriage licenses in the U.S., defying state law and inspiring nationwide activism.",
        category: 'Legal',
        significance: 'High',
        location: 'San Francisco, USA',
        keyFigures: ['Gavin Newsom'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2004_same-sex_marriages_in_San_Francisco.jpg/400px-2004_same-sex_marriages_in_San_Francisco.jpg',
        wikipediaLink: 'https://en.wikipedia.org/wiki/2004_same-sex_marriages_in_San_Francisco'
      }
    ],
    6: [ // June
      { 
        year: 1969, 
        title: "Stonewall Riots Begin", 
        description: "The Stonewall riots begin in New York City, sparking the modern LGBTQ+ rights movement and changing history forever.",
        category: 'Civil Rights',
        significance: 'High',
        location: 'New York City, USA',
        keyFigures: ['Marsha P. Johnson', 'Sylvia Rivera'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Stonewall_Inn_5_pride_weekend_2016.jpg/400px-Stonewall_Inn_5_pride_weekend_2016.jpg',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Stonewall_riots'
      },
      { 
        year: 1970, 
        title: "First Pride Marches", 
        description: "The first Pride marches are held in New York, Los Angeles, and Chicago, commemorating Stonewall and establishing an annual tradition.",
        category: 'Culture',
        significance: 'High',
        location: 'Multiple US Cities',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/400px-Gay_Pride_Flag.svg.png',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Pride_parade'
      },
      { 
        year: 2015, 
        title: "Marriage Equality Nationwide", 
        description: "The U.S. Supreme Court legalizes same-sex marriage nationwide in Obergefell v. Hodges, a landmark victory for equality.",
        category: 'Legal',
        significance: 'High',
        location: 'United States',
        keyFigures: ['Jim Obergefell'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/US_Supreme_Court_Building.jpg/400px-US_Supreme_Court_Building.jpg',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Obergefell_v._Hodges'
      }
    ],
    8: [ // August - Current month
      { 
        year: 1961, 
        title: "Illinois Decriminalizes Homosexuality", 
        description: "Illinois becomes the first U.S. state to decriminalize homosexuality, beginning the long journey toward legal acceptance.",
        category: 'Legal',
        significance: 'High',
        location: 'Illinois, USA',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/400px-Flag_of_Illinois.svg.png',
        wikipediaLink: 'https://en.wikipedia.org/wiki/LGBT_rights_in_Illinois'
      },
      { 
        year: 1963, 
        title: "March on Washington", 
        description: "Bayard Rustin, an openly gay civil rights leader, organizes the historic March on Washington, demonstrating intersectional activism.",
        category: 'Civil Rights',
        significance: 'High',
        location: 'Washington D.C., USA',
        keyFigures: ['Bayard Rustin'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bayard_Rustin_1963.jpg/400px-Bayard_Rustin_1963.jpg',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Bayard_Rustin'
      },
      { 
        year: 2013, 
        title: "New Zealand Marriage Equality", 
        description: "New Zealand legalizes same-sex marriage, becoming the first country in Oceania to achieve marriage equality.",
        category: 'Legal',
        significance: 'High',
        location: 'New Zealand',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/400px-Flag_of_New_Zealand.svg.png',
        wikipediaLink: 'https://en.wikipedia.org/wiki/Same-sex_marriage_in_New_Zealand'
      }
    ]
  }
  const fetchHistoricalEvents = async () => {
    try {
      setLoading(true)
      setError(null)

      const today = new Date()
      const currentMonth = today.getMonth() + 1 // 1-12

      // Get events for current month from our static data
      const monthEvents = monthlyEvents[currentMonth] || []

      // Take up to 3 events for display
      const selectedEvents = monthEvents.slice(0, 3)

      setEvents(selectedEvents)

    } catch (err) {
      console.error('Error loading historical events:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(`Failed to load historical events: ${errorMessage}`)
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
      month: 'long'
    })
  }

  const getCategoryColor = (category: string): string => {
    const categoryColors: { [key: string]: string } = {
      'Civil Rights': 'from-red-500 to-orange-500',
      'Legal': 'from-blue-500 to-indigo-500',
      'Entertainment': 'from-pink-500 to-purple-500',
      'Medical': 'from-green-500 to-teal-500',
      'Culture': 'from-yellow-500 to-orange-500',
      'Politics': 'from-indigo-500 to-purple-500',
    }
    return categoryColors[category] || 'from-gray-500 to-gray-600'
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/400px-Gay_Pride_Flag.svg.png';
  }

  if (loading) {
    return (
      <section id="history" className="apple-content-section bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="apple-headline mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">LGBTQ+ History</span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">This Month</span>
            </h2>
            <p className="apple-subheadline max-w-2xl mx-auto">
              Discovering important moments in LGBTQ+ history that happened this month...
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
              <span className="text-gray-800 dark:text-gray-200">This Month</span>
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
            <span className="text-gray-800 dark:text-gray-200">This Month</span>
          </h2>
          <p className="apple-subheadline max-w-2xl mx-auto">
            Explore pivotal moments in LGBTQ+ history from {formatDate()}
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center fade-in">
            <div className="apple-card p-12 max-w-lg mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-200 dark:border-pink-800">
                <Clock className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">No Events Found This Month</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                No LGBTQ+ historical events found for this month, but every day is an opportunity to make history and create positive change.
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
          <div className={`grid gap-6 ${events.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : events.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {events.map((event, index) => (
              <Card
                key={`${event.year}-${index}`}
                className="apple-card group overflow-hidden fade-in bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-600 flex flex-col h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {event.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 apple-transition"
                      onError={handleImageError}
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
                      {event.wikipediaLink && (
                        <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-pink-600 dark:group-hover:text-pink-400 apple-transition" />
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-pink-700 dark:group-hover:text-pink-400 apple-transition leading-tight">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    
                    {event.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    )}

                    {event.keyFigures && event.keyFigures.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.keyFigures.map((figure, figureIndex) => (
                          <span
                            key={figureIndex}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {figure}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
                      {event.wikipediaLink ? (
                        <button
                          className="custom-button"
                          onClick={() => window.open(event.wikipediaLink, "_blank", "noopener,noreferrer")}
                        >
                          Learn More
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      ) : null}
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {formatDate()}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}