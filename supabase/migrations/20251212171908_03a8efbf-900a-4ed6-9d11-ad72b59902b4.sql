-- Add user_id column to team_members to link with authenticated users
ALTER TABLE public.team_members 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);

-- Add unique constraint so each user can only have one team_member profile
ALTER TABLE public.team_members 
ADD CONSTRAINT unique_user_id UNIQUE (user_id);

-- RLS policy: Users can view their own team member record
CREATE POLICY "Users can view their own team member"
ON public.team_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR published = true);

-- RLS policy: Users can update their own team member record
CREATE POLICY "Users can update their own team member"
ON public.team_members
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- RLS policy: Users can insert their own team member record
CREATE POLICY "Users can insert their own team member"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());