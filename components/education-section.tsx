"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, History, Users, BookMarked, Search, Youtube, Film, ArrowRight, ChevronDown } from "lucide-react"
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
  category?: string;
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

  const allyshipGuides: (Resource & { imageUrl: string })[] = [
    {
      title: "The Guide to Allyship",
      description: "A comprehensive guide to becoming a better ally to the LGBTQ+ community.",
      type: 'guide',
      url: 'https://www.akt.org.uk/resources/a-guide-to-lgbtq-allyship-2/?gad_campaignid=22627939428',
      author: 'AKT',
      imageUrl: 'https://images.pexels.com/photos/9587945/pexels-photo-9587945.jpeg'
    },
    {
      title: "Supporting Trans & Non-Binary People",
      description: "Understanding what it means to be non-binary and how to support trans and non-binary individuals.",
      type: 'guide',
      url: "https://lgbt.foundation/help/what-it-means-to-be-non-binary/?gad_campaignid=22473964018",
      author: "LGBT Foundation",
      imageUrl: "https://images.unsplash.com/photo-1669801243647-f84c62901b45?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Workplace Inclusion",
      description: "Resources for creating an LGBTQ+ inclusive workplace environment.",
      type: 'guide',
      url: 'https://www.stonewall.org.uk/inclusive-workplaces/resources-creating-lgbtq-inclusive-workplace',
      author: 'Stonewall',
      imageUrl: 'https://images.pexels.com/photos/10503437/pexels-photo-10503437.jpeg'
    },
    {
      title: "Supporting LGBTQ+ Youth",
      description: "A guide to being an ally to transgender and non-binary youth.",
      type: 'guide',
      url: 'https://www.thetrevorproject.org/resources/guide/a-guide-to-being-an-ally-to-transgender-and-nonbinary-youth/',
      author: 'The Trevor Project',
      imageUrl: 'https://images.pexels.com/photos/5705887/pexels-photo-5705887.jpeg'
    },
    {
      title: "Allyship & You",
      description: "A guide from HRC on being an effective ally to the LGBTQ+ community.",
      type: 'guide',
      url: 'https://www.hrc.org/resources/being-an-lgbtq-ally',
      author: 'Human Rights Campaign',
      imageUrl: 'https://images.pexels.com/photos/12289186/pexels-photo-12289186.jpeg'
    },
    {
      title: "Healthcare Inclusion Guide",
      author: "LGBT Foundation",
      description: "A comprehensive resource for healthcare professionals to provide inclusive and affirming care to LGBTQ+ patients.",
      type: 'guide',
      url: "https://lgbt.foundation/healthcare",
      imageUrl: "https://images.pexels.com/photos/4046930/pexels-photo-4046930.jpeg"
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

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const glossaryTerms: Term[] = [
    // Sexual Orientations
    {
      term: "Lesbian",
      definition: "A woman who is emotionally, romantically or sexually attracted to other women."
    },
    {
      term: "Gay",
      definition: "A person who is emotionally, romantically or sexually attracted to people of the same gender. Commonly used to describe men attracted to men."
    },
    {
      term: "Bisexual",
      definition: "A person emotionally, romantically or sexually attracted to more than one gender, not necessarily at the same time or to the same degree."
    },
    {
      term: "Pansexual",
      definition: "A person who is emotionally, romantically or sexually attracted to people regardless of their gender or gender identity."
    },
    {
      term: "Asexual",
      definition: "A person who experiences little or no sexual attraction to others. Asexuality exists on a spectrum."
    },
    {
      term: "Demisexual",
      definition: "A person who only experiences sexual attraction after forming a strong emotional connection with someone."
    },
    {
      term: "Queer",
      definition: "An umbrella term for sexual and gender minorities who are not heterosexual or cisgender. Reclaimed by some LGBTQ+ people."
    },
    {
      term: "Questioning",
      definition: "The process of exploring one's own sexual orientation, gender identity, or gender expression."
    },

    // Gender Identities
    {
      term: "Cisgender",
      definition: "A person whose gender identity aligns with the sex they were assigned at birth."
    },
    {
      term: "Transgender",
      definition: "A person whose gender identity differs from their sex assigned at birth. Often shortened to trans."
    },
    {
      term: "Non-binary",
      definition: "An umbrella term for gender identities that don't fit within the traditional categories of male or female."
    },
    {
      term: "Genderqueer",
      definition: "A gender identity that doesn't fit within traditional male/female categories or that is a combination of genders."
    },
    {
      term: "Genderfluid",
      definition: "A person whose gender identity shifts or changes over time."
    },
    {
      term: "Agender",
      definition: "A person who does not identify with any gender or identifies as gender-neutral."
    },
    {
      term: "Bigender",
      definition: "A person who identifies as two genders, either simultaneously or varying between the two."
    },
    {
      term: "Two-Spirit",
      definition: "A term used by some Indigenous North Americans to describe a person who embodies both masculine and feminine qualities."
    },

    // Community & Concepts
    {
      term: "Ally",
      definition: "A person who supports and advocates for LGBTQ+ people and their rights, typically someone who is not LGBTQ+ themselves."
    },
    {
      term: "Coming Out",
      definition: "The process of being open about one's sexual orientation or gender identity to others."
    },
    {
      term: "Pride",
      definition: "A celebration of LGBTQ+ identities, culture, and history, often marked by events like Pride Month in June."
    },
    {
      term: "LGBTQ+",
      definition: "An acronym for Lesbian, Gay, Bisexual, Transgender, Queer/Questioning, with the '+' representing other identities."
    },
    {
      term: "Intersectionality",
      definition: "The interconnected nature of social categorizations such as race, class, and gender as they apply to a given individual or group."
    },
    {
      term: "Heteronormativity",
      definition: "The assumption that heterosexuality is the default or normal sexual orientation."
    },
    {
      term: "Cisnormativity",
      definition: "The assumption that being cisgender is the norm, leading to the marginalization of trans and non-binary people."
    },
    {
      term: "Deadnaming",
      definition: "Using the birth or former name of a transgender or non-binary person without their consent."
    },
    {
      term: "Misgender",
      definition: "Referring to someone using a word, especially a pronoun or form of address, that does not correctly reflect their gender identity."
    },
    {
      term: "Outing",
      definition: "Disclosing someone's sexual orientation or gender identity without their permission."
    },
    {
      term: "Passing",
      definition: "When a transgender person is perceived as the gender they identify as, rather than their sex assigned at birth."
    },
    {
      term: "Preferred Pronouns",
      definition: "The set of pronouns that an individual wants others to use to reflect their gender identity (e.g., he/him, she/her, they/them)."
    },
    {
      term: "Transitioning",
      definition: "The process a person may go through to live as the gender they identify as, which may include social, legal, and/or medical changes."
    },
    {
      term: "Chosen Family",
      definition: "A group of people who support and care for each other as family, often important in LGBTQ+ communities."
    },
    {
      term: "Gender Dysphoria",
      definition: "The distress a person may feel when their gender identity doesn't align with their sex assigned at birth."
    },
    {
      term: "Gender Euphoria",
      definition: "The joy or comfort a person feels when their gender is recognized and respected."
    },
    {
      term: "Gender Expression",
      definition: "How a person presents their gender through clothing, behavior, and personal appearance."
    },
    {
      term: "Sexual Orientation",
      definition: "A person's emotional, romantic, or sexual attraction to other people."
    },
    {
      term: "Gender Identity",
      definition: "A person's internal sense of their own gender, which may or may not correspond with their sex assigned at birth."
    },
    {
      term: "Heteroflexible",
      definition: "A person who is primarily heterosexual but not exclusively so."
    },
    {
      term: "Homoflexible",
      definition: "A person who is primarily homosexual but not exclusively so."
    },
    {
      term: "Polyamory",
      definition: "The practice of engaging in multiple romantic and/or sexual relationships with the consent of all people involved."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 -mt-3">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Info Hub
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-200">
            Learn and discover with hand-picked collection of LGBTQ+ resources, made just for you
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
            <style jsx global>{`
              [data-state=active][data-value=allyship] {
                padding-top: 0 !important;
                margin-top: 0 !important;
              }
              [data-state=active][data-value=allyship] > div:first-child {
                display: none !important;
              }
              .dark [data-slot="card"] {
                border-top: none !important;
              }
            `}</style>
            <div className="mb-10 text-center">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Become a Better Ally</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore these comprehensive guides to learn how to support and advocate for the LGBTQ+ community in meaningful ways.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {allyshipGuides.map((guide, index) => (
                <a 
                  key={index} 
                  href={guide.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <div className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800/50 backdrop-blur-sm dark:backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-lg">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg" style={{ border: 'none', boxShadow: 'none' }}>
                      <img 
                        src={guide.imageUrl} 
                        alt={guide.title}
                        className="w-full h-full object-cover"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          border: 'none',
                          outline: 'none'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="px-4 pt-3 pb-1.5 flex flex-col bg-white/80 dark:bg-transparent rounded-b-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BookMarked className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Guide</span>
                        </div>
                        <span className="text-sm px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full whitespace-nowrap">
                          {guide.author}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-2 leading-tight">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-3">
                        {guide.description}
                      </p>
                      <div className="pt-1">
                        <span className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium group-hover:underline">
                          Read full guide
                          <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Looking for more resources?</p>
              <a 
                href="https://www.glaad.org/resources" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                Explore More Guides
                <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
              </a>
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

          <TabsContent value="glossary" className="space-y-4">
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Unsure what it all means? Let's talk terms.</h3>
              <div className="w-full max-w-md relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white peer"
                />
                <span className={`absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-300 ease-in-out ${searchTerm ? 'opacity-0 -translate-y-3 scale-90' : 'opacity-100'}`}>
                  Search terms...
                </span>
              </div>
            </div>
            
            {searchTerm ? (
              // Search results view
              <div className="space-y-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {glossaryTerms.filter(term => 
                    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length} results
                </div>
                
                <div className="space-y-2">
                  {glossaryTerms
                    .filter(term => 
                      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      term.definition.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((term, index) => (
                      <div key={index} className="group relative p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="font-medium text-purple-700 dark:text-purple-400 text-sm">
                          {term.term}
                        </div>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
