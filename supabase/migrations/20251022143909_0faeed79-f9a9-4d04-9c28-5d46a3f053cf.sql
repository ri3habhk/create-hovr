-- Update storage policies to check publication status for portfolio files

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view portfolio files" ON storage.objects;

-- Create a smarter policy that checks publication status
CREATE POLICY "Public can view published portfolio files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'portfolios' AND (
      -- Allow if creator's portfolio is published
      EXISTS (
        SELECT 1 FROM public.creator_portfolios
        WHERE user_id::text = (storage.foldername(name))[1]
        AND is_published = true
      )
      -- Or if viewing own files
      OR auth.uid()::text = (storage.foldername(name))[1]
    )
  );

-- Add database constraints for input validation
ALTER TABLE public.projects 
  DROP CONSTRAINT IF EXISTS project_name_length,
  DROP CONSTRAINT IF EXISTS description_length,
  DROP CONSTRAINT IF EXISTS tags_limit;

ALTER TABLE public.projects 
  ADD CONSTRAINT project_name_length CHECK (length(project_name) >= 3 AND length(project_name) <= 100),
  ADD CONSTRAINT description_length CHECK (length(description) >= 20 AND length(description) <= 2000),
  ADD CONSTRAINT tags_limit CHECK (array_length(tags, 1) IS NULL OR array_length(tags, 1) <= 10);

ALTER TABLE public.creator_portfolios
  DROP CONSTRAINT IF EXISTS portfolio_title_length,
  DROP CONSTRAINT IF EXISTS portfolio_bio_length;

ALTER TABLE public.creator_portfolios
  ADD CONSTRAINT portfolio_title_length CHECK (length(title) >= 3 AND length(title) <= 100),
  ADD CONSTRAINT portfolio_bio_length CHECK (bio IS NULL OR length(bio) <= 2000);