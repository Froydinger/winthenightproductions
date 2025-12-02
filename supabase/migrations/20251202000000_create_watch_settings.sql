-- Create watch_settings table for managing the watch page CTA video
CREATE TABLE IF NOT EXISTS public.watch_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    cta_video_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_row_check CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE public.watch_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the settings
CREATE POLICY "Anyone can view watch settings"
    ON public.watch_settings
    FOR SELECT
    USING (true);

-- Only admins can update the settings
CREATE POLICY "Only admins can update watch settings"
    ON public.watch_settings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Insert default row (empty CTA, will use channel feed fallback)
INSERT INTO public.watch_settings (id, cta_video_id)
VALUES (1, NULL)
ON CONFLICT (id) DO NOTHING;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER watch_settings_updated_at
    BEFORE UPDATE ON public.watch_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
