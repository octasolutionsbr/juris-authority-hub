-- =============================================
-- FIX: Resolver definitivamente o erro RLS em team_members
-- =============================================

-- 1) Dropar a policy RESTRICTIVE que está bloqueando usuários comuns
DROP POLICY IF EXISTS "Admins and tecnicos can manage team members" ON public.team_members;

-- 2) Recriar como PERMISSIVE (default) para não bloquear outros usuários
CREATE POLICY "Admins and tecnicos can manage team members"
ON public.team_members
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'tecnico'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'tecnico'::app_role));

-- 3) Dropar a policy pública que expõe todos os registros (inclusive não publicados)
DROP POLICY IF EXISTS "Anyone can view team members" ON public.team_members;

-- 4) Criar policy pública mais segura: só perfis publicados
CREATE POLICY "Anyone can view published team members"
ON public.team_members
FOR SELECT
USING (published = true);

-- 5) Garantir que as policies de usuário comum existem e estão corretas
-- (drop e recreate para evitar duplicatas)

DROP POLICY IF EXISTS "Users can insert their own team member" ON public.team_members;
CREATE POLICY "Users can insert their own team member"
ON public.team_members
FOR INSERT
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own team member" ON public.team_members;
CREATE POLICY "Users can update their own team member"
ON public.team_members
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view their own team member" ON public.team_members;
CREATE POLICY "Users can view their own team member"
ON public.team_members
FOR SELECT
USING (user_id = auth.uid());