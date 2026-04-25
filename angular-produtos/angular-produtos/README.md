# 📦 Gestão de Produtos - Angular + JSON Server

Aplicação Angular para listagem e cadastro de produtos consumindo uma API via JSON Server.

---

## 📋 Requisitos

- **Node.js** v18 ou superior
- **NPM** v9 ou superior
- **Angular CLI** v17

---

## 🚀 Como executar o projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Instalar Angular CLI (caso não tenha)
```bash
npm install -g @angular/cli
```

### 3. Iniciar o JSON Server (API)
> Em um terminal separado:
```bash
npm run api
```
A API ficará disponível em: `http://localhost:3000/produtos`

### 4. Iniciar a aplicação Angular
> Em outro terminal:
```bash
npm start
```
A aplicação ficará disponível em: `http://localhost:4200`

---

## 📁 Estrutura do Projeto

```
src/
└── app/
    ├── models/
    │   └── produto.ts               # Interface do produto
    ├── services/
    │   └── produto.service.ts       # Service com métodos GET, POST, PUT, DELETE
    ├── components/
    │   ├── menu/                    # Barra de navegação
    │   ├── painel-principal/        # Listagem de produtos
    │   └── cadastro/                # Formulário de cadastro/edição
    ├── app.module.ts                # Módulo principal (HttpClientModule, ReactiveFormsModule)
    ├── app-routing.module.ts        # Configuração de rotas
    └── app.component.ts             # Componente raiz
db.json                              # Banco de dados do JSON Server
```

---

## 🔌 Endpoints da API

| Método | Endpoint              | Ação                      |
|--------|-----------------------|---------------------------|
| GET    | /produtos             | Listar todos os produtos  |
| GET    | /produtos/:id         | Buscar produto por ID     |
| POST   | /produtos             | Cadastrar novo produto    |
| PUT    | /produtos/:id         | Atualizar produto         |
| DELETE | /produtos/:id         | Excluir produto           |

---

## 🧩 Funcionalidades

- ✅ **Painel Principal**: Lista todos os produtos com nome, categoria, preço e quantidade
- ✅ **Cadastro**: Formulário reativo com validação para cadastrar novos produtos
- ✅ **Edição**: Clique em "Editar" para alterar um produto existente
- ✅ **Exclusão**: Remove produtos com confirmação
- ✅ **Alertas**: Mensagens de sucesso e erro

---

## 📌 Observações

- O projeto usa **Reactive Forms** para o formulário de cadastro
- O **HttpClientModule** está configurado no `app.module.ts`
- As rotas são: `/painel` e `/cadastro` (e `/cadastro/:id` para edição)
