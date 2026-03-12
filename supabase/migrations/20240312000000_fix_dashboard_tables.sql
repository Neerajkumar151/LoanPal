-- Create loan_disbursements table
CREATE TABLE IF NOT EXISTS public.loan_disbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  loan_id UUID NOT NULL REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  sanction_letter_url TEXT,
  status TEXT DEFAULT 'transferred',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create loan_repayments table
CREATE TABLE IF NOT EXISTS public.loan_repayments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  loan_id UUID NOT NULL REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  amount_paid NUMERIC NOT NULL,
  razorpay_payment_id TEXT,
  status TEXT DEFAULT 'success',
  payment_date TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loan_disbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_repayments ENABLE ROW LEVEL SECURITY;

-- Policies for loan_disbursements
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'loan_disbursements' AND policyname = 'Users can view their own disbursements'
    ) THEN
        CREATE POLICY "Users can view their own disbursements" ON public.loan_disbursements
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Policies for loan_repayments
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'loan_repayments' AND policyname = 'Users can view their own repayments'
    ) THEN
        CREATE POLICY "Users can view their own repayments" ON public.loan_repayments
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Ensure profiles table has avatar_url
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'avatar_url'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
    END IF;
END
$$;

-- Profile trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END
$$;
