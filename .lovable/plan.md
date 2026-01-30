
# Plano: Manual de Uso Completo em PDF

## Objetivo
Criar um manual de uso profissional e completo do painel administrativo da Juris Company, com estrutura pronta para Google Docs/Word e um guia detalhado para captura dos screenshots reais.

---

## Entregáveis

### 1. Template do Manual (Google Docs)
Documento estruturado com:
- Capa profissional
- Sumário
- 10 seções detalhadas
- Espaços marcados para inserção de screenshots
- Instruções visuais passo a passo

### 2. Guia de Captura de Screenshots
Roteiro completo com:
- Lista de todas as telas a capturar
- Dados de exemplo para preencher formulários
- Ordem de captura sugerida
- Dimensões recomendadas

---

## Estrutura do Manual

### Capa
- Logo Juris Company
- Título: "Manual do Usuário - Painel Administrativo"
- Versão e data

### Sumário
Índice navegável com links para cada seção

### Seção 1: Acesso ao Sistema (Login)
- Como acessar o painel (`/admin/login`)
- Tela de login com email e senha
- Como solicitar cadastro (aba "Cadastro")
- Fluxo de aprovação pelo administrador
- Recuperação de senha ("Esqueci minha senha")
- **Screenshots necessários**: Tela de login, aba cadastro, dialog de recuperação

### Seção 2: Dashboard
- Visão geral das estatísticas
- Cards interativos (Meu Perfil, Anúncios, Audiências)
- Ações rápidas
- Resumo do sistema
- **Screenshots necessários**: Dashboard completo, cards destacados

### Seção 3: Meu Perfil
- Status de publicação (toggle publicar/ocultar)
- Upload de foto profissional
- Informações básicas (nome, área principal, biografia)
- Seleção de áreas de atuação
- Contato (email, WhatsApp)
- Formação acadêmica e publicações
- Redes sociais
- **Screenshots necessários**: Formulário de perfil (topo e inferior), toggle de publicação

### Seção 4: Gerenciar Anúncios
- Lista de anúncios próprios
- Criar novo anúncio
- Campos obrigatórios e opcionais
- Upload de múltiplas imagens
- Tradução (PT/EN)
- Status do anúncio (Ativo, Pendente, Vendido)
- Editar e excluir
- **Screenshots necessários**: Lista de anúncios, formulário de criação, galeria de imagens

### Seção 5: Gerenciar Audiências
- Lista de audiências agendadas
- Filtros (busca e status)
- Criar nova audiência
- Campos: cliente, processo, tribunal, tipo, data/hora, local
- Informações do advogado (telefone, email)
- Documentos necessários
- Compartilhamento com cliente (link único)
- Dialog de compartilhamento
- **Screenshots necessários**: Lista, formulário completo, dialog de compartilhamento

### Seção 6: Gerenciar Equipe (Admin)
- Tabela de membros
- Criar perfil de membro
- Editar informações
- Status: Publicado/Oculto
- Vincular usuário a perfil existente
- Desvincular usuário
- **Screenshots necessários**: Lista de equipe, formulário de membro, dialog de vinculação

### Seção 7: Gerenciar Usuários (Admin)
- Solicitações pendentes de cadastro
- Aprovar usuário (com opção de vincular a perfil)
- Rejeitar usuário
- Usuários ativos
- Editar roles (Admin, Advogado, Técnico)
- Bloquear e excluir usuários
- **Screenshots necessários**: Lista pendentes, lista ativos, dialog de edição

### Seção 8: Configurações da Conta
- Alterar senha
- Alterar email
- Excluir conta (com confirmação)
- **Screenshots necessários**: Cada card de configuração

### Seção 9: Alertas de Erros (Técnico)
- Visualização de erros do sistema
- Filtros e busca
- Limpar logs
- **Screenshots necessários**: Tela de alertas

### Seção 10: Suporte
- Botão flutuante "Precisa de ajuda?"
- Contato com desenvolvedor
- **Screenshots necessários**: Botão de suporte

---

## Guia de Captura de Screenshots

### Preparação
1. Acessar o sistema com conta de administrador
2. Usar navegador Chrome/Firefox em modo desktop
3. Resolução recomendada: 1920x1080
4. Usar extensão de captura (ex: Full Page Screen Capture)

### Lista de Capturas (23 screenshots)

| # | Tela | Caminho | Ações antes de capturar |
|---|------|---------|------------------------|
| 1 | Login | `/admin/login` | Limpar formulário |
| 2 | Cadastro | `/admin/login` | Clicar aba "Cadastro" |
| 3 | Recuperar senha | `/admin/login` | Clicar "Esqueci minha senha" |
| 4 | Dashboard | `/admin/dashboard` | Após login |
| 5 | Meu Perfil (topo) | `/admin/profile` | Scroll no topo |
| 6 | Meu Perfil (meio) | `/admin/profile` | Scroll no meio |
| 7 | Meu Perfil (inferior) | `/admin/profile` | Scroll no final |
| 8 | Lista de Anúncios | `/admin/listings` | Com pelo menos 1 anúncio |
| 9 | Novo Anúncio | `/admin/listings` | Clicar "Novo Anúncio" |
| 10 | Anúncio - Imagens | `/admin/listings` | Dialog aberto, scroll até imagens |
| 11 | Lista de Audiências | `/admin/hearings` | Com pelo menos 1 audiência |
| 12 | Nova Audiência | `/admin/hearings` | Clicar "Nova Audiência" |
| 13 | Compartilhar Audiência | `/admin/hearings` | Clicar ícone compartilhar |
| 14 | Lista de Equipe | `/admin/team` | Admin logado |
| 15 | Novo Membro | `/admin/team` | Clicar "Novo Membro" |
| 16 | Vincular Usuário | `/admin/team` | Clicar ícone de link |
| 17 | Usuários Pendentes | `/admin/users` | Com pendentes se possível |
| 18 | Usuários Ativos | `/admin/users` | Scroll até lista de ativos |
| 19 | Editar Usuário | `/admin/users` | Clicar "Editar" em usuário |
| 20 | Alterar Senha | `/admin/settings` | Card de senha visível |
| 21 | Alterar Email | `/admin/settings` | Card de email visível |
| 22 | Excluir Conta | `/admin/settings` | Card de exclusão visível |
| 23 | Botão Suporte | Qualquer tela | Destacar botão flutuante |

### Dados de Exemplo para Formulários

**Audiência de Teste:**
- Cliente: João da Silva Santos
- Email: joao.santos@email.com
- Processo: 0001234-56.2025.8.02.0001
- Tribunal: TJ-AP - 1ª Vara Cível
- Tipo: Audiência de Instrução
- Local: Fórum de Macapá, Sala 3

**Anúncio de Teste:**
- Categoria: Imóveis
- Título: Apartamento 3 quartos - Centro
- Descrição: Excelente apartamento...
- Preço: 450000
- Localização: Macapá, AP

---

## Implementação

### Arquivos a Criar

1. **`docs/manual-usuario.md`**
   - Documento Markdown estruturado
   - Pode ser convertido para Google Docs/Word
   - Inclui placeholders `[SCREENSHOT: nome-da-tela]`

2. **`docs/guia-screenshots.md`**
   - Roteiro detalhado de captura
   - Checklist para marcar capturas feitas

### Formato Final
- O Markdown pode ser copiado para Google Docs
- Adicionar screenshots nos locais marcados
- Exportar como PDF

---

## Notas Técnicas

- O sistema possui 3 níveis de acesso: Advogado, Admin e Técnico
- Algumas funcionalidades são exclusivas (ex: Alertas de Erros só para Técnico)
- O manual cobrirá a perspectiva do Admin que vê todas as funcionalidades
- Screenshots devem mostrar interface limpa (sem dados sensíveis reais)

---

## Tempo Estimado
- Criação do template: ~30 minutos
- Captura de screenshots: ~1-2 horas
- Montagem final do PDF: ~30 minutos
