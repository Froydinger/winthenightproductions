
ALTER TABLE public.watch_settings
  ADD COLUMN watch_latest_button_text text NOT NULL DEFAULT 'Jump straight to Chapter 7',
  ADD COLUMN watch_latest_button_link text NOT NULL DEFAULT '/watch/chapter-7';
