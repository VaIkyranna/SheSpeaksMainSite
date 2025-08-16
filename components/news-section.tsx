"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ErrorBoundary from "./error-boundary"
import { cache } from "@/lib/cache"
import { Calendar, ExternalLink, TrendingUp, MapPin } from "lucide-react"

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
    site: string
  }
  content: string
  category?: string
}

interface LocationInfo {
  country: string
  code: string
}

// News Carousel Component
function NewsCarousel({ articles }: { articles: NewsArticle[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({})

  // Shared image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1200px-Gay_Pride_Flag.svg.png';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
    }, 6000) // Change every 6 seconds (slower)

    return () => clearInterval(interval)
  }, [articles.length])

  useEffect(() => {
    const processImage = async (article: NewsArticle, index: number) => {
      try {
        // If no image URL, use a fallback
        if (!article.urlToImage) {
          // Use a default placeholder image for articles without images
          article.urlToImage = `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
        }

        // Handle YouTube URLs
        if (article.urlToImage.includes('youtube.com') || article.urlToImage.includes('youtu.be')) {
          const videoId = article.urlToImage.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
          if (videoId?.[1]) {
            article.urlToImage = `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
          } else {
            throw new Error('Invalid YouTube URL');
          }
        }

        // Ensure the URL is absolute
        if (article.urlToImage.startsWith('//')) {
          article.urlToImage = 'https:' + article.urlToImage;
        } else if (article.urlToImage.startsWith('/')) {
          // Try to construct absolute URL using the article's domain
          try {
            const url = new URL(article.url);
            article.urlToImage = `${url.protocol}//${url.host}${article.urlToImage}`;
          } catch (e) {
            // If URL construction fails, keep the original
          }
        }

        // Check if image loads successfully
        const img = new Image();
        const loaded = await new Promise<boolean>((resolve) => {
          const timer = setTimeout(() => {
            img.onload = null;
            img.onerror = null;
            resolve(false);
          }, 3000);
          img.onload = () => {
            clearTimeout(timer);
            img.onload = null;
            img.onerror = null;
            resolve(img.complete && img.naturalWidth > 0);
          };
          img.onerror = () => {
            clearTimeout(timer);
            img.onload = null;
            img.onerror = null;
            resolve(false);
          };
          img.src = article.urlToImage!;
        });

        if (!loaded) throw new Error('Image failed to load');

      } catch (error) {
        console.error(`Error processing image for article: ${article.title}`, error);
        // Don't set a placeholder, let the error be handled by the onError handler in the img tag
      } finally {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
      }
    };

    articles.forEach((article, index) => {
      if (!imagesLoaded[index]) {
        processImage(article, index);
      }
    });
  }, [articles]);

  if (!articles.length) return null

  const currentArticle = articles[currentIndex]

  return (
    <div
      className="mb-8 relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer no-border-override"
      onClick={(e) => {
        const currentArticle = articles[currentIndex];
        if (currentArticle?.url) {
          window.open(currentArticle.url, "_blank", "noopener,noreferrer");
        }
      }}
      style={{
        border: '0px solid transparent !important',
        outline: '0px solid transparent !important',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25) !important',
        borderImage: 'none !important',
        borderWidth: '0 !important',
        borderStyle: 'none !important',
        borderColor: 'transparent !important'
      }}
    >
      {articles.map((article, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            border: 'none !important',
            outline: 'none !important',
            boxShadow: 'none !important',
            borderImage: 'none !important'
          }}
        >
          <div className="w-full h-full relative" style={{
            border: 'none !important',
            outline: 'none !important',
            boxShadow: 'none !important',
            borderImage: 'none !important'
          }}>
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              style={{
                border: 'none !important',
                outline: 'none !important',
                boxShadow: 'none !important',
                borderRadius: '0 !important',
                borderImage: 'none !important'
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {article.source.name}
              </span>
            </div>
            <h3 className="text-xl mb-2 leading-tight">
              {article.title}
            </h3>
            <p className="text-white/90 text-sm line-clamp-2">
              {article.description}
            </p>
          </div>
        </div>
      ))}

      {/* Dots indicator */}
      <div
        className="absolute bottom-4 right-6 flex space-x-2"
        onClick={(e) => e.stopPropagation()}
      >
        {articles.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75 hover:scale-125'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            onMouseEnter={() => setCurrentIndex(index)}
            aria-label={`View slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}

// Category definitions
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Rights & Politics', label: 'Politics' },
  { id: 'Entertainment', label: 'Entertainment' },
  { id: 'Health', label: 'Health' },
  { id: 'Local News', label: 'Local' },
] as const

export function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [allNewsArticles, setAllNewsArticles] = useState<NewsArticle[]>([])
  const [carouselArticles, setCarouselArticles] = useState<NewsArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<LocationInfo | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(true)

  // Shared image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1200px-Gay_Pride_Flag.svg.png';
  };

  const detectUserLocation = async (): Promise<LocationInfo> => {
    try {
      // Try geolocation API first
      if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use reverse geocoding to get country from coordinates
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
                )
                const data = await response.json()
                resolve({
                  country: data.countryName || "United States",
                  code: data.countryCode || "US"
                })
              } catch (error) {
                // Fallback to IP-based detection
                resolve(await getLocationFromIP())
              }
            },
            async () => {
              // Fallback to IP-based detection if geolocation is denied
              resolve(await getLocationFromIP())
            },
            { timeout: 5000 },
          )
        })
      } else {
        return await getLocationFromIP()
      }
    } catch (error) {
      return await getLocationFromIP()
    }
  }

  const getLocationFromIP = async (): Promise<LocationInfo> => {
    try {
      // Try multiple IP geolocation services for better accuracy
      const services = [
        "https://ipapi.co/json/",
        "https://api.ipify.org?format=json", // Fallback service
      ]

      for (const service of services) {
        try {
          const response = await fetch(service)
          const data = await response.json()

          if (service.includes("ipapi.co")) {
            if (data.country_name && data.country_code) {
              return {
                country: data.country_name,
                code: data.country_code
              };
            }
          }
        } catch (serviceError) {
          console.warn(`Failed to get location from ${service}:`, serviceError)
          continue
        }
      }

      // If all services fail, try to detect from browser language/timezone
      const browserLang = navigator.language || navigator.languages?.[0] || "en-US"
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      // Basic timezone to country mapping
      const timezoneCountryMap: { [key: string]: { country: string, code: string } } = {
        "Europe/London": { country: "United Kingdom", code: "GB" },
        "Europe/Berlin": { country: "Germany", code: "DE" },
        "Europe/Paris": { country: "France", code: "FR" },
        "Europe/Amsterdam": { country: "Netherlands", code: "NL" },
        "Europe/Stockholm": { country: "Sweden", code: "SE" },
        "Europe/Oslo": { country: "Norway", code: "NO" },
        "Europe/Copenhagen": { country: "Denmark", code: "DK" },
        "Europe/Helsinki": { country: "Finland", code: "FI" },
        "Europe/Dublin": { country: "Ireland", code: "IE" },
        "America/Toronto": { country: "Canada", code: "CA" },
        "America/Vancouver": { country: "Canada", code: "CA" },
        "Australia/Sydney": { country: "Australia", code: "AU" },
        "Australia/Melbourne": { country: "Australia", code: "AU" },
        "Pacific/Auckland": { country: "New Zealand", code: "NZ" },
        "Africa/Johannesburg": { country: "South Africa", code: "ZA" },
      }

      if (timezoneCountryMap[timezone]) {
        return timezoneCountryMap[timezone]
      }

      // Language-based fallback
      if (browserLang.includes("en-GB")) return { country: "United Kingdom", code: "GB" }
      if (browserLang.includes("en-CA")) return { country: "Canada", code: "CA" }
      if (browserLang.includes("en-AU")) return { country: "Australia", code: "AU" }
      if (browserLang.includes("de")) return { country: "Germany", code: "DE" }
      if (browserLang.includes("fr")) return { country: "France", code: "FR" }
      if (browserLang.includes("nl")) return { country: "Netherlands", code: "NL" }
      if (browserLang.includes("sv")) return { country: "Sweden", code: "SE" }
      if (browserLang.includes("no")) return { country: "Norway", code: "NO" }
      if (browserLang.includes("da")) return { country: "Denmark", code: "DK" }
      if (browserLang.includes("fi")) return { country: "Finland", code: "FI" }

      // Default fallback
      return { country: "United States", code: "US" }
    } catch (error) {
      return { country: "United States", code: "US" }
    }
  }

  const categorizeArticle = (title: string, description: string, content: string): string => {
    const text = `${title} ${description} ${content}`.toLowerCase()

    // First check for violent/negative content that should NEVER be entertainment
    const violentTerms = /\b(killed|shooting|shot|murder|murdered|death|died|attack|attacked|violence|violent|assault|assaulted|stabbed|stabbing|bomb|bombing|terror|terrorist|hate crime|beaten|beating|injured|injury|wounded|blood|funeral|memorial|tragedy|tragic|victim|victims|suspect|arrested|police|investigation|crime|criminal|charges|charged|guilty|verdict|trial|prison|jail|sentenced|conviction|abuse|abused|harassment|harassed|threat|threatened|dangerous|emergency|crisis|disaster|accident|crash|collision|fire|explosion|evacuation|rescue|ambulance|hospital emergency|intensive care|critical condition)\b/

    // Check if content contains violent terms - if so, exclude from entertainment
    if (violentTerms.test(text)) {
      // This is likely news/politics, not entertainment
      const politicalTerms = /\b(court|ruling|legislation|bill|law|legal|policy|government|political|politics|congress|senate|parliament|election|vote|voting|campaign|candidate|president|minister|judge|supreme court|ban|banned|protect|protection|discrimination|equality|marriage equality|same-sex marriage|adoption|civil rights|human rights|transgender rights|gay rights|lesbian rights|bisexual rights|lgbtq rights|anti-lgbtq|anti-gay|anti-trans|conversion therapy ban|bathroom bill|don't say gay|religious freedom|first amendment|constitutional|federal|state law|local law|ordinance|referendum|ballot|lawsuit|legal challenge)\b/

      if (politicalTerms.test(text)) {
        return "Rights & Politics"
      }
      return "LGBTQ+ News" // Default for violent content
    }

    // First check for specific political/legal terms that should NOT be entertainment
    const politicalTerms = /\b(court|ruling|legislation|bill|law|legal|policy|government|political|politics|congress|senate|parliament|election|vote|voting|campaign|candidate|president|minister|judge|supreme court|ban|banned|protect|protection|discrimination|equality|marriage equality|same-sex marriage|adoption|civil rights|human rights|transgender rights|gay rights|lesbian rights|bisexual rights|lgbtq rights|anti-lgbtq|anti-gay|anti-trans|conversion therapy ban|bathroom bill|don't say gay|religious freedom|first amendment|constitutional|federal|state law|local law|ordinance|referendum|ballot|lawsuit|legal challenge)\b/

    // Check for health/medical terms that should NOT be entertainment
    const healthTerms = /\b(health|healthcare|medical|medicine|doctor|hospital|treatment|therapy|mental health|wellness|surgery|clinic|patient|disease|condition|diagnosis|prescription|vaccine|hormone|transition|gender affirming care|hrt|hormone replacement|top surgery|bottom surgery|gender dysphoria|sexual health|prep|hiv|aids|std|sti|transgender health|trans health|gender clinic|endocrinologist|mastectomy|testosterone|estrogen|puberty blockers|medical transition|surgical transition|conversion therapy|reparative therapy|affirmative therapy|lgbtq therapy|crisis|suicide|depression|anxiety|self harm|mental health support)\b/

    // Entertainment terms - more specific to avoid false positives
    const entertainmentTerms = /\b(netflix|hulu|disney\+|disney plus|amazon prime|streaming service|tv series|television series|tv show premiere|season finale|new episode|binge watch|actor stars|actress stars|celebrity couple|red carpet|award show|oscar winner|emmy winner|grammy winner|music video|new album|concert tour|broadway show|theater production|drag queen|drag king|rupaul|drag race|queer eye|pose tv|euphoria hbo|heartstopper netflix|love simon|moonlight film|carol movie|brokeback mountain|paris is burning|orange is the new black|transparent amazon|sense8|schitt's creek|it's a sin|frank ocean|lil nas x|troye sivan|lady gaga|elton john|david bowie|freddie mercury|queer cinema|lgbtq film|gay movie|lesbian film|queer show|lgbtq show|entertainment news|hollywood news|celebrity news|pop culture|film festival|movie premiere|box office|soundtrack|casting|filming|production|director|producer|screenwriter)\b/

    // Politics - prioritize this category for legal/political content
    if (politicalTerms.test(text) && !entertainmentTerms.test(text)) {
      return "Rights & Politics"
    }

    // Health - prioritize this category for health/medical content  
    if (healthTerms.test(text) && !entertainmentTerms.test(text)) {
      return "Health"
    }

    // Entertainment - only if it's clearly entertainment and not politics/health
    if (entertainmentTerms.test(text) && !politicalTerms.test(text) && !healthTerms.test(text)) {
      return "Entertainment"
    }

    // Mixed content - check which is more prominent
    if (politicalTerms.test(text) && entertainmentTerms.test(text)) {
      // Count political vs entertainment terms
      const politicalMatches = (text.match(politicalTerms) || []).length
      const entertainmentMatches = (text.match(entertainmentTerms) || []).length
      return politicalMatches >= entertainmentMatches ? "Rights & Politics" : "Entertainment"
    }

    if (healthTerms.test(text) && entertainmentTerms.test(text)) {
      // Count health vs entertainment terms
      const healthMatches = (text.match(healthTerms) || []).length
      const entertainmentMatches = (text.match(entertainmentTerms) || []).length
      return healthMatches >= entertainmentMatches ? "Health" : "Entertainment"
    }

    // Default category for general LGBTQ+ news
    return "LGBTQ+ News"
  }

  const categorizeWithLocation = (title: string, description: string, content: string, userLocation: LocationInfo | null): string => {
    const text = `${title} ${description} ${content}`.toLowerCase()

    // Check for local news ONLY if we have user location and it matches specifically
    if (userLocation) {
      const locationKeywords = getLocationKeywords(userLocation.country, userLocation.code)

      // STRICT local news detection - must contain specific location keywords
      const hasSpecificLocationKeyword = locationKeywords.some(keyword =>
        text.includes(keyword.toLowerCase())
      )

      // Only mark as local if it specifically mentions the user's country/region
      if (hasSpecificLocationKeyword) {
        // Double-check it's not about other countries
        const otherCountries = ['united states', 'america', 'american', 'germany', 'german', 'france', 'french', 'canada', 'canadian', 'australia', 'australian']
        const mentionsOtherCountries = otherCountries
          .filter(country => country !== userLocation.country.toLowerCase())
          .some(country => text.includes(country))

        if (!mentionsOtherCountries) {
          return "Local News"
        }
      }
    }

    // Fall back to regular categorization
    return categorizeArticle(title, description, content)
  }

  const getLocationKeywords = (country: string, countryCode: string): string[] => {
    const keywords: { [key: string]: string[] } = {
      US: ["United States", "America", "American", "US", "USA", "federal", "congress", "senate"],
      GB: ["UK", "United Kingdom", "Britain", "British", "England", "Scotland", "Wales", "parliament"],
      CA: ["Canada", "Canadian", "Ottawa", "provincial", "federal"],
      AU: ["Australia", "Australian", "Canberra", "NSW", "Victoria"],
      DE: ["Germany", "German", "Berlin", "Bundestag"],
      FR: ["France", "French", "Paris", "République"],
      NL: ["Netherlands", "Dutch", "Amsterdam", "Holland"],
      SE: ["Sweden", "Swedish", "Stockholm"],
      NO: ["Norway", "Norwegian", "Oslo"],
      DK: ["Denmark", "Danish", "Copenhagen"],
      FI: ["Finland", "Finnish", "Helsinki"],
      IE: ["Ireland", "Irish", "Dublin"],
      NZ: ["New Zealand", "Kiwi", "Wellington"],
      ZA: ["South Africa", "South African", "Cape Town", "Johannesburg"],
    }

    return keywords[countryCode] || [country]
  }

  useEffect(() => {
    const fetchLGBTQNews = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check cache first
        const cacheKey = 'lgbtq-news-feed-v13';
        const cachedData = cache.get<{ news: NewsArticle[], carousel: NewsArticle[] }>(cacheKey);

        if (cachedData) {
          setAllNewsArticles(cachedData.news);
          setNewsArticles(cachedData.news);
          setCarouselArticles(cachedData.carousel);
          setIsLoading(false);
          return;
        }

        const location = await detectUserLocation()
        setUserLocation(location)

        // Add cache-busting timestamp and more diverse sources including entertainment
        const timestamp = Date.now()
        const rssFeeds = [
          // Prioritize PinkNews - fetch multiple times for more content
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.pinknews.co.uk/feed/&_=${timestamp}`,

          // Working RSS feed for PinkNews entertainment content
          `https://api.rss2json.com/v1/api.json?rss_url=https://rss.app/feed/DcTYAmLyO3U0fOuw&_=${timestamp}`,

          // Additional entertainment sources
          `https://api.rss2json.com/v1/api.json?rss_url=https://gayety.com/category/entertainment/feed&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.lgbtqnation.com/arts-media/feed/&_=${timestamp}`,

          // Enhanced Advocate feeds
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.advocate.com/rss.xml&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.advocate.com/customfeeds/js/feed/rss&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.lgbtqnation.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.them.us/feed/rss&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.queerty.com/feed&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.out.com/rss.xml&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.gaytimes.co.uk/feed/&_=${timestamp}`,

          // Entertainment & Culture focused
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.pride.com/feed&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.instinctmagazine.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://hornet.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.metroweekly.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.towleroad.com/feed&_=${timestamp}`,

          // Health & Wellness focused
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.hivplusmag.com/rss.xml&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.poz.com/rss.xml&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.thebody.com/rss/news.xml&_=${timestamp}`,

          // International sources for diversity
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.starobserver.com.au/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://dailyxtra.com/feed&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.washingtonblade.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.losangelesblade.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.chicagophoenix.com/feed/&_=${timestamp}`,
        ]

        // Map RSS feed URLs to proper site names
        const getSiteName = (feedUrl: string): string => {
          if (feedUrl.includes('advocate.com')) return 'The Advocate'
          if (feedUrl.includes('gayety.co') || feedUrl.includes('gayety.com')) return 'Gayety'
          if (feedUrl.includes('pinknews.co.uk') || feedUrl.includes('thepinknews.com') || feedUrl.includes('DcTYAmLyO3U0fOuw')) return 'PinkNews'
          if (feedUrl.includes('lgbtqnation.com')) return 'LGBTQ Nation'
          if (feedUrl.includes('them.us')) return 'them.'
          if (feedUrl.includes('queerty.com')) return 'Queerty'
          if (feedUrl.includes('out.com')) return 'Out Magazine'
          if (feedUrl.includes('gaytimes.co.uk')) return 'Gay Times'
          if (feedUrl.includes('pride.com')) return 'Pride'
          if (feedUrl.includes('instinctmagazine.com')) return 'Instinct Magazine'
          if (feedUrl.includes('hornet.com')) return 'Hornet'
          if (feedUrl.includes('metroweekly.com')) return 'Metro Weekly'
          if (feedUrl.includes('towleroad.com')) return 'Towleroad'
          if (feedUrl.includes('hivplusmag.com')) return 'HIV Plus Magazine'
          if (feedUrl.includes('poz.com')) return 'POZ'
          if (feedUrl.includes('thebody.com')) return 'TheBody'
          if (feedUrl.includes('starobserver.com.au')) return 'Star Observer'
          if (feedUrl.includes('dailyxtra.com')) return 'Daily Xtra'
          if (feedUrl.includes('washingtonblade.com')) return 'Washington Blade'
          if (feedUrl.includes('losangelesblade.com')) return 'Los Angeles Blade'
          if (feedUrl.includes('chicagophoenix.com')) return 'Chicago Phoenix'
          return 'LGBTQ+ News'
        }

        const allArticles: NewsArticle[] = []
        const locationKeywords = getLocationKeywords(location.country, location.code)

        for (const feedUrl of rssFeeds) {
          try {
            const response = await fetch(feedUrl)
            if (response.ok) {
              const data = await response.json()
              if (data.status === "ok" && data.items) {
                const articles = data.items
                  .filter((item: any) => {
                    const title = item.title?.toLowerCase() || ""
                    const description = item.description?.toLowerCase() || ""
                    const content = item.content?.toLowerCase() || ""

                    // Filter out newsletters, subscription content, and repetitive articles
                    const isNotNewsletter =
                      !title.includes("newsletter") &&
                      !title.includes("weekly roundup") &&
                      !title.includes("subscribe") &&
                      !title.includes("sign up") &&
                      !title.includes("clock twink") &&
                      !title.includes("allah is lesbian") &&
                      !description.includes("newsletter") &&
                      !description.includes("weekly roundup") &&
                      item.title &&
                      item.description

                    if (!isNotNewsletter) return false

                    // Since these are LGBTQ+ news sources, just return true for most articles
                    return true
                  })
                  .slice(0, (feedUrl.includes('pinknews.co.uk') || feedUrl.includes('thepinknews.com') || feedUrl.includes('DcTYAmLyO3U0fOuw')) ?
                    (feedUrl.includes('entertainment') || feedUrl.includes('DcTYAmLyO3U0fOuw') ? 5 :
                      feedUrl.includes('politics') || feedUrl.includes('news-politics') ? 5 :
                        feedUrl.includes('health') ? 4 : 20) :
                    (feedUrl.includes('gayety.co') || feedUrl.includes('gayety.com')) ? 6 :
                      feedUrl.includes('arts-media') ? 6 : 20)
                  .map((item: any) => {
                    const title = item.title || ""
                    const description = item.description?.replace(/<[^>]*>/g, "").substring(0, 200) || "Read more about this important LGBTQ+ news story."
                    const content = item.content || item.description || ""

                    // Extract image URL from various possible fields in RSS feed
                    let imageUrl = '';

                    // Check media:content first (common in many RSS feeds)
                    if (item['media:content']?.url) {
                      imageUrl = item['media:content'].url;
                    }
                    // Check media:thumbnail (common in YouTube and some news feeds)
                    else if (item['media:thumbnail']?.url) {
                      imageUrl = item['media:thumbnail'].url;
                    }
                    // Check enclosure (common for podcasts and some feeds)
                    else if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
                      imageUrl = item.enclosure.url;
                    }
                    // Check for og:image in content (common in WordPress feeds)
                    else if (item.content) {
                      const ogImageMatch = item.content.match(/<img[^>]+src="([^">]+)"/i);
                      if (ogImageMatch && ogImageMatch[1]) {
                        imageUrl = ogImageMatch[1];
                      }
                    }
                    // Fallback to thumbnail if available
                    else if (item.thumbnail) {
                      imageUrl = item.thumbnail;
                    }

                    // If no image found, use pride flag as default
                    if (!imageUrl) {
                      imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1200px-Gay_Pride_Flag.svg.png';
                    }

                    // Clean up the URL if it contains query parameters we don't need
                    if (imageUrl) {
                      // Remove common tracking parameters
                      imageUrl = imageUrl
                        .replace(/([?&]w=\d+)/, '')  // Remove width parameters
                        .replace(/([?&]h=\d+)/, '')  // Remove height parameters
                        .replace(/([?&]q=\d+)/, '')  // Remove quality parameters
                        .replace(/([?&]fit=\w+)/, '') // Remove fit parameters
                        .replace(/&{2,}/g, '&')      // Replace multiple & with single
                        .replace(/[?&]$/, '');        // Remove trailing ? or &
                    }

                    return {
                      title,
                      description,
                      url: item.link || item.url,
                      urlToImage: imageUrl,
                      publishedAt: item.pubDate,
                      source: {
                        name: item.author || "LGBTQ+ News",
                        site: getSiteName(feedUrl)
                      },
                      content,
                      category: categorizeWithLocation(title, description, content, location),
                    }
                  })
                allArticles.push(...articles)
              }
            }
          } catch (feedError) {
            console.warn("Failed to fetch from one RSS feed:", feedError)
          }
        }

        // Deduplicate articles based on title
        const uniqueArticles = Array.from(new Map(allArticles.map(article =>
          [article.title, article]
        )).values());

        // Filter valid articles first - be less strict about images
        const validArticles = uniqueArticles
          .filter(article => article.title && article.description && article.url)
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        console.log(`Total articles fetched: ${allArticles.length}`)
        console.log(`Unique articles: ${uniqueArticles.length}`)
        console.log(`Valid articles: ${validArticles.length}`)
        console.log(`User location:`, location)

        // Debug PinkNews articles
        const pinkNewsArticles = validArticles.filter(a => a.source.site === 'PinkNews')
        console.log(`PinkNews articles found: ${pinkNewsArticles.length}`)
        if (pinkNewsArticles.length > 0) {
          console.log('PinkNews articles by category:', pinkNewsArticles.reduce((acc, article) => {
            acc[article.category || 'LGBTQ+ News'] = (acc[article.category || 'LGBTQ+ News'] || 0) + 1
            return acc
          }, {} as Record<string, number>))
        }

        // Debug local news detection
        const localArticles = validArticles.filter(a => a.category === 'Local News')
        console.log(`Local news articles found: ${localArticles.length}`)
        if (localArticles.length > 0) {
          console.log('Local articles:', localArticles.map(a => ({ title: a.title, category: a.category })))
        }

        // Function to get a balanced selection of articles
        const getBalancedArticles = (articles: NewsArticle[], count: number) => {
          const targetCategories = ["Rights & Politics", "Entertainment", "Health", "Local News", "LGBTQ+ News"]

          let selectedArticles: NewsArticle[] = []
          let remainingArticles = [...articles]

          // Special allocation for Politics - ensure 10-15 articles
          const politicsArticles = remainingArticles
            .filter(a => a.category === "Rights & Politics")
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, Math.min(15, Math.max(10, Math.floor(count * 0.4)))) // 40% of total, min 10, max 15

          selectedArticles.push(...politicsArticles)
          remainingArticles = remainingArticles.filter(a => !politicsArticles.includes(a))

          // Distribute remaining slots among other categories
          const remainingCount = count - selectedArticles.length
          const otherCategories = targetCategories.filter(cat => cat !== "Rights & Politics")
          const articlesPerOtherCategory = Math.floor(remainingCount / otherCategories.length)

          for (const category of otherCategories) {
            const categoryArticles = remainingArticles
              .filter(a => a.category === category)
              .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
              .slice(0, articlesPerOtherCategory)

            selectedArticles.push(...categoryArticles)
            remainingArticles = remainingArticles.filter(a => !categoryArticles.includes(a))
          }

          // Fill remaining slots with any available articles, prioritizing our target categories
          while (selectedArticles.length < count && remainingArticles.length > 0) {
            // Prefer articles from our target categories
            const preferredArticle = remainingArticles.find(a => targetCategories.includes(a.category || 'LGBTQ+ News'))
            if (preferredArticle) {
              selectedArticles.push(preferredArticle)
              remainingArticles = remainingArticles.filter(a => a !== preferredArticle)
            } else {
              // Take any remaining article
              selectedArticles.push(remainingArticles[0])
              remainingArticles = remainingArticles.slice(1)
            }
          }

          return selectedArticles
        }

        // Get balanced selections for both news grid and carousel
        const newsGridArticles = getBalancedArticles(validArticles, 30)

        console.log(`News grid articles selected: ${newsGridArticles.length}`)
        console.log('Articles by category:', newsGridArticles.reduce((acc, article) => {
          acc[article.category || 'LGBTQ+ News'] = (acc[article.category || 'LGBTQ+ News'] || 0) + 1
          return acc
        }, {} as Record<string, number>))

        // Get different articles for carousel, also balanced
        const remainingArticles = validArticles.filter(article => !newsGridArticles.includes(article))
        const carouselArticlesList = getBalancedArticles(remainingArticles, 5)

        // Cache the results for 5 minutes
        cache.set(cacheKey, {
          news: newsGridArticles,
          carousel: carouselArticlesList
        });

        // Update state
        setAllNewsArticles(newsGridArticles)
        setNewsArticles(newsGridArticles)
        setCarouselArticles(carouselArticlesList)
      } catch (err) {
        console.error("Error fetching LGBTQ+ news:", err)
        setError("Unable to load latest news. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLGBTQNews()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(".animate-on-scroll")
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in-up")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    if (!isAutoRefreshing) return

    const refreshInterval = setInterval(() => {
      // Clear cache to force fresh data
      const cacheKey = 'lgbtq-news-feed-v4'
      cache.delete(cacheKey)

      // Trigger a refresh by updating the cache key
      window.location.reload()
    }, 5 * 60 * 1000) // Refresh every 5 minutes

    return () => clearInterval(refreshInterval)
  }, [isAutoRefreshing])

  // WebSocket connection for real-time updates (foundation)
  useEffect(() => {
    // Removed tab visibility refresh - only auto-refresh on timer
    // This prevents unwanted refreshes when switching browser tabs
  }, [isAutoRefreshing])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (days === 0) {
      if (hours === 0) return "Just now"
      return `${hours} hours ago`
    }
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  const filterArticlesByCategory = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setNewsArticles(allNewsArticles)
    } else {
      const filtered = allNewsArticles.filter(article => article.category === category)
      setNewsArticles(filtered)
    }
  }

  if (isLoading) {
    return (
      <section className="pt-16 pb-20 bg-transparent dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="loading-shimmer h-6 w-48 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="glass-card border-0 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                <div className="loading-shimmer h-48 w-full"></div>
                <CardHeader className="pb-2">
                  <div className="loading-shimmer h-4 w-20 rounded mb-2"></div>
                  <div className="loading-shimmer h-6 w-full rounded mb-2"></div>
                  <div className="loading-shimmer h-4 w-32 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="loading-shimmer h-4 w-full rounded mb-2"></div>
                  <div className="loading-shimmer h-4 w-3/4 rounded mb-6"></div>
                  <div className="loading-shimmer h-10 w-full rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="pt-16 pb-20 bg-transparent dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            Try Again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="news" className="pt-0 pb-0 bg-transparent dark:bg-gray-900 mt-0">
      <style jsx>{`
        .no-border-override,
        .no-border-override *,
        .no-border-override img,
        .no-border-override div {
          border: none !important;
          outline: none !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          border-image: none !important;
          border-width: 0 !important;
          border-style: none !important;
          border-color: transparent !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* News Carousel Banner */}
        <NewsCarousel articles={carouselArticles.slice(0, 5)} />

        {/* Category Filter Strip */}
        <div className="flex justify-center mb-8 animate-on-scroll">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {CATEGORIES.map((category, index) => (
              <button
                key={category.id}
                onClick={() => filterArticlesByCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${index === 0 ? 'rounded-l-md' : index === CATEGORIES.length - 1 ? 'rounded-r-md' : ''
                  } ${selectedCategory === category.id
                    ? 'bg-purple-600 dark:bg-purple-500 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {newsArticles.map((article, index) => (
            <Card
              key={`${article.source.name}-${index}-${Date.now()}`}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 overflow-hidden hover:-translate-y-2 flex flex-col p-0"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  style={{
                    border: 'none !important',
                    outline: 'none !important',
                    boxShadow: 'none !important',
                    borderRadius: '0 !important',
                    borderImage: 'none !important'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {article.category && (
                  <div className="absolute bottom-3 right-3">
                    <div className="text-xs bg-purple-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                      {article.category}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2 flex flex-col flex-1">
                {/* Author badge first, right under image */}
                <span className="text-xs text-purple-700 dark:text-purple-300 mb-1 inline-block">
                  {article.source.name}
                </span>

                <h3 className="text-sm leading-tight text-gray-900 dark:text-gray-100 mb-1 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                  {truncateText(article.title, 85)}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-2 line-clamp-2 flex-1">
                  {truncateText(article.description, 100)}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <button
                    className="custom-button"
                    style={{
                      padding: '6px 12px',
                      fontSize: '11px',
                      borderRadius: '8px',
                      gap: '0px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onClick={() => {
                      if (article.url) {
                        window.open(article.url, "_blank", "noopener,noreferrer")
                      }
                    }}
                  >
                    Read More
                  </button>

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{article.source.site}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center animate-on-scroll">
          <Button
            variant="outline"
            size="lg"
            className="btn-animate px-8 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            onClick={() => window.open("https://www.thepinknews.com/", "_blank")}
          >
            More News
          </Button>
        </div>
      </div>
    </section>
  )
}
