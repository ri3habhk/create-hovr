-- Strengthen role-based authorization and prevent self-escalation to admin
-- 1) Restrict self-service role assignment to only 'client' and 'creator'
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;

CREATE POLICY "Users can self-assign client or creator"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND role IN ('client'::app_role, 'creator'::app_role)
);

-- Allow admins to fully manage roles (insert/update/delete/select)
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 2) Enforce that only clients can create/update/delete projects
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

CREATE POLICY "Clients can create projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.has_role(auth.uid(), 'client'::app_role)
);

CREATE POLICY "Clients can update own projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND public.has_role(auth.uid(), 'client'::app_role)
);

CREATE POLICY "Clients can delete own projects"
ON public.projects
FOR DELETE
TO authenticated
USING (
  auth.uid() = user_id
  AND public.has_role(auth.uid(), 'client'::app_role)
);
