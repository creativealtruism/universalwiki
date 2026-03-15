import { SectionType } from "./types";

export const SECTION_PROMPTS: Record<SectionType, string[]> = {
  intro: [
    "Who are you in your own words?",
    "What do you care most about?",
    "What are you known for?",
  ],
  life_story: [
    "Where did you grow up?",
    "What shaped you most?",
    "What major turning points defined your life?",
    "What challenges changed you?",
  ],
  values: [
    "What principles guide your life?",
    "What do you believe about meaning, work, love, or community?",
    "What do you hope people understand about you?",
  ],
  work: [
    "What have you built, created, or contributed to?",
    "What projects matter most to you?",
    "What do you want to be remembered for professionally?",
  ],
  legacy: [
    "What wisdom would you want to pass on?",
    "What do you hope outlives you?",
    "What kind of impact do you hope to have?",
  ],
};

export const SECTION_TITLES: Record<SectionType, string> = {
  intro: "Introduction",
  life_story: "Life Story",
  values: "Values & Beliefs",
  work: "Work & Projects",
  legacy: "Legacy",
};

export const SECTION_DESCRIPTIONS: Record<SectionType, string> = {
  intro: "A brief introduction to who you are and what you care about.",
  life_story: "The story of your life, including key moments and turning points.",
  values: "The principles and beliefs that guide your life.",
  work: "Your professional contributions, projects, and creations.",
  legacy: "The wisdom and impact you hope to leave behind.",
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
