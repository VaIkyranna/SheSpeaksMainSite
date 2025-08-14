"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, History, Users, BookMarked, Search, Youtube, Film, ArrowRight } from "lucide-react"
import { useRef, useState, useEffect } from 'react'

type Resource = {
  title: string;
  description: string;
  type?: 'book' | 'article' | 'video' | 'guide';
  url?: string;
  author?: string;
  year?: number;
}

type Term = {
  term: string;
  definition: string;
  category: string;
}

export function EducationSection() {
  // Sample data - in a real app, this would come from a CMS or API
  const historyResources: Resource[] = [
    {
      title: "The Stonewall Riots: A Documentary History",
      description: "Comprehensive look at the 1969 Stonewall uprising that sparked the modern LGBTQ+ rights movement.",
      type: 'book',
      author: "Marc Stein"
    },
    {
      title: "Before Stonewall: The Making of a Gay and Lesbian Community",
      description: "Explores LGBTQ+ life in America before the Stonewall riots.",
      type: 'book',
      author: "John D'Emilio"
    },
    {
      title: "The Lavender Scare",
      description: "Documentary about the persecution of LGBTQ+ individuals during the Cold War era.",
      type: 'video'
    }
  ]

  const allyshipGuides: Resource[] = [
    {
      title: "How to Be an Ally",
      description: "A comprehensive guide to being an effective LGBTQ+ ally in various settings.",
      type: 'guide',
      url: '/guides/allyship'
    },
    {
      title: "Supporting Transgender and Non-Binary People",
      description: "Practical advice for supporting trans and non-binary individuals.",
      type: 'guide',
      url: '/guides/supporting-trans'
    },
    {
      title: "Workplace Inclusion Guide",
      description: "Creating inclusive workplaces for LGBTQ+ employees.",
      type: 'guide',
      url: '/guides/workplace-inclusion'
    }
  ]

  const mediaRecommendations = [
    {
      title: "Stonewall Uprising",
      description: "Documentary about the 1969 Stonewall riots that sparked the modern LGBTQ+ rights movement.",
      type: 'video',
      embedId: 'Q9wdMJmuBlA',
      year: 2010
    },
    {
      title: "Will & Harper",
      description: "When Will Ferrell's good friend Harper comes out as a trans woman, they take a road trip to bond and reintroduce Harper to the country as her true self.",
      type: 'video',
      embedId: 'PRZ1ELeGepo',
      thumbnail: 'http://i3.ytimg.com/vi/PRZ1ELeGepo/hqdefault.jpg',
      year: 2024,
      source: "https://www.youtube.com/watch?v=PRZ1ELeGepo"
    },
    {
      title: "The Death and Life of Marsha P. Johnson",
      description: "Documentary about the mysterious death of transgender activist Marsha P. Johnson.",
      type: 'video',
      embedId: 'pADsuuPd79E',
      year: 2017
    },
    {
      title: "Disclosure",
      description: "A look at Hollywood's depiction of transgender people and its impact on society.",
      type: 'video',
      embedId: 'nSgvWixY-ZQ',
      thumbnail: 'http://i3.ytimg.com/vi/nSgvWixY-ZQ/hqdefault.jpg',
      year: 2020,
      source: "https://www.youtube.com/watch?v=nSgvWixY-ZQ"
    }
  ]

  // Featured LGBTQ+ books with verified information
  const featuredBooks = [
    { 
      title: "Our Evenings", 
      author: "Alan Hollinghurst", 
      isbn: "9781447208242",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-171/edition/9781447208242.jpg",
      url: "https://www.panmacmillan.com/authors/alan-hollinghurst/our-evenings/9781447208242"
    },
    { 
      title: "Sparrow", 
      author: "James Hynes", 
      isbn: "9781529092417",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781529092417.jpg",
      url: "https://www.panmacmillan.com/authors/james-hynes/sparrow/9781529092417"
    },
    { 
      title: "Carol", 
      author: "Patricia Highsmith", 
      isbn: "9780393339046",
      imageUrl: "https://ik.imagekit.io/panmac/tr:w-740,pr-true,f-auto//bcd02f72-b50c-0179-8b4b-5e44f5340bd4/054e8c1a-09a9-4a06-a29c-32a3c99267d7/carol-patricia-highsmith.jpg?w=270&h=414&auto=format&bg=%23efefef&fit=crop",
      url: "https://www.goodreads.com/book/show/27857625-carol"
    },
    { 
      title: "What a Girl Wants", 
      author: "Roxy Bourdillon", 
      isbn: "9781035037155",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781035037155.jpg",
      url: "https://www.panmacmillan.com/authors/roxy-bourdillon/what-a-girl-wants/9781035037155"
    },
    { 
      title: "Call Me By Your Name", 
      author: "André Aciman", 
      isbn: "9781250169440",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1519203520i/36336078.jpg",
      url: "https://www.goodreads.com/book/show/36336078-call-me-by-your-name"
    },
    { 
      title: "Giovanni's Room", 
      author: "James Baldwin", 
      isbn: "9780141186351",
      imageUrl: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141186351%2F9780141186351-jacket-large.jpg&w=379&q=100",
      url: "https://www.goodreads.com/book/show/406235.Giovanni_s_Room"
    },
    { 
      title: "Ophelia After All", 
      author: "Racquel Marie", 
      isbn: "9781035015689",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-171/edition/9781035015689.jpg",
      url: "https://www.panmacmillan.com/authors/racquel-marie/ophelia-after-all/9781035015689"
    },
    { 
      title: "Anyone's Ghost", 
      author: "August Thompson", 
      isbn: "9781035034109",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-171/edition/9781035034109.jpg",
      url: "https://www.panmacmillan.com/authors/august-thompson/anyones-ghost/9781035034109"
    },
    { 
      title: "Shuggie Bain", 
      author: "Douglas Stuart", 
      isbn: "9781529019292",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781529019292.jpg",
      url: "https://www.panmacmillan.com/authors/douglas-stuart/shuggie-bain/9781529019292"
    },
    { 
      title: "Learned by Heart", 
      author: "Emma Donoghue", 
      isbn: "9781035017799",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781035017799.jpg",
      url: "https://www.panmacmillan.com/authors/emma-donoghue/learned-by-heart/9781035017799"
    },
    { 
      title: "Briefly, A Delicious Life", 
      author: "Nell Stevens", 
      isbn: "9781529083446",
      imageUrl: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-171/edition/9781529083446.jpg",
      url: "https://www.panmacmillan.com/authors/nell-stevens/briefly-a-delicious-life/9781529083446"
    },
    { 
      title: "The Transgender Issue", 
      author: "Shon Faye", 
      isbn: "9780141991801",
      imageUrl: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141991801%2F9780141991801-jacket-large.jpg&w=379&q=100",
      url: "https://www.penguin.co.uk/books/315349/the-transgender-issue-by-faye-shon/9780141991801"
    },
    { 
      title: "What It Feels Like for a Girl", 
      author: "Paris Lees", 
      isbn: "9780141993089",
      imageUrl: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141993089%2F9780141993089-jacket-large.jpg&w=379&q=100",
      url: "https://www.penguin.co.uk/books/284432/what-it-feels-like-for-a-girl-by-lees-paris/9780141993089"
    },
    { 
      title: "The Danish Girl", 
      author: "David Ebershoff", 
      isbn: "9780143108399",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451790312i/27864391.jpg",
      url: "https://www.goodreads.com/book/show/27864391-the-danish-girl"
    },
    { 
      title: "The Bluest Eye", 
      author: "Toni Morrison", 
      isbn: "9780099759911",
      imageUrl: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780099759911%2F9780099759911-jacket-large.jpg&w=379&q=100",
      url: "https://www.penguin.co.uk/books/356286/the-bluest-eye-by-morrison-toni/9780099759911"
    }
  ]
  
  // Function to get cover URL from Open Library with fallback
  const getCoverUrl = (olid: string, isbn?: string, size: 'S' | 'M' | 'L' = 'M') => {
    // Try ISBN first as it's more reliable for covers
    if (isbn) {
      return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg?default=false`;
    }
    // Fallback to OLID if no ISBN
    return `https://covers.openlibrary.org/b/olid/${olid}-${size}.jpg?default=false`;
  }

  const marqueeRef = useRef<HTMLDivElement>(null)
  
  // Track mouse position for smooth scrolling
  const [mouseX, setMouseX] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  
  // Update scroll based on mouse position
  useEffect(() => {
    if (!marqueeRef.current || !isHovering) return
    
    const container = marqueeRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + (containerRect.width / 2)
    
    // Calculate scroll position based on mouse distance from center
    const scrollAmount = (mouseX - containerCenter) * 0.5 // Adjust multiplier for sensitivity
    
    // Smoothly animate the scroll
    const animate = () => {
      if (!isHovering) return
      container.scrollLeft += scrollAmount * 0.1
      requestAnimationFrame(animate)
    }
    
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [mouseX, isHovering])
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX)
  }

  const glossaryTerms: Term[] = [
    // General Terms
    {
      term: "LGBTQIA+",
      definition: "An acronym for Lesbian, Gay, Bisexual, Transgender, Queer/Questioning, Intersex, Asexual/Aromantic/Agender, with the '+' representing other sexual orientations and gender identities.",
      category: "General"
    },
    {
      term: "Ally",
      definition: "A person who supports and advocates for LGBTQ+ people, even though they may not identify as LGBTQ+ themselves.",
      category: "General"
    },
    
    // Gender Identity
    {
      term: "Cisgender",
      definition: "A term for people whose gender identity matches the sex they were assigned at birth.",
      category: "Gender Identity"
    },
    {
      term: "Non-binary",
      definition: "An umbrella term for gender identities that don't fit within the traditional binary of male and female. May include genderqueer, genderfluid, and other identities.",
      category: "Gender Identity"
    },
    {
      term: "Genderfluid",
      definition: "A gender identity characterized by changes in gender expression and/or identity over time.",
      category: "Gender Identity"
    },
    {
      term: "Two-Spirit",
      definition: "A term used by some Indigenous North Americans to describe Native people who fulfill a traditional third-gender role in their cultures.",
      category: "Gender Identity"
    },
    
    // Sexual Orientation
    {
      term: "Asexual",
      definition: "A sexual orientation characterized by a lack of sexual attraction to others. Asexuality exists on a spectrum.",
      category: "Sexual Orientation"
    },
    {
      term: "Pansexual",
      definition: "A sexual orientation characterized by the potential for attraction to people of any gender, with gender not being a determining factor.",
      category: "Sexual Orientation"
    },
    {
      term: "Demisexual",
      definition: "A sexual orientation where a person only experiences sexual attraction after forming a strong emotional connection.",
      category: "Sexual Orientation"
    },
    
    // Transgender Terms
    {
      term: "Transgender",
      definition: "An umbrella term for people whose gender identity differs from the sex they were assigned at birth.",
      category: "Transgender"
    },
    {
      term: "Gender Dysphoria",
      definition: "The distress a person may experience when their gender identity differs from their sex assigned at birth.",
      category: "Transgender"
    },
    {
      term: "Gender Affirming Care",
      definition: "Medical, psychological, and social support that affirms an individual's gender identity.",
      category: "Transgender"
    },
    
    // Intersex
    {
      term: "Intersex",
      definition: "A general term used for a variety of conditions in which a person is born with reproductive or sexual anatomy that doesn't fit typical definitions of male or female.",
      category: "Intersex"
    },
    
    // Important Concepts
    {
      term: "Coming Out",
      definition: "The process of voluntarily sharing one's sexual orientation or gender identity with others.",
      category: "Concepts"
    },
    {
      term: "Deadnaming",
      definition: "Using the birth or former name of a transgender or non-binary person without their consent.",
      category: "Concepts"
    },
    {
      term: "Misgendering",
      definition: "Referring to someone using language that doesn't align with their gender identity.",
      category: "Concepts"
    },
    {
      term: "Queer",
      definition: "An umbrella term for sexual and gender minorities who are not heterosexual or cisgender. Reclaimed by some LGBTQ+ people as a term of empowerment.",
      category: "Concepts"
    }
  ]

  // Animate the marquee
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const marqueeContent = marquee.firstElementChild;
    if (!marqueeContent) return;

    const marqueeContentWidth = marqueeContent.scrollWidth / 2; // Divide by 2 because we duplicated the content
    
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 30000; // 30 seconds for one complete loop
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      marquee.scrollLeft = progress * marqueeContentWidth;
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="education" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Educational Resources
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Expand your knowledge with our curated collection of LGBTQ+ educational materials.
          </p>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-transparent dark:bg-transparent">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="allyship" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Allyship Guides</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Glossary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {historyResources.map((resource, index) => (
                <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {resource.type === 'book' ? 'Book' : resource.type === 'video' ? 'Video' : 'Article'}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    {resource.author && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">By {resource.author}</p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300">{resource.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="allyship">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allyshipGuides.map((guide, index) => (
                <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <BookMarked className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Guide</span>
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{guide.description}</p>
                    <a 
                      href={guide.url} 
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium inline-flex items-center"
                    >
                      Read more →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-8">
            {/* Video Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <Youtube className="w-5 h-5 text-red-600" />
                Featured Documentaries
              </h3>
              <div className="relative">
                <div className="flex space-x-6 pb-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                  {mediaRecommendations.map((item, index) => (
                    <div key={index} className="w-[300px] flex-shrink-0 snap-center">
                      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02] h-full flex flex-col">
                        <div className="relative pt-[56.25%] bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${item.embedId}`}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800">
                          <h4 className="font-bold text-lg mb-1 line-clamp-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.year} • {item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-transparent pointer-events-none"></div>
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-transparent pointer-events-none"></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Scroll horizontally to view more videos
                <span className="ml-2 inline-block animate-bounce-horizontal">→</span>
              </p>
            </div>

            {/* Scrolling Books Marquee */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Recommended Reading
              </h3>
              <div className="w-full relative">
                <div 
                  ref={marqueeRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
                  style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <div className="inline-flex space-x-8">
                    {[...featuredBooks, ...featuredBooks].map((book, index) => (
                      <a 
                        key={`book-${index}`} 
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-40 flex-shrink-0 hover:opacity-90 transition-opacity"
                      >
                        <div className="group h-full flex flex-col">
                          <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 bg-white dark:bg-gray-800">
                            <div className="w-full" style={{ paddingBottom: '150%', position: 'relative' }}>
                              {book.imageUrl ? (
                                <img 
                                  src={book.imageUrl} 
                                  alt={`${book.title} cover`}
                                  className="absolute inset-0 w-full h-full object-cover bg-gray-100 dark:bg-gray-700"
                                  loading="lazy"
                                />
                              ) : (
                                <img 
                                  src={getCoverUrl(book.olid, book.isbn, 'L')} 
                                  alt={`${book.title} cover`}
                                  className="absolute inset-0 w-full h-full object-contain bg-gray-100 dark:bg-gray-700"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22300%22%20fill%3D%22%23e5e7eb%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20fill%3D%22%239ca3af%22%3E${encodeURIComponent(book.title)}%3C%2Ftext%3E%3C%2Fsvg%3E';
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-transparent pointer-events-none"></div>
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-transparent pointer-events-none"></div>
                <div className="text-center mt-4">
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Swipe to explore</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">More LGBTQ+ Media Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="https://www.glaad.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <Film className="w-5 h-5 text-purple-600" />
                  <span>GLAAD Media Reference</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                </a>
                <a href="https://www.queerhistory.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <History className="w-5 h-5 text-blue-600" />
                  <span>Queer History</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                </a>
                <a href="https://www.commonsensemedia.org/lists/lgbtq-movies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <span>LGBTQ+ Movies</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="glossary">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {glossaryTerms.map((term, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{term.term}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {term.definition}
                    </p>
                    <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full">
                      {term.category}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  View Full Glossary
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
