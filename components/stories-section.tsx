import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Heart, Share2 } from "lucide-react"

export function StoriesSection() {
  const stories = [
    {
      name: "Alex",
      age: 24,
      identity: "Non-binary",
      preview:
        "Finding my voice and community after coming out was the most liberating experience of my life. This platform connected me with people who truly understood my journey...",
      image: "/confident-diverse-youth.png",
    },
    {
      name: "Maria",
      age: 32,
      identity: "Transgender woman",
      preview:
        "The transition process felt overwhelming until I found this supportive community. The resources here helped me navigate healthcare, legal changes, and most importantly...",
      image: "/latina-transgender-woman-headshot.png",
    },
    {
      name: "Jordan",
      age: 19,
      identity: "Gay man",
      preview:
        "Coming out in college was scary, but the peer support groups here gave me the confidence to live authentically. Now I'm helping other students find their courage too...",
      image: "/young-gay-college-student-smiling.png",
    },
  ]

  return (
    <section id="stories" className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Community Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Read experiences from across our community. Every story matters and helps build understanding and
            connection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg bg-card overflow-hidden">
              <div className="relative">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={`${story.name}'s story`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Quote className="w-8 h-8 text-white/80" />
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-bold">
                    {story.name}, {story.age}
                  </CardTitle>
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-lime-accent)/10",
                      color: "var(--color-lime-accent)",
                    }}
                  >
                    {story.identity}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-6">"{story.preview}"</CardDescription>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover-lift bg-transparent"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    Read Full Story
                  </Button>
                  <Button variant="ghost" size="sm" className="hover-lift">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover-lift">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
