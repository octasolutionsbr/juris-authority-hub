import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HearingType, HearingStatus } from '@/types/hearing';

export interface PublicHearing {
  id: string;
  clientName: string;
  caseNumber: string;
  court: string;
  type: HearingType;
  dateTime: Date;
  location: string;
  description: string;
  notes: string | null;
  status: HearingStatus;
  lawyerName: string;
  lawyerPhone: string | null;
  lawyerEmail: string | null;
  requiredDocuments: string[];
}

export const usePublicHearing = (token: string | undefined) => {
  return useQuery({
    queryKey: ['public-hearing', token],
    queryFn: async () => {
      if (!token) throw new Error('Token não fornecido');

      // Fetch hearing by share_token
      const { data: hearing, error } = await supabase
        .from('hearings')
        .select(`
          id,
          client_name,
          case_number,
          court,
          type,
          date_time,
          location,
          description,
          notes,
          status,
          lawyer_id,
          lawyer_phone,
          lawyer_email,
          required_documents
        `)
        .eq('share_token', token)
        .eq('is_shared', true)
        .single();

      if (error) {
        console.error('Error fetching hearing:', error);
        throw new Error('Audiência não encontrada ou link inválido');
      }

      // Fetch lawyer info from team_members
      const { data: lawyer } = await supabase
        .from('team_members')
        .select('name, email, whatsapp')
        .eq('user_id', hearing.lawyer_id)
        .single();

      return {
        id: hearing.id,
        clientName: hearing.client_name,
        caseNumber: hearing.case_number,
        court: hearing.court,
        type: hearing.type as HearingType,
        dateTime: new Date(hearing.date_time),
        location: hearing.location,
        description: hearing.description,
        notes: hearing.notes,
        status: hearing.status as HearingStatus,
        lawyerName: lawyer?.name || 'Advogado Responsável',
        lawyerPhone: hearing.lawyer_phone || lawyer?.whatsapp || null,
        lawyerEmail: hearing.lawyer_email || lawyer?.email || null,
        requiredDocuments: hearing.required_documents || [],
      } as PublicHearing;
    },
    enabled: !!token,
    retry: false,
  });
};
