-- Create media_assets table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  asset_type TEXT DEFAULT 'image' CHECK (asset_type IN ('image', 'video', 'audio', 'document')),
  url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_assets
-- Users can view their own media
CREATE POLICY "media_select_own" ON public.media_assets 
  FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Users can insert their own media
CREATE POLICY "media_insert_own" ON public.media_assets 
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Users can update their own media
CREATE POLICY "media_update_own" ON public.media_assets 
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Users can delete their own media
CREATE POLICY "media_delete_own" ON public.media_assets 
  FOR DELETE USING (
    profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Anyone can view media of public profiles
CREATE POLICY "media_select_public" ON public.media_assets 
  FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE visibility = 'public')
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS media_profile_id_idx ON public.media_assets(profile_id);
CREATE INDEX IF NOT EXISTS media_type_idx ON public.media_assets(asset_type);
CREATE INDEX IF NOT EXISTS media_primary_idx ON public.media_assets(is_primary);
