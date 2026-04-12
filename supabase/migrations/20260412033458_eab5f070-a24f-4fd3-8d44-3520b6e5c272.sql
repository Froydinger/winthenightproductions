
ALTER TABLE public.watch_settings
  ADD COLUMN IF NOT EXISTS about_jake_bio text DEFAULT 'Runs the socials, Substack, and YouTube channel.',
  ADD COLUMN IF NOT EXISTS about_josh_bio text DEFAULT 'Podcast host offering creative and collaborative insights.';
