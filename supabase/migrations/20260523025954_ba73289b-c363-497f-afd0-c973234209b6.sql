CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

GRANT USAGE ON SCHEMA private TO authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;

ALTER POLICY "Admins can insert broadcasts"
ON public.broadcast_emails
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can update broadcasts"
ON public.broadcast_emails
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can view broadcasts"
ON public.broadcast_emails
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can update subscribers"
ON public.newsletter_subscribers
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can view all subscribers"
ON public.newsletter_subscribers
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Users and admins can delete their own replies"
ON public.post_replies
USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Users and admins can delete their own posts"
ON public.posts
USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can insert system settings"
ON public.system_settings
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can update system settings"
ON public.system_settings
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins can view all roles"
ON public.user_roles
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Only admins can delete roles"
ON public.user_roles
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Only admins can insert roles"
ON public.user_roles
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Only admins can update roles"
ON public.user_roles
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Only admins can update watch settings"
ON public.watch_settings
USING (private.has_role(auth.uid(), 'admin'::public.app_role));