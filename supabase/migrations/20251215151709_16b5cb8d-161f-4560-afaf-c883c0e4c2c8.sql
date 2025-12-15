-- Add new fields to listings table for detailed view
ALTER TABLE public.listings
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS area numeric,
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS long_description text,
ADD COLUMN IF NOT EXISTS location_en text,
ADD COLUMN IF NOT EXISTS features_en text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS long_description_en text;