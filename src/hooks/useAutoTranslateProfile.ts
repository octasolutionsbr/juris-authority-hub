import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  bio_en?: string | null;
  education?: string[] | null;
  publications?: string[] | null;
  published: boolean;
}

interface TranslationState {
  isTranslating: boolean;
  translatingIds: Set<string>;
}

// Global state to track translations in progress across all components
const globalTranslationState: TranslationState = {
  isTranslating: false,
  translatingIds: new Set(),
};

export function useAutoTranslateProfile(members: TeamMember[] | undefined) {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const hasTriggeredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Only translate when language is English
    if (i18n.language !== "en" || !members || members.length === 0) {
      return;
    }

    // Find members that need translation (no bio_en)
    const needsTranslation = members.filter(
      (member) =>
        member.published &&
        !member.bio_en &&
        member.bio &&
        !globalTranslationState.translatingIds.has(member.id) &&
        !hasTriggeredRef.current.has(member.id)
    );

    if (needsTranslation.length === 0) return;

    // Translate each member that needs it
    const translateMembers = async () => {
      for (const member of needsTranslation) {
        // Mark as being translated
        globalTranslationState.translatingIds.add(member.id);
        hasTriggeredRef.current.add(member.id);

        try {
          console.log(`Auto-translating profile: ${member.name}`);
          
          const { data, error } = await supabase.functions.invoke("translate-team-member", {
            body: {
              memberId: member.id,
              title: member.title,
              bio: member.bio,
              education: member.education,
              publications: member.publications,
            },
          });

          if (error) {
            console.error(`Translation error for ${member.name}:`, error);
          } else {
            console.log(`Translation complete for ${member.name}`);
            // Invalidate the cache to refresh data
            queryClient.invalidateQueries({ queryKey: ["team-members"] });
            queryClient.invalidateQueries({ queryKey: ["team-member", member.id] });
          }
        } catch (err) {
          console.error(`Translation failed for ${member.name}:`, err);
        } finally {
          globalTranslationState.translatingIds.delete(member.id);
        }
      }
    };

    translateMembers();
  }, [i18n.language, members, queryClient]);
}

export function useAutoTranslateSingleProfile(member: TeamMember | undefined) {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Only translate when language is English
    if (i18n.language !== "en" || !member) {
      return;
    }

    // Check if translation is needed
    const needsTranslation =
      member.published &&
      !member.bio_en &&
      member.bio &&
      !globalTranslationState.translatingIds.has(member.id) &&
      !hasTriggeredRef.current;

    if (!needsTranslation) return;

    // Mark as being translated
    globalTranslationState.translatingIds.add(member.id);
    hasTriggeredRef.current = true;

    const translateMember = async () => {
      try {
        console.log(`Auto-translating profile: ${member.name}`);
        
        const { data, error } = await supabase.functions.invoke("translate-team-member", {
          body: {
            memberId: member.id,
            title: member.title,
            bio: member.bio,
            education: member.education,
            publications: member.publications,
          },
        });

        if (error) {
          console.error(`Translation error for ${member.name}:`, error);
        } else {
          console.log(`Translation complete for ${member.name}`);
          // Invalidate the cache to refresh data
          queryClient.invalidateQueries({ queryKey: ["team-members"] });
          queryClient.invalidateQueries({ queryKey: ["team-member", member.id] });
        }
      } catch (err) {
        console.error(`Translation failed for ${member.name}:`, err);
      } finally {
        globalTranslationState.translatingIds.delete(member.id);
      }
    };

    translateMember();
  }, [i18n.language, member, queryClient]);
}
