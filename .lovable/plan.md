# Migração Lovable Cloud → Supabase próprio (juriscompany.net)

## Status: 🟢 Backend novo está 100% pronto. Falta apenas o deploy/cutover.

### ✅ Concluído
- Schema replicado no novo projeto `ywaswanbgbjlbeuovtsc` (tabelas, enums, RLS, funções, triggers).
- 13 usuários `auth` importados com hashes bcrypt — logins existentes continuam funcionando.
- Dados migrados: app_settings (1), profiles (12), user_roles (2), team_members (10), practice_areas (12), listings (7).
- Storage: 76/76 arquivos copiados em `listing-images` e `team-photos`.
- Função `translate-team-member` refatorada para usar `OPENAI_API_KEY` (modelo `gpt-4o-mini`, response_format JSON).
- Função temporária `export-users` removida do código.
- `lovable-tagger` removido do `package.json` e `vite.config.ts`.
- `.env` e `supabase/config.toml` apontando para o novo projeto.
- Nenhuma referência textual a "lovable" no código-fonte.

### 🟡 Próximos passos (você executa no painel do novo Supabase)

1. **Authentication → URL Configuration**
   - Site URL: `https://juriscompany.net`
   - Redirect URLs: `https://juriscompany.net/**`, `https://admin.juriscompany.net/**`

2. **Edge Functions → Secrets** (adicionar no novo projeto):
   - `RESEND_API_KEY` (mesmo valor do antigo)
   - `OPENAI_API_KEY` (criar em https://platform.openai.com/api-keys)

3. **Edge Functions → Deploy**
   - Deployar `send-contact-email` e `translate-team-member` (código está em `supabase/functions/`).
   - Caminho mais fácil: instalar `supabase` CLI local, `supabase login`, `supabase link --project-ref ywaswanbgbjlbeuovtsc`, `supabase functions deploy`.

4. **Build & Upload na Hostinger**
   - Local: `npm install && npm run build`
   - Subir conteúdo de `dist/` para o `public_html` da Hostinger (substituindo o atual).
   - Manter o `.htaccess` de SPA routing (já existe em `public/.htaccess`).

5. **Verificação pós-cutover**
   - Login com usuário existente (senha antiga deve funcionar).
   - Listagens e fotos de equipe carregando.
   - Form de contato envia email.
   - Painel admin acessível em `admin.juriscompany.net`.

### ⚠️ Limpeza no projeto ANTIGO (depois que tudo estiver no ar pelo novo)
- Apagar a função SQL `public.export_user_password_hashes` (criada apenas para a migração).
- Pode pausar o projeto Lovable Cloud antigo.
