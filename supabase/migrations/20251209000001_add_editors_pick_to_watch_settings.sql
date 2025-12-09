-- Add editors_pick_video_id to watch_settings table
ALTER TABLE public.watch_settings
ADD COLUMN IF NOT EXISTS editors_pick_video_id TEXT;

-- Update the default row to include the current hardcoded editor's pick video
UPDATE public.watch_settings
SET editors_pick_video_id = '-7-R4fl4ubU'
WHERE id = 1;
