import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PracticeArea {
  id: string;
  title: string;
  icon: string;
  description: string;
  long_description: string | null;
  keywords: string[] | null;
  order_index: number;
}

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
