# Guia de Captura de Screenshots
## Manual do Usuário - Juris Company

Este documento contém instruções detalhadas para capturar todos os screenshots necessários para o manual do usuário.

---

## Preparação

### Ferramentas Recomendadas

**Extensões de Navegador:**
- [Full Page Screen Capture](https://chrome.google.com/webstore/detail/full-page-screen-capture/fdpohaocaechififmbbbbbknoalclacl) (Chrome)
- [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot/nlipoenfbbikpbjkfpfillcgkibpehpe) (Chrome/Firefox)
- Ferramenta nativa do Windows (Win + Shift + S)
- Screenshot nativo do Mac (Cmd + Shift + 4)

**Editor de Imagens (opcional):**
- [Greenshot](https://getgreenshot.org/) - Windows
- [Lightshot](https://app.prntscr.com/) - Windows/Mac
- Preview - Mac (nativo)

### Configurações do Navegador

1. **Resolução:** 1920 x 1080 (Full HD)
2. **Zoom:** 100%
3. **Modo:** Janela maximizada
4. **Navegador:** Chrome ou Firefox (versão atual)

### Conta de Acesso

Para capturar todas as telas, você precisará de uma conta com permissão de **Administrador**, que tem acesso a todas as funcionalidades.

---

## Checklist de Screenshots

Use esta lista para marcar as capturas realizadas:

### Seção 1: Acesso ao Sistema (3 screenshots)

- [ ] **01-login.png**
  - **Caminho:** `/admin/login`
  - **Ações:** Limpar campos do formulário
  - **Capturar:** Tela completa de login
  - **Dica:** Mostrar campos vazios

- [ ] **02-cadastro.png**
  - **Caminho:** `/admin/login`
  - **Ações:** Clicar na aba "Cadastro"
  - **Capturar:** Formulário de cadastro
  - **Dica:** Mostrar campos vazios

- [ ] **03-recuperar-senha.png**
  - **Caminho:** `/admin/login`
  - **Ações:** Clicar em "Esqueci minha senha"
  - **Capturar:** Dialog de recuperação aberto
  - **Dica:** Mostrar campo de email vazio

---

### Seção 2: Dashboard (1 screenshot)

- [ ] **04-dashboard.png**
  - **Caminho:** `/admin/dashboard`
  - **Ações:** Fazer login como administrador
  - **Capturar:** Dashboard completo
  - **Dica:** Ter pelo menos alguns dados para os cards mostrarem números

---

### Seção 3: Meu Perfil (3 screenshots)

- [ ] **05-perfil-topo.png**
  - **Caminho:** `/admin/profile`
  - **Ações:** Scroll no topo da página
  - **Capturar:** Toggle de publicação, área de foto, campos iniciais
  - **Dica:** Preencher alguns campos com dados de exemplo

- [ ] **06-perfil-meio.png**
  - **Caminho:** `/admin/profile`
  - **Ações:** Scroll até a seção de áreas de atuação
  - **Capturar:** Seleção de áreas, campos de contato
  - **Dica:** Selecionar algumas áreas como exemplo

- [ ] **07-perfil-inferior.png**
  - **Caminho:** `/admin/profile`
  - **Ações:** Scroll até o final da página
  - **Capturar:** Formação, publicações, redes sociais, botão salvar
  - **Dica:** Adicionar ao menos uma formação e publicação de exemplo

---

### Seção 4: Gerenciar Anúncios (3 screenshots)

- [ ] **08-lista-anuncios.png**
  - **Caminho:** `/admin/listings`
  - **Ações:** Garantir que exista pelo menos 1 anúncio
  - **Capturar:** Lista/tabela de anúncios
  - **Dica:** Ter anúncios com diferentes status para variedade

- [ ] **09-novo-anuncio.png**
  - **Caminho:** `/admin/listings`
  - **Ações:** Clicar em "Novo Anúncio"
  - **Capturar:** Formulário de criação (parte superior)
  - **Dica:** Deixar campos vazios ou com dados de exemplo

- [ ] **10-anuncio-imagens.png**
  - **Caminho:** `/admin/listings`
  - **Ações:** No formulário, scroll até a seção de imagens
  - **Capturar:** Área de upload de imagens
  - **Dica:** Se possível, ter algumas imagens já carregadas

---

### Seção 5: Gerenciar Audiências (3 screenshots)

- [ ] **11-lista-audiencias.png**
  - **Caminho:** `/admin/hearings`
  - **Ações:** Garantir que exista pelo menos 1 audiência
  - **Capturar:** Lista/tabela de audiências
  - **Dica:** Ter audiências com diferentes status

- [ ] **12-nova-audiencia.png**
  - **Caminho:** `/admin/hearings`
  - **Ações:** Clicar em "Nova Audiência"
  - **Capturar:** Formulário completo (pode precisar de múltiplas capturas)
  - **Dica:** Usar dados de exemplo (ver abaixo)

- [ ] **13-compartilhar-audiencia.png**
  - **Caminho:** `/admin/hearings`
  - **Ações:** Clicar no ícone de compartilhar de uma audiência
  - **Capturar:** Dialog de compartilhamento com link gerado
  - **Dica:** Ativar o toggle de compartilhamento para mostrar o link

---

### Seção 6: Gerenciar Equipe - Admin (3 screenshots)

- [ ] **14-lista-equipe.png**
  - **Caminho:** `/admin/team`
  - **Ações:** Acessar como administrador
  - **Capturar:** Lista/tabela de membros da equipe
  - **Dica:** Ter pelo menos 2-3 membros cadastrados

- [ ] **15-novo-membro.png**
  - **Caminho:** `/admin/team`
  - **Ações:** Clicar em "Novo Membro"
  - **Capturar:** Formulário de criação de membro
  - **Dica:** Mostrar campos principais

- [ ] **16-vincular-usuario.png**
  - **Caminho:** `/admin/team`
  - **Ações:** Clicar no ícone de link em um membro
  - **Capturar:** Dialog de vinculação de usuário
  - **Dica:** Ter usuários disponíveis para vincular

---

### Seção 7: Gerenciar Usuários - Admin (3 screenshots)

- [ ] **17-usuarios-pendentes.png**
  - **Caminho:** `/admin/users`
  - **Ações:** Ter pelo menos 1 usuário pendente (ou simular)
  - **Capturar:** Seção de usuários pendentes
  - **Dica:** Se não houver pendentes, capturar a mensagem "Nenhum usuário pendente"

- [ ] **18-usuarios-ativos.png**
  - **Caminho:** `/admin/users`
  - **Ações:** Scroll até a lista de usuários ativos
  - **Capturar:** Lista de usuários aprovados
  - **Dica:** Ter alguns usuários com diferentes roles

- [ ] **19-editar-usuario.png**
  - **Caminho:** `/admin/users`
  - **Ações:** Clicar em "Editar" em um usuário
  - **Capturar:** Dialog de edição com seletor de role
  - **Dica:** Mostrar as opções de cargo disponíveis

---

### Seção 8: Configurações da Conta (3 screenshots)

- [ ] **20-alterar-senha.png**
  - **Caminho:** `/admin/settings`
  - **Ações:** Scroll para card de alterar senha ficar visível
  - **Capturar:** Card de alteração de senha
  - **Dica:** Campos vazios

- [ ] **21-alterar-email.png**
  - **Caminho:** `/admin/settings`
  - **Ações:** Card de alterar email visível
  - **Capturar:** Card de alteração de email
  - **Dica:** Campos vazios

- [ ] **22-excluir-conta.png**
  - **Caminho:** `/admin/settings`
  - **Ações:** Card de excluir conta visível
  - **Capturar:** Card de exclusão de conta
  - **Dica:** Mostrar campo de confirmação vazio

---

### Seção 9: Alertas de Erros - Técnico (1 screenshot)

- [ ] **23-alertas-erros.png**
  - **Caminho:** `/admin/error-alerts`
  - **Ações:** Acessar como técnico
  - **Capturar:** Tela de alertas de erros
  - **Dica:** Se não houver erros, capturar a mensagem "Nenhum erro registrado"

---

### Seção 10: Suporte (1 screenshot)

- [ ] **24-botao-suporte.png**
  - **Caminho:** Qualquer página do admin
  - **Ações:** Destacar o botão flutuante no canto inferior direito
  - **Capturar:** Botão de suporte em destaque
  - **Dica:** Usar ferramenta de destaque ou recortar apenas a área do botão

---

## Dados de Exemplo

### Para Audiência de Teste

```
Cliente: João da Silva Santos
Email: joao.santos@email.com
Processo: 0001234-56.2025.8.02.0001
Tribunal: TJ-AP - 1ª Vara Cível
Tipo: Instrução
Descrição: Audiência de Instrução e Julgamento - Ação de Cobrança
Data: [próxima semana, 14:00]
Local: Fórum de Macapá, Av. Fab, 123 - Sala 3
Telefone do Advogado: (96) 99999-9999
Email do Advogado: advogado@juriscompany.com.br
Documentos: RG e CPF, Comprovante de Residência, Contrato original
Observações: Cliente confirmado. Levar cópias extras dos documentos.
```

### Para Anúncio de Teste

```
Categoria: Imóveis
Título: Apartamento 3 Quartos - Centro de Macapá
Descrição Curta: Excelente apartamento de 3 quartos com suíte, em localização privilegiada no centro.
Descrição Longa: Apartamento amplo com 120m², 3 quartos sendo 1 suíte, sala de estar e jantar integradas, cozinha planejada, área de serviço, 2 vagas de garagem cobertas. Condomínio com portaria 24h, piscina e salão de festas. Próximo a escolas, supermercados e bancos.
Preço: 450000
Localização: Centro, Macapá - AP
Área: 120
Características:
- 3 Quartos (1 suíte)
- 2 Vagas de garagem
- Portaria 24h
- Piscina
- Salão de festas
Status: Ativo
```

### Para Perfil de Teste

```
Nome: Maria Souza Advogada
Área Principal: Direito Civil
Biografia: Advogada especializada em Direito Civil e Família, com mais de 10 anos de experiência. Atuação focada em mediação de conflitos e soluções jurídicas personalizadas.
Áreas: Direito Civil, Direito de Família, Mediação
Email: maria.souza@juriscompany.com.br
WhatsApp: (96) 98888-8888
Formação:
- Bacharelado em Direito - Universidade Federal do Amapá (2010)
- Especialização em Direito Civil - PUC-SP (2013)
Publicações:
- "Mediação Familiar: Caminhos para a Resolução de Conflitos" (2020)
LinkedIn: https://linkedin.com/in/mariasouza
```

---

## Dicas de Captura

### Qualidade

1. **Resolução:** Sempre capture em 1920x1080 ou superior
2. **Formato:** Salve em PNG para melhor qualidade
3. **Nomeação:** Use os nomes sugeridos (01-login.png, 02-cadastro.png, etc.)

### Composição

1. **Centralizar:** Mantenha os elementos principais no centro
2. **Contexto:** Inclua elementos suficientes para o usuário se localizar
3. **Destaque:** Use setas ou círculos para indicar elementos importantes (no editor)

### Privacidade

1. **Dados reais:** NÃO use dados de clientes ou usuários reais
2. **Emails:** Use emails fictícios (@example.com)
3. **Telefones:** Use números fictícios
4. **Senhas:** Nunca mostre senhas reais

### Edição Posterior

Após capturar, você pode editar os screenshots para:
- Adicionar setas indicativas
- Destacar áreas com círculos
- Borrar informações sensíveis
- Recortar áreas desnecessárias
- Adicionar numeração

---

## Fluxo de Trabalho Sugerido

### Ordem de Captura

1. **Login** (01-03): Antes de fazer login
2. **Dashboard** (04): Após login como admin
3. **Perfil** (05-07): Navegar para Meu Perfil
4. **Anúncios** (08-10): Criar um anúncio de teste antes
5. **Audiências** (11-13): Criar uma audiência de teste antes
6. **Equipe** (14-16): Seção de equipe
7. **Usuários** (17-19): Seção de usuários
8. **Configurações** (20-22): Configurações da conta
9. **Alertas** (23): Trocar para conta de técnico
10. **Suporte** (24): Qualquer página

### Tempo Estimado

- Preparação: 15 minutos
- Capturas: 45-60 minutos
- Edição: 30-45 minutos
- **Total:** ~2 horas

---

## Exportando para o Manual

### Passo a Passo

1. Abra o arquivo `docs/manual-usuario.md` no GitHub ou editor
2. Copie todo o conteúdo
3. Cole em um novo documento Google Docs
4. Substitua cada `[SCREENSHOT: nome.png]` pela imagem correspondente
5. Ajuste formatação se necessário
6. Exporte como PDF

### No Google Docs

1. Arquivo > Fazer download > PDF
2. Ou: Arquivo > Imprimir > Salvar como PDF

### Configurações de PDF

- Tamanho: A4
- Orientação: Retrato
- Margens: Normais

---

## Checklist Final

Antes de finalizar o manual, verifique:

- [ ] Todos os 24 screenshots foram capturados
- [ ] Nenhum dado sensível real está visível
- [ ] As imagens estão nítidas e legíveis
- [ ] Os placeholders foram substituídos pelas imagens
- [ ] A formatação está consistente
- [ ] O PDF foi gerado corretamente
- [ ] O PDF abre sem problemas em diferentes dispositivos

---

*Guia de Captura de Screenshots - Versão 1.0*
