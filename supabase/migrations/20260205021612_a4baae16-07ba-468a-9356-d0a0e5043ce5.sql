-- Add main_playlist_id column to watch_settings
ALTER TABLE public.watch_settings 
ADD COLUMN main_playlist_id TEXT DEFAULT 'PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD';

-- Update existing row with default value
UPDATE public.watch_settings 
SET main_playlist_id = 'PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD' 
WHERE id = 1;