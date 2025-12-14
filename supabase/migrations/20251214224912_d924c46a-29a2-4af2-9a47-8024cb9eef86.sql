-- Add columns for required documents and lawyer contact info
ALTER TABLE public.hearings 
ADD COLUMN IF NOT EXISTS required_documents text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS lawyer_phone text,
ADD COLUMN IF NOT EXISTS lawyer_email text;

-- Comment explaining the columns
COMMENT ON COLUMN public.hearings.required_documents IS 'List of documents the client should bring';
COMMENT ON COLUMN public.hearings.lawyer_phone IS 'Lawyer phone for client contact';
COMMENT ON COLUMN public.hearings.lawyer_email IS 'Lawyer email for client contact';

-- Create RLS policy for public access to shared hearings by token
CREATE POLICY "Anyone can view shared hearings by token"
ON public.hearings
FOR SELECT
USING (is_shared = true AND share_token IS NOT NULL);