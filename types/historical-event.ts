export interface HistoricalEvent {
  year: number
  text: string
  html: string
  no_year_html: string
  links?: Array<{
    title: string
    link: string
  }>
  image?: string | null
}
