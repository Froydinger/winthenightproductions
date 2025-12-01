-- Add is_pinned column to posts table
ALTER TABLE public.posts ADD COLUMN is_pinned BOOLEAN NOT NULL DEFAULT false;

-- Create index for faster querying of pinned posts
CREATE INDEX idx_posts_is_pinned ON public.posts(is_pinned);

-- Create RLS policy to allow admins to update is_pinned
CREATE POLICY "Admins can pin/unpin posts"
ON public.posts FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
