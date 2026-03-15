export type OnboardingStep = 
  | "welcome"
  | "basics"
  | "headline"
  | "location"
  | "story"
  | "sections"
  | "visibility"
  | "complete"

export type OnboardingData = {
  fullName: string
  birthYear: string
  occupation: string
  headline: string
  location: string
  story: string
  selectedSections: string[]
  visibility: "public" | "unlisted" | "private"
  slug: string
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  "welcome",
  "basics",
  "headline",
  "location",
  "story",
  "sections",
  "visibility",
  "complete",
]

export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  fullName: "",
  birthYear: "",
  occupation: "",
  headline: "",
  location: "",
  story: "",
  selectedSections: ["early_life", "career", "philosophy"],
  visibility: "public",
  slug: "",
}

export const AVAILABLE_SECTIONS = [
  { id: "early_life", title: "Early Life", description: "Your childhood and formative years" },
  { id: "education", title: "Education", description: "Schools, degrees, and learning experiences" },
  { id: "career", title: "Career", description: "Professional journey and accomplishments" },
  { id: "achievements", title: "Achievements", description: "Awards, milestones, and notable accomplishments" },
  { id: "philosophy", title: "Philosophy", description: "Beliefs, values, and worldview" },
  { id: "family", title: "Family", description: "Family relationships and traditions" },
  { id: "hobbies", title: "Hobbies & Interests", description: "Passions and pastimes" },
  { id: "legacy", title: "Legacy", description: "What you want to be remembered for" },
]
