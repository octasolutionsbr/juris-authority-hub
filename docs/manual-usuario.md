# Manual do Usuário
## Painel Administrativo - Juris Company

**Versão:** 1.0  
**Data:** Janeiro 2025

---

## Sumário

1. [Acesso ao Sistema (Login)](#1-acesso-ao-sistema-login)
2. [Dashboard](#2-dashboard)
3. [Meu Perfil](#3-meu-perfil)
4. [Gerenciar Anúncios](#4-gerenciar-anúncios)
5. [Gerenciar Audiências](#5-gerenciar-audiências)
6. [Gerenciar Equipe (Admin)](#6-gerenciar-equipe-admin)
7. [Gerenciar Usuários (Admin)](#7-gerenciar-usuários-admin)
8. [Configurações da Conta](#8-configurações-da-conta)
9. [Alertas de Erros (Técnico)](#9-alertas-de-erros-técnico)
10. [Suporte](#10-suporte)

---

## 1. Acesso ao Sistema (Login)

### Como acessar o painel administrativo

O painel administrativo da Juris Company está disponível em:

```
https://seudominio.com.br/admin/login
```

### Tela de Login

Para acessar o sistema, você precisará de um email e senha previamente cadastrados e aprovados por um administrador.

**[SCREENSHOT: 01-login.png]**
*Tela de login do painel administrativo*

**Campos:**
- **Email:** Seu email de acesso cadastrado
- **Senha:** Sua senha de acesso

**Passo a passo:**
1. Digite seu email no campo "Email"
2. Digite sua senha no campo "Senha"
3. Clique no botão "Entrar"

### Solicitar Cadastro

Se você ainda não possui uma conta, pode solicitar o cadastro clicando na aba "Cadastro".

**[SCREENSHOT: 02-cadastro.png]**
*Aba de cadastro de novo usuário*

**Campos obrigatórios:**
- **Nome Completo:** Seu nome como será exibido no sistema
- **Email:** Email válido para acesso
- **Senha:** Crie uma senha segura

> ⚠️ **Importante:** Após o cadastro, aguarde a aprovação de um administrador para poder acessar o sistema.

### Recuperação de Senha

Caso tenha esquecido sua senha, clique em "Esqueci minha senha" na tela de login.

**[SCREENSHOT: 03-recuperar-senha.png]**
*Dialog de recuperação de senha*

**Passo a passo:**
1. Clique em "Esqueci minha senha"
2. Digite seu email de cadastro
3. Clique em "Enviar Link"
4. Verifique sua caixa de entrada
5. Clique no link recebido por email
6. Defina sua nova senha

---

## 2. Dashboard

O Dashboard é a página inicial do painel administrativo, exibindo um resumo das principais informações do sistema.

**[SCREENSHOT: 04-dashboard.png]**
*Visão geral do Dashboard*

### Cards de Estatísticas

O Dashboard exibe cards interativos com informações em tempo real:

| Card | Descrição | Ação ao clicar |
|------|-----------|----------------|
| **Meu Perfil** | Status do seu perfil profissional | Abre a página de edição do perfil |
| **Anúncios** | Total de anúncios cadastrados | Abre a lista de anúncios |
| **Audiências** | Total de audiências agendadas | Abre a lista de audiências |
| **Equipe** | Total de membros na equipe (Admin) | Abre gerenciamento de equipe |
| **Usuários Pendentes** | Solicitações aguardando aprovação (Admin) | Abre gerenciamento de usuários |

### Navegação

Use o menu lateral (sidebar) para navegar entre as seções do painel.

---

## 3. Meu Perfil

A página "Meu Perfil" permite gerenciar suas informações profissionais que serão exibidas publicamente no site.

### Status de Publicação

No topo da página, você encontrará um toggle para controlar a visibilidade do seu perfil.

**[SCREENSHOT: 05-perfil-topo.png]**
*Seção superior do perfil com toggle de publicação*

- **Publicado:** Seu perfil aparece no site público
- **Oculto:** Seu perfil não é exibido publicamente

### Foto Profissional

Clique na área da foto para fazer upload de uma nova imagem.

**Recomendações:**
- Formato: JPG ou PNG
- Proporção: 4:5 (retrato)
- Tamanho máximo: 2MB
- Fundo neutro e iluminação adequada

### Informações Básicas

**[SCREENSHOT: 06-perfil-meio.png]**
*Seção de informações básicas do perfil*

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| **Nome** | Seu nome completo | ✅ Sim |
| **Área Principal** | Sua especialidade principal | Não |
| **Biografia** | Descrição profissional resumida | ✅ Sim |
| **Áreas de Atuação** | Selecione múltiplas áreas | Não |

### Contato

| Campo | Descrição | Formato |
|-------|-----------|---------|
| **Email Profissional** | Email para contato | email@exemplo.com |
| **WhatsApp** | Número com DDD | (96) 99999-9999 |

### Formação e Publicações

**[SCREENSHOT: 07-perfil-inferior.png]**
*Seção de formação acadêmica e publicações*

**Formação Acadêmica:**
- Adicione suas graduações, especializações e pós-graduações
- Clique em "+ Adicionar" para incluir novas entradas
- Use o ícone de lixeira para remover

**Publicações:**
- Liste artigos, livros ou trabalhos publicados
- Formato sugerido: "Título da Obra (Ano)"

### Redes Sociais

Adicione links para suas redes profissionais:
- LinkedIn
- Instagram
- Facebook
- Twitter/X
- YouTube
- Website pessoal

### Salvando Alterações

Clique no botão "Salvar Perfil" ao final da página para gravar todas as alterações.

> ✅ Uma mensagem de confirmação será exibida após salvar com sucesso.

---

## 4. Gerenciar Anúncios

A seção de Anúncios permite criar e gerenciar oportunidades de investimento (imóveis, precatórios, créditos, etc.).

### Lista de Anúncios

**[SCREENSHOT: 08-lista-anuncios.png]**
*Lista de anúncios cadastrados*

A tabela exibe todos os seus anúncios com:
- Título
- Categoria
- Preço
- Status
- Ações (Editar/Excluir)

**Status disponíveis:**
- 🟢 **Ativo:** Visível no site
- 🟡 **Pendente:** Aguardando publicação
- 🔴 **Vendido:** Finalizado

### Criar Novo Anúncio

Clique no botão "Novo Anúncio" para abrir o formulário de criação.

**[SCREENSHOT: 09-novo-anuncio.png]**
*Formulário de criação de anúncio*

**Campos do formulário:**

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| **Categoria** | Tipo do anúncio | ✅ Sim |
| **Título** | Nome do anúncio | ✅ Sim |
| **Descrição Curta** | Resumo para listagem | ✅ Sim |
| **Descrição Longa** | Detalhes completos | Não |
| **Preço** | Valor em reais | Não |
| **Localização** | Cidade/Estado | Não |
| **Área (m²)** | Tamanho (para imóveis) | Não |
| **Características** | Lista de features | Não |
| **Status** | Ativo/Pendente/Vendido | ✅ Sim |

**Categorias disponíveis:**
- Imóveis
- Precatórios
- Créditos
- Outros

### Upload de Imagens

**[SCREENSHOT: 10-anuncio-imagens.png]**
*Seção de upload de imagens*

- Clique em "Adicionar Imagens" para fazer upload
- A primeira imagem será a capa/thumbnail
- Arraste para reordenar as imagens
- Clique no X para remover uma imagem

### Tradução (PT/EN)

O sistema permite adicionar traduções em inglês para:
- Título
- Descrição curta
- Descrição longa
- Localização
- Características

### Editar e Excluir

- **Editar:** Clique no ícone de lápis na linha do anúncio
- **Excluir:** Clique no ícone de lixeira (requer confirmação)

---

## 5. Gerenciar Audiências

A seção de Audiências permite agendar e gerenciar audiências jurídicas, com opção de compartilhamento com clientes.

### Lista de Audiências

**[SCREENSHOT: 11-lista-audiencias.png]**
*Lista de audiências agendadas*

A tabela exibe:
- Cliente
- Processo
- Tribunal
- Data/Hora
- Status
- Ações

**Filtros disponíveis:**
- Busca por texto (cliente, processo)
- Filtro por status

**Status disponíveis:**
- 📅 **Agendada:** Audiência futura
- ✅ **Realizada:** Audiência concluída
- ❌ **Cancelada:** Audiência cancelada
- 🔄 **Adiada:** Audiência remarcada

### Criar Nova Audiência

Clique no botão "Nova Audiência" para abrir o formulário.

**[SCREENSHOT: 12-nova-audiencia.png]**
*Formulário de criação de audiência*

**Informações do Cliente:**

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| **Nome do Cliente** | Nome completo | ✅ Sim |
| **Email do Cliente** | Para notificações | ✅ Sim |

**Informações do Processo:**

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| **Número do Processo** | Formato CNJ | ✅ Sim |
| **Tribunal** | Ex: TJ-AP - 1ª Vara Cível | ✅ Sim |
| **Tipo de Audiência** | Conciliação, Instrução, etc. | ✅ Sim |
| **Descrição** | Detalhes da audiência | ✅ Sim |

**Tipos de Audiência:**
- Conciliação
- Instrução
- Julgamento
- Inicial
- Sentença
- Outras

**Data e Local:**

| Campo | Descrição |
|-------|-----------|
| **Data e Hora** | Quando será a audiência |
| **Local** | Endereço completo (Fórum, Sala) |

**Informações do Advogado:**

| Campo | Descrição |
|-------|-----------|
| **Telefone** | Para contato do cliente |
| **Email** | Email profissional |

**Documentos Necessários:**

Liste os documentos que o cliente deve levar:
- Clique em "+ Adicionar" para incluir
- Exemplo: RG, CPF, Comprovante de Residência

**Observações:**
Campo livre para anotações internas sobre a audiência.

### Compartilhar com Cliente

O sistema permite gerar um link único para o cliente visualizar os detalhes da audiência.

**[SCREENSHOT: 13-compartilhar-audiencia.png]**
*Dialog de compartilhamento de audiência*

**Passo a passo:**
1. Clique no ícone de compartilhamento na linha da audiência
2. Ative o toggle "Compartilhar esta audiência"
3. Copie o link gerado
4. Envie ao cliente via WhatsApp ou email

**O que o cliente verá:**
- Data, hora e local da audiência
- Informações do processo
- Documentos necessários
- Contato do advogado (se informado)
- Botão para adicionar ao calendário (Google Calendar/Outlook)

> ⚠️ O cliente não precisa de login para acessar o link.

---

## 6. Gerenciar Equipe (Admin)

> 🔒 Esta seção é exclusiva para usuários com permissão de **Administrador**.

A página de Equipe permite gerenciar os perfis de todos os membros do escritório.

### Lista de Membros

**[SCREENSHOT: 14-lista-equipe.png]**
*Lista de membros da equipe*

A tabela exibe:
- Foto
- Nome
- Cargo/Título
- Status (Publicado/Oculto)
- Usuário vinculado
- Ações

### Criar Novo Membro

Clique em "Novo Membro" para criar um perfil de membro.

**[SCREENSHOT: 15-novo-membro.png]**
*Formulário de criação de membro*

> 💡 **Dica:** Você pode criar perfis de membros antes mesmo deles terem uma conta no sistema. Depois, basta vincular o usuário ao perfil.

### Vincular Usuário a Perfil

Quando um advogado cria uma conta, você pode vincular essa conta a um perfil existente.

**[SCREENSHOT: 16-vincular-usuario.png]**
*Dialog de vinculação de usuário*

**Passo a passo:**
1. Clique no ícone de link na linha do membro
2. Selecione o usuário na lista
3. Confirme a vinculação

**Resultado:**
- O usuário passa a editar esse perfil via "Meu Perfil"
- As alterações feitas pelo usuário refletem no perfil vinculado

### Desvincular Usuário

Para remover a vinculação:
1. Clique no ícone de link
2. Clique em "Desvincular"

---

## 7. Gerenciar Usuários (Admin)

> 🔒 Esta seção é exclusiva para usuários com permissão de **Administrador**.

A página de Usuários permite aprovar cadastros e gerenciar permissões.

### Solicitações Pendentes

**[SCREENSHOT: 17-usuarios-pendentes.png]**
*Lista de usuários aguardando aprovação*

Quando um novo usuário se cadastra, ele aparece nesta lista aguardando aprovação.

**Ações disponíveis:**
- ✅ **Aprovar:** Libera acesso ao sistema
- ❌ **Rejeitar:** Nega o acesso

**Ao aprovar:**
- Você pode vincular o usuário a um perfil existente da equipe
- Ou deixar sem vinculação (o usuário criará seu próprio perfil)

### Usuários Ativos

**[SCREENSHOT: 18-usuarios-ativos.png]**
*Lista de usuários aprovados*

A tabela exibe todos os usuários com acesso ao sistema:
- Nome
- Email
- Cargo (Role)
- Data de cadastro
- Ações

### Editar Permissões

**[SCREENSHOT: 19-editar-usuario.png]**
*Dialog de edição de usuário*

Clique em "Editar" para alterar as permissões de um usuário.

**Cargos disponíveis:**

| Cargo | Descrição |
|-------|-----------|
| **Admin** | Acesso total ao sistema |
| **Advogado** | Acesso a Perfil, Anúncios e Audiências |
| **Técnico** | Acesso a configurações e alertas de erro |

### Bloquear e Excluir

- **Bloquear:** Suspende temporariamente o acesso
- **Excluir:** Remove permanentemente o usuário

> ⚠️ A exclusão é irreversível e remove todos os dados do usuário.

---

## 8. Configurações da Conta

A página de Configurações permite gerenciar as preferências da sua conta.

### Alterar Senha

**[SCREENSHOT: 20-alterar-senha.png]**
*Card de alteração de senha*

**Passo a passo:**
1. Digite a nova senha
2. Confirme a nova senha
3. Clique em "Atualizar Senha"

**Requisitos da senha:**
- Mínimo de 6 caracteres

### Alterar Email

**[SCREENSHOT: 21-alterar-email.png]**
*Card de alteração de email*

**Passo a passo:**
1. Digite o novo email
2. Clique em "Atualizar Email"
3. Verifique o email de confirmação

> ⚠️ Após alterar, você precisará usar o novo email para fazer login.

### Excluir Conta

**[SCREENSHOT: 22-excluir-conta.png]**
*Card de exclusão de conta*

Para excluir permanentemente sua conta:
1. Digite "EXCLUIR" no campo de confirmação
2. Clique em "Excluir Conta"

> ⚠️ **Atenção:** Esta ação é irreversível e remove todos os seus dados do sistema.

---

## 9. Alertas de Erros (Técnico)

> 🔒 Esta seção é exclusiva para usuários com permissão de **Técnico**.

A página de Alertas de Erros exibe logs de erros do sistema para diagnóstico.

**[SCREENSHOT: 23-alertas-erros.png]**
*Tela de alertas de erros*

### Funcionalidades

- **Visualizar erros:** Lista de erros com data, usuário e descrição
- **Filtrar:** Buscar por texto ou período
- **Limpar logs:** Remover registros antigos

---

## 10. Suporte

Em todas as páginas do painel administrativo, você encontrará um botão flutuante de suporte no canto inferior direito.

**[SCREENSHOT: 24-botao-suporte.png]**
*Botão flutuante de suporte*

**Ao clicar:**
Você será redirecionado para a página de contato do desenvolvedor para obter ajuda técnica.

---

## Dúvidas Frequentes

### Como altero minha foto de perfil?
Acesse "Meu Perfil" e clique na área da foto para fazer upload de uma nova imagem.

### Como compartilho uma audiência com meu cliente?
Na lista de audiências, clique no ícone de compartilhamento e copie o link gerado.

### Não consigo acessar o sistema, o que fazer?
1. Verifique se digitou o email e senha corretamente
2. Tente recuperar a senha clicando em "Esqueci minha senha"
3. Se for um novo cadastro, aguarde a aprovação do administrador
4. Entre em contato pelo botão de suporte

### Como adiciono um novo membro à equipe?
Se você é administrador, acesse "Equipe" e clique em "Novo Membro".

### Como aprovo um novo usuário?
Se você é administrador, acesse "Usuários" e clique em "Aprovar" na solicitação pendente.

---

## Contato e Suporte

Para dúvidas técnicas ou problemas com o sistema, utilize o botão de suporte disponível no painel ou entre em contato com o administrador do sistema.

---

*Manual do Usuário - Juris Company - Versão 1.0*
