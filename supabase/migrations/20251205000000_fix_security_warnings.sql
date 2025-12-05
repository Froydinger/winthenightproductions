-- Fix security warnings from Lovable security scan

-- 1. Fix user_profiles table - restrict public access to authenticated users only
-- Drop the existing policy that allows anonymous access
DROP POLICY IF EXISTS "Users can view all profiles" ON public.user_profiles;

-- Create new policy that only allows authenticated users to view profiles
CREATE POLICY "Authenticated users can view all profiles"
ON public.user_profiles FOR SELECT
TO authenticated
USING (true);

-- 2. Fix posts table - prevent anonymous users from accessing raw table with user_id
-- Anonymous users should use the posts_safe view instead
DROP POLICY IF EXISTS "Anyone can view posts" ON public.posts;

-- Create new policy that only allows authenticated users to view raw posts table
CREATE POLICY "Authenticated users can view all posts"
ON public.posts FOR SELECT
TO authenticated
USING (true);

-- Allow anonymous users to access the posts_safe view (which masks user_id for anonymous posts)
-- The view was already created in 20251201000001_fix_security_issues.sql
-- Just ensure the grant is in place
GRANT SELECT ON public.posts_safe TO authenticated, anon;

-- 3. Fix post_likes table - restrict to authenticated users only
-- Drop the existing policy that allows anonymous access to raw data
DROP POLICY IF EXISTS "Anyone can view likes" ON public.post_likes;

-- Create new policy that only allows authenticated users to view their own likes
-- This prevents exposing who liked which post to anonymous users
CREATE POLICY "Authenticated users can view their own likes"
ON public.post_likes FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create a view for public like counts (aggregate data only)
-- This allows anyone to see how many likes a post has without exposing who liked it
CREATE OR REPLACE VIEW public.post_like_counts AS
SELECT
  post_id,
  COUNT(*) as like_count
FROM public.post_likes
GROUP BY post_id;

-- Grant access to the view for both authenticated and anonymous users
GRANT SELECT ON public.post_like_counts TO authenticated, anon;

-- Note: For leaked password protection, this is typically a Supabase Auth configuration
-- that should be enabled in the Supabase dashboard under Authentication settings.
-- It's not a database-level setting that can be configured via SQL migrations.
