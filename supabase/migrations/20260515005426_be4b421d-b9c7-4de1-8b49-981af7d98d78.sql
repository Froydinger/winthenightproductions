-- 1. Replace overly-permissive INSERT policies on posts and post_replies
DROP POLICY IF EXISTS "Authenticated users and admins can create posts" ON public.posts;
CREATE POLICY "Authenticated users can create posts"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND (
    (is_anonymous = true AND user_id IS NULL)
    OR (is_anonymous = false AND user_id = auth.uid())
  )
);

DROP POLICY IF EXISTS "Anyone can create replies" ON public.post_replies;
CREATE POLICY "Authenticated users can create replies"
ON public.post_replies
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND (
    (is_anonymous = true AND user_id IS NULL)
    OR (is_anonymous = false AND user_id = auth.uid())
  )
);

-- 2. Defense-in-depth trigger: always strip user_id when is_anonymous=true
CREATE OR REPLACE FUNCTION public.strip_user_id_when_anonymous()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_anonymous = true THEN
    NEW.user_id := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS posts_strip_user_id_when_anonymous ON public.posts;
CREATE TRIGGER posts_strip_user_id_when_anonymous
BEFORE INSERT OR UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.strip_user_id_when_anonymous();

DROP TRIGGER IF EXISTS post_replies_strip_user_id_when_anonymous ON public.post_replies;
CREATE TRIGGER post_replies_strip_user_id_when_anonymous
BEFORE INSERT OR UPDATE ON public.post_replies
FOR EACH ROW EXECUTE FUNCTION public.strip_user_id_when_anonymous();