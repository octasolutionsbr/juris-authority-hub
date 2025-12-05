import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface TranslateParams {
  memberId: string;
  title: string;
  bio: string;
  education?: string[];
  publications?: string[];
}

export const useTranslateTeamMember = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const queryClient = useQueryClient();

  const translateMember = async (params: TranslateParams) => {
    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke("translate-team-member", {
        body: params,
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-member", params.memberId] });

      toast.success("Tradução concluída com sucesso!");
      return data;
    } catch (error) {
      console.error("Translation error:", error);
      const message = error instanceof Error ? error.message : "Erro ao traduzir";
      toast.error(message);
      throw error;
    } finally {
      setIsTranslating(false);
    }
  };

  const translateAllMembers = async () => {
    setIsTranslating(true);
    try {
      // Fetch all team members
      const { data: members, error: fetchError } = await supabase
        .from("team_members")
        .select("*");

      if (fetchError) throw fetchError;

      if (!members || members.length === 0) {
        toast.info("Nenhum membro encontrado para traduzir");
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (const member of members) {
        try {
          await supabase.functions.invoke("translate-team-member", {
            body: {
              memberId: member.id,
              title: member.title,
              bio: member.bio,
              education: member.education,
              publications: member.publications,
            },
          });
          successCount++;
        } catch (err) {
          console.error(`Failed to translate member ${member.id}:`, err);
          errorCount++;
        }
      }

      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["team-members"] });

      if (errorCount === 0) {
        toast.success(`${successCount} perfis traduzidos com sucesso!`);
      } else {
        toast.warning(`${successCount} traduzidos, ${errorCount} falharam`);
      }
    } catch (error) {
      console.error("Batch translation error:", error);
      toast.error("Erro ao traduzir membros da equipe");
      throw error;
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    translateMember,
    translateAllMembers,
    isTranslating,
  };
};
