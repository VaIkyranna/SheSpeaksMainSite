import { HistoricalEvent } from '@/types/historical-event'

// Pre-populated database of LGBTQ+ historical events
const lgbtqHistoricalEvents: Record<string, HistoricalEvent[]> = {
  // August 13
  '8-13': [
    {
      year: 1961,
      text: "Berlin Wall construction begins, which had a significant impact on LGBTQ+ communities in East and West Berlin.",
      html: "Berlin Wall construction begins, affecting LGBTQ+ communities who used West Berlin as a safe haven.",
      no_year_html: "Berlin Wall construction affecting LGBTQ+ communities in divided Berlin",
      links: [{ title: "LGBTQ+ Life in Cold War Berlin", link: "https://www.npr.org/2019/11/06/776752842/the-fall-of-the-berlin-wall-30-years-later" }],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/640px-Berlinermauer.jpg"
    }
  ],
  // June 28 (Stonewall)
  '6-28': [
    {
      year: 1969,
      text: "The Stonewall riots begin in New York City, marking a pivotal moment in the LGBTQ+ rights movement.",
      html: "The Stonewall riots begin in New York City's Greenwich Village, led by trans women of color including Marsha P. Johnson and Sylvia Rivera.",
      no_year_html: "The Stonewall riots in New York City's Greenwich Village",
      links: [{ title: "Stonewall Riots", link: "https://www.history.com/topics/gay-rights/the-stonewall-riots" }],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stonewall_Inn_1969.jpg/640px-Stonewall_Inn_1969.jpg"
    }
  ],
  // June 26 (Marriage Equality)
  '6-26': [
    {
      year: 2015,
      text: "The U.S. Supreme Court legalizes same-sex marriage nationwide in Obergefell v. Hodges.",
      html: "In a historic decision, the U.S. Supreme Court rules in favor of marriage equality in Obergefell v. Hodges.",
      no_year_html: "Supreme Court marriage equality ruling in Obergefell v. Hodges",
      links: [{ title: "Obergefell v. Hodges", link: "https://www.supremecourt.gov/opinions/14pdf/14-556_3204.pdf" }],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Celebration_of_same-sex_marriage_ruling_SCOTUS_6-26-15.jpg/640px-Celebration_of_same-sex_marriage_ruling_SCOTUS_6-26-15.jpg"
    }
  ],
  // December 1 (World AIDS Day)
  '12-1': [
    {
      year: 1988,
      text: "The first World AIDS Day is observed globally.",
      html: "The World Health Organization establishes World AIDS Day to raise awareness about HIV/AIDS.",
      no_year_html: "First World AIDS Day observation",
      links: [{ title: "World AIDS Day History", link: "https://www.worldaidsday.org/about" }],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Red_Ribbon.svg/640px-Red_Ribbon.svg.png"
    }
  ],
  // October 11 (National Coming Out Day)
  '10-11': [
    {
      year: 1988,
      text: "The first National Coming Out Day is celebrated in the United States.",
      html: "Robert Eichberg and Jean O'Leary establish National Coming Out Day to promote visibility.",
      no_year_html: "First National Coming Out Day celebration",
      links: [{ title: "National Coming Out Day", link: "https://www.hrc.org/resources/national-coming-out-day" }],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Gay_flag_8.svg/640px-Gay_flag_8.svg.png"
    }
  ],
  // May 17 (IDAHOBIT)
  '5-17': [
    {
      year: 1990,
      text: "WHO removes homosexuality from the International Classification of Diseases.",
      html: "The World Health Organization declassifies homosexuality as a mental disorder.",
      no_year_html: "WHO declassification of homosexuality",
      links: [{ title: "IDAHOBIT History", link: "https://may17.org/about/" }],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/640px-Gay_Pride_Flag.svg.png"
    }
  ]
}

export async function getHistoricalEvents(month: number, day: number): Promise<HistoricalEvent[]> {
  // Format the date key
  const dateKey = `${month}-${day}`

  // Get events from our database
  const localEvents = lgbtqHistoricalEvents[dateKey] || []

  try {
    // Try to fetch from Wikipedia API
    const response = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`,
      {
        headers: {
          'User-Agent': 'SheSpeaks-LGBTQ-Website/1.0',
          'Accept': 'application/json',
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      const allWikiEvents = [...(data.selected || []), ...(data.events || [])]
      
      // Filter for LGBTQ+ related events
      const lgbtqKeywords = [
        'gay', 'lesbian', 'homosexual', 'transgender', 'bisexual', 'queer', 'lgbt',
        'same-sex', 'pride', 'stonewall', 'marriage equality',
        'aids', 'hiv', 'gender identity', 'sexual orientation'
      ]

      const wikiEvents = allWikiEvents
        .filter(event => {
          const searchText = `${event.text || ''} ${event.html || ''}`.toLowerCase()
          return lgbtqKeywords.some(keyword => searchText.includes(keyword.toLowerCase()))
        })
        .map(event => ({
          ...event,
          image: event.thumbnail?.source || null
        }))

      // Combine local and Wikipedia events, remove duplicates
      const allEvents = [...localEvents, ...wikiEvents]
        .filter((event, index, self) => 
          index === self.findIndex(e => e.year === event.year && e.text === event.text)
        )
        .sort((a, b) => b.year - a.year)
        .slice(0, 5)

      return allEvents
    }
  } catch (error) {
    console.error('Error fetching from Wikipedia:', error)
  }

  // If Wikipedia fetch fails or returns no results, return local events
  return localEvents
}
