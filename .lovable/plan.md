
# Migração para Supabase Próprio (Zero Downtime, White-label)

Migração do backend atual (Lovable Cloud) para o seu novo projeto Supabase `ywaswanbgbjlbeuovtsc`, sem o cliente perceber e sem deixar rastros do Lovable.

## Estratégia geral

O site continua online no ar atual durante toda a migração. Só na última etapa (cutover) a build nova substitui a antiga na Hostinger. Como preservamos UUIDs e hashes de senha, **nenhum usuário precisa redefinir senha** e nada quebra.

```text
┌──────────────────┐       ┌──────────────────┐
│  Lovable Cloud   │  →→→  │ Supabase próprio │
│ (atual, no ar)   │ dump  │  ywaswanbgbj...  │
└──────────────────┘       └──────────────────┘
        ↑                          ↑
    Site live                Build nova só vai pra Hostinger no fim
```

## Etapas

### 1. Espelhar o schema no novo Supabase
Recriar no projeto novo, exatamente como está hoje:
- Tipos enum: `app_role`, `listing_status`, `listing_category`, `hearing_type`, `hearing_status`
- 8 tabelas: `profiles`, `user_roles`, `team_members`, `practice_areas`, `listings`, `hearings`, `app_settings`, `error_logs` (com todas as colunas atuais, incluindo `contact_whatsapp`, `long_description`, redes sociais, etc.)
- 33 políticas RLS idênticas
- Funções: `handle_new_user`, `has_role`, `update_updated_at_column`, `upsert_my_team_member_profile` (versão completa com redes sociais)
- Trigger `on_auth_user_created` em `auth.users`
- 2 buckets de storage públicos: `listing-images`, `team-photos` (com policies)

### 2. Migrar dados (preservando UUIDs)
- Dump de cada tabela do projeto atual via `pg_dump --data-only` e restore no novo
- Migração de usuários do `auth.users` via SQL direto no novo Supabase, copiando `id`, `email`, `encrypted_password` (bcrypt — senhas continuam valendo), `raw_user_meta_data`, `email_confirmed_at`
- Cópia dos arquivos dos buckets (download do antigo, upload no novo mantendo os caminhos para que as URLs nas tabelas continuem funcionando)

### 3. Edge Functions
Redeploy das 2 functions existentes no novo projeto:
- `send-contact-email` (usa `RESEND_API_KEY` — você adiciona no novo)
- `translate-team-member` → **reescrita para usar OpenAI direto** (você me passa a `OPENAI_API_KEY` depois). Remove qualquer referência a `LOVABLE_API_KEY` / `ai.gateway.lovable.dev`.

### 4. Configurar Auth
No painel do novo Supabase:
- Site URL: `https://juriscompany.net`
- Redirect URLs: `https://juriscompany.net/**`, `https://juriscompany.net/admin/reset-password`
- Email templates customizados (recuperação de senha em PT)
- Google OAuth: **não precisa** (só email/senha conforme você confirmou)

### 5. White-label do código
- Atualizar `.env` (local) com novas chaves: `VITE_SUPABASE_URL=https://ywaswanbgbjlbeuovtsc.supabase.co`, nova publishable key, novo project ID
- Regenerar `src/integrations/supabase/types.ts` apontando pro novo projeto
- Remover `lovable-tagger` do `package.json` e `vite.config.ts`
- Remover qualquer comentário/referência a Lovable no código
- Atualizar `supabase/config.toml` com novo `project_id`
- Remover `LOVABLE_API_KEY` da edge function de tradução (já vai pra OpenAI)

### 6. Cutover (substituir na Hostinger)
1. Build local: `npm install && npm run build`
2. Upload da pasta `dist/` na Hostinger via FTP/File Manager, substituindo a versão atual
3. Limpar cache do navegador e validar:
   - Login funciona com senhas antigas
   - Anúncios aparecem com imagens
   - Membros da equipe aparecem
   - Formulário de contato envia email
   - Reset de senha funciona

### 7. Validação final + decomissionamento
- Após 48h confirmando que tudo está estável no Supabase novo, o projeto Lovable Cloud antigo pode ser pausado/excluído.
- Você fica com Git limpo, hospedagem própria (Hostinger) e backend próprio (Supabase) — 100% independente.

## Detalhes técnicos

### Como vou executar tecnicamente
- Toda a etapa 1-3 acontece via scripts que conectam aos **dois bancos em paralelo** usando `psql` e a Service Role Key. Você já me passou as credenciais do novo. Para o atual, uso a `SUPABASE_DB_URL` que já está configurada como secret no Lovable Cloud.
- Os scripts ficam em `/tmp/` (não vão pro repositório).
- Para arquivos dos buckets, uso a Storage API do Supabase (download do antigo, upload no novo).

### O que você precisa fazer manualmente
1. **Adicionar `RESEND_API_KEY`** no novo Supabase (mesmo valor que está hoje — você tem acesso no Resend)
2. **Adicionar `OPENAI_API_KEY`** no novo Supabase (criar em https://platform.openai.com/api-keys)
3. **Configurar Site URL e Redirects** no painel Auth do novo Supabase
4. **Verificar domínio `juriscompany.net` no Resend** (se ainda não estiver — mantém o que já está hoje)
5. **Build e upload na Hostinger** no momento do cutover (eu te dou o passo-a-passo exato)

### Riscos e mitigações
- **Falha na cópia de auth.users**: Faço dry-run primeiro com 1 usuário de teste antes de migrar todos.
- **URLs de imagens quebradas**: Mantenho os mesmos paths nos buckets, então as URLs salvas em `listings.images` e `team_members.photo_url` continuam válidas (só muda o domínio base, que é refletido automaticamente pelo client gerado).
- **Cliente notar mudança**: Cutover é instantâneo (substituir `dist/`). Janela de "indisponibilidade" é de segundos.

### Arquivos que serão modificados
- `.env` (auto, ao trocar projeto)
- `src/integrations/supabase/types.ts` (auto-regenerado)
- `supabase/config.toml` (novo project_id)
- `supabase/functions/translate-team-member/index.ts` (OpenAI direto)
- `package.json` + `vite.config.ts` (remover lovable-tagger)
- Migrations novas em `supabase/migrations/` (schema completo no novo projeto)

## O que acontece após sua aprovação

Vou pedir aprovação para conectar ao novo Supabase e migrar — tudo numa sequência. Posso te avisar antes do cutover final pra você confirmar que está pronto pra publicar na Hostinger.

**Confirma para eu começar?**
