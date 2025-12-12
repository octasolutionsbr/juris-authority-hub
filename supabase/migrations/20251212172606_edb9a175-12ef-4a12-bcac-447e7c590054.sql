-- Remove a constraint de role que limita a 'socio' e 'associado'
ALTER TABLE public.team_members 
DROP CONSTRAINT IF EXISTS team_members_role_check;

-- Atualizar todos os membros existentes para 'advogado' (valor padrão sem hierarquia)
UPDATE public.team_members SET role = 'advogado' WHERE role IN ('socio', 'associado');