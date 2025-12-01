-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view likes" ON public.post_likes;

-- Create a restricted policy: users can only see their own likes
CREATE POLICY "Users can view their own likes" 
ON public.post_likes 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow viewing like counts without exposing user_id
-- This is handled in the application layer by counting without selecting user_id