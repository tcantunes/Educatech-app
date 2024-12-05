# Guia Completo para Rodar o Projeto Educatech

Este guia detalha como configurar, rodar e testar o projeto Educatech. Ele é organizado em duas partes principais: Frontend e Services, seguidas por instruções de testes e solução de problemas comuns.

---

## 1. Requisitos do Sistema

Certifique-se de que os seguintes softwares estejam instalados no sistema:

- **Node.js** (versão 16 ou superior) - [Download Node.js](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node.js)
- **MongoDB** (para o backend) - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Git** (para versionamento) - [Download Git](https://git-scm.com/)
- Um navegador moderno (como Chrome ou Firefox)

---

## 2. Executando o Projeto Online

Você pode acessar o projeto diretamente pela URL hospedada:

- **URL:** [https://educatech-v2.netlify.app/](https://educatech-v2.netlify.app/)
- **Usuário admin:** educatech@gmail.com
- **Ou utilize o login pelo Google com seu usuário**

> **Nota:** Devido ao serviço onde está hospedado, o login pode demorar alguns segundos.

---

## 3. Rodando o Projeto Localmente

### Clonando o Repositório

Abra o terminal e clone o projeto para sua máquina local:

```bash
# Clone o repositório
git clone <URL-DO-REPOSITORIO>

# Navegue até a pasta do projeto
cd educatech-v2
```

---

## 4. Configuração dos Microsserviços

Os microsserviços estão configurados em Node.js e utilizam MongoDB como banco de dados.

### Passo 1: Configurar o Microsserviço **auth-service**

1. Navegue até a pasta do **auth-service**:

   ```bash
   cd auth-service
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com as seguintes variáveis:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/educatech
   JWT_SECRET=sua_chave_secreta
   GOOGLE_CLIENT_ID=sua_google_client_id
   GOOGLE_CLIENT_SECRET=sua_google_client_secret
   ```

   Caso necessário, utilize nossas credenciais de teste:

   ```env
   MONGO_URI=mongodb+srv://tcanarcizo:123456789t@educatech.stwca.mongodb.net/?retryWrites=true&w=majority&appName=educatech
   GOOGLE_CLIENT_ID=1039504549165-8m5t7g59mlh4m21cgkpq8qt8p9kg099q.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   JWT_SECRET=123456789
   PORT=5000
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

   O servidor estará rodando em: [http://localhost:5000](http://localhost:5000)

### Passo 2: Configurar o Microsserviço **content-service**

1. Navegue até a pasta do **content-service**:

   ```bash
   cd content-service
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

   O servidor estará rodando em: [http://localhost:8080](http://localhost:8080)

---

## 5. Configuração do Frontend

O frontend é construído com React.js.

1. Navegue até a pasta do frontend:

   ```bash
   cd ../front
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor frontend:

   ```bash
   npm start
   ```

   O frontend estará acessível em: [http://localhost:3000](http://localhost:3000)

---

## 6. Rodando Testes

### Testes do Backend

1. Certifique-se de estar na pasta de cada microsserviço:

   ```bash
   cd content-service # ou
   cd auth-service
   ```

2. Execute os testes com o comando:

   ```bash
   npx jest
