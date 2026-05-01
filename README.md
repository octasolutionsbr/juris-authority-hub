Website Institucional - Juris Company

Este repositório contém o código-fonte do website institucional da Juris Company. A aplicação foi desenvolvida utilizando uma arquitetura moderna baseada em componentes, com foco em alta performance, segurança e escalabilidade.

🛠 Tecnologias Utilizadas

O projeto utiliza o que há de mais avançado no ecossistema de desenvolvimento web:

Frontend: React + TypeScript

Build Tool: Vite

Estilização: Tailwind CSS + shadcn/ui

Backend & Database: Supabase (PostgreSQL)

Email Service: Resend

🚀 Como Executar o Projeto Localmente

Para realizar manutenções ou atualizações no código, siga os passos abaixo. Certifique-se de ter o Node.js instalado em sua máquina.

1. Clonar o repositório

git clone [https://github.com/SEU_USUARIO/juris-company-web.git](https://github.com/SEU_USUARIO/juris-company-web.git)
cd juris-company-web


2. Instalar dependências

npm install


3. Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as credenciais do Supabase (URL e Anon Key) para que o frontend possa se comunicar com o banco de dados.

4. Iniciar o servidor de desenvolvimento

npm run dev


O projeto estará disponível em http://juriscompany.net.

📁 Estrutura de Pastas

/src/components: Componentes reutilizáveis da interface.

/src/pages: Páginas principais do website.

/src/lib: Configurações de bibliotecas externas (ex: cliente Supabase).

/src/hooks: Lógica de estado e chamadas de API customizadas.

/public: Ativos estáticos como imagens e ícones.

🌐 Deploy e Manutenção

O projeto está configurado para Continuous Deployment. Qualquer alteração realizada na branch main e enviada ao GitHub será automaticamente refletida no ambiente de produção após passar pelos testes de build.

Desenvolvido por Octa - Agência Digital
