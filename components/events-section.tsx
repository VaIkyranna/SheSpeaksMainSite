"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface LocationData {
  country: string
  city: string
  region: string
}

interface UpcomingEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  url?: string
  image?: string
}

export function EventsSection() {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])
  const [eventsLoading, setEventsLoading] = useState(false)

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true)
        const locationData = await detectUserLocation()
        setLocation(locationData)
        
        // Fetch upcoming events after getting location
        await fetchUpcomingEvents(locationData)
      } catch (error) {
        console.error("Error detecting location:", error)
        setError("Unable to detect location")
        // Still show events even if location detection fails
        await fetchUpcomingEvents({ country: "Unknown", city: "Your Area", region: "Unknown" })
      } finally {
        setLoading(false)
      }
    }

    detectLocation()
  }, [])

  const detectUserLocation = async (): Promise<LocationData> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
              )
              const data = await response.json()
              resolve({
                country: data.countryName || "Unknown",
                city: data.city || data.locality || "Unknown",
                region: data.principalSubdivision || "Unknown",
              })
            } catch {
              const ipLocation = await getLocationFromIP()
              resolve(ipLocation)
            }
          },
          async () => {
            const ipLocation = await getLocationFromIP()
            resolve(ipLocation)
          },
        )
      } else {
        getLocationFromIP().then(resolve)
      }
    })
  }

  const getLocationFromIP = async (): Promise<LocationData> => {
    try {
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      return {
        country: data.country_name || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
      }
    } catch {
      return { country: "Unknown", city: "Unknown", region: "Unknown" }
    }
  }

  const fetchUpcomingEvents = async (locationData: LocationData) => {
    try {
      setEventsLoading(true)
      
      // Since most free event APIs are limited or unreliable, let's just show the platform links
      // and remove the events section entirely to avoid confusion
      setUpcomingEvents([])
    } catch (error) {
      console.error("Error fetching events:", error)
      setUpcomingEvents([])
    } finally {
      setEventsLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="events" className="pt-2 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-pink-200">
              <span className="text-xl">🏳️‍🌈</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Pride Events & Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Celebrate, connect,</span>
              <br />
              <span className="text-gray-800">and create change together.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Detecting your location to find local LGBTQ+ events...
            </p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="pt-2 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-pink-200">
            <span className="text-xl">🏳️‍🌈</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Pride Events & Community</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Celebrate, connect,</span>
            <br />
            <span className="text-gray-800">and create change together.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find LGBTQ+ events and meetups in your area
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border border-gray-200/50 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">Local events near you</CardTitle>
              <CardDescription className="text-base text-gray-600 max-w-2xl mx-auto">
                Check out these great places to find LGBTQ+ events, meetups, and community gatherings near you.
              </CardDescription>
            </CardHeader>
            

            
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => {
                    const searchLocation =
                      location?.city !== "Unknown"
                        ? `${location?.city} ${location?.country}`
                        : location?.country || "your area"
                    window.open(`https://www.eventbrite.com/d/${encodeURIComponent(searchLocation)}/lgbtq/`, "_blank")
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 rounded-lg border border-red-200">
                        <span className="text-lg">🏳️‍🌈</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">Eventbrite</div>
                        <div className="text-sm text-gray-600">Search for Pride events and LGBTQ+ meetups</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-600 transition-colors" />
                  </div>
                </div>

                <div
                  className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => {
                    const searchLocation = location?.city !== "Unknown" ? location?.city : location?.country || ""
                    window.open(
                      `https://www.meetup.com/find/?keywords=lgbtq&location=${encodeURIComponent(searchLocation)}`,
                      "_blank",
                    )
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 rounded-lg border border-purple-200">
                        <span className="text-lg">🏳️‍⚧️</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Meetup</div>
                        <div className="text-sm text-gray-600">Join transgender & LGBTQ+ support groups</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>

                <div
                  className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => {
                    window.open("https://www.facebook.com/events/search/?q=lgbtq", "_blank")
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-lg border border-blue-200">
                        <span className="text-lg">❤️</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Facebook Events</div>
                        <div className="text-sm text-gray-600">Discover Pride & community events near you</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>

                <div
                  className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => {
                    const countryCode =
                      location?.country === "United Kingdom"
                        ? "uk"
                        : location?.country === "United States"
                          ? "us"
                          : location?.country === "Canada"
                            ? "ca"
                            : location?.country === "Australia"
                              ? "au"
                              : "global"
                    window.open(`https://www.google.com/search?q=lgbtq+events+near+me+${countryCode}`, "_blank")
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-100 via-green-100 to-blue-100 rounded-lg border border-yellow-200">
                        <span className="text-lg">🌈</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Local Search</div>
                        <div className="text-sm text-gray-600">Find Pride events through local LGBTQ+ organizations</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
