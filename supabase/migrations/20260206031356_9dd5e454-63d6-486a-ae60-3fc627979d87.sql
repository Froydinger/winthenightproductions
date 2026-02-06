
ALTER TABLE public.watch_settings
  ADD COLUMN IF NOT EXISTS trailer_video_id text DEFAULT '765UBZfeylw',
  ADD COLUMN IF NOT EXISTS trailer_button_text text DEFAULT 'Watch the Trailer',
  ADD COLUMN IF NOT EXISTS trailer_visible boolean DEFAULT true;
