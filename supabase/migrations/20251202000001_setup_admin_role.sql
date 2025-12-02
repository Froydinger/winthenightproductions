-- Set up admin role for j@froydinger.com
-- This migration is idempotent and safe to run multiple times

-- Insert admin role for j@froydinger.com if the user exists and doesn't already have the role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'j@froydinger.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.users.id
    AND role = 'admin'::app_role
  );
