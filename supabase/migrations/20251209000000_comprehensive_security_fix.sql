-- Comprehensive security fix for all Lovable security warnings
-- This migration addresses:
-- 1. PUBLIC_USER_DATA: Hide user_id for anonymous posts
-- 2. EXPOSED_SENSITIVE_DATA: Restrict user_profiles to authenticated users
-- 3. MISSING_RLS_PROTECTION: Protect post_likes from profiling

-- =============================================================================
-- 1. FIX PUBLIC_USER_DATA - Posts table
-- =============================================================================

-- Drop existing public SELECT policies on posts
DROP POLICY IF EXISTS "Anyone can view posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON public.posts;

-- Create policy that only allows authenticated users to view raw posts
-- This prevents anonymous users from seeing user_id on anonymous posts
CREATE POLICY "Authenticated users can view posts"
ON public.posts FOR SELECT
TO authenticated
USING (true);

-- Ensure posts_safe view exists and is properly configured
CREATE OR REPLACE VIEW public.posts_safe AS
SELECT
  id,
  CASE
    WHEN is_anonymous = true THEN NULL
    ELSE user_id
  END AS user_id,
  display_name,
  avatar_url,
  content,
  youtube_url,
  is_anonymous,
  is_pinned,
  created_at,
  updated_at,
  media_type,
  media_url,
  thumbnail_url
FROM public.posts;

-- Grant SELECT on the safe view to everyone (authenticated and anonymous)
GRANT SELECT ON public.posts_safe TO authenticated, anon;

-- Add comment explaining the view's purpose
COMMENT ON VIEW public.posts_safe IS 'Safe view of posts that masks user_id for anonymous posts. Use this view for public-facing queries instead of the posts table directly.';

-- =============================================================================
-- 2. FIX EXPOSED_SENSITIVE_DATA - User profiles table
-- =============================================================================

-- Drop existing public SELECT policies on user_profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.user_profiles;

-- Create policy that only allows authenticated users to view profiles
-- This prevents scraping of user data by anonymous visitors
CREATE POLICY "Only authenticated users can view profiles"
ON public.user_profiles FOR SELECT
TO authenticated
USING (true);

-- Create a minimal public view for essential profile data (if needed)
-- This only exposes the bare minimum needed for public display
CREATE OR REPLACE VIEW public.user_profiles_public AS
SELECT
  id,
  display_name,
  -- avatar_url is excluded to prevent scraping
  created_at
FROM public.user_profiles;

-- Grant SELECT on public view only to authenticated users
-- Remove this grant if you don't want even authenticated users to have this access
GRANT SELECT ON public.user_profiles_public TO authenticated;

-- Add comment explaining the view's purpose
COMMENT ON VIEW public.user_profiles_public IS 'Minimal public view of user profiles with sensitive data excluded. Only accessible to authenticated users.';

-- =============================================================================
-- 3. FIX MISSING_RLS_PROTECTION - Post likes table
-- =============================================================================

-- Drop existing public SELECT policies on post_likes
DROP POLICY IF EXISTS "Anyone can view likes" ON public.post_likes;
DROP POLICY IF EXISTS "Users can view all likes" ON public.post_likes;
DROP POLICY IF EXISTS "Authenticated users can view their own likes" ON public.post_likes;

-- Create policy that only allows users to view their own likes
-- This prevents profiling and targeting of users based on their likes
CREATE POLICY "Users can only view their own likes"
ON public.post_likes FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create or replace the aggregate view for like counts
-- This allows public viewing of how many likes a post has without exposing who liked it
CREATE OR REPLACE VIEW public.post_like_counts AS
SELECT
  post_id,
  COUNT(*) as like_count
FROM public.post_likes
GROUP BY post_id;

-- Grant SELECT on like counts to everyone
GRANT SELECT ON public.post_like_counts TO authenticated, anon;

-- Add comment explaining the view's purpose
COMMENT ON VIEW public.post_like_counts IS 'Aggregate view of post likes showing only counts, not individual user data. Safe for public access.';

-- =============================================================================
-- Verification queries (commented out for production)
-- =============================================================================

-- Uncomment these to verify the policies are working correctly:

-- Test 1: Verify anonymous users cannot see user_id in anonymous posts
-- SET ROLE anon;
-- SELECT user_id FROM posts_safe WHERE is_anonymous = true;
-- Expected: All NULL values

-- Test 2: Verify anonymous users cannot access user_profiles directly
-- SET ROLE anon;
-- SELECT * FROM user_profiles;
-- Expected: ERROR - permission denied

-- Test 3: Verify users can only see their own likes
-- SET ROLE authenticated;
-- SELECT * FROM post_likes WHERE user_id != auth.uid();
-- Expected: No rows (or only own likes)

-- Test 4: Verify like counts are publicly accessible
-- SET ROLE anon;
-- SELECT * FROM post_like_counts;
-- Expected: Success with aggregate counts only
