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
        // If no image URL, try to extract from article URL
        if (!article.urlToImage) {
          // Try to get image from OpenGraph if available
          try {
            const response = await fetch(`/api/extract-image?url=${encodeURIComponent(article.url)}`);
            const data = await response.json();
            if (data.imageUrl) {
              article.urlToImage = data.imageUrl;
            } else {
              throw new Error('No image found in OpenGraph data');
            }
          } catch (error) {
            throw new Error('No image URL provided and could not extract from article');
          }
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
      className="mb-8 relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
      onClick={(e) => {
        const currentArticle = articles[currentIndex];
        if (currentArticle?.url) {
          window.open(currentArticle.url, "_blank", "noopener,noreferrer");
        }
      }}
    >
      {articles.map((article, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="w-full h-full relative">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover object-center border-0 outline-none"
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              style={{ border: 'none', outline: 'none' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm" style={{ fontFamily: 'SFUIDisplay-Regular' }}>
                {article.source.name}
              </span>
            </div>
            <h3 className="text-xl mb-2 leading-tight" style={{ fontFamily: 'SFUIDisplay-Regular' }}>
              {article.title}
            </h3>
            <p className="text-white/90 text-sm line-clamp-2" style={{ fontFamily: 'SFUIDisplay-Regular' }}>
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

export function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [carouselArticles, setCarouselArticles] = useState<NewsArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<LocationInfo | null>(null)

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

    // Entertainment & Culture - Check this first to catch entertainment articles
    if (text.match(/\b(movie|film|tv|television|show|series|netflix|hulu|disney|streaming|actor|actress|celebrity|music|album|song|artist|concert|performance|award|oscar|emmy|grammy|entertainment|hollywood|broadway|theater|theatre|drag|festival|culture|representation|character|role)\b/)) {
      return "Entertainment"
    }

    // LGBTQ+ Rights & Politics - Check after entertainment to avoid miscategorization
    if (text.match(/\b(rights|law|legal|court|ruling|legislation|bill|policy|government|political|politics|congress|senate|parliament|election|vote|voting|campaign|candidate|president|minister|judge|supreme court|ban|banned|protect|protection|discrimination|equality|marriage|adoption)\b/) &&
      !text.match(/\b(movie|film|tv|actor|actress|celebrity|entertainment|hollywood)\b/)) {
      return "Rights & Politics"
    }

    // Health & Wellness - including trans healthcare
    if (text.match(/\b(health|healthcare|medical|medicine|doctor|hospital|treatment|therapy|mental health|wellness|surgery|clinic|patient|disease|condition|diagnosis|prescription|vaccine|hormone|transition|gender|affirming|care)\b/)) {
      return "Health"
    }

    // Sports - LGBTQ+ athletes and inclusion
    if (text.match(/\b(sport|sports|athlete|championship|league|tournament|olympics|fifa|nfl|nba|mlb|nhl|soccer|football|basketball|baseball|tennis|golf|swimming)\b/) ||
      (text.match(/\b(match|team|compete|competition)\b/) &&
        text.match(/\b(athlete|player|coach|stadium|field|court|olympic)\b/))) {
      // Double check it's not about dating/relationships
      if (!text.match(/\b(date|dating|relationship|love|flirt|crush|romance)\b/)) {
        return "Sports"
      }
    }

    // Business & Workplace
    if (text.match(/\b(business|company|corporate|ceo|startup|entrepreneur|investment|finance|financial|economy|economic|market|stock|trade|industry|workplace|job|career|employment|work|office|inclusive|diversity)\b/)) {
      return "Business"
    }

    // Education & Youth
    if (text.match(/\b(education|school|university|college|student|teacher|professor|academic|study|research|scholarship|graduation|campus|classroom|learning|youth|young|teen|teenager|child|children|kid|kids)\b/)) {
      return "Education"
    }

    // Technology & Social Media
    if (text.match(/\b(technology|tech|digital|app|software|internet|online|social media|facebook|twitter|instagram|tiktok|platform|ai|artificial intelligence|data|cyber|dating|app)\b/)) {
      return "Technology"
    }

    // Community & Activism
    if (text.match(/\b(community|social|activism|activist|protest|march|rally|movement|organization|charity|volunteer|support|advocacy|inclusion|diversity|pride|event|celebration|group|center|resource)\b/)) {
      return "Community"
    }

    // Default category for general LGBTQ+ news
    return "LGBTQ+ News"
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
        const cacheKey = 'lgbtq-news-feed';
        const cachedData = cache.get<{ news: NewsArticle[], carousel: NewsArticle[] }>(cacheKey);

        if (cachedData) {
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
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.advocate.com/rss.xml&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.pinknews.co.uk/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.lgbtqnation.com/feed/&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.them.us/feed/rss&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.queerty.com/feed&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.out.com/rss.xml&_=${timestamp}`,
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.gaytimes.co.uk/feed/&_=${timestamp}`,
        ]

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
                  .slice(0, 12)
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
                      source: { name: item.author || "LGBTQ+ News" },
                      content,
                      category: categorizeArticle(title, description, content),
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

        // Filter valid articles first
        const validArticles = uniqueArticles
          .filter(article => article.urlToImage && article.urlToImage !== "/placeholder.svg" && article.title && article.description)
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        // Function to get a balanced selection of articles
        const getBalancedArticles = (articles: NewsArticle[], count: number) => {
          const categories = [
            "Rights & Politics",
            "Entertainment",
            "Health",
            "Community",
            "LGBTQ+ News",
            "Sports",
            "Business",
            "Education",
            "Technology"
          ]

          let selectedArticles: NewsArticle[] = []
          let remainingArticles = [...articles]

          // First, try to get at least one article from each main category
          const primaryCategories = ["Rights & Politics", "Entertainment", "Health", "Community", "LGBTQ+ News"]
          for (const category of primaryCategories) {
            const articleOfCategory = remainingArticles.find(a => a.category === category)
            if (articleOfCategory) {
              selectedArticles.push(articleOfCategory)
              remainingArticles = remainingArticles.filter(a => a !== articleOfCategory)
            }
          }

          // Fill the rest with a mix of categories, prioritizing recent articles
          while (selectedArticles.length < count && remainingArticles.length > 0) {
            // Get the next article, preferring ones from categories we don't have much of
            const categoryCount = new Map<string, number>()
            selectedArticles.forEach(a => {
              categoryCount.set(a.category || 'LGBTQ+ News', (categoryCount.get(a.category || 'LGBTQ+ News') || 0) + 1)
            })

            // Sort remaining articles by category representation and date
            remainingArticles.sort((a, b) => {
              const aCount = categoryCount.get(a.category || 'LGBTQ+ News') || 0
              const bCount = categoryCount.get(b.category || 'LGBTQ+ News') || 0
              if (aCount !== bCount) return aCount - bCount
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            })

            selectedArticles.push(remainingArticles[0])
            remainingArticles = remainingArticles.slice(1)
          }

          return selectedArticles
        }

        // Get balanced selections for both news grid and carousel
        const newsGridArticles = getBalancedArticles(validArticles, 9)

        // Get different articles for carousel, also balanced
        const remainingArticles = validArticles.filter(article => !newsGridArticles.includes(article))
        const carouselArticlesList = getBalancedArticles(remainingArticles, 6)

        // Cache the results for 5 minutes
        cache.set(cacheKey, {
          news: newsGridArticles,
          carousel: carouselArticlesList
        });

        // Update state
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* News Carousel Banner */}
        <NewsCarousel articles={carouselArticles} />

        {userLocation && (
          <div className="text-center my-4 animate-on-scroll">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-primary" />
              LGBTQ+ News for {userLocation.country}
            </div>
          </div>
        )}

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
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {article.category && (
                  <div className="absolute bottom-3 right-3">
                    <div className="text-xs bg-purple-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full" style={{ fontFamily: 'SFUIDisplay-Light' }}>
                      {article.category}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2 flex flex-col flex-1">
                {/* Author badge first, right under image */}
                <span className="text-xs text-purple-700 dark:text-purple-300 mb-1 inline-block" style={{ fontFamily: "SFUIDisplay-Medium" }}>
                  {article.source.name}
                </span>

                <h3 className="text-sm leading-tight text-gray-900 dark:text-gray-100 mb-1 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2" style={{ fontFamily: "SFUIDisplay-Medium" }}>
                  {truncateText(article.title, 85)}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-2 line-clamp-2 flex-1" style={{ fontFamily: "SFUIDisplay-Medium" }}>
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
                      fontFamily: 'SFUIDisplay-Semibold'
                    }}
                    onClick={() => {
                      if (article.url) {
                        window.open(article.url, "_blank", "noopener,noreferrer")
                      }
                    }}
                  >
                    Read More
                  </button>

                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'SFUIDisplay-Medium' }}>
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
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
