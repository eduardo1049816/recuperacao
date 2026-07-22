# 🛒 Aura Market

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-green?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express">
  <img src="https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript">
  <img src="https://img.shields.io/badge/HTML5-Frontend-orange?style=for-the-badge&logo=html5">
  <img src="https://img.shields.io/badge/CSS3-Styles-blue?style=for-the-badge&logo=css3">
</p>

---

# 📖 Sobre o Projeto

O **Aura Market** é uma aplicação web inspirada no Mercado Livre, desenvolvida para a disciplina de Desenvolvimento Web.

O objetivo do projeto é demonstrar a integração entre **Front-end**, **Back-end** e **Banco de Dados**, utilizando uma arquitetura cliente-servidor.

A aplicação permite o gerenciamento de:

- 👤 Usuários
- 📦 Produtos
- 🛒 Compras

Todo o sistema utiliza uma API REST construída em Node.js para comunicação entre o Front-end e o banco de dados MySQL.

---

# 🚀 Tecnologias Utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- Responsividade
- Manipulação do DOM

---

## Back-end

- Node.js
- Express.js
- mysql2
- MySQL
- CORS

---

## Banco de Dados

- MySQL

---

## Ferramentas

- Git
- GitHub
- VS Code

---

# 📂 Estrutura do Projeto

```
Aura Market
│
├── backend
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules
│
├── frontend
│   │
│   ├── index.html
│   ├── produtos.html
│   ├── compras.html
│   ├── usuarios.html
│   │
│   ├── css
│   │   ├── style.css
│   │   ├── produtos.css
│   │   ├── usuarios.css
│   │   └── compras.css
│   │
│   ├── js
│   │   ├── main.js
│   │   ├── produtos.js
│   │   ├── usuarios.js
│   │   └── compras.js
│   │
│   └── assets
│       ├── imagens
│       ├── icones
│       └── logo.png
│
├── sql
│   └── mercado_livre.sql
│
└── README.md
```

---

# 🎨 Front-end

O Front-end foi desenvolvido utilizando HTML, CSS e JavaScript puro.

Entre as funcionalidades implementadas estão:

- Interface moderna
- Layout responsivo
- Cadastro de usuários
- Cadastro de produtos
- Cadastro de compras
- Consumo da API utilizando Fetch
- Listagem dinâmica dos dados
- Exclusão de registros
- Navegação entre páginas
- Organização dos arquivos por pastas
- Manipulação do DOM
- Comunicação assíncrona utilizando JavaScript

---

# ⚙️ Back-end

O Back-end foi desenvolvido em Node.js utilizando Express.

Foram implementados:

- API REST
- Rotas GET
- Rotas POST
- Rotas DELETE
- Tratamento de erros
- Comunicação com o MySQL
- SQL parametrizado
- Organização em módulos
- Utilização do mysql2/promise
- Comunicação em JSON

---

# 🗄️ Banco de Dados

O banco utilizado foi o MySQL.

Nome do banco:

```
mercado_livre
```

O projeto possui três tabelas relacionadas.

## usuarios

| Campo | Tipo |
|--------|------|
| id_usuario | INT |
| nome | VARCHAR |
| email | VARCHAR |
| senha | VARCHAR |
| telefone | VARCHAR |
| data_cadastro | DATE |

---

## produtos

| Campo | Tipo |
|--------|------|
| id_produto | INT |
| nome | VARCHAR |
| descricao | TEXT |
| preco | DECIMAL |
| estoque | INT |
| categoria | VARCHAR |

---

## compras

| Campo | Tipo |
|--------|------|
| id_compra | INT |
| id_usuario | INT |
| id_produto | INT |
| quantidade | INT |
| data_compra | DATE |

---

# 🔗 Relacionamento das Tabelas

```
USUARIOS
   │
   │ 1
   │
   │ N
COMPRAS
   │
   │ N
   │
   │ 1
PRODUTOS
```

O banco utiliza:

- Chave Primária
- Chave Estrangeira
- Relacionamentos
- Integridade Referencial
- Registros para testes

---

# 📡 API REST

## Usuários

### Listar

```
GET /usuarios
```

### Cadastrar

```
POST /usuarios
```

### Excluir

```
DELETE /usuarios/:id
```

---

## Produtos

### Listar

```
GET /produtos
```

### Cadastrar

```
POST /produtos
```

### Excluir

```
DELETE /produtos/:id
```

---

## Compras

### Listar

```
GET /compras
```

### Cadastrar

```
POST /compras
```

### Excluir

```
DELETE /compras/:id
```

---

# 🔌 Comunicação

O Front-end se comunica com o Back-end utilizando:

- Fetch API
- JSON
- HTTP
- API REST

Fluxo da aplicação:

```
Usuário

↓

Front-end

↓

Fetch API

↓

Express

↓

MySQL

↓

Express

↓

JSON

↓

Front-end
```

---

# 📦 Dependências

Instalar todas as dependências:

```bash
npm install
```

Ou instalar individualmente:

```bash
npm install express
npm install mysql2
npm install cors
```

---

# ▶️ Executando o Projeto

## Clone o repositório

```bash
git clone https://github.com/eduardo1049816/recuperacao.git
```

---

Entre na pasta

```bash
cd recuperacao
```

---

Instale as dependências

```bash
npm install
```

---

Crie o banco de dados

Execute o arquivo SQL localizado na pasta:

```
sql/
```

---

Execute o servidor

```bash
node server.js
```

ou

```bash
npm start
```

Servidor disponível em:

```
http://localhost:3000
```

---

# 💻 Recursos Implementados

✔ Cadastro de usuários

✔ Cadastro de produtos

✔ Cadastro de compras

✔ Exclusão de registros

✔ Listagem dinâmica

✔ Banco de dados relacional

✔ API REST

✔ SQL parametrizado

✔ Comunicação Cliente/Servidor

✔ Organização em módulos

✔ Tratamento de erros

✔ Arquitetura MVC simplificada

✔ Consumo de API

✔ Interface Responsiva

✔ Manipulação do DOM

✔ JavaScript Assíncrono

---

# 📚 Conceitos Aplicados

- HTML5
- CSS3
- JavaScript
- ES Modules
- Node.js
- Express
- API REST
- Fetch API
- JSON
- MySQL
- mysql2
- CRUD
- Banco Relacional
- Chaves Primárias
- Chaves Estrangeiras
- SQL
- Async/Await
- Promises
- Git
- GitHub

---

# 👨‍💻 Desenvolvedor

**Eduardo Ferraz**

Projeto desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web.

GitHub:

https://github.com/eduardo1049816

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais.

É permitido utilizar este projeto como referência para estudos.