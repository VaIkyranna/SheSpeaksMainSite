"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, History, Users, BookMarked, Search, Youtube, Film, ArrowRight, ChevronDown, ExternalLink } from "lucide-react"
import { useRef, useState, useEffect } from 'react'

type Resource = {
  title: string;
  description: string;
  type?: 'book' | 'article' | 'video' | 'guide' | 'event' | 'biography' | 'movement' | 'memorial' | 'legislation' | 'organization' | 'legal' | 'medical' | 'political' | 'philosophy' | 'language';
  url?: string;
  author?: string;
  year?: number;
  isbn?: string;
  imageUrl?: string;
  significance?: string;
  location?: string;
  keyFigures?: string[];
}

type Term = {
  term: string;
  definition: string;
  category?: string;
}

export function EducationSection() {
  // Sample data - in a real app, this would come from a CMS or API
  // Timeline data for scrolling history interface - comprehensive LGBTQ+ history
  const historyTimeline = [
    {
      year: 1785,
      title: "Jeremy Bentham's Defense",
      description: "Jeremy Bentham writes one of the first philosophical defenses of same-sex relationships, challenging societal norms centuries ahead of his time.",
      type: "Philosophy",
      location: "England",
      significance: "First philosophical defense of homosexuality",
      keyFigures: ["Jeremy Bentham"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Jeremy_Bentham_by_Henry_William_Pickersgill_detail.jpg/400px-Jeremy_Bentham_by_Henry_William_Pickersgill_detail.jpg",
      url: "https://www.ucl.ac.uk/bentham-project/who-was-jeremy-bentham",
      color: "from-amber-500 to-orange-600"
    },
    {
      year: 1869,
      title: "Term 'Homosexual' Coined",
      description: "Karl-Maria Kertbeny coins the term 'homosexual' in a German-Hungarian pamphlet, creating language that would shape LGBTQ+ discourse.",
      type: "Language",
      location: "Germany",
      significance: "First use of modern terminology",
      keyFigures: ["Karl-Maria Kertbeny"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/400px-Flag_of_Germany.svg.png",
      url: "https://www.britannica.com/topic/homosexuality",
      color: "from-blue-500 to-indigo-600"
    },
    {
      year: 1895,
      title: "Oscar Wilde Trials",
      description: "The trials of Oscar Wilde for 'gross indecency' become a symbol of persecution and resilience in LGBTQ+ history.",
      type: "Legal",
      location: "London, UK",
      significance: "Symbol of persecution and artistic genius",
      keyFigures: ["Oscar Wilde"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/400px-Oscar_Wilde_Sarony.jpg",
      url: "https://www.britannica.com/biography/Oscar-Wilde",
      color: "from-purple-500 to-pink-600"
    },
    {
      year: 1924,
      title: "Society for Human Rights Founded",
      description: "Henry Gerber establishes the first gay rights organization in the United States, marking the beginning of organized LGBTQ+ advocacy.",
      type: "Organization",
      location: "Chicago, USA",
      significance: "First LGBTQ+ rights organization in America",
      keyFigures: ["Henry Gerber"],
      imageUrl: "https://www.loc.gov/static/programs/national-recording-preservation-plan/images/Chicago1.jpg",
      url: "https://www.smithsonianmag.com/history/the-first-gay-rights-organization-in-america-180972102/",
      color: "from-green-500 to-teal-600"
    },
    {
      year: 1950,
      title: "The Mattachine Society",
      description: "Harry Hay founds the Mattachine Society, one of the earliest sustained gay rights groups in the United States.",
      type: "Organization",
      location: "Los Angeles, USA",
      significance: "Early sustained LGBTQ+ advocacy group",
      keyFigures: ["Harry Hay"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Harry_Hay_1.jpg/400px-Harry_Hay_1.jpg",
      url: "https://www.history.com/news/mattachine-society-gay-rights-harry-hay",
      color: "from-cyan-500 to-blue-600"
    },
    {
      year: 1969,
      title: "Stonewall Riots",
      description: "The pivotal uprising at the Stonewall Inn sparks the modern LGBTQ+ rights movement and leads to the first Pride marches.",
      type: "Event",
      location: "New York City, USA",
      significance: "Birth of modern LGBTQ+ activism",
      keyFigures: ["Marsha P. Johnson", "Sylvia Rivera"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Stonewall_Inn_5_pride_weekend_2016.jpg/400px-Stonewall_Inn_5_pride_weekend_2016.jpg",
      url: "https://www.history.com/topics/gay-rights/the-stonewall-riots",
      color: "from-red-500 to-pink-600"
    },
    {
      year: 1973,
      title: "APA Removes Homosexuality from DSM",
      description: "The American Psychiatric Association removes homosexuality from its list of mental disorders, a crucial step in medical acceptance.",
      type: "Medical",
      location: "United States",
      significance: "Medical recognition and acceptance",
      keyFigures: ["Dr. John Fryer"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/American_Psychiatric_Association_logo.svg/400px-American_Psychiatric_Association_logo.svg.png",
      url: "https://www.apa.org/monitor/2017/09/ce-corner-sidebar",
      color: "from-emerald-500 to-green-600"
    },
    {
      year: 1978,
      title: "Harvey Milk Elected",
      description: "Harvey Milk becomes one of the first openly gay elected officials in the United States, inspiring a generation of LGBTQ+ politicians.",
      type: "Political",
      location: "San Francisco, USA",
      significance: "First openly gay elected official",
      keyFigures: ["Harvey Milk"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Harvey_Milk_in_1978_at_Gay_Pride_Parade_cropped.jpg/400px-Harvey_Milk_in_1978_at_Gay_Pride_Parade_cropped.jpg",
      url: "https://www.biography.com/political-figure/harvey-milk",
      color: "from-purple-500 to-violet-600"
    },
    {
      year: 1987,
      title: "AIDS Memorial Quilt Displayed",
      description: "The AIDS Memorial Quilt is first displayed in Washington, D.C., becoming the largest community art project honoring those lost to AIDS.",
      type: "Memorial",
      location: "Washington D.C., USA",
      significance: "Symbol of love, loss, and remembrance",
      keyFigures: ["Cleve Jones"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/AIDS_Memorial_Quilt.jpg/400px-AIDS_Memorial_Quilt.jpg",
      url: "https://www.aidsquilt.org/about/the-aids-memorial-quilt",
      color: "from-rose-500 to-red-600"
    },
    {
      year: 2001,
      title: "Netherlands Legalizes Same-Sex Marriage",
      description: "The Netherlands becomes the first country in the world to legalize same-sex marriage, opening the door for global marriage equality.",
      type: "Legal",
      location: "Netherlands",
      significance: "First country with marriage equality",
      keyFigures: ["Job Cohen"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/400px-Flag_of_the_Netherlands.svg.png",
      url: "https://www.bbc.com/news/world-europe-56344365",
      color: "from-orange-500 to-amber-600"
    },
    {
      year: 2015,
      title: "Marriage Equality in the US",
      description: "The U.S. Supreme Court legalizes same-sex marriage nationwide in Obergefell v. Hodges, a landmark victory for equality.",
      type: "Legal",
      location: "United States",
      significance: "Nationwide marriage equality",
      keyFigures: ["Jim Obergefell"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/US_Supreme_Court_Building.jpg/400px-US_Supreme_Court_Building.jpg",
      url: "https://www.aclu.org/news/lgbtq-rights/marriage-equality-and-other-lgbtq-rights-milestones",
      color: "from-blue-500 to-cyan-600"
    },
    {
      year: 2019,
      title: "Taiwan Legalizes Same-Sex Marriage",
      description: "Taiwan becomes the first country in Asia to legalize same-sex marriage, marking a historic moment for LGBTQ+ rights in the region.",
      type: "Legal",
      location: "Taiwan",
      significance: "First Asian country with marriage equality",
      keyFigures: ["Tsai Ing-wen"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/400px-Flag_of_the_Republic_of_China.svg.png",
      url: "https://www.hrw.org/news/2019/05/17/taiwan-first-asia-legalize-same-sex-marriage",
      color: "from-indigo-500 to-purple-600"
    }
  ]

  const historyResources: (Resource & { imageUrl?: string, year?: number, significance?: string })[] = [
    {
      title: "The Stonewall Riots: Birth of Pride",
      description: "The pivotal 1969 uprising at the Stonewall Inn that sparked the modern LGBTQ+ rights movement and led to the first Pride marches.",
      type: 'event' as const,
      author: "Historic Event",
      year: 1969,
      significance: "Catalyst for modern LGBTQ+ activism",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Stonewall_Inn_5_pride_weekend_2016.jpg/400px-Stonewall_Inn_5_pride_weekend_2016.jpg",
      url: "https://en.wikipedia.org/wiki/Stonewall_riots"
    },
    {
      title: "Harvey Milk: First Openly Gay Official",
      description: "The inspiring story of Harvey Milk, who became one of the first openly gay elected officials in the United States in 1977.",
      type: 'biography' as const,
      author: "Political Pioneer",
      year: 1977,
      significance: "Broke barriers in political representation",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Harvey_Milk_in_1978_at_Gay_Pride_Parade_cropped.jpg/400px-Harvey_Milk_in_1978_at_Gay_Pride_Parade_cropped.jpg",
      url: "https://en.wikipedia.org/wiki/Harvey_Milk"
    },
    {
      title: "Marriage Equality: Love Wins",
      description: "The global journey toward marriage equality, from the Netherlands in 2001 to the US Supreme Court's historic 2015 decision.",
      type: 'movement' as const,
      author: "Legal Milestone",
      year: 2015,
      significance: "Legal recognition of LGBTQ+ relationships",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      url: "https://en.wikipedia.org/wiki/Same-sex_marriage"
    },
    {
      title: "The AIDS Memorial Quilt",
      description: "A powerful memorial honoring those lost to AIDS, becoming the largest community art project in the world since 1987.",
      type: 'memorial' as const,
      author: "Community Art Project",
      year: 1987,
      significance: "Symbol of love, loss, and remembrance",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/AIDS_Memorial_Quilt.jpg/400px-AIDS_Memorial_Quilt.jpg",
      url: "https://en.wikipedia.org/wiki/AIDS_Memorial_Quilt"
    },
    {
      title: "Transgender Rights Movement",
      description: "The ongoing struggle for transgender rights and recognition, from early pioneers to modern advocacy and legal protections.",
      type: 'movement' as const,
      author: "Civil Rights Movement",
      year: 1966,
      significance: "Recognition and protection of transgender individuals",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Transgender_Pride_flag.svg/400px-Transgender_Pride_flag.svg.png",
      url: "https://en.wikipedia.org/wiki/Transgender_rights"
    },
    {
      title: "Section 28 & Its Repeal",
      description: "The controversial UK law that banned 'promotion' of homosexuality and the successful campaign to repeal it in 2003.",
      type: 'legislation' as const,
      author: "Legal History",
      year: 2003,
      significance: "Victory against discriminatory legislation",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/400px-Flag_of_the_United_Kingdom.svg.png",
      url: "https://en.wikipedia.org/wiki/Section_28"
    }
  ]

  const allyshipGuides: (Resource & { imageUrl: string })[] = [
    {
      title: "The Guide to Allyship",
      description: "A comprehensive guide to becoming a better ally to the LGBTQ+ community.",
      type: 'guide' as const,
      url: 'https://www.akt.org.uk/resources/a-guide-to-lgbtq-allyship-2/?gad_campaignid=22627939428',
      author: 'AKT',
      imageUrl: 'https://images.pexels.com/photos/9587945/pexels-photo-9587945.jpeg'
    },
    {
      title: "Supporting Trans & Non-Binary People",
      description: "Understanding what it means to be non-binary and how to support trans and non-binary individuals.",
      type: 'guide' as const,
      url: "https://lgbt.foundation/help/what-it-means-to-be-non-binary/?gad_campaignid=22473964018",
      author: "LGBT Foundation",
      imageUrl: "https://images.unsplash.com/photo-1669801243647-f84c62901b45?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Workplace Inclusion",
      description: "Resources for creating an LGBTQ+ inclusive workplace environment.",
      type: 'guide' as const,
      url: 'https://www.stonewall.org.uk/inclusive-workplaces/resources-creating-lgbtq-inclusive-workplace',
      author: 'Stonewall',
      imageUrl: 'https://images.pexels.com/photos/10503437/pexels-photo-10503437.jpeg'
    },
    {
      title: "Supporting LGBTQ+ Youth",
      description: "A guide to being an ally to transgender and non-binary youth.",
      type: 'guide' as const,
      url: 'https://www.thetrevorproject.org/resources/guide/a-guide-to-being-an-ally-to-transgender-and-nonbinary-youth/',
      author: 'The Trevor Project',
      imageUrl: 'https://images.pexels.com/photos/5705887/pexels-photo-5705887.jpeg'
    },
    {
      title: "Allyship & You",
      description: "A guide from HRC on being an effective ally to the LGBTQ+ community.",
      type: 'guide' as const,
      url: 'https://www.hrc.org/resources/being-an-lgbtq-ally',
      author: 'Human Rights Campaign',
      imageUrl: 'https://images.pexels.com/photos/12289186/pexels-photo-12289186.jpeg'
    },
    {
      title: "Healthcare Inclusion Guide",
      author: "LGBT Foundation",
      description: "A comprehensive resource for healthcare professionals to provide inclusive and affirming care to LGBTQ+ patients.",
      type: 'guide' as const,
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

  // Function to get cover URL with fallback
  const getCoverUrl = (isbn: string, size: 'S' | 'M' | 'L' = 'M') => {
    // Use direct image URL if available, otherwise use ISBN
    return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg?default=false`;
  }

  const marqueeRef = useRef<HTMLDivElement>(null)
  const documentariesRef = useRef<HTMLDivElement>(null)
  const historyTimelineRef = useRef<HTMLDivElement>(null)

  // Track mouse position for smooth scrolling (books)
  const [mouseX, setMouseX] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Track mouse position for history timeline scrolling
  const [historyMouseX, setHistoryMouseX] = useState(0)
  const [isHistoryHovering, setIsHistoryHovering] = useState(false)

  // Track mouse position for documentaries scrolling
  const [docMouseX, setDocMouseX] = useState(0)
  const [isDocHovering, setIsDocHovering] = useState(false)

  // Update scroll based on mouse position
  useEffect(() => {
    if (!marqueeRef.current || !isHovering) return

    const container = marqueeRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + (containerRect.width / 2)

    // Calculate scroll position based on mouse distance from center
    const scrollAmount = (mouseX - containerCenter) * 0.3 // Reduced sensitivity from 0.5 to 0.3

    // Smoothly animate the scroll
    const animate = () => {
      if (!isHovering) return
      container.scrollLeft += scrollAmount * 0.06 // Reduced animation speed from 0.1 to 0.06
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [mouseX, isHovering])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX)
  }

  // Update documentaries scroll based on mouse position
  useEffect(() => {
    if (!documentariesRef.current || !isDocHovering) return

    const container = documentariesRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + (containerRect.width / 2)

    // Calculate scroll position based on mouse distance from center
    const scrollAmount = (docMouseX - containerCenter) * 0.3 // Same sensitivity as books

    // Smoothly animate the scroll
    const animate = () => {
      if (!isDocHovering) return
      container.scrollLeft += scrollAmount * 0.06 // Same animation speed as books
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [docMouseX, isDocHovering])

  const handleDocMouseMove = (e: React.MouseEvent) => {
    setDocMouseX(e.clientX)
  }

  // Update history timeline scroll based on mouse position
  useEffect(() => {
    if (!historyTimelineRef.current || !isHistoryHovering) return

    const container = historyTimelineRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + (containerRect.width / 2)

    // Calculate scroll amount based on mouse distance from center
    const scrollAmount = (historyMouseX - containerCenter) * 0.5

    // Smoothly animate the scroll
    const animate = () => {
      if (!isHistoryHovering || !historyTimelineRef.current) return
      container.scrollLeft += scrollAmount * 0.1
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [historyMouseX, isHistoryHovering])

  const handleHistoryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setHistoryMouseX(e.clientX)
  }

  // Ensure timeline starts at the beginning on page load
  useEffect(() => {
    if (historyTimelineRef.current) {
      historyTimelineRef.current.scrollLeft = 0
    }
  }, [])

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

  // Toggle between MTF and FTM content
  const [showMTF, setShowMTF] = useState(true);

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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-transparent">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="trans-health" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Trans Health
            </TabsTrigger>
            <TabsTrigger value="allyship" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Allyship
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Glossary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-8">
            {/* Timeline Header */}
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">A Timeline of Events</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Journey through pivotal moments, movements, and milestones that shaped LGBTQ+ history and continue to inspire progress today
              </p>
            </div>

            {/* Scrolling Timeline */}
            <div className="relative">
              <div
                ref={historyTimelineRef}
                onMouseMove={handleHistoryMouseMove}
                onMouseEnter={() => setIsHistoryHovering(true)}
                onMouseLeave={() => setIsHistoryHovering(false)}
                className="flex space-x-6 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {historyTimeline.map((item, index) => (
                  <div key={index} className="w-[320px] flex-shrink-0 snap-center">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full group"
                    >
                      <div className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-xl">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden rounded-t-xl">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="eager"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/400px-Gay_Pride_Flag.svg.png';
                            }}
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Title overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="mb-1">
                              <span className="text-white/80 text-sm font-medium">{item.year}</span>
                            </div>
                            <h4 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow p-4">
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                              {item.description}
                            </p>
                          </div>

                          {/* Location */}
                          {item.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                              <span>📍</span>
                              <span>{item.location}</span>
                            </div>
                          )}

                          {/* Significance badge */}
                          <div className="mb-3">
                            <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                              {item.significance}
                            </span>
                          </div>

                          {/* Key Figures */}
                          {item.keyFigures && item.keyFigures.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.keyFigures.slice(0, 2).map((figure, figureIndex) => (
                                <span
                                  key={figureIndex}
                                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                                >
                                  {figure}
                                </span>
                              ))}
                              {item.keyFigures.length > 2 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                                  +{item.keyFigures.length - 2} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Learn more indicator */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                              Explore
                            </span>
                            <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Gradient overlays for scroll indication */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
            </div>

            {/* Scroll instruction */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Move your cursor to scroll through the timeline
              <span className="ml-2 inline-block animate-bounce-horizontal">→</span>
            </p>
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
                <div
                  ref={documentariesRef}
                  onMouseMove={handleDocMouseMove}
                  onMouseEnter={() => setIsDocHovering(true)}
                  onMouseLeave={() => setIsDocHovering(false)}
                  className="flex space-x-6 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
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
                                  src={book.imageUrl || (book.isbn ? getCoverUrl(book.isbn, 'L') : '')}
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

          <TabsContent value="trans-health" className="space-y-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
                Transgender Healthcare Guide
              </h2>
              <p className="text-base text-center text-gray-700 dark:text-gray-300 mb-8">
                Select a transition path for detailed information
              </p>
              
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                  onClick={() => setShowMTF(true)}
                  className={`flex-1 py-4 px-4 text-center font-semibold text-base transition-all ${showMTF ? 'border-b-4 border-blue-500 text-blue-700 dark:text-blue-300' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl">♂→♀</span>
                    <span className="text-gray-900 dark:text-gray-100">Male to Female (MTF)</span>
                  </div>
                </button>
                <button
                  onClick={() => setShowMTF(false)}
                  className={`flex-1 py-4 px-4 text-center font-semibold text-base transition-all ${!showMTF ? 'border-b-4 border-pink-500 text-pink-700 dark:text-pink-300' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl">♀→♂</span>
                    <span className="text-gray-900 dark:text-gray-100">Female to Male (FTM)</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Hormone Therapy */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow transition-shadow">
                  <CardHeader className="pb-2 px-4 pt-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className={showMTF ? "text-blue-600 text-sm" : "text-pink-600 text-sm"}>
                        {showMTF ? '♂→♀' : '♀→♂'}
                      </span>
                      <span className="text-sm">Hormone Therapy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 pt-0">
                    <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {showMTF ? (
                        <>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Estrogen Therapy: </span>
                              <span>17β-estradiol (pills, patches, injections) to promote feminization</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Anti-Androgens: </span>
                              <span>Spironolactone or GnRH agonists to suppress testosterone</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Physical Changes: </span>
                              <span>Breast development, softer skin, fat redistribution, reduced body hair</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Fertility: </span>
                              <span>Consider fertility preservation before starting HRT</span>
                            </div>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Testosterone Therapy: </span>
                              <span>Injectable, gel, or patch formulations for masculinization</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Physical Changes: </span>
                              <span>Deepened voice, facial/body hair growth, muscle development, fat redistribution</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Menstrual Cessation: </span>
                              <span>Typically occurs within 2-6 months of starting T</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Fertility: </span>
                              <span>Consider fertility preservation before starting T</span>
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Voice Training */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow transition-shadow">
                  <CardHeader className="pb-2 px-4 pt-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-purple-600 text-sm">🎤</span>
                      <span className="text-sm">Voice</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 pt-0">
                    <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {showMTF ? (
                        <>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Vocal Training: </span>
                              <span>Work with a speech therapist to develop a feminine voice through pitch, resonance, and intonation</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Pitch: </span>
                              <span>Increase pitch to 180-220Hz range through vocal exercises</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Resonance: </span>
                              <span>Focus on oral resonance and brighter speech quality</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Speech Patterns: </span>
                              <span>Practice feminine speech patterns and intonation</span>
                            </div>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Testosterone Effects: </span>
                              <span>Voice deepens by 4-5 semitones within 3-6 months</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Voice Stabilization: </span>
                              <span>Voice may take 1-2 years to fully stabilize after starting T</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Vocal Health: </span>
                              <span>Stay hydrated and practice good vocal hygiene</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Speech Therapy: </span>
                              <span>Optional for refining masculine speech patterns if desired</span>
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Surgical Options */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow transition-shadow">
                  <CardHeader className="pb-2 px-4 pt-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-green-600 text-sm">⚕️</span>
                      <span className="text-sm">Surgeries</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 pt-0">
                    <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {showMTF ? (
                        <>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Facial Feminization: </span>
                              <span>Forehead contouring, rhinoplasty, jaw/chin reduction</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Breast Augmentation: </span>
                              <span>Implants after 1-2 years of HRT for optimal results</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Vaginoplasty: </span>
                              <span>Penile inversion or peritoneal techniques for vaginal construction</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Body Contouring: </span>
                              <span>Liposuction and fat grafting for feminine silhouette</span>
                            </div>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Top Surgery: </span>
                              <span>Double incision or periareolar techniques for chest masculinization</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Hysterectomy: </span>
                              <span>Removal of uterus and possibly ovaries</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Phalloplasty/Metoidioplasty: </span>
                              <span>Genital reconstruction options with various graft sources</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <div>
                              <span className="font-medium">Body Contouring: </span>
                              <span>Liposuction for a more masculine silhouette</span>
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>
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
