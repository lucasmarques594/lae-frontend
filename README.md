# LAE Cartórios - Frontend do Gerenciador de Contas

       https://i.imgur.com/6rLPrbE.png

Bem-vindo ao frontend do Desafio Técnico da LAE Cartórios. Esta é uma Single Page Application (SPA) desenvolvida em **React + Vite** para interagir com a API de extração de dados de contas.

A aplicação permite que o usuário envie um arquivo de conta (PDF, JPG, PNG), que é então processado por uma API backend com Inteligência Artificial para extrair e salvar as informações relevantes.

## ✨ Features

-   **Interface Limpa e Responsiva**: Design moderno e agradável, focado na experiência do usuário e inspirado na identidade visual da LAE Cartórios.
-   **Upload de Arquivos**: Componente de upload intuitivo que converte arquivos para Base64 no lado do cliente.
-   **Visualização de Contas**: Exibe uma lista de todas as contas processadas e salvas no banco de dados.
-   **Gerenciamento Completo**: Permite deletar registros com um clique.
-   **Comunicação Segura**: Utiliza um proxy no ambiente de desenvolvimento para contornar problemas de CORS de forma robusta.

## 🛠️ Tecnologias Utilizadas

-   **Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilização**: CSS puro (sem bibliotecas de componentes)
-   **Comunicação com API**: `fetch` API nativa do navegador

## 🚀 Como Executar o Projeto

Para executar este frontend, você precisa ter o **Node.js** (versão 18 ou superior) e o **npm** instalados. Além disso, **o backend da aplicação deve estar em execução**.

### Backend

Este projeto depende de um backend para funcionar. O repositório do backend, que inclui as instruções de como subi-lo com Docker, pode ser encontrado em:

➡️ **[Repositório do Backend LAE](https://github.com/lucasmarques594/lae-cartorios-challenge)**

Certifique-se de que os containers do backend (API e banco de dados) estejam rodando. Por padrão, após a depuração de problemas de rede, o backend foi configurado para ser acessível na porta **8080**.

### Frontend

**1. Clone o Repositório**

```bash
git clone https://github.com/lucasmarques594/lae-frontend.git
cd lae-frontend
```

**2. Instale as Dependências**

Use o `npm` para instalar todos os pacotes necessários definidos no `package.json`.

```bash
npm install
```

**3. Inicie o Servidor de Desenvolvimento**

Este comando irá iniciar o servidor do Vite, que compila a aplicação em tempo real e a serve localmente.

```bash
npm run dev
```

Após executar o comando, o terminal mostrará o endereço para acessar a aplicação. Geralmente, será:

> `http://localhost:5173`

Abra este endereço no seu navegador para começar a usar o Gerenciador de Contas.

## ⚙️ Configuração do Proxy

Para evitar problemas de CORS durante o desenvolvimento, este projeto utiliza a funcionalidade de proxy do Vite. Todas as requisições feitas para a rota `/api/...` no frontend são automaticamente redirecionadas para o backend rodando em `http://localhost:8080`.

Esta configuração está no arquivo `vite.config.ts`.

```typescript
// vite.config.ts
export default defineConfig({
  // ...
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```