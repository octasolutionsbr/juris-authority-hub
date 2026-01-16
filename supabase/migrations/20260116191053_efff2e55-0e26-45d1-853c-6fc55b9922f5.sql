-- Drop the restrictive policies that are blocking regular users
DROP POLICY IF EXISTS "Users can update their own team member" ON public.team_members;
DROP POLICY IF EXISTS "Users can insert their own team member" ON public.team_members;
DROP POLICY IF EXISTS "Users can view their own team member" ON public.team_members;

-- Recreate them as PERMISSIVE (default) instead of RESTRICTIVE
CREATE POLICY "Users can update their own team member"
ON public.team_members
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert their own team member"
ON public.team_members
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own team member"
ON public.team_members
FOR SELECT
USING ((user_id = auth.uid()) OR (published = true));