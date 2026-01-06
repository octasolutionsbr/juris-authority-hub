import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TeamMember } from './useTeamMembers';

// Get all team members (including unpublished) - admin only
export const useAllTeamMembers = () => {
  return useQuery({
    queryKey: ['all-team-members'],
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

// Get team members without user_id (unlinked profiles)
export const useUnlinkedTeamMembers = () => {
  return useQuery({
    queryKey: ['unlinked-team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .is('user_id', null)
        .order('name', { ascending: true });

      if (error) throw error;
      return data as TeamMember[];
    },
  });
};

// Get approved users without a linked team_member
export const useUnlinkedUsers = () => {
  return useQuery({
    queryKey: ['unlinked-users'],
    queryFn: async () => {
      // First get all team_members with user_id
      const { data: linkedMembers, error: membersError } = await supabase
        .from('team_members')
        .select('user_id')
        .not('user_id', 'is', null);

      if (membersError) throw membersError;

      const linkedUserIds = linkedMembers?.map(m => m.user_id).filter(Boolean) || [];

      // Get approved profiles not in the linked list
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('approved', true);

      if (linkedUserIds.length > 0) {
        query = query.not('id', 'in', `(${linkedUserIds.join(',')})`);
      }

      const { data, error } = await query.order('name', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
};

// Create team member (admin)
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberData: {
      name: string;
      title: string;
      bio: string;
      main_area?: string | null;
      areas?: string[] | null;
      email?: string | null;
      whatsapp?: string | null;
      education?: string[] | null;
      publications?: string[] | null;
      photo_url?: string | null;
      published?: boolean;
    }) => {
      // Generate unique ID
      const id = `team-${Date.now()}`;
      
      const { error } = await supabase
        .from('team_members')
        .insert({
          id,
          name: memberData.name,
          title: memberData.title || 'Advogado',
          bio: memberData.bio || '',
          role: 'advogado',
          main_area: memberData.main_area || null,
          areas: memberData.areas || null,
          email: memberData.email || null,
          whatsapp: memberData.whatsapp || null,
          education: memberData.education || null,
          publications: memberData.publications || null,
          photo_url: memberData.photo_url || null,
          published: memberData.published ?? false,
          order_index: 999,
          user_id: null, // Not linked to any user initially
        });

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

// Update team member (admin)
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      ...updates 
    }: Partial<TeamMember> & { id: string }) => {
      const { error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-member'] });
    },
  });
};

// Delete team member (admin)
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

// Link user to team member
export const useLinkUserToMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, userId }: { memberId: string; userId: string }) => {
      const { error } = await supabase
        .from('team_members')
        .update({ user_id: userId })
        .eq('id', memberId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-users'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};

// Unlink user from team member
export const useUnlinkUserFromMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: string) => {
      const { error } = await supabase
        .from('team_members')
        .update({ user_id: null })
        .eq('id', memberId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['unlinked-users'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });
};
