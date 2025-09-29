# Cadastro de Usuário

Projeto de uma aplicação web para cadastro de usuários, composta por um frontend em React (Vite) e um backend em Node.js com Prisma.

## Estrutura do Projeto

```
Cadastro_de_usuario/
  api-cadastro-usuario/   # Frontend (React + Vite)
  api-nodejs/             # Backend (Node.js + Prisma)
```

## Pré-requisitos
- Node.js
- npm ou yarn
- Banco de dados SQLite (padrão do Prisma)

## Instalação

### 1. Clone do repositório
```bash
git clone https://github.com/brunofonsecavaz/Cadastro_de_usuario.git
cd Cadastro_de_usuario
```

### 2. Instale as dependências do backend
```bash
cd api-nodejs
npm install
```

### 3. Configure o banco de dados
```bash
npx prisma migrate dev
```

### 4. Inicie o backend
```bash
node server.js
```

### 5. Instale as dependências do frontend
```bash
cd ../api-cadastro-usuario
npm install
```

### 6. Inicie o frontend
```bash
npm run dev
```

Acesse o frontend em [http://localhost:5173](http://localhost:5173).

## Funcionalidades
- Cadastro de usuários
- Listagem de usuários
- Integração entre frontend e backend

## Tecnologias Utilizadas
- React
- Vite
- Node.js
- Prisma ORM
- SQLite

Sinta-se à vontade para contribuir!
