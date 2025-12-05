-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true);

-- Allow anyone to view listing images
CREATE POLICY "Anyone can view listing images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'listing-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload listing images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'listing-images' AND auth.uid() IS NOT NULL);

-- Allow users to delete their own uploaded images
CREATE POLICY "Users can delete their own listing images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'listing-images' AND auth.uid() IS NOT NULL);