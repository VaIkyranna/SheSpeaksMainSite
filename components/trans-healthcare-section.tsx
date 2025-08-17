"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, HeartPulse, Mic, Scissors, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TransitionType = {
  title: string
  hrt: {
    medications: string
    effects: string[]
    note: string
  }
  steps: {
    title: string
    items: string[]
  }[]
  voice: {
    description: string
    note: string
  }
}

export function TransHealthcareSection() {
  const mtf: TransitionType = {
    title: "Male to Female (MTF)",
    hrt: {
      medications: "Estrogen, anti-androgens, progesterone",
      effects: [
        "Breast development",
        "Fat redistribution",
        "Softer skin",
        "Reduced body/facial hair"
      ],
      note: "Supervision by healthcare professionals is essential for monitoring effects and managing risks."
    },
    steps: [
      {
        title: "Social",
        items: [
          "Name/pronoun changes",
          "Presentation adjustments"
        ]
      },
      {
        title: "Legal",
        items: [
          "Update ID documents",
          "Name/gender marker changes"
        ]
      },
      {
        title: "Medical",
        items: [
          "Hormone Therapy (HRT)",
          "Surgeries (breast, GRS)"
        ]
      },
      {
        title: "Support",
        items: [
          "Mental health",
          "Support groups",
          "Community resources"
        ]
      }
    ],
    voice: {
      description: "Focuses on achieving a higher pitch and feminine speech patterns.",
      note: "Self-guided or with a speech therapist."
    }
  }

  const ftm: TransitionType = {
    title: "Female to Male (FTM)",
    hrt: {
      medications: "Testosterone",
      effects: [
        "Voice deepening",
        "Facial/body hair",
        "Muscle growth",
        "Periods stop"
      ],
      note: "Regular medical monitoring is crucial for safety."
    },
    steps: [
      {
        title: "Social",
        items: [
          "Name/pronouns",
          "Presentation updates"
        ]
      },
      {
        title: "Legal",
        items: [
          "Update ID documents",
          "Name/gender marker"
        ]
      },
      {
        title: "Medical",
        items: [
          "Testosterone therapy",
          "Surgeries (top, bottom)"
        ]
      },
      {
        title: "Support",
        items: [
          "Counseling",
          "Peer groups",
          "Resources"
        ]
      }
    ],
    voice: {
      description: "Testosterone causes permanent voice deepening.",
      note: "Therapy can help with resonance."
    }
  }

  const renderTransitionInfo = (type: TransitionType) => (
    <div className="space-y-4">
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:border-pink-200 dark:hover:border-pink-600 transition-colors">
        <CardHeader className="pb-2 px-6 pt-4">
          <CardTitle className="text-lg flex items-center gap-2 text-pink-600 dark:text-pink-400">
            <HeartPulse className="w-5 h-5" />
            Hormone Therapy (HRT)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-4 space-y-2 text-sm">
          <p className="text-gray-800 dark:text-gray-200"><span className="font-medium">Medications:</span> {type.hrt.medications}</p>
          <div>
            <p className="font-medium text-sm text-gray-700 dark:text-gray-300">Effects:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              {type.hrt.effects.map((effect, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-300">{effect}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start">
            <Info className="w-3.5 h-3.5 mr-1 mt-0.5 flex-shrink-0 text-pink-500 dark:text-pink-400" />
            {type.hrt.note}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:border-pink-200 dark:hover:border-pink-600 transition-colors">
        <CardHeader className="pb-2 px-6 pt-4">
          <CardTitle className="text-lg flex items-center gap-2 text-pink-600 dark:text-pink-400">
            <User className="w-5 h-5" />
            Transitioning Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-4">
          <div className="grid grid-cols-2 gap-4">
            {type.steps.map((step, i) => (
              <div key={i} className="space-y-1">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-200">{step.title}</h4>
                <ul className="text-xs space-y-0.5">
                  {step.items.map((item, j) => (
                    <li key={j} className="text-gray-600 dark:text-gray-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:border-pink-200 dark:hover:border-pink-600 transition-colors">
        <CardHeader className="pb-2 px-6 pt-4">
          <CardTitle className="text-lg flex items-center gap-2 text-pink-600 dark:text-pink-400">
            <Mic className="w-5 h-5" />
            Voice Changes
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-4 text-sm">
          <p className="mb-1 text-gray-800 dark:text-gray-200">{type.voice.description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start">
            <Info className="w-3.5 h-3.5 mr-1 mt-0.5 flex-shrink-0 text-pink-500 dark:text-pink-400" />
            {type.voice.note}
          </p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Trans Healthcare
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Essential information and support for transgender individuals
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="mtf" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto mb-6 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
            <TabsTrigger 
              value="mtf" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 rounded-md transition-colors"
            >
              MTF
            </TabsTrigger>
            <TabsTrigger 
              value="ftm" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 rounded-md transition-colors"
            >
              FTM
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mtf" className="mt-0">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">{mtf.title}</h3>
              {renderTransitionInfo(mtf)}
            </div>
          </TabsContent>
          <TabsContent value="ftm" className="mt-0">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">{ftm.title}</h3>
              {renderTransitionInfo(ftm)}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="mb-2">
            This information is for educational purposes only and not medical advice.
          </p>
          <p>
            Always consult healthcare professionals for personalized medical advice.
          </p>
        </div>
      </div>
    </section>
  )
}
