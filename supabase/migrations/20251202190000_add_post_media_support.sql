-- Add media columns to posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS gif_url TEXT;

-- Add media columns to post_replies table
ALTER TABLE public.post_replies
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS gif_url TEXT;

-- Create storage bucket for post media (images and videos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-media',
  'post-media',
  true,
  52428800, -- 50MB limit
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for post-media bucket
CREATE POLICY "Post media is publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'post-media');

CREATE POLICY "Authenticated users can upload post media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own post media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own post media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Add comment for documentation
COMMENT ON COLUMN public.posts.image_url IS 'URL to uploaded image';
COMMENT ON COLUMN public.posts.video_url IS 'URL to uploaded video (max 50MB)';
COMMENT ON COLUMN public.posts.gif_url IS 'URL to GIF from Giphy or other service';
COMMENT ON COLUMN public.post_replies.image_url IS 'URL to uploaded image';
COMMENT ON COLUMN public.post_replies.video_url IS 'URL to uploaded video (max 50MB)';
COMMENT ON COLUMN public.post_replies.gif_url IS 'URL to GIF from Giphy or other service';
