import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface ErrorLogParams {
  errorMessage: string;
  errorDetails?: Record<string, unknown>;
  errorSource: string;
}

/**
 * Registra um erro no banco de dados para visualização pelo técnico.
 * Esta função é silenciosa e não lança exceções.
 */
export async function logError(params: ErrorLogParams): Promise<void> {
  try {
    // Obter dados do usuário logado
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    // Obter nome do perfil se disponível
    let userName: string | null = null;
    if (user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .maybeSingle();
      userName = profile?.name || null;
    }

    // Inserir log de erro
    const { error } = await supabase.from('error_logs').insert([{
      user_id: user?.id || null,
      user_email: user?.email || null,
      user_name: userName,
      error_message: params.errorMessage,
      error_details: (params.errorDetails as Json) || null,
      error_source: params.errorSource,
      page_url: window.location.href,
    }]);

    if (error) {
      console.error("Falha ao registrar erro no log:", error);
    }
  } catch (e) {
    // Silencioso - não queremos que o logger cause mais problemas
    console.error("Erro ao tentar registrar log:", e);
  }
}

/**
 * Versão simplificada para capturar erros de Promise/catch
 */
export function logErrorFromCatch(
  error: unknown,
  errorSource: string,
  additionalContext?: Record<string, unknown>
): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorDetails: Record<string, unknown> = {
    ...additionalContext,
  };

  if (error instanceof Error) {
    errorDetails.stack = error.stack;
    errorDetails.name = error.name;
  }

  logError({
    errorMessage,
    errorDetails,
    errorSource,
  });
}
