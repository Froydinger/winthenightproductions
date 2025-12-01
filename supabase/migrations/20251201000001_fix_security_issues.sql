-- Fix security issues in posts table

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Authenticated users and admins can create posts" ON public.posts;

-- Create new INSERT policy that prevents user impersonation
-- Users can only create posts with their own user_id or NULL (for anonymous)
-- Admin (j@froydinger.com) can create posts with any user_id
CREATE POLICY "Users can create posts with their own user_id or anonymous"
ON public.posts FOR INSERT
TO authenticated, anon
WITH CHECK (
  user_id IS NULL OR
  user_id = auth.uid() OR
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'j@froydinger.com'
);

-- Create a view that masks user_id for anonymous posts
CREATE OR REPLACE VIEW public.posts_safe AS
SELECT
  id,
  CASE
    WHEN is_anonymous THEN NULL
    ELSE user_id
  END AS user_id,
  display_name,
  avatar_url,
  content,
  youtube_url,
  is_anonymous,
  is_pinned,
  created_at,
  updated_at
FROM public.posts;

-- Grant access to the view
GRANT SELECT ON public.posts_safe TO authenticated, anon;

-- Note: The frontend should use posts_safe for SELECT operations to prevent
-- exposing user_id on anonymous posts. However, for admin operations like
-- delete and update, the posts table can still be used directly with proper
-- permission checks.
