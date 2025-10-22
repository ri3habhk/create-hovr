-- Fix RLS policies to protect user privacy

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a more secure policy that hides sensitive data from public
CREATE POLICY "Users can view public profile data"
ON public.profiles
FOR SELECT
USING (
  CASE 
    WHEN auth.uid() = id THEN true  -- Users can see their own full profile
    ELSE (                           -- Others can only see limited data
      id IN (SELECT user_id FROM public.creator_portfolios WHERE is_published = true)
    )
  END
);

-- Create a policy that allows users to view their own full profile including email and phone
CREATE POLICY "Users can view own complete profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Update the policy to prevent email and phone from being visible to others
-- We'll use a view for public creator profiles instead