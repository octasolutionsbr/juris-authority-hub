-- =============================================
-- Função RPC SECURITY DEFINER para upsert de perfil
-- Resolve definitivamente erros RLS ao editar perfil
-- =============================================

CREATE OR REPLACE FUNCTION public.upsert_my_team_member_profile(
  p_name TEXT,
  p_bio TEXT,
  p_main_area TEXT DEFAULT NULL,
  p_areas TEXT[] DEFAULT NULL,
  p_email TEXT DEFAULT NULL,
  p_whatsapp TEXT DEFAULT NULL,
  p_education TEXT[] DEFAULT NULL,
  p_publications TEXT[] DEFAULT NULL,
  p_photo_url TEXT DEFAULT NULL,
  p_published BOOLEAN DEFAULT false
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_member_id TEXT;
  v_result json;
BEGIN
  -- Obter o user_id do usuário autenticado
  v_user_id := auth.uid();
  
  -- Verificar se o usuário está autenticado
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado. Faça login novamente.';
  END IF;
  
  -- Gerar o ID do membro baseado no user_id
  v_member_id := 'lawyer-' || v_user_id::text;
  
  -- Fazer UPSERT: inserir se não existir, atualizar se existir
  INSERT INTO public.team_members (
    id,
    user_id,
    name,
    bio,
    main_area,
    areas,
    email,
    whatsapp,
    education,
    publications,
    photo_url,
    published,
    role,
    title,
    order_index
  ) VALUES (
    v_member_id,
    v_user_id,
    p_name,
    p_bio,
    p_main_area,
    p_areas,
    p_email,
    p_whatsapp,
    p_education,
    p_publications,
    p_photo_url,
    p_published,
    'advogado',
    'Advogado',
    999
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    main_area = EXCLUDED.main_area,
    areas = EXCLUDED.areas,
    email = EXCLUDED.email,
    whatsapp = EXCLUDED.whatsapp,
    education = EXCLUDED.education,
    publications = EXCLUDED.publications,
    photo_url = COALESCE(EXCLUDED.photo_url, team_members.photo_url),
    published = EXCLUDED.published,
    updated_at = now()
  WHERE team_members.user_id = v_user_id;
  
  -- Retornar o registro atualizado
  SELECT row_to_json(t) INTO v_result
  FROM (
    SELECT id, user_id, name, bio, main_area, areas, email, whatsapp, 
           education, publications, photo_url, published, created_at
    FROM public.team_members
    WHERE id = v_member_id
  ) t;
  
  RETURN v_result;
END;
$$;

-- Garantir que apenas usuários autenticados podem chamar a função
REVOKE ALL ON FUNCTION public.upsert_my_team_member_profile FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_my_team_member_profile TO authenticated;