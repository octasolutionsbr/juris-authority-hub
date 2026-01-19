-- Remove a política atual muito permissiva
DROP POLICY IF EXISTS "Anyone can view available listings" ON public.listings;

-- Usuários podem ver seus próprios listings (para o painel admin)
CREATE POLICY "Users can view their own listings"
  ON public.listings FOR SELECT
  USING (auth.uid() = created_by);

-- Qualquer pessoa pode ver listings disponíveis (para a página pública)
CREATE POLICY "Anyone can view available listings publicly"
  ON public.listings FOR SELECT
  USING (status = 'available');

-- Admins podem ver todos os listings (SELECT específico, já existe um ALL mas vamos garantir)
CREATE POLICY "Admins can view all listings"
  ON public.listings FOR SELECT
  USING (has_role(auth.uid(), 'admin'));