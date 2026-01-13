import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AppSettings {
  id: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  updated_at: string;
}

export function useMaintenanceMode() {
  return useQuery({
    queryKey: ["app-settings", "maintenance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .eq("id", "main")
        .single();

      if (error) {
        console.error("Error fetching maintenance mode:", error);
        return { maintenance_mode: false, maintenance_message: "" };
      }

      return data as AppSettings;
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}
