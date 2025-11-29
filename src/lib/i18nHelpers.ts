import { Tables } from "@/integrations/supabase/types";

type PracticeArea = Tables<"practice_areas"> | (Tables<"practice_areas"> & {
  title_en?: string | null;
  description_en?: string | null;
  long_description_en?: string | null;
  keywords_en?: string[] | null;
});

type TeamMember = Tables<"team_members"> | (Tables<"team_members"> & {
  title_en?: string | null;
  bio_en?: string | null;
  education_en?: string[] | null;
  publications_en?: string[] | null;
});

type Listing = Tables<"listings"> | (Tables<"listings"> & {
  title_en?: string | null;
  description_en?: string | null;
});

export const getTranslatedPracticeArea = (area: any, language: string) => {
  if (language === 'en') {
    return {
      ...area,
      title: area.title_en || area.title,
      description: area.description_en || area.description,
      long_description: area.long_description_en || area.long_description,
      keywords: area.keywords_en || area.keywords,
    };
  }
  return area;
};

export const getTranslatedTeamMember = (member: any, language: string) => {
  if (language === 'en') {
    return {
      ...member,
      title: member.title_en || member.title,
      bio: member.bio_en || member.bio,
      education: member.education_en || member.education,
      publications: member.publications_en || member.publications,
    };
  }
  return member;
};

export const getTranslatedListing = (listing: any, language: string) => {
  if (language === 'en') {
    return {
      ...listing,
      title: listing.title_en || listing.title,
      description: listing.description_en || listing.description,
    };
  }
  return listing;
};
