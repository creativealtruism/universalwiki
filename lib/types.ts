export interface Profile {
  id: string;
  full_name: string | null;
  headline: string | null;
  location: string | null;
  birth_year: number | null;
  occupation: string | null;
  website: string | null;
  social_links: SocialLinks;
  profile_photo_url: string | null;
  slug: string | null;
  visibility: "public" | "unlisted" | "private";
  is_premium: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  facebook?: string;
}

export type SectionType =
  | "intro"
  | "life_story"
  | "values"
  | "work"
  | "legacy";

export interface ProfileSection {
  id: string;
  profile_id: string;
  section_type: SectionType;
  title: string | null;
  content: string | null;
  display_order: number;
  is_premium_only: boolean;
  created_at: string;
  updated_at: string;
}

export type AssetType = "image" | "video" | "audio" | "document";

export interface MediaAsset {
  id: string;
  profile_id: string;
  asset_type: AssetType;
  url: string;
  caption: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface OnboardingData {
  // Step 1: Basic Identity
  full_name: string;
  headline: string;
  location: string;
  birth_year: number | null;
  occupation: string;
  
  // Step 2-6: Section content
  sections: {
    intro: string;
    life_story: string;
    values: string;
    work: string;
    legacy: string;
  };
  
  // Step 7: Media
  profile_photo_url: string | null;
  
  // Step 8: Privacy
  visibility: "public" | "unlisted" | "private";
}

export type OnboardingStep =
  | "basic-identity"
  | "intro"
  | "life-story"
  | "values"
  | "work"
  | "legacy"
  | "media"
  | "privacy";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  "basic-identity",
  "intro",
  "life-story",
  "values",
  "work",
  "legacy",
  "media",
  "privacy",
];

export const STEP_LABELS: Record<OnboardingStep, string> = {
  "basic-identity": "Basic Identity",
  "intro": "Introduction",
  "life-story": "Life Story",
  "values": "Values & Beliefs",
  "work": "Work & Projects",
  "legacy": "Legacy",
  "media": "Media",
  "privacy": "Privacy",
};
