![Logo Focinhando](https://i.imgur.com/uPUVmWW.png)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=plastic&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=plastic&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=plastic&logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E6F8E?style=plastic&logo=zod&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192.svg?style=plastic&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=plastic&logo=docker&logoColor=white)

Um sistema completo para um site de adoção de pets com o foco no cadastro de 
animais e usuários, processamento de candidaturas de adoção, publicações no 
blog e segurança de dados/autenticação.

* [Documentação - Postman](https://documenter.getpostman.com/view/40939226/2sB3QQJnT2)
* [Deploy - Backend](https://focinhando-backend.up.railway.app/)
* [Deploy - Frontend](https://focinhando.vercel.app/)

## Início Rápido

Execute o projeto com o npm (é necessário ter o [Node.js 22v](https://nodejs.org/) 
e o [PostgreSQL](https://www.postgresql.org/) instalado):
```bash
npm install                # Instale as dependências
cp env_example .env        # Copie as variáveis de ambiente
npm run build              # Faça o build do projeto
npm start                  # Execute o projeto
```

Ou execute com o [Docker](https://www.docker.com/):
```bash
cp env_example .env        # Copie as variáveis de ambiente
docker-compose up --build  # Execute o projeto
```

`No comando docker-compose, adicione no final -d para rodar em segundo plano`