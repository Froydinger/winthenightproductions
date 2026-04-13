CREATE POLICY "Users can view own subscription"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (email = lower(auth.email()));