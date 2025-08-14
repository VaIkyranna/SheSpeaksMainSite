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
      description: "An open source starter guide to help you become a more thoughtful and effective ally to the LGBTQ+ community.",
      type: 'guide',
      url: 'https://guidetoallyship.com/',
      author: 'Guide to Allyship',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: "Supporting Trans & Non-Binary People",
      description: "Practical guidance on being an ally to transgender and non-binary individuals in various aspects of life.",
      type: 'guide',
      url: 'https://transequality.org/issues/resources/supporting-the-transgender-people-in-your-life',
      author: 'National Center for Transgender Equality',
      imageUrl: 'https://images.unsplash.com/photo-1502225014120-09944b5468b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: "Workplace Inclusion",
      description: "Comprehensive resources for creating LGBTQ+-inclusive workplaces and supporting LGBTQ+ employees.",
      type: 'guide',
      url: 'https://www.hrc.org/resources/workplace-resources',
      author: 'Human Rights Campaign',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: "Supporting LGBTQ+ Youth",
      description: "Essential guide for parents, teachers, and mentors on creating safe spaces for LGBTQ+ young people.",
      type: 'guide',
      url: 'https://www.thetrevorproject.org/resources/guide/a-guide-to-being-an-ally-to-transgender-and-nonbinary-youth/',
      author: 'The Trevor Project',
      imageUrl: 'https://images.unsplash.com/photo 1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: "Allyship & You",
      description: "A beginner's guide to understanding LGBTQ+ identities and being an effective ally.",
      type: 'guide',
      url: 'https://www.glaad.org/resources/ally/2',
      author: 'GLAAD',
      imageUrl: 'https://images.unsplash.com/photo-1505373876331-9ada2d3efdc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: "Healthcare Inclusion",
      description: "Resources for healthcare providers to deliver culturally competent care to LGBTQ+ patients.",
      type: 'guide',
      url: 'https://www.lgbtqiahealtheducation.org/',
      author: 'National LGBTQIA+ Health Education Center',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
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
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Become a Better Ally</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore these comprehensive guides to learn how to support and advocate for the LGBTQ+ community in meaningful ways.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {allyshipGuides.map((guide, index) => (
                <a 
                  key={index} 
                  href={guide.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                    <div className="relative h-40 bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={guide.imageUrl} 
                        alt={guide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%239C92AC"><rect width="100" height="100" rx="4" fill="%23F3F4F6"/><text x="50%" y="50%" font-family="Arial" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="%236B7280">No Image</text></svg>';
                        }}
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookMarked className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Guide</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                          {guide.author}
                        </span>
                      </div>
                      <CardTitle className="text-lg mt-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{guide.description}</p>
                      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                        <span className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium group-hover:underline">
                          Read full guide
                          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
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
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search LGBTQ+ terms..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
            ) : (
              // Default view with example terms
              <div className="space-y-2 flex flex-col items-center">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">EXAMPLES</div>
                <div className="w-full max-w-md space-y-2">
                  {glossaryTerms.slice(0, 3).map((term, index) => (
                    <div 
                      key={index}
                      className="p-2 -mx-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group text-center"
                      onClick={() => setSearchTerm(term.term)}
                    >
                      <div className="font-medium text-purple-700 dark:text-purple-400 text-sm">
                        {term.term}
                      </div>
                      <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
