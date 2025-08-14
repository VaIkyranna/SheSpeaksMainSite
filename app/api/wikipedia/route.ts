import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const monthStr = url.searchParams.get('month')
  const dayStr = url.searchParams.get('day')

  if (!monthStr || !dayStr) {
    return NextResponse.json(
      { error: 'Month and day parameters are required' },
      { status: 400 }
    )
  }

  try {
    // Get the current week's date range
    const currentDate = new Date(new Date().getFullYear(), parseInt(monthStr) - 1, parseInt(dayStr))
    const currentDay = currentDate.getDay()
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDay)
    
    // Generate array of dates for the current week
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDates.push({
        month: String(date.getMonth() + 1).padStart(2, '0'),
        day: String(date.getDate()).padStart(2, '0')
      })
    }

    console.log('Fetching LGBTQ+ events for week:', weekDates)

    // Fetch from Wikipedia for the entire week
    const allRequests = weekDates.map(({ month, day }) =>
      fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`,
        {
          headers: {
            'User-Agent': 'SheSpeaks-LGBTQ-Website/1.0 (https://shespeaks.lgbt)',
            'Accept': 'application/json'
          }
        }
      ).catch(() => null)
    )

    const responses = await Promise.all(allRequests)
    let allEvents = []

    // Process all responses from the week
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i]
      const currentDateInfo = weekDates[i]

      if (response?.ok) {
        const data = await response.json()
        const wikiEvents = [
          ...(data.selected || []),
          ...(data.events || []),
          ...(data.births || []),
          ...(data.deaths || [])
        ]

        // Very specific LGBTQ+ filtering - only exact matches
        const lgbtqEvents = wikiEvents.filter((event: any) => {
          const text = (event.text || '').toLowerCase()
          const html = (event.html || '').toLowerCase()
          const pages = event.pages?.map((p: any) => p.title.toLowerCase()).join(' ') || ''
          const fullText = `${text} ${html} ${pages}`

          // Only match very specific LGBTQ+ terms
          return (
            fullText.includes('lgbt') ||
            fullText.includes('lgbtq') ||
            fullText.includes('lesbian') ||
            fullText.includes('transgender') ||
            fullText.includes('bisexual') ||
            fullText.includes('queer') ||
            fullText.includes('stonewall') ||
            fullText.includes('marriage equality') ||
            fullText.includes('same-sex marriage') ||
            fullText.includes('homosexual') ||
            fullText.includes('pride parade') ||
            fullText.includes('sexual orientation') ||
            fullText.includes('coming out') ||
            fullText.includes('gender identity') ||
            fullText.includes('rainbow flag')
          )
        })

        // Add events with date info
        allEvents.push(
          ...lgbtqEvents.map((event: any) => ({
            year: event.year,
            text: event.text,
            html: event.html || event.text,
            source: 'Wikipedia',
            date: `${currentDateInfo.month}/${currentDateInfo.day}`,
            image: event.pages?.[0]?.thumbnail?.source || null,
            links: event.pages?.map((page: any) => ({
              title: page.title,
              link: `https://en.wikipedia.org/wiki/${page.title.replace(/ /g, '_')}`
            })) || []
          }))
        )
      }
    }

    console.log('Total LGBTQ+ events found for the week:', allEvents.length)

    // Remove duplicates
    const seenEvents = new Set()
    const uniqueEvents = allEvents.filter(event => {
      const words = event.text.toLowerCase().replace(/[^\w\s]/g, '').split(' ')
      const significantWords = words.slice(0, 5).join(' ')
      const key = `${event.year}-${significantWords}`

      if (seenEvents.has(key)) {
        return false
      }
      seenEvents.add(key)
      return true
    })

    // Sort by year and return up to 3 events
    const events = uniqueEvents
      .sort((a, b) => b.year - a.year)
      .slice(0, 3)

    console.log('Final events being returned:', events.length)

    return new Response(JSON.stringify(events), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  } catch (error) {
    console.error('Error fetching historical events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch historical events' },
      { status: 500 }
    )
  }
}