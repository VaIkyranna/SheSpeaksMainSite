"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, MapPin, Heart, Globe } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface LocalResource {
  name: string
  type: string
  description: string
  website?: string
  location: string
}

export function ResourcesSection() {
  const [userCountry, setUserCountry] = useState<string>("")
  const [localResources, setLocalResources] = useState<LocalResource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const detectLocationAndFetchResources = async () => {
      try {
        // Get user's location using geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords

              // Reverse geocoding to get country
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
              )
              const locationData = await response.json()
              const country = locationData.countryName || "Unknown"
              setUserCountry(country)

              // Fetch local LGBTQ+ resources based on country
              await fetchLocalResources(country)
            },
            async () => {
              // Fallback: use IP-based location
              try {
                const ipResponse = await fetch("https://ipapi.co/json/")
                const ipData = await ipResponse.json()
                const country = ipData.country_name || "Global"
                setUserCountry(country)
                await fetchLocalResources(country)
              } catch {
                setUserCountry("Global")
                await fetchLocalResources("Global")
              }
            },
          )
        } else {
          // Fallback for browsers without geolocation
          const ipResponse = await fetch("https://ipapi.co/json/")
          const ipData = await ipResponse.json()
          const country = ipData.country_name || "Global"
          setUserCountry(country)
          await fetchLocalResources(country)
        }
      } catch (error) {
        console.error("Location detection failed:", error)
        setUserCountry("Global")
        await fetchLocalResources("Global")
      }
    }

    detectLocationAndFetchResources()
  }, [])

  const fetchLocalResources = async (country: string) => {
    try {
      setLoading(true)

      // Simulated local resources database (in real implementation, this would be an API call)
      const resourcesDatabase: Record<string, LocalResource[]> = {
        "United Kingdom": [
          {
            name: "Stonewall UK",
            type: "Support Organization",
            description: "Leading LGBTQ+ charity providing support, information and advocacy services.",
            website: "https://www.stonewall.org.uk",
            location: "London, UK",
          },
          {
            name: "LGBT Foundation",
            type: "Community Center",
            description: "National charity delivering advice, support and information services to LGBT communities.",
            website: "https://lgbt.foundation",
            location: "Manchester, UK",
          },
          {
            name: "Mermaids",
            type: "Trans Support",
            description: "Supporting transgender, nonbinary and gender-diverse children and young people.",
            website: "https://mermaidsuk.org.uk",
            location: "UK Wide",
          },
        ],
        "United States": [
          {
            name: "The Trevor Project",
            type: "Crisis Support",
            description: "24/7 crisis support services for LGBTQ+ young people.",
            website: "https://www.thetrevorproject.org",
            location: "National",
          },
          {
            name: "GLAAD",
            type: "Advocacy",
            description: "Working to accelerate acceptance for the LGBTQ+ community.",
            website: "https://www.glaad.org",
            location: "National",
          },
          {
            name: "PFLAG",
            type: "Family Support",
            description: "Support, education and advocacy for LGBTQ+ people and their families.",
            website: "https://pflag.org",
            location: "National",
          },
        ],
        Canada: [
          {
            name: "Egale Canada",
            type: "Human Rights",
            description: "Advancing equality for LGBTQI2S people and their families across Canada.",
            website: "https://egale.ca",
            location: "National",
          },
          {
            name: "The 519",
            type: "Community Center",
            description: "Community center offering programs and services for LGBTQ2S communities.",
            website: "https://www.the519.org",
            location: "Toronto, ON",
          },
        ],
        Australia: [
          {
            name: "ACON",
            type: "Health & Support",
            description: "Health promotion organization for LGBTQ+ communities.",
            website: "https://www.acon.org.au",
            location: "NSW, Australia",
          },
          {
            name: "Minus18",
            type: "Youth Support",
            description: "Supporting LGBTQ+ young people across Australia.",
            website: "https://www.minus18.org.au",
            location: "National",
          },
        ],
        Global: [
          {
            name: "ILGA World",
            type: "International Advocacy",
            description: "Worldwide federation of LGBTI organizations from over 150 countries.",
            website: "https://ilga.org",
            location: "International",
          },
          {
            name: "OutRight Action International",
            type: "Human Rights",
            description: "Fighting for LGBTIQ human rights worldwide.",
            website: "https://outrightinternational.org",
            location: "International",
          },
          {
            name: "IGLYO",
            type: "Youth Network",
            description: "International network of LGBTQI youth and student organizations.",
            website: "https://www.iglyo.com",
            location: "International",
          },
        ],
      }

      // Try to find exact match first, then fallback to Global
      let countryResources = resourcesDatabase[country]
      if (!countryResources) {
        // Try some common variations
        const variations = [
          country.replace("United States", "United States"),
          country.replace("UK", "United Kingdom"),
          country.replace("Britain", "United Kingdom"),
          country.replace("USA", "United States"),
        ]
        
        for (const variation of variations) {
          if (resourcesDatabase[variation]) {
            countryResources = resourcesDatabase[variation]
            break
          }
        }
        
        // Final fallback to Global
        if (!countryResources) {
          countryResources = resourcesDatabase["Global"]
        }
      }
      setLocalResources(countryResources)
    } catch (error) {
      console.error("Failed to fetch local resources:", error)
      setLocalResources([])
    } finally {
      setLoading(false)
    }
  }

  const resources = [
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Helpful, affirming resources about LGBTQ+ identities, transgender journeys, accessing healthcare, and finding community support along the way.",
      color: "primary",
      image:
        "https://images.unsplash.com/photo-1670523798656-eda0ea506db6?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: Users,
      title: "Community Groups",
      description: "Local and online support groups, meetups, and safe spaces to connect with others.",
      color: "lime-accent",
      image:
        "https://images.unsplash.com/photo-1650296399493-fa7941386046?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: MapPin,
      title: "Local Services",
      description: "Find LGBTQ+-friendly healthcare providers, therapists, and services in your area.",
      color: "primary",
      image:
        "https://plus.unsplash.com/premium_photo-1717629832752-d4df9f47f6bb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: Heart,
      title: "Wellness Resources",
      description: "Mental health support, self-care tips, and inclusive wellness practices.",
      color: "rose-accent",
      image:
        "https://images.unsplash.com/photo-1658275876886-374d94cd4563?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  return (
    <section id="resources" className="pt-4 pb-16 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Resources & Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Find Resources & Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Access comprehensive resources and connect with supportive communities tailored for your journey.
          </p>
        </div>

        {userCountry && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Local Resources{userCountry !== "Global" ? ` in ${userCountry}` : ""}</h3>
              </div>
              <p className="text-gray-600">Discover LGBTQ+ organizations and support groups in your area</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localResources.map((resource, index) => (
                  <Card key={index} className="group relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                          {resource.name}
                        </CardTitle>
                      </div>
                      <div className="inline-block text-xs font-semibold px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 rounded-full border border-purple-200">
                        {resource.type}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {resource.location}
                      </div>
                      {resource.website && (
                        <button
                          className="custom-button text-xs w-full justify-center"
                          onClick={() => window.open(resource.website, "_blank")}
                        >
                          Visit
                          <Globe className="w-3 h-3" />
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="group relative bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={resource.image || "/placeholder.svg"}
                  alt={resource.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                    <resource.icon className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {resource.description}
                </p>
                
                <button className="custom-button w-full justify-center text-sm">
                  Explore Resources
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
