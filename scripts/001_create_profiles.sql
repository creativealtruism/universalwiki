-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  headline TEXT,
  location TEXT,
  birth_year INTEGER,
  occupation TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  profile_photo_url TEXT,
  slug TEXT UNIQUE,
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
  is_premium BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Users can view their own profile
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "profiles_delete_own" ON public.profiles 
  FOR DELETE USING (auth.uid() = id);

-- Anyone can view public profiles (for public profile pages)
CREATE POLICY "profiles_select_public" ON public.profiles 
  FOR SELECT USING (visibility = 'public');

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS profiles_slug_idx ON public.profiles(slug);

-- Create index on visibility for filtering
CREATE INDEX IF NOT EXISTS profiles_visibility_idx ON public.profiles(visibility);
