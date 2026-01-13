import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  email: string;
  name: string;
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data as Profile[];
    },
  });
};

export const usePendingProfiles = () => {
  return useQuery({
    queryKey: ['profiles', 'pending'],
    queryFn: async () => {
      // First get tecnico user IDs to exclude them
      const { data: tecnicoRoles } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'tecnico');

      const tecnicoIds = tecnicoRoles?.map(r => r.user_id) || [];

      let query = supabase
        .from('profiles')
        .select('*')
        .eq('approved', false)
        .order('created_at', { ascending: false });

      // Exclude tecnico users
      if (tecnicoIds.length > 0) {
        query = query.not('id', 'in', `(${tecnicoIds.join(',')})`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return data as Profile[];
    },
  });
};

export const useApprovedProfiles = () => {
  return useQuery({
    queryKey: ['profiles', 'approved'],
    queryFn: async () => {
      // First get tecnico user IDs to exclude them
      const { data: tecnicoRoles } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'tecnico');

      const tecnicoIds = tecnicoRoles?.map(r => r.user_id) || [];

      let query = supabase
        .from('profiles')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      // Exclude tecnico users
      if (tecnicoIds.length > 0) {
        query = query.not('id', 'in', `(${tecnicoIds.join(',')})`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return data as Profile[];
    },
  });
};

export const useApproveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ approved: true })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useRejectUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      // For now, we'll just delete the profile
      // In a real app, you might want to keep a record of rejected users
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useUserRoles = (userId: string) => {
  return useQuery({
    queryKey: ['user_roles', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) throw error;
      
      return data.map(r => r.role);
    },
    enabled: !!userId,
  });
};

export const useAddUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'lawyer' | 'tecnico' }) => {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user_roles', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useRemoveUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'lawyer' | 'tecnico' }) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user_roles', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ approved: false })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      // First delete user roles
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Then delete profile
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};
