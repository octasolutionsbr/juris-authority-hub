-- Drop existing update policy
DROP POLICY IF EXISTS "Admins can update app settings" ON public.app_settings;

-- Create new policy that allows both admin and tecnico to update app settings
CREATE POLICY "Admins and tecnicos can update app settings" 
ON public.app_settings 
FOR UPDATE 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'tecnico'::app_role)
);

-- Also add policy for tecnico to manage practice areas
DROP POLICY IF EXISTS "Admins can manage practice areas" ON public.practice_areas;

CREATE POLICY "Admins and tecnicos can manage practice areas" 
ON public.practice_areas 
FOR ALL 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'tecnico'::app_role)
);

-- Also add policy for tecnico to manage team members
DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;

CREATE POLICY "Admins and tecnicos can manage team members" 
ON public.team_members 
FOR ALL 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'tecnico'::app_role)
);