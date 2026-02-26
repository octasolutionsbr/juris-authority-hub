
# Corrigir Edicao de Anuncios + Adicionar WhatsApp

## Problemas Identificados

### 1. Dados somem ao editar anuncio
A query em `useListings.ts` (linha 43) busca apenas colunas parciais:
```
id, title, title_en, description, description_en, category, price, status, images, location, area, created_by
```
Faltam: `long_description`, `long_description_en`, `features`, `features_en`, `location_en`. Quando o usuario clica em "Editar", a funcao `openEditDialog` tenta ler esses campos, mas eles estao `undefined`, fazendo tudo parecer vazio.

### 2. WhatsApp nos anuncios
Adicionar campo de WhatsApp para contato nos anuncios, com botao visivel na pagina publica.

---

## Solucao

### Passo 1: Adicionar coluna `contact_whatsapp` na tabela `listings`
Criar migration SQL para adicionar campo opcional de WhatsApp na tabela de anuncios.

### Passo 2: Corrigir query do `useListings.ts`
Alterar o select da query principal para incluir TODAS as colunas necessarias (usar `select('*')` ou adicionar as colunas faltantes). Isso resolve o bug de edicao.

Tambem adicionar `creator_whatsapp` ao tipo `Listing` e buscar o WhatsApp do `team_members` junto com o email.

### Passo 3: Atualizar formulario admin (`Listings.tsx`)
- Adicionar campo "WhatsApp para contato" no formulario de criacao/edicao
- Incluir o campo no `ListingFormData` e no `initialFormData`
- Enviar o valor na submissao do formulario
- Carregar o valor ao abrir edicao

### Passo 4: Adicionar botao WhatsApp na pagina de detalhes (`OpportunityDetail.tsx`)
- Botao verde do WhatsApp ao lado do botao de email
- Link `https://wa.me/NUMERO` com numero formatado
- Usar o WhatsApp especifico do anuncio (campo `contact_whatsapp`) se disponivel, senao usar o WhatsApp do perfil do criador (`team_members.whatsapp`)

### Passo 5: Adicionar botao WhatsApp no card de oportunidade (`OpportunityCard.tsx`)
- Icone do WhatsApp ao lado do icone de email no card

### Passo 6: Atualizar traducoes
- Adicionar labels em PT e EN para o campo de WhatsApp

---

## Detalhes Tecnicos

### Migration SQL
```sql
ALTER TABLE public.listings ADD COLUMN contact_whatsapp text;
```

### Tipo Listing atualizado
Adicionar ao interface:
- `contact_whatsapp?: string | null` (do proprio anuncio)
- `creator_whatsapp?: string | null` (do perfil team_members)

### Logica do WhatsApp
O numero exibido seguira esta prioridade:
1. `contact_whatsapp` do anuncio (se preenchido)
2. `whatsapp` do perfil do criador em `team_members` (fallback)

### Formatacao do link WhatsApp
Remover caracteres nao numericos e montar: `https://wa.me/55NUMERO`

### Arquivos modificados
- `useListings.ts` - corrigir select + adicionar campos whatsapp
- `src/pages/admin/Listings.tsx` - campo whatsapp no formulario
- `src/pages/OpportunityDetail.tsx` - botao whatsapp
- `src/components/opportunities/OpportunityCard.tsx` - icone whatsapp
- `src/i18n/locales/pt.json` e `en.json` - traducoes
