"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AIWritingAssistant } from "@/components/onboarding/ai-writing-assistant"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

type OnboardingData = {
  fullName: string
  headline: string
  location: string
  birthYear: string
  occupation: string
  earlyLife: string
  slug: string
}

const STEPS = [
  { id: 1, title: "The Basics", description: "Let's start with your name" },
  { id: 2, title: "Your Identity", description: "A brief introduction" },
  { id: 3, title: "Your Story", description: "Where it all began" },
  { id: 4, title: "Your URL", description: "Claim your unique address" },
]

const OnboardingPage = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    headline: "",
    location: "",
    birthYear: "",
    occupation: "",
    earlyLife: "",
    slug: "",
  })

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (field === "fullName") {
      const suggestedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 50)
      setData((prev) => ({ ...prev, slug: suggestedSlug }))
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.fullName.trim().length > 0
      case 2:
        return data.headline.trim().length > 0
      case 3:
        return true
      case 4:
        return data.slug.trim().length > 0
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          headline: data.headline,
          location: data.location,
          birth_year: data.birthYear ? parseInt(data.birthYear) : null,
          occupation: data.occupation,
          slug: data.slug,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      if (data.earlyLife.trim()) {
        await supabase.from("profile_sections").insert({
          profile_id: user.id,
          section_type: "early_life",
          title: "Early Life",
          content: data.earlyLife,
          display_order: 0,
        })
      }

      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {STEPS[currentStep - 1].title}
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-light tracking-tight text-foreground">
            {STEPS[currentStep - 1].title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {STEPS[currentStep - 1].description}
          </p>
        </div>

        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="e.g., Eleanor Margaret Thompson"
                  value={data.fullName}
                  onChange={(e) => updateData("fullName", e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Your name as you would like it to appear on your profile
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birthYear">Birth Year (optional)</Label>
                  <Input
                    id="birthYear"
                    type="number"
                    placeholder="e.g., 1952"
                    value={data.birthYear}
                    onChange={(e) => updateData("birthYear", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (optional)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Boston, Massachusetts"
                    value={data.location}
                    onChange={(e) => updateData("location", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Textarea
                  id="headline"
                  placeholder="e.g., Retired professor of marine biology, grandmother of five, and lifelong advocate for ocean conservation"
                  value={data.headline}
                  onChange={(e) => updateData("headline", e.target.value)}
                  className="min-h-[100px] text-lg leading-relaxed"
                />
                <p className="text-sm text-muted-foreground">
                  A brief sentence that captures who you are
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Primary Occupation (optional)</Label>
                <Input
                  id="occupation"
                  placeholder="e.g., Professor of Marine Biology"
                  value={data.occupation}
                  onChange={(e) => updateData("occupation", e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="earlyLife">Early Life (optional)</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAIAssistant(!showAIAssistant)}
                    className="gap-2 text-primary"
                  >
                    <Sparkles className="h-4 w-4" />
                    {showAIAssistant ? "Hide" : "Get AI Help"}
                  </Button>
                </div>
                <Textarea
                  id="earlyLife"
                  placeholder="Share where you grew up, your childhood memories, and formative experiences..."
                  value={data.earlyLife}
                  onChange={(e) => updateData("earlyLife", e.target.value)}
                  className="min-h-[200px] leading-relaxed"
                />
                <p className="text-sm text-muted-foreground">
                  You can always add more details later
                </p>
              </div>

              {showAIAssistant && (
                <AIWritingAssistant
                  sectionType="early_life"
                  profileContext={`Name: ${data.fullName}, Location: ${data.location}, Birth Year: ${data.birthYear}`}
                  onInsertText={(text) =>
                    updateData(
                      "earlyLife",
                      data.earlyLife ? `${data.earlyLife}\n\n${text}` : text
                    )
                  }
                />
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="slug">Your Profile URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">universalwiki.org/</span>
                  <Input
                    id="slug"
                    placeholder="your-name"
                    value={data.slug}
                    onChange={(e) =>
                      updateData(
                        "slug",
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "")
                      )
                    }
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This will be your unique, shareable profile address
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-serif text-lg font-medium">
                  Profile Preview
                </h3>
                <div className="space-y-3">
                  <p className="font-serif text-2xl font-light">{data.fullName}</p>
                  <p className="text-muted-foreground">{data.headline}</p>
                  {data.location && (
                    <p className="text-sm text-muted-foreground">
                      {data.location}
                      {data.birthYear && ` · Born ${data.birthYear}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
