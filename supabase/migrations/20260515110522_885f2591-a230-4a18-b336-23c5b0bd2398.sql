
-- 1. Supporters: hide Stripe IDs via column-level revoke (RLS still allows row read for safe columns)
REVOKE SELECT (stripe_customer_id, stripe_subscription_id) ON public.supporters FROM anon, authenticated;

-- 2. post-media bucket: scope INSERT to user folder
DROP POLICY IF EXISTS "Authenticated users can upload post media" ON storage.objects;
CREATE POLICY "Users can upload post media to own folder"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'post-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Add UPDATE policy for post-media
CREATE POLICY "Users can update their own post media"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'post-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'post-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 3. Public bucket listing: restrict storage.objects SELECT to authenticated only
-- (public URLs via getPublicUrl still work — they don't go through RLS)
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view post media" ON storage.objects;

CREATE POLICY "Authenticated can list avatars"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated can list post media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'post-media');

-- 4. Newsletter: replace always-true with basic email format check
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- 5. Lock down SECURITY DEFINER helper RPC execute privileges
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.strip_user_id_when_anonymous() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, authenticated, public;

-- 6. Set fixed search_path on email queue functions
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
