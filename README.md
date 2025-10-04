![Logo Focinhando](https://i.imgur.com/uPUVmWW.png)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=plastic&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=plastic&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=plastic&logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E6F8E?style=plastic&logo=zod&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=plastic&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=plastic&logo=docker&logoColor=white)

Este documento descreve todas as rotas da API disponíveis do Focinhando Backend,
seus parâmetros, tipos de requisição/resposta e requisitos de autenticação. Esta
aplicação é responsável pelo cadastro de animais e usuários, processamento das 
candidaturas de adoção, publicações de informações no blog e pela segurança 
das informações.

## Sumário
- [Início Rápido](#início-rápido)
- [Geral](#geral)
- [User](#user)
- [Pet](#pet)
- [Publication](#publication)
- [Contact](#contact)
- [Autenticação](#autenticação)
- [Error Handling](#error-handling)
- [Modelo de Dados](#modelo-de-dados)

## Início Rápido

Execute o projeto com o npm (é necessário ter o [Node.js](https://nodejs.org/) instalado):
```bash
npm install                # Instale as dependências
cp env_example .env        # Copie e configure a porta do .env
npm run build              # Faça o build do projeto
npm start                  # Execute o projeto
```

Ou execute com o [Docker](https://www.docker.com/):
```bash
cp env_example .env        # Copie e configure a porta do .env
docker-compose up --build  # Execute o projeto
```

`No comando docker-compose, adicione no final -d para rodar em segundo plano`

## Geral

### `GET /ping`
- **Descrição:** Endpoint de Health Check.
- **Auth:** None
- **Response:**
  ```json
  { "pong": true }
  ```

## User

### `POST /user/register`
- **Description:** Registrar um novo usuário.
- **Auth:** None
- **Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@email.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
   "error": null,
    "user": {
        "id": 1,
        "name": "User Name",
        "email": "user@email.com",
        "role": "member",
        "createdAt": "2025-10-02T21:26:20.191Z",
        "updatedAt": "2025-10-02T21:26:20.191Z"
    }
  }
  ```

### `POST /user/login`
- **Description:** Fazer login e receber um token.
- **Auth:** None
- **Body:**
  ```json
  {
    "email": "user@email.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "error": null,
    "token": "<uuid>"
  }
  ```

### `POST /user/complement`
- **Description:** Adiciona um complemento para o usuário logado.
- **Auth:** Yes (Bearer token)
- **Body:**
  ```json
  {
    "img": "<photo_url>",
    "phoneNumber": "(94) 98169 -1243",
    "city": "Marabá",
    "state": "Pará",
    "dateOfBirth": "2000-01-01"
  }
  ```
- **Response:**
  ```json
  {
    "error": null,
    "complement": {
      "id": 1,
      "img": "<photo_url>",
      "phoneNumber": "(00) 12345-6789",
      "city": "Marabá",
      "state": "Pará",
      "dateOfBirth": "2000-01-01",
      "adoptedPet": 0,
      "availablePet": 0,
      "createdAt": "2025-10-02T12:30:00.000Z",
      "updatedAt": "2025-10-02T12:30:00.000Z"
    }
  }
  ```

### `GET /user/complement`
- **Description:** Pega o complemento do usuário logado.
- **Auth:** Yes (Bearer token)
- **Response:**
  ```json
  {
    "error": null,
    "complement": {
      "id": 1,
      "img": "<photo_url>",
      "phoneNumber": "(00)12345-6789",
      "city": "Marabá",
      "state": "Pará",
      "dateOfBirth": "01/01/2000",
      "adoptedPet": 0,
      "availablePet": 0,
      "createdAt": "2025-10-02T12:30:00.000Z",
      "updatedAt": "2025-10-02T12:30:00.000Z"
    }
  }
  ```

## Pet

### `POST /pets/register`
- **Description:** Registrar um novo pet.
- **Auth:** None
- **Body:**
  ```json
  {
    "name": "Luna",
    "img": "luna.png",
    "age": "2025-02-04T00:00:00.000Z",
    "city": "Marabá",
    "state": "PA",
    "sex": "fêmea",
    "vaccinated": true,
    "about": "Luna é uma gatinha muito carinhosa e brincalhona. Adora brincar com bolinhas e dormir no colo. É muito sociável com outros gatos e crianças.",
    "specie": "gato",
    "race": "SRD (Sem Raça Definida)",
    "weight": 2.5,
    "userComplementId": 1
  }
  ```
- **Response:**
  ```json
  {
    "error": null,
    "pets": {
        "id": 1,
        "name": "Luna",
        "img": "luna.png",
        "age": "2025-02-04T00:00:00.000Z",
        "city": "Marabá",
        "state": "PA",
        "sex": "fêmea",
        "vaccinated": true,
        "about": "Luna é uma gatinha muito carinhosa e brincalhona. Adora brincar com bolinhas e dormir no colo. É muito sociável com outros gatos e crianças.",
        "specie": "gato",
        "race": "SRD (Sem Raça Definida)",
        "weight": 2.5,
      }
  }
  ```

### `GET /pets`
- **Description:** Listar produtos com filtros opcionais.
- **Auth:** None
- **Query Parameters:**
  | Name     | Type   |
  | -------- | ------ |
  | sex      | string |
  | specie   | string |
  | race     | string |
- **Response:**
  ```json
  {
    "error": null,
    "products": [
      {
        "id": 1,
        "name": "Luna",
        "img": "luna.png",
        "age": "2025-02-04T00:00:00.000Z",
        "city": "Marabá",
        "state": "PA",
        "sex": "fêmea",
        "vaccinated": true,
        "about": "Luna é uma gatinha muito carinhosa e brincalhona. Adora brincar com bolinhas e dormir no colo. É muito sociável com outros gatos e crianças.",
        "specie": "gato",
        "race": "SRD (Sem Raça Definida)",
        "weight": 2.5,
      },
      {
        "id": 2,
        "name": "Luna",
        "img": "luna.png",
        "age": "2025-02-04T00:00:00.000Z",
        "city": "Marabá",
        "state": "PA",
        "sex": "fêmea",
        "vaccinated": true,
        "about": "Luna é uma gatinha muito carinhosa e brincalhona. Adora brincar com bolinhas e dormir no colo. É muito sociável com outros gatos e crianças.",
        "specie": "gato",
        "race": "SRD (Sem Raça Definida)",
        "weight": 2.5,
      }
    ]
  }
  ```

## Publication

### `POST /pet/register`
- **Description:** Registrar uma nova publicação.
- **Auth:** Yes (Bearer token)
- **Body:**
  ```json
  {
    "title": "Como preparar sua casa para receber um novo pet",
    "topic": "Dicas",
    "img": "blog.webp",
    "text": "Receber um novo pet em casa é uma experiência maravilhosa, mas requer alguns preparativos importantes. Aqui estão as principais dicas para garantir que seu novo amigo se sinta seguro e confortável."
  }
  ```
- **Body:**
```json
  {
    "error": null,
    "publication": {
        "id": 1,
        "title": "Como preparar sua casa para receber um novo pet",
        "topic": "Dicas",
        "img": "http://localhost:4444/media/publications/blog.webp",
        "text": "Receber um novo pet em casa é uma experiência maravilhosa, mas requer alguns preparativos importantes. Aqui estão as principais dicas para garantir que seu novo amigo se sinta seguro e confortável.",
        "createdAt": "2025-10-03T16:28:17.954Z",
        "updatedAt": "2025-10-03T16:28:17.954Z"
    }
  }
```

### `GET /publication/all-publications`
- **Descrição:** Obter lista de todas as publicações.
- **Auth:** None
  ```json
  {
    "error": null,
    "publication": [
      {
          "id": 1,
          "title": "Como preparar sua casa para receber um novo pet",
          "topic": "Dicas",
          "img": "http://localhost:4444/media/publications/blog.webp",
          "text": "Receber um novo pet em casa é uma experiência maravilhosa, mas requer alguns preparativos importantes. Aqui estão as principais dicas para garantir que seu novo amigo se sinta seguro e confortável.",
          "createdAt": "2025-10-03T16:26:13.534Z",
          "updatedAt": "2025-10-03T16:26:13.534Z"
      }
    ]
  }
  ```

## Contact

### `POST /contact/register`
- **Descrição:** Registrar um novo contato.
- **Auth:** None
- **Body:**
  ```json
  { 
    "fullName": "Full Name",
    "email": "name@email.com",
    "phoneNumber": "(00)12345-6789",
    "subject": "Select a subject",
    "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
   }
  ```
- **Response:**
  ```json
  {
    "error": null,
    "contact": {
      "id": 1,
      "fullName": "Full Name",
      "email": "name@email.com",
      "phoneNumber": "(00)12345-6789",
      "subject": "Select a subject",
      "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "createdAt": "2025-10-02T12:30:00.000Z",
      "updatedAt": "2025-10-02T12:30:00.000Z"
    }
  }
  ```

### `GET /contact/all-contacts`
- **Descrição:** Listar todos os contatos registrados.
- **Auth:** Yes (Bearer token)
- **Response:**
  ```json
  {
    "error": null,
    "contacts": [
      {
        "id": 1,
        "fullName": "Full Name 1",
        "email": "name1@email.com",
        "phoneNumber": "(00)12345-6789",
        "subject": "Select a subject",
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "createdAt": "2025-10-02T12:30:00.000Z",
        "updatedAt": "2025-10-02T12:30:00.000Z"
      },
      {
        "id": 2,
        "fullName": "Full Name 2",
        "email": "name2@email.com",
        "phoneNumber": "(11)98765-4321",
        "subject": "Another subject",
        "message": "Praesent volutpat orci quis tortor feugiat fermentum.",
        "createdAt": "2025-10-02T12:30:00.000Z",
        "updatedAt": "2025-10-02T12:30:00.000Z"
      }
    ]
  }
  ```

### `GET /contact (com Paginação)`
- **Descrição:** Obter lista paginada de contatos.
- **Auth:** Yes (Bearer token)
- **Exemplo de URL:** `https://api.example.com/contact?page=1&limit=10`
- **Query Parameters:**
  | Name     | Type   |
  | -------- | ------ |
  | page     | int    |
  | limit    | int    |
- **Response:**
  ```json
  {
    "error": null,
    "contacts": [
      {
        "id": "1",
        "fullName": "Full Name 1",
        "email": "name1@email.com",
        "phoneNumber": "(00)12345-6789",
        "subject": "Select a subject",
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "createdAt": "2025-10-02T12:30:00.000Z",
        "updatedAt": "2025-10-02T12:30:00.000Z"
      },
      {
        "id": 2,
        "fullName": "Full Name 2",
        "email": "name2@email.com",
        "phoneNumber": "(11)98765-4321",
        "subject": "Another subject",
        "message": "Praesent volutpat orci quis tortor feugiat fermentum.",
        "createdAt": "2025-10-02T12:30:00.000Z",
        "updatedAt": "2025-10-02T12:30:00.000Z"
      }
    ],
    "pagination": {
      "totalContacts": 100,
      "totalPages": 10,
      "currentPage": 1,
      "limit": 10
    }
  }
  ```

## Autenticação

Alguns endpoints exigem autenticação por meio de um token Bearer. Passe o token no cabeçalho `Authorization`:

```
Authorization: Bearer <token>
```

## Error Handling

Todos os endpoints retornam um campo `error`. Se a requisição for bem-sucedida, o `error` é `null`. Caso contrário, ele contém uma mensagem de erro.

## Modelo de Dados

Consulte `prisma/schema.prisma` para ver os modelos completos do banco de dados.