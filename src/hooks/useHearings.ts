import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { HearingType, HearingStatus } from '@/types/hearing';

export interface Hearing {
  id: string;
  client_name: string;
  client_email: string;
  case_number: string;
  court: string;
  type: HearingType;
  date_time: string;
  location: string;
  description: string;
  notes: string | null;
  status: HearingStatus;
  is_shared: boolean;
  share_token: string | null;
  lawyer_id: string;
  created_at: string;
  updated_at: string;
}

export const useHearings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['hearings', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hearings')
        .select('*')
        .order('date_time', { ascending: false });

      if (error) throw error;
      
      return data as Hearing[];
    },
    enabled: !!user,
  });
};

export const useCreateHearing = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (hearing: Omit<Hearing, 'id' | 'created_at' | 'updated_at' | 'lawyer_id'>) => {
      const { data, error } = await supabase
        .from('hearings')
        .insert({
          ...hearing,
          lawyer_id: user!.id,
          share_token: hearing.is_shared ? Math.random().toString(36).substring(7) : null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hearings'] });
    },
  });
};

export const useUpdateHearing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Hearing> & { id: string }) => {
      const { data, error } = await supabase
        .from('hearings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hearings'] });
    },
  });
};

export const useDeleteHearing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hearings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hearings'] });
    },
  });
};
