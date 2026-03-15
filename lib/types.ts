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
  | "early_life"
  | "education"
  | "career"
  | "achievements"
  | "philosophy"
  | "family"
  | "hobbies"
  | "legacy"
  | "custom";

export interface ProfileSection {
  id: string;
  profile_id: string;
  section_type: string;
  title: string;
  content: string | null;
  display_order: number;
  is_visible: boolean;
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
  
  // Step 2-4: Section content
  sections: {
    early_life: string;
    career: string;
    legacy: string;
  };
  
  // Step 3: URL slug
  slug: string;
  
  // Step 4: Privacy
  visibility: "public" | "unlisted" | "private";
}

export type OnboardingStep =
  | "basics"
  | "identity"
  | "story"
  | "url";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  "basics",
  "identity",
  "story",
  "url",
];

export const STEP_LABELS: Record<OnboardingStep, string> = {
  "basics": "The Basics",
  "identity": "Your Identity",
  "story": "Your Story",
  "url": "Your URL",
};
