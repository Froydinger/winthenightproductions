-- Insert admin role for j@froydinger.com
-- This ensures the user can access the admin dashboard

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'j@froydinger.com'
ON CONFLICT (user_id, role) DO NOTHING;
