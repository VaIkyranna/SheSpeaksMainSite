"use client"

import { useEffect } from "react"

import { AppleHero } from "@/components/apple-hero"
import { NewsSection } from "@/components/news-section"
import { HistorySection } from "@/components/history-section"
import { ResourcesSection } from "@/components/resources-section"
import { EventsSection } from "@/components/events-section"
import { EducationSection } from "@/components/education-section"
import { Footer } from "@/components/footer"
import ErrorBoundary from "@/components/error-boundary"

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <AppleHero />

      <section id="news" className="bg-gray-50 dark:bg-gray-800">
        <ErrorBoundary>
          <NewsSection />
        </ErrorBoundary>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800">
        <ErrorBoundary>
          <HistorySection />
        </ErrorBoundary>
      </section>

      <section id="education" className="bg-white dark:bg-gray-900">
        <EducationSection />
      </section>

      <section id="resources" className="apple-section bg-white dark:bg-gray-900">
        <ResourcesSection />
      </section>

      <section id="events" className="apple-section bg-gray-50 dark:bg-gray-800">
        <EventsSection />
      </section>

      <Footer />
    </main>
  )
}
