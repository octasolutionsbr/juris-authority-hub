import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ErrorLog {
  id: string;
  user_id: string | null;
  user_email: string | null;
  user_name: string | null;
  error_message: string;
  error_details: Record<string, unknown> | null;
  error_source: string | null;
  page_url: string | null;
  created_at: string;
}

export function useErrorLogs() {
  const queryClient = useQueryClient();

  const {
    data: errorLogs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["error-logs"],
    queryFn: async (): Promise<ErrorLog[]> => {
      const { data, error } = await supabase
        .from("error_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);

      if (error) throw error;
      return (data as ErrorLog[]) || [];
    },
  });

  const deleteOldLogsMutation = useMutation({
    mutationFn: async (daysOld: number) => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const { error } = await supabase
        .from("error_logs")
        .delete()
        .lt("created_at", cutoffDate.toISOString());

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["error-logs"] });
    },
  });

  const deleteLogMutation = useMutation({
    mutationFn: async (logId: string) => {
      const { error } = await supabase
        .from("error_logs")
        .delete()
        .eq("id", logId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["error-logs"] });
    },
  });

  // Contar erros das últimas 24 horas
  const recentErrorCount = errorLogs.filter((log) => {
    const logDate = new Date(log.created_at);
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return logDate > oneDayAgo;
  }).length;

  return {
    errorLogs,
    isLoading,
    error,
    refetch,
    recentErrorCount,
    deleteOldLogs: deleteOldLogsMutation.mutate,
    deleteLog: deleteLogMutation.mutate,
    isDeletingOld: deleteOldLogsMutation.isPending,
    isDeletingLog: deleteLogMutation.isPending,
  };
}
