import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type PracticeArea = Tables<'practice_areas'>;

export const usePracticeAreas = () => {
  return useQuery({
    queryKey: ['practice-areas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('practice_areas')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      return data as PracticeArea[];
    },
  });
};

export const usePracticeArea = (id: string) => {
  return useQuery({
    queryKey: ['practice-area', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('practice_areas')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      
      return data as PracticeArea | null;
    },
    enabled: !!id,
  });
};
