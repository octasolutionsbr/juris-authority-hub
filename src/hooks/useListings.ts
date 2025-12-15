import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type ListingCategory = 'imoveis' | 'precatorios' | 'creditos' | 'outros';
type ListingStatus = 'available' | 'pending' | 'sold';

export interface Listing {
  id: string;
  title: string;
  title_en: string | null;
  description: string;
  description_en: string | null;
  category: ListingCategory;
  price: number | null;
  status: ListingStatus;
  images: string[] | null;
  location: string | null;
  location_en: string | null;
  area: number | null;
  features: string[] | null;
  features_en: string[] | null;
  long_description: string | null;
  long_description_en: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data as Listing[];
    },
  });
};

export const useListing = (id: string | undefined) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      
      return data as Listing | null;
    },
    enabled: !!id,
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (listing: {
      category: ListingCategory;
      title: string;
      description: string;
      price?: number | null;
      status?: ListingStatus;
      images?: string[] | null;
      title_en?: string | null;
      description_en?: string | null;
      location?: string | null;
      location_en?: string | null;
      area?: number | null;
      features?: string[] | null;
      features_en?: string[] | null;
      long_description?: string | null;
      long_description_en?: string | null;
    }) => {
      const { data, error } = await supabase
        .from('listings')
        .insert({
          ...listing,
          created_by: user!.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Listing> & { id: string }) => {
      const { data, error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing', variables.id] });
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};
