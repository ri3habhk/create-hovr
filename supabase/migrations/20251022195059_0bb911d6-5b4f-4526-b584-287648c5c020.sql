-- Add contact details columns to projects table
ALTER TABLE public.projects 
ADD COLUMN contact_email text,
ADD COLUMN contact_linkedin text,
ADD COLUMN contact_instagram text;

-- Update existing projects to have a placeholder email (will be updated by users)
UPDATE public.projects 
SET contact_email = 'update-required@placeholder.com'
WHERE contact_email IS NULL AND contact_linkedin IS NULL AND contact_instagram IS NULL;

-- Add check constraint to ensure at least one contact method is provided
ALTER TABLE public.projects
ADD CONSTRAINT at_least_one_contact CHECK (
  contact_email IS NOT NULL OR 
  contact_linkedin IS NOT NULL OR 
  contact_instagram IS NOT NULL
);

-- Update profiles RLS policy to allow clients to view creator profiles who claimed their projects
DROP POLICY IF EXISTS "Public can view creator profiles" ON public.profiles;

CREATE POLICY "Public can view creator profiles" 
ON public.profiles 
FOR SELECT 
USING (
  (auth.uid() = id) OR 
  (id IN (SELECT user_id FROM creator_portfolios WHERE is_published = true)) OR
  (id IN (
    SELECT creator_id 
    FROM project_claims 
    WHERE project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  ))
);