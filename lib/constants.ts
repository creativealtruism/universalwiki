import { SectionType } from "./types";

export const SECTION_TYPES: { id: SectionType; label: string }[] = [
  { id: "early_life", label: "Early Life" },
  { id: "education", label: "Education" },
  { id: "career", label: "Career" },
  { id: "achievements", label: "Achievements" },
  { id: "philosophy", label: "Philosophy" },
  { id: "family", label: "Family" },
  { id: "hobbies", label: "Hobbies" },
  { id: "legacy", label: "Legacy" },
  { id: "custom", label: "Custom" },
];

export const SECTION_PROMPTS: Record<SectionType, string[]> = {
  early_life: [
    "Where did you grow up?",
    "What was your childhood like?",
    "What early experiences shaped who you became?",
  ],
  education: [
    "What schools did you attend?",
    "What subjects fascinated you most?",
    "Who were your most influential teachers or mentors?",
  ],
  career: [
    "What have you built, created, or contributed to?",
    "What projects matter most to you?",
    "What are you most proud of professionally?",
  ],
  achievements: [
    "What accomplishments are you most proud of?",
    "What awards or recognition have you received?",
    "What goals have you achieved?",
  ],
  philosophy: [
    "What principles guide your life?",
    "What do you believe about meaning, work, or love?",
    "What values are most important to you?",
  ],
  family: [
    "Tell us about your family.",
    "What role has family played in your life?",
    "What family traditions matter to you?",
  ],
  hobbies: [
    "What do you enjoy doing in your free time?",
    "What passions do you pursue outside of work?",
    "What brings you joy?",
  ],
  legacy: [
    "What wisdom would you want to pass on?",
    "What do you hope outlives you?",
    "What kind of impact do you hope to have?",
  ],
  custom: [
    "What else would you like to share?",
    "Is there something unique about you?",
  ],
};

export const SECTION_TITLES: Record<SectionType, string> = {
  early_life: "Early Life",
  education: "Education",
  career: "Career",
  achievements: "Achievements",
  philosophy: "Philosophy",
  family: "Family",
  hobbies: "Hobbies",
  legacy: "Legacy",
  custom: "Custom",
};

export const SECTION_DESCRIPTIONS: Record<SectionType, string> = {
  early_life: "Your childhood, upbringing, and formative years.",
  education: "Your educational journey and learning experiences.",
  career: "Your professional path, work, and contributions.",
  achievements: "Notable accomplishments and milestones.",
  philosophy: "Your values, beliefs, and guiding principles.",
  family: "Your family life and relationships.",
  hobbies: "Your interests, passions, and leisure activities.",
  legacy: "The impact and wisdom you hope to leave behind.",
  custom: "Additional information you'd like to share.",
};

export const FREE_TIER_LIMITS = {
  maxPhotos: 1,
  maxSections: 5,
  canUploadVideo: false,
  canUploadAudio: false,
  canUploadDocuments: false,
};

export const PREMIUM_FEATURES = [
  "Unlimited photos",
  "Video uploads",
  "Audio recordings",
  "Document attachments",
  "Custom URL slug",
  "Advanced privacy controls",
  "Priority support",
  "Export to PDF",
];

export const PRICING = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "Basic profile page",
      "1 profile photo",
      "5 content sections",
      "Public profile URL",
    ],
  },
  premium: {
    name: "Premium",
    price: 9,
    period: "month",
    features: [
      "Everything in Free",
      "Unlimited photos",
      "Video & audio uploads",
      "Document attachments",
      "Custom URL slug",
      "Advanced privacy controls",
      "Priority support",
      "Export to PDF",
    ],
  },
};
