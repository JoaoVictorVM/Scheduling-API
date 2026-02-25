# SchedulingAPI

Backend API para gerenciamento de agendamentos  
**Versão atual:** v1.0.0

A **SchedulingAPI** é uma RESTful API desenvolvida com **NestJS** para gerenciamento de agendamentos entre clientes e profissionais.

Este projeto representa a versão MVP (v1.0.0), com foco em autenticação segura, controle de acesso baseado em roles (RBAC) e organização modular da aplicação.

---

### Funcionalidades (MVP v1.0.0)

- ✅ User registration (role CLIENT aplicada automaticamente)
- ✅ JWT authentication
- ✅ Role-based authorization (CLIENT, PROFESSIONAL, ADMIN)
- ✅ Criação de services (PROFESSIONAL only)
- ✅ Criação e gerenciamento de appointments
- ✅ Proteção de rotas com Guards
- ✅ Documentação com Swagger
- ✅ Validação de dados com DTO + class-validator
- ✅ Password hashing com bcrypt
- ✅ PostgreSQL com Prisma ORM

---

### Tech Stack

- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Swagger**
- **Class-validator**
- **Bcrypt**

---

### Arquitetura

O projeto segue uma arquitetura modular baseada no padrão do NestJS:

- auth → autenticação e controle de acesso
- users → gerenciamento de usuários
- services → gerenciamento de serviços oferecidos
- appointments → controle de agendamentos
- prisma → integração com banco de dados

A aplicação utiliza Guards e Decorators para implementar Role-Based Access Control (RBAC).

---

### Regras de Acesso (Roles)

**CLIENT**

- Criar conta (register)
- Realizar login
- Criar appointments
- Visualizar seus próprios agendamentos

**PROFESSIONAL**

- Criar services
- Gerenciar appointments vinculados aos seus serviços

**ADMIN**

- Criar usuários do tipo PROFESSIONAL
- Controle administrativo do sistema

---

### Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/SchedulingAPI.git
cd SchedulingAPI
```

Instale as dependências:

```bash
npm install
```

---

### Banco de Dados

Rodar as migrations do Prisma:

```bash
npx prisma migrate dev
```

---

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/schedulingapi"
JWT_SECRET="sua_chave_secreta_super_segura"
```

---

### Executando o Projeto

Modo desenvolvimento:

```bash
npm run start:dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

Documentação Swagger:

```
http://localhost:3000/api
```

---

### Deploy (Planejado)

O deploy em ambiente de produção será realizado na próxima versão do projeto (v1.1), utilizando Railway ou outro serviço de cloud provider.

Atualmente, a aplicação pode ser executada localmente seguindo as instruções acima.

---

### Roadmap (Backlog)

**v1.1**

- Implementação de Refresh Token
- Paginação nas listagens
- Endpoint para ADMIN listar usuários
- Seed automático para ADMIN
- Docker support
  - Deploy em ambiente cloud (Railway)

**v1.2**

- Email confirmation
- Password reset
- Rate limiting
- Logging estruturado
- Testes automatizados (unit + e2e)

---

### Objetivo do Projeto

Este projeto foi desenvolvido como estudo prático de:

- Arquitetura backend com NestJS
- Controle de acesso baseado em roles
- Estruturação de um MVP real
- Boas práticas de segurança em APIs

---

### Licença

MIT
