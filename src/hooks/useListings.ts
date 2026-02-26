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
  contact_whatsapp?: string | null;
  creator_email?: string | null;
  creator_whatsapp?: string | null;
}

export const useListings = (options?: { 
  status?: ListingStatus; 
  category?: ListingCategory;
  myListingsOnly?: boolean;
}) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['listings', options?.status, options?.category, options?.myListingsOnly, user?.id],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select('*');

      // Filtrar apenas listings do usuário atual
      if (options?.myListingsOnly && user) {
        query = query.eq('created_by', user.id);
      }

      if (options?.status) {
        query = query.eq('status', options.status);
      }
      if (options?.category) {
        query = query.eq('category', options.category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      const listings = data as Listing[];
      
      // Fetch creator emails from team_members
      const creatorIds = [...new Set(listings.map(l => l.created_by))];
      if (creatorIds.length > 0) {
        const { data: members } = await supabase
          .from('team_members')
          .select('user_id, email, whatsapp')
          .in('user_id', creatorIds);
        
        if (members) {
          const emailMap = new Map(members.map(m => [m.user_id, m.email]));
          const whatsappMap = new Map(members.map(m => [m.user_id, m.whatsapp]));
          listings.forEach(l => {
            l.creator_email = emailMap.get(l.created_by) || null;
            l.creator_whatsapp = whatsappMap.get(l.created_by) || null;
          });
        }
      }
      
      return listings;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
};

export const useAvailableListingsByCategory = (category: ListingCategory) => {
  return useQuery({
    queryKey: ['listings', 'available', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'available')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const listings = data as Listing[];
      
      // Fetch creator info from team_members
      const creatorIds = [...new Set(listings.map(l => l.created_by))];
      if (creatorIds.length > 0) {
        const { data: members } = await supabase
          .from('team_members')
          .select('user_id, email, whatsapp')
          .in('user_id', creatorIds);
        
        if (members) {
          const emailMap = new Map(members.map(m => [m.user_id, m.email]));
          const whatsappMap = new Map(members.map(m => [m.user_id, m.whatsapp]));
          listings.forEach(l => {
            l.creator_email = emailMap.get(l.created_by) || null;
            l.creator_whatsapp = whatsappMap.get(l.created_by) || null;
          });
        }
      }
      
      return listings;
    },
    staleTime: 1000 * 60 * 5,
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
      
      if (!data) return null;
      
      const listing = data as Listing;
      
      // Fetch creator info from team_members
      const { data: member } = await supabase
        .from('team_members')
        .select('email, whatsapp')
        .eq('user_id', listing.created_by)
        .maybeSingle();
      
      listing.creator_email = member?.email || null;
      listing.creator_whatsapp = member?.whatsapp || null;
      
      return listing;
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
