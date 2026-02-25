

# Corrigir Recuperacao de Senha para Dominio Proprio

## Problema Identificado

O codigo em `Login.tsx` usa `window.location.origin` para montar a URL de redirecionamento, o que esta correto no lado do frontend. Porem, o problema real esta na **configuracao do backend de autenticacao**: a URL do site (Site URL) esta configurada para o dominio do Lovable, nao para `juriscompany.net`. Quando o usuario solicita recuperacao de senha, o email enviado pelo backend contem o link de redirecionamento baseado nessa configuracao, expondo a URL do Lovable.

## Solucao

### 1. Atualizar a configuracao de autenticacao do backend

Alterar a "Site URL" no sistema de autenticacao para `https://juriscompany.net` e adicionar `https://juriscompany.net/admin/reset-password` como URL de redirecionamento permitida. Isso garante que os emails de recuperacao usem o dominio correto.

### 2. Verificar o codigo (ja esta correto)

O codigo atual em `Login.tsx` (linha 96) ja usa `window.location.origin` dinamicamente:

```typescript
redirectTo: `${window.location.origin}/admin/reset-password`
```

Isso significa que quando o site roda em `juriscompany.net`, o redirect enviado ao backend ja aponta para o dominio certo. O problema e que o backend precisa aceitar essa URL na lista de URLs permitidas.

### 3. Configuracao necessaria no backend

- **Site URL**: `https://juriscompany.net`
- **Redirect URLs adicionais**: 
  - `https://juriscompany.net/admin/reset-password`
  - `https://www.juriscompany.net/admin/reset-password`

## Detalhes Tecnicos

O fluxo de recuperacao de senha funciona assim:

```text
1. Usuario clica "Esqueci minha senha" no site (juriscompany.net)
2. Frontend chama supabase.auth.resetPasswordForEmail() 
   com redirectTo = "https://juriscompany.net/admin/reset-password"
3. Backend envia email com link de recuperacao
   -> O link usa a Site URL configurada no backend
4. Usuario clica no link do email
5. E redirecionado para /admin/reset-password no dominio configurado
6. A pagina ResetPassword.tsx captura o token e permite trocar a senha
```

O passo 3 e onde esta o problema: o backend usa a Site URL que esta configurada como URL do Lovable, nao `juriscompany.net`.

## Implementacao

1. Usar a ferramenta de configuracao de autenticacao para atualizar a Site URL para `https://juriscompany.net`
2. Adicionar as URLs de redirecionamento permitidas para o dominio do cliente
3. Nenhuma alteracao de codigo e necessaria - o frontend ja esta preparado

## Observacao Importante

Apos essa alteracao, o preview do Lovable pode ter problemas com recuperacao de senha (ja que a Site URL apontara para o dominio do cliente). Isso e esperado e nao afeta o site em producao hospedado na Hostinger.

