-- Temporary helper function to export auth user data including bcrypt password hashes
-- This is used during migration to a new backend; will be dropped after.
CREATE OR REPLACE FUNCTION public.export_user_password_hashes()
RETURNS TABLE (
  id uuid,
  email text,
  encrypted_password text,
  email_confirmed_at timestamptz,
  raw_user_meta_data jsonb,
  raw_app_meta_data jsonb,
  created_at timestamptz,
  phone text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = auth, public
AS $$
  SELECT id, email, encrypted_password, email_confirmed_at,
         raw_user_meta_data, raw_app_meta_data, created_at, phone
  FROM auth.users;
$$;

-- Restrict execution to service_role only (so anon/authenticated cannot call it)
REVOKE ALL ON FUNCTION public.export_user_password_hashes() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.export_user_password_hashes() TO service_role;