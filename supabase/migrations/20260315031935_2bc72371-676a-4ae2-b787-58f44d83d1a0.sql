CREATE TABLE public.supporters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  stripe_customer_id text NOT NULL,
  stripe_subscription_id text,
  display_name text NOT NULL DEFAULT 'Anonymous Supporter',
  tier text NOT NULL DEFAULT 'one_time',
  status text NOT NULL DEFAULT 'active',
  amount_cents integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  cancelled_at timestamptz
);

ALTER TABLE public.supporters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active supporters"
  ON public.supporters FOR SELECT
  TO public
  USING (status = 'active');

CREATE TRIGGER update_supporters_updated_at
  BEFORE UPDATE ON public.supporters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();