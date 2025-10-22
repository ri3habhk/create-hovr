-- Fix the redundant policies - keep only one comprehensive policy

-- Drop the redundant policy
DROP POLICY IF EXISTS "Users can view own complete profile" ON public.profiles;

-- Update the main policy to be clearer and more secure
DROP POLICY IF EXISTS "Users can view public profile data" ON public.profiles;

CREATE POLICY "Profiles visibility policy"
ON public.profiles
FOR SELECT
USING (
  -- Users can always see their own complete profile
  auth.uid() = id
  OR
  -- Others can only see profiles of published creators (without sensitive data)
  -- The application layer should filter out email and phone when displaying to others
  (id IN (SELECT user_id FROM public.creator_portfolios WHERE is_published = true))
);

-- Add a comment to remind developers
COMMENT ON POLICY "Profiles visibility policy" ON public.profiles IS 
'Users see their own full profile. Others only see published creator profiles. Application must filter email/phone for public view.';