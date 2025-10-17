-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('client', 'creator', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create creator_portfolios table
CREATE TABLE public.creator_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  title TEXT NOT NULL,
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  hourly_rate NUMERIC,
  location TEXT,
  portfolio_files TEXT[] DEFAULT '{}',
  experience_years INTEGER,
  categories TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_portfolios ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Creator portfolios policies
CREATE POLICY "Anyone can view published portfolios"
  ON public.creator_portfolios FOR SELECT
  USING (is_published = true OR auth.uid() = user_id);

CREATE POLICY "Creators can insert own portfolio"
  ON public.creator_portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'creator'));

CREATE POLICY "Creators can update own portfolio"
  ON public.creator_portfolios FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Creators can delete own portfolio"
  ON public.creator_portfolios FOR DELETE
  USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_creator_portfolios_updated_at
  BEFORE UPDATE ON public.creator_portfolios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for portfolios
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolios', 'portfolios', true);

-- Storage policies for portfolios
CREATE POLICY "Anyone can view portfolio files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolios');

CREATE POLICY "Creators can upload portfolio files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'portfolios' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Creators can update own portfolio files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'portfolios' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Creators can delete own portfolio files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'portfolios' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );