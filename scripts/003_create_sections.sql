-- Create profile_sections table
CREATE TABLE IF NOT EXISTS public.profile_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN ('intro', 'life_story', 'values', 'work', 'legacy')),
  title TEXT,
  content TEXT,
  display_order INTEGER DEFAULT 0,
  is_premium_only BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profile_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profile_sections
-- Users can view their own sections
CREATE POLICY "sections_select_own" ON public.profile_sections 
  FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Users can insert their own sections
CREATE POLICY "sections_insert_own" ON public.profile_sections 
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Users can update their own sections
CREATE POLICY "sections_update_own" ON public.profile_sections 
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Users can delete their own sections
CREATE POLICY "sections_delete_own" ON public.profile_sections 
  FOR DELETE USING (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Anyone can view sections of public profiles
CREATE POLICY "sections_select_public" ON public.profile_sections 
  FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE visibility = 'public')
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS sections_profile_id_idx ON public.profile_sections(profile_id);
CREATE INDEX IF NOT EXISTS sections_type_idx ON public.profile_sections(section_type);
CREATE INDEX IF NOT EXISTS sections_order_idx ON public.profile_sections(display_order);
