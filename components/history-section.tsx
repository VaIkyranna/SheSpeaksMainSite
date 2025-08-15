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

  // Static LGBTQ+ historical events by month from curated data
  const monthlyEvents: { [key: number]: HistoricalEvent[] } = {
    1: [ // January
      { year: 1895, text: "First trial of Oscar Wilde for 'gross indecency' begins in London.", html: "First trial of Oscar Wilde for 'gross indecency' begins in London.", no_year_html: "First trial of Oscar Wilde for 'gross indecency' begins in London." },
      { year: 1972, text: "Sweden becomes first country to allow transgender people to legally change gender and access hormone therapy.", html: "Sweden becomes first country to allow transgender people to legally change gender and access hormone therapy.", no_year_html: "Sweden becomes first country to allow transgender people to legally change gender and access hormone therapy." },
      { year: 1978, text: "Harvey Milk sworn in as one of the first openly gay elected officials in the U.S.", html: "Harvey Milk sworn in as one of the first openly gay elected officials in the U.S.", no_year_html: "Harvey Milk sworn in as one of the first openly gay elected officials in the U.S." }
    ],
    2: [ // February
      { year: 1869, text: "First recorded use of the term 'homosexual' appears in a German-Hungarian pamphlet by Karl-Maria Kertbeny.", html: "First recorded use of the term 'homosexual' appears in a German-Hungarian pamphlet by Karl-Maria Kertbeny.", no_year_html: "First recorded use of the term 'homosexual' appears in a German-Hungarian pamphlet by Karl-Maria Kertbeny." },
      { year: 1988, text: "UK Section 28 legislation introduced to ban 'promotion' of homosexuality.", html: "UK Section 28 legislation introduced to ban 'promotion' of homosexuality.", no_year_html: "UK Section 28 legislation introduced to ban 'promotion' of homosexuality." },
      { year: 2004, text: "San Francisco issues first legal same-sex marriage licenses.", html: "San Francisco issues first legal same-sex marriage licenses.", no_year_html: "San Francisco issues first legal same-sex marriage licenses." }
    ],
    3: [ // March
      { year: 1785, text: "Jeremy Bentham writes defense of same-sex relationships.", html: "Jeremy Bentham writes defense of same-sex relationships.", no_year_html: "Jeremy Bentham writes defense of same-sex relationships." },
      { year: 1982, text: "Wisconsin bans discrimination based on sexual orientation.", html: "Wisconsin bans discrimination based on sexual orientation.", no_year_html: "Wisconsin bans discrimination based on sexual orientation." },
      { year: 2014, text: "Same-sex marriage becomes legal in England and Wales.", html: "Same-sex marriage becomes legal in England and Wales.", no_year_html: "Same-sex marriage becomes legal in England and Wales." }
    ],
    4: [ // April
      { year: 1895, text: "Oscar Wilde arrested for gross indecency.", html: "Oscar Wilde arrested for gross indecency.", no_year_html: "Oscar Wilde arrested for gross indecency." },
      { year: 1997, text: "Ellen DeGeneres comes out on The Oprah Winfrey Show and in Ellen sitcom episode.", html: "Ellen DeGeneres comes out on The Oprah Winfrey Show and in Ellen sitcom episode.", no_year_html: "Ellen DeGeneres comes out on The Oprah Winfrey Show and in Ellen sitcom episode." },
      { year: 2001, text: "Netherlands becomes first country to legalize same-sex marriage.", html: "Netherlands becomes first country to legalize same-sex marriage.", no_year_html: "Netherlands becomes first country to legalize same-sex marriage." }
    ],
    5: [ // May
      { year: 1895, text: "Oscar Wilde convicted of gross indecency.", html: "Oscar Wilde convicted of gross indecency.", no_year_html: "Oscar Wilde convicted of gross indecency." },
      { year: 1990, text: "World Health Organization declassifies homosexuality as mental disorder.", html: "World Health Organization declassifies homosexuality as mental disorder.", no_year_html: "World Health Organization declassifies homosexuality as mental disorder." },
      { year: 2019, text: "Taiwan legalizes same-sex marriage, first in Asia.", html: "Taiwan legalizes same-sex marriage, first in Asia.", no_year_html: "Taiwan legalizes same-sex marriage, first in Asia." }
    ],
    6: [ // June
      { year: 1969, text: "Stonewall riots begin in New York City, sparking the modern LGBTQ+ rights movement.", html: "Stonewall riots begin in New York City, sparking the modern LGBTQ+ rights movement.", no_year_html: "Stonewall riots begin in New York City, sparking the modern LGBTQ+ rights movement." },
      { year: 1970, text: "First Pride marches held in New York, Los Angeles, and Chicago.", html: "First Pride marches held in New York, Los Angeles, and Chicago.", no_year_html: "First Pride marches held in New York, Los Angeles, and Chicago." },
      { year: 2015, text: "U.S. Supreme Court legalizes same-sex marriage nationwide in Obergefell v. Hodges.", html: "U.S. Supreme Court legalizes same-sex marriage nationwide in Obergefell v. Hodges.", no_year_html: "U.S. Supreme Court legalizes same-sex marriage nationwide in Obergefell v. Hodges." }
    ],
    7: [ // July
      { year: 1965, text: "First Annual Reminder picket held in Philadelphia for LGBTQ+ rights.", html: "First Annual Reminder picket held in Philadelphia for LGBTQ+ rights.", no_year_html: "First Annual Reminder picket held in Philadelphia for LGBTQ+ rights." },
      { year: 2005, text: "Spain legalizes same-sex marriage.", html: "Spain legalizes same-sex marriage.", no_year_html: "Spain legalizes same-sex marriage." },
      { year: 2010, text: "Argentina legalizes same-sex marriage, first in Latin America.", html: "Argentina legalizes same-sex marriage, first in Latin America.", no_year_html: "Argentina legalizes same-sex marriage, first in Latin America." }
    ],
    8: [ // August
      { year: 1961, text: "Illinois becomes first U.S. state to decriminalize homosexuality.", html: "Illinois becomes first U.S. state to decriminalize homosexuality.", no_year_html: "Illinois becomes first U.S. state to decriminalize homosexuality." },
      { year: 1963, text: "Bayard Rustin, openly gay civil rights leader, organizes March on Washington.", html: "Bayard Rustin, openly gay civil rights leader, organizes March on Washington.", no_year_html: "Bayard Rustin, openly gay civil rights leader, organizes March on Washington." },
      { year: 2013, text: "New Zealand legalizes same-sex marriage.", html: "New Zealand legalizes same-sex marriage.", no_year_html: "New Zealand legalizes same-sex marriage." }
    ],
    9: [ // September
      { year: 1987, text: "First display of AIDS Memorial Quilt in Washington, D.C.", html: "First display of AIDS Memorial Quilt in Washington, D.C.", no_year_html: "First display of AIDS Memorial Quilt in Washington, D.C." },
      { year: 2011, text: "Repeal of 'Don't Ask, Don't Tell' takes effect in U.S. military.", html: "Repeal of 'Don't Ask, Don't Tell' takes effect in U.S. military.", no_year_html: "Repeal of 'Don't Ask, Don't Tell' takes effect in U.S. military." },
      { year: 2018, text: "India's Supreme Court decriminalizes homosexuality.", html: "India's Supreme Court decriminalizes homosexuality.", no_year_html: "India's Supreme Court decriminalizes homosexuality." }
    ],
    10: [ // October
      { year: 1969, text: "Canada decriminalizes homosexuality.", html: "Canada decriminalizes homosexuality.", no_year_html: "Canada decriminalizes homosexuality." },
      { year: 1988, text: "First National Coming Out Day established.", html: "First National Coming Out Day established.", no_year_html: "First National Coming Out Day established." },
      { year: 1993, text: "U.S. Congress passes 'Don't Ask, Don't Tell' policy.", html: "U.S. Congress passes 'Don't Ask, Don't Tell' policy.", no_year_html: "U.S. Congress passes 'Don't Ask, Don't Tell' policy." }
    ],
    11: [ // November
      { year: 1973, text: "American Psychiatric Association confirms homosexuality is not a mental disorder.", html: "American Psychiatric Association confirms homosexuality is not a mental disorder.", no_year_html: "American Psychiatric Association confirms homosexuality is not a mental disorder." },
      { year: 1978, text: "Harvey Milk assassinated in San Francisco.", html: "Harvey Milk assassinated in San Francisco.", no_year_html: "Harvey Milk assassinated in San Francisco." },
      { year: 1999, text: "First Transgender Day of Remembrance held.", html: "First Transgender Day of Remembrance held.", no_year_html: "First Transgender Day of Remembrance held." }
    ],
    12: [ // December
      { year: 1924, text: "Henry Gerber founds Society for Human Rights, first gay rights organization in the U.S.", html: "Henry Gerber founds Society for Human Rights, first gay rights organization in the U.S.", no_year_html: "Henry Gerber founds Society for Human Rights, first gay rights organization in the U.S." },
      { year: 1988, text: "First World AIDS Day observed.", html: "First World AIDS Day observed.", no_year_html: "First World AIDS Day observed." },
      { year: 2022, text: "U.S. enacts Respect for Marriage Act protecting same-sex marriage rights.", html: "U.S. enacts Respect for Marriage Act protecting same-sex marriage rights.", no_year_html: "U.S. enacts Respect for Marriage Act protecting same-sex marriage rights." }
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
            Important moments in LGBTQ+ history that happened this month throughout the years.
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