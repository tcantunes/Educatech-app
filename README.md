# Guia Completo para Rodar o Projeto Educatech
Este guia detalha como configurar, rodar e testar o projeto Educatech. Ele é organizado em duas partes principais: Frontend e Services, seguidas por instruções de testes e solução de problemas comuns.
________________________________________
1. Requisitos do Sistema

Certifique-se de que os seguintes softwares estejam instalados no sistema:

- Node.js (versão 16 ou superior) - Download Node.js
- npm (gerenciador de pacotes do Node.js)
- MongoDB (para o backend) - Download MongoDB
- Git (para versionamento) - Download Git
- Um navegador moderno (como Chrome ou Firefox)
________________________________________
Temos duas formas de rodar o projeto:

URL: https://educatech-v2.netlify.app/

Usuario admin: educatech@gmail.com

Ou login pelo Google com seu usuario

Devido ao serviço onde está hospedado, o login demora alguns segundos


Ou Rodar localmente:

2. Clonar o Repositório

Abra o terminal e clone o projeto para sua máquina local:

## Clone o repositório
git clone <URL-DO-REPOSITORIO>

## Navegue até a pasta do projeto
cd educatech-v2
________________________________________
3. Configuração dos Microsserviços

O microsserviço está configurado em Node.js e utiliza MongoDB como banco de dados.

Temos dois microsserviços:

Passo 1: Configurar o Ambiente

1.	Navegue até a pasta do auth-service:
cd auth-service

2.	Instale as dependências:
npm install

3.	Crie um arquivo .env com as seguintes variáveis (baseado no seu ambiente):

PORT=5000
MONGO_URI=mongodb://localhost:27017/educatech

JWT_SECRET=sua_chave_secreta

GOOGLE_CLIENT_ID=sua_google_client_id

GOOGLE_CLIENT_SECRET=sua_google_client_secret

Caso necessário, utilizer nossas credenciais de teste:

MONGO_URI=mongodb+srv://tcanarcizo:123456789t@educatech.stwca.mongodb.net/?retryWrites=true&w=majority&appName=educatech
GOOGLE_CLIENT_ID=1039504549165-8m5t7g59mlh4m21cgkpq8qt8p9kg099q.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
JWT_SECRET=123456789
PORT=5000


Passo 2: Rodar o Servidor

Inicie o servidor:
npm start

O servidor estará rodando em: http://localhost:5000

Para rodar o microsserviço content-client:

1.	Navegue até a pasta do auth-service:
cd content-service

2.	Instale as dependências:
npm install

Passo 2: Rodar o Servidor

Inicie o servidor:
npm run dev

O servidor estará rodando em: http://localhost:8080
________________________________________
4. Configuração do Front

O frontend é construído com React.js.

Passo 1: Configurar o Ambiente

1.	Navegue até a pasta do frontend:
cd ../front

2.	Instale as dependências:
npm install

Passo 2: Rodar o Servidor
Inicie o servidor frontend:
npm start
O frontend estará acessível em: http://localhost:3000
________________________________________
5. Rodando Testes

5.2 Testes do Backend

1.	Certifique-se de estar na pasta de cada microsserviço:
cd content-service ou cd auth-service
2.	Execute os testes com o comando:
npx jest
________________________________________

 


