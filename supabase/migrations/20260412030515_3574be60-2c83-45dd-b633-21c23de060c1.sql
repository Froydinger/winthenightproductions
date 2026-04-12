
ALTER TABLE public.watch_settings
  ADD COLUMN IF NOT EXISTS about_intro_video_id text DEFAULT 'cIHJZUOIPco',
  ADD COLUMN IF NOT EXISTS about_featured_video_id text DEFAULT 'UL_ayxMAFqM',
  ADD COLUMN IF NOT EXISTS about_featured_title text DEFAULT 'Get a Taste of What We Do',
  ADD COLUMN IF NOT EXISTS about_featured_description text DEFAULT 'If you get some time to throw this on in the background, it''s one of our favorite episodes—a conversation between Josh and his friend, Brandon.',
  ADD COLUMN IF NOT EXISTS cta_featured_video_id text DEFAULT '765UBZfeylw';
