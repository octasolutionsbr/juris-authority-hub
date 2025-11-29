-- Adicionar campos de tradução em inglês para practice_areas
ALTER TABLE practice_areas 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS long_description_en TEXT,
ADD COLUMN IF NOT EXISTS keywords_en TEXT[];

-- Adicionar campos de tradução em inglês para team_members
ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS bio_en TEXT,
ADD COLUMN IF NOT EXISTS education_en TEXT[],
ADD COLUMN IF NOT EXISTS publications_en TEXT[];

-- Adicionar campos de tradução em inglês para listings
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Comentários para documentação
COMMENT ON COLUMN practice_areas.title_en IS 'English translation of practice area title';
COMMENT ON COLUMN practice_areas.description_en IS 'English translation of practice area description';
COMMENT ON COLUMN practice_areas.long_description_en IS 'English translation of practice area long description';
COMMENT ON COLUMN practice_areas.keywords_en IS 'English translation of practice area keywords';

COMMENT ON COLUMN team_members.title_en IS 'English translation of member title/role';
COMMENT ON COLUMN team_members.bio_en IS 'English translation of member bio';
COMMENT ON COLUMN team_members.education_en IS 'English translation of member education';
COMMENT ON COLUMN team_members.publications_en IS 'English translation of member publications';

COMMENT ON COLUMN listings.title_en IS 'English translation of listing title';
COMMENT ON COLUMN listings.description_en IS 'English translation of listing description';