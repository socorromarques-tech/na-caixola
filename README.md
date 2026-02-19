# Na Caixola 🧠

> **Um espaço pessoal para suas ideias, anotações e inspirações. Simples, rápido e sempre à mão.**

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status: Active](https://img.shields.io/badge/Status-Active-success.svg)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748)
![Tests](https://img.shields.io/badge/Tests-Playwright-green)

A **Na Caixola** é uma aplicação moderna de anotações focada na experiência do usuário e produtividade. Construída com as tecnologias mais recentes do ecossistema React/Next.js, ela oferece uma interface limpa, editor de texto rico e funcionalidades robustas de organização.

---

## 📸 Screenshots & Demos

*(Adicione aqui GIFs ou imagens da aplicação em funcionamento para impressionar recrutadores! Ex: Um GIF mostrando o editor e o dark mode)*

---

## ✨ Funcionalidades Principais

### 📝 Editor Rico
- **WYSIWYG Moderno**: Baseado em [Tiptap](https://tiptap.dev), com suporte completo a formatação.
- **Auto-save**: Nunca perca uma ideia. Salvamento automático com feedback visual.
- **Contagem em Tempo Real**: Monitore o tamanho do seu texto enquanto escreve.
- **✨ AI Assistant (Simulado)**: Experimente o futuro com resumos automáticos de notas.

### 🔍 Organização Poderosa
- **Baú (Arquivo)**: Visualize todas as suas notas em um grid responsivo.
- **Filtros Avançados**: Encontre rapidamente por Tags, Data (Range Picker) ou Favoritos.
- **Busca Global**: Pesquisa instantânea por título, conteúdo ou tags com *highlight* dos termos encontrados.
- **Ordenação**: Classifique por mais recentes ou antigas.

### 🚀 Compartilhamento e Exportação
- **Link Público**: Gere um link único para compartilhar qualquer nota em modo somente leitura.
- **Exportação PDF**: Baixe suas notas formatadas em PDF diretamente do navegador.
- **Exportação Markdown**: Exporte para `.md` para usar em outras ferramentas (Obsidian, Notion).

### 🎨 UX Premium
- **Dark Mode**: Suporte nativo a tema claro e escuro.
- **Toasts**: Feedback visual rico para ações (Salvar, Deletar, Erros) usando [Sonner](https://sonner.emilkowal.ski/).
- **Responsivo**: Interface totalmente adaptada para mobile, tablet e desktop.

---

## 🛠️ Stack Tecnológico

O projeto foi desenvolvido utilizando as melhores práticas e ferramentas modernas de 2026:

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TailwindCSS v4](https://tailwindcss.com/).
- **Backend / API**: Server Actions do Next.js.
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (hospedado na [Neon](https://neon.tech/)).
- **ORM**: [Prisma](https://www.prisma.io/).
- **Autenticação**: [Clerk](https://clerk.com/).
- **Qualidade**: Testes E2E com [Playwright](https://playwright.dev/).
- **Componentes**: [Lucide React](https://lucide.dev/) (ícones), Custom UI Components.
- **Utils**: `html2canvas`, `jspdf`, `sonner`.

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para executar o projeto em sua máquina:

### Pré-requisitos
- Node.js 18+ instalado.
- Uma conta no Clerk (para autenticação).
- Um banco de dados PostgreSQL (local ou Neon/Supabase).

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/socorromarques-tech/na-caixola.git
   cd na-caixola
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/db?schema=public"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

4. **Configure o Banco de Dados**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Rode o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) e comece a usar!

### Executando Testes

Para garantir a qualidade do código, rode os testes end-to-end:

```bash
npx playwright test
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

Desenvolvido com 💜 por [Socorro Marques](https://www.linkedin.com/in/socorromarques-tech)
