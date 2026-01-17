-- Tabela para registrar erros dos usuários
CREATE TABLE public.error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  user_email TEXT,
  user_name TEXT,
  error_message TEXT NOT NULL,
  error_details JSONB,
  error_source TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

-- Apenas técnicos podem visualizar os logs
CREATE POLICY "Tecnicos can view all error logs"
ON public.error_logs
FOR SELECT
USING (has_role(auth.uid(), 'tecnico'::app_role));

-- Qualquer usuário autenticado pode inserir logs de erro
CREATE POLICY "Authenticated users can insert error logs"
ON public.error_logs
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Apenas técnicos podem deletar logs
CREATE POLICY "Tecnicos can delete error logs"
ON public.error_logs
FOR DELETE
USING (has_role(auth.uid(), 'tecnico'::app_role));

-- Índice para consultas por data
CREATE INDEX idx_error_logs_created_at ON public.error_logs(created_at DESC);

-- Índice para consultas por usuário
CREATE INDEX idx_error_logs_user_id ON public.error_logs(user_id);