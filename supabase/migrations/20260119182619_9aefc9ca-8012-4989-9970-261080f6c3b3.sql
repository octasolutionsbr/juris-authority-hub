-- Add social media and website columns to team_members table
ALTER TABLE public.team_members 
ADD COLUMN IF NOT EXISTS linkedin TEXT,
ADD COLUMN IF NOT EXISTS instagram TEXT,
ADD COLUMN IF NOT EXISTS facebook TEXT,
ADD COLUMN IF NOT EXISTS twitter TEXT,
ADD COLUMN IF NOT EXISTS youtube TEXT,
ADD COLUMN IF NOT EXISTS website TEXT;

-- Update the RPC function to include social media fields
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
  p_published BOOLEAN DEFAULT FALSE,
  p_linkedin TEXT DEFAULT NULL,
  p_instagram TEXT DEFAULT NULL,
  p_facebook TEXT DEFAULT NULL,
  p_twitter TEXT DEFAULT NULL,
  p_youtube TEXT DEFAULT NULL,
  p_website TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_member_id TEXT;
  v_result JSON;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  -- Check if team member exists for this user
  SELECT id INTO v_member_id
  FROM team_members
  WHERE user_id = v_user_id;

  IF v_member_id IS NOT NULL THEN
    -- Update existing record
    UPDATE team_members
    SET 
      name = p_name,
      bio = p_bio,
      main_area = p_main_area,
      areas = p_areas,
      email = p_email,
      whatsapp = p_whatsapp,
      education = p_education,
      publications = p_publications,
      photo_url = p_photo_url,
      published = p_published,
      linkedin = p_linkedin,
      instagram = p_instagram,
      facebook = p_facebook,
      twitter = p_twitter,
      youtube = p_youtube,
      website = p_website
    WHERE id = v_member_id;
    
    v_result := json_build_object('action', 'updated', 'id', v_member_id);
  ELSE
    -- Create new record with a generated ID
    v_member_id := 'member-' || gen_random_uuid()::text;
    
    INSERT INTO team_members (
      id, user_id, name, role, title, bio, main_area, areas, 
      email, whatsapp, education, publications, photo_url, published,
      linkedin, instagram, facebook, twitter, youtube, website
    )
    VALUES (
      v_member_id, v_user_id, p_name, 'lawyer', 'Advogado', p_bio, 
      p_main_area, p_areas, p_email, p_whatsapp, p_education, 
      p_publications, p_photo_url, p_published,
      p_linkedin, p_instagram, p_facebook, p_twitter, p_youtube, p_website
    );
    
    v_result := json_build_object('action', 'created', 'id', v_member_id);
  END IF;

  RETURN v_result;
END;
$$;