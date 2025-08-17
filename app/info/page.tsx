import { TransHealthcareSection } from "@/components/trans-healthcare-section"

export default function InfoHub() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Info Hub
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Essential resources and information for the LGBTQ+ community
            </p>
          </div>

          <div className="space-y-16">
            <TransHealthcareSection />
            {/* Add more info sections here as needed */}
          </div>
        </div>
      </section>
    </main>
  )
}
