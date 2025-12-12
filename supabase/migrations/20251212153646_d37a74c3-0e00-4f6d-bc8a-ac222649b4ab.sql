-- Create storage bucket for team member photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-photos', 'team-photos', true);

-- Allow anyone to view team photos (public bucket)
CREATE POLICY "Anyone can view team photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

-- Allow admins to upload team photos
CREATE POLICY "Admins can upload team photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'team-photos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update team photos
CREATE POLICY "Admins can update team photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'team-photos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete team photos
CREATE POLICY "Admins can delete team photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'team-photos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Add photo_url column to store the full URL of uploaded photos
ALTER TABLE public.team_members ADD COLUMN photo_url text;