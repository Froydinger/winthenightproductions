-- Create watch_settings table for admin-configurable settings
CREATE TABLE public.watch_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  editors_pick_video_id TEXT DEFAULT '-7-R4fl4ubU',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE public.watch_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Anyone can view watch settings"
  ON public.watch_settings
  FOR SELECT
  USING (true);

-- Only admins can update settings
CREATE POLICY "Only admins can update watch settings"
  ON public.watch_settings
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert the default row
INSERT INTO public.watch_settings (id, editors_pick_video_id)
VALUES (1, '-7-R4fl4ubU');