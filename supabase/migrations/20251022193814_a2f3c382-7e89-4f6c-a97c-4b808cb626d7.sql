-- Add company_name to projects table
ALTER TABLE public.projects ADD COLUMN company_name TEXT;

-- Add location_type enum and column
CREATE TYPE location_type AS ENUM ('onsite', 'remote');
ALTER TABLE public.projects ADD COLUMN location_type location_type NOT NULL DEFAULT 'onsite';

-- Change freelancer_type to array to support multiple selections
ALTER TABLE public.projects ALTER COLUMN freelancer_type TYPE TEXT[] USING ARRAY[freelancer_type];
ALTER TABLE public.projects ALTER COLUMN freelancer_type SET DEFAULT '{}';

-- Create project_claims table to track which creators claimed which projects
CREATE TABLE public.project_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, accepted, rejected
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  client_notes TEXT,
  UNIQUE(project_id, creator_id)
);

-- Enable RLS on project_claims
ALTER TABLE public.project_claims ENABLE ROW LEVEL SECURITY;

-- RLS policies for project_claims
CREATE POLICY "Creators can view their own claims"
  ON public.project_claims
  FOR SELECT
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can insert claims"
  ON public.project_claims
  FOR INSERT
  WITH CHECK (auth.uid() = creator_id AND has_role(auth.uid(), 'creator'));

CREATE POLICY "Clients can view claims on their projects"
  ON public.project_claims
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.projects WHERE id = project_id
    )
  );

CREATE POLICY "Clients can update claims on their projects"
  ON public.project_claims
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.projects WHERE id = project_id
    )
  );

-- Add trigger for updated_at on project_claims
CREATE TRIGGER update_project_claims_updated_at
  BEFORE UPDATE ON public.project_claims
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();