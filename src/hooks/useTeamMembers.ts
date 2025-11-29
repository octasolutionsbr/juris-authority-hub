import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  areas: string[] | null;
  bio: string;
  photo: string | null;
  email: string | null;
  whatsapp: string | null;
  publications: string[] | null;
  education: string[] | null;
  order_index: number;
}

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      return data as TeamMember[];
    },
  });
};

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['team-member', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      
      return data as TeamMember | null;
    },
    enabled: !!id,
  });
};
