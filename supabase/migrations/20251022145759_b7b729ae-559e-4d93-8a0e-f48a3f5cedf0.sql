-- Allow anyone (including unauthenticated users) to view published portfolios
-- This is necessary for the public "Find Creators" browse page

DROP POLICY IF EXISTS "Anyone can view published portfolios" ON public.creator_portfolios;

CREATE POLICY "Public can view published portfolios"
ON public.creator_portfolios
FOR SELECT
TO anon, authenticated
USING (is_published = true OR auth.uid() = user_id);

-- Also ensure profiles are visible for creators with published portfolios
-- This allows the join to work in the browse page
DROP POLICY IF EXISTS "Profiles visibility policy" ON public.profiles;

CREATE POLICY "Public can view creator profiles"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (
  auth.uid() = id 
  OR id IN (
    SELECT user_id 
    FROM public.creator_portfolios 
    WHERE is_published = true
  )
);