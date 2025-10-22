-- Add new fields to creator_portfolios table
ALTER TABLE public.creator_portfolios
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS alias_name TEXT,
ADD COLUMN IF NOT EXISTS major_occupation TEXT,
ADD COLUMN IF NOT EXISTS minor_occupation TEXT,
ADD COLUMN IF NOT EXISTS budget_min NUMERIC,
ADD COLUMN IF NOT EXISTS budget_max NUMERIC;

-- Create ratings table for client reviews
CREATE TABLE IF NOT EXISTS public.creator_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(creator_id, client_id)
);

-- Enable RLS on ratings table
ALTER TABLE public.creator_ratings ENABLE ROW LEVEL SECURITY;

-- Anyone can view ratings
CREATE POLICY "Anyone can view ratings"
ON public.creator_ratings
FOR SELECT
TO anon, authenticated
USING (true);

-- Only clients can create ratings
CREATE POLICY "Clients can create ratings"
ON public.creator_ratings
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = client_id 
  AND public.has_role(auth.uid(), 'client'::app_role)
);

-- Clients can update their own ratings
CREATE POLICY "Clients can update own ratings"
ON public.creator_ratings
FOR UPDATE
TO authenticated
USING (auth.uid() = client_id)
WITH CHECK (auth.uid() = client_id);

-- Clients can delete their own ratings
CREATE POLICY "Clients can delete own ratings"
ON public.creator_ratings
FOR DELETE
TO authenticated
USING (auth.uid() = client_id);

-- Add trigger for updated_at
CREATE TRIGGER update_creator_ratings_updated_at
BEFORE UPDATE ON public.creator_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster rating queries
CREATE INDEX IF NOT EXISTS idx_creator_ratings_creator_id ON public.creator_ratings(creator_id);
CREATE INDEX IF NOT EXISTS idx_creator_ratings_client_id ON public.creator_ratings(client_id);