-- Add main_area column to store the primary practice area
ALTER TABLE public.team_members ADD COLUMN main_area text;

-- Add published column to control visibility on public pages
ALTER TABLE public.team_members ADD COLUMN published boolean NOT NULL DEFAULT false;