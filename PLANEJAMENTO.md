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
- [Geral](#geral)
- [Contact](#contact)
- [Pet](#pet)
- [Publication](#publication)
- [User](#user)
- [Webhooks](#webhooks)

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
  "error": null,
    "user": {
        "id": 1,
        "name": "User Name",
        "email": "user@email.com",
        "role": "member",
        "createdAt": "2025-10-02T21:26:20.191Z",
        "updatedAt": "2025-10-02T21:26:20.191Z"
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

### `GET /user/complement`
- **Description:** Pega o complementodo usuário logado.
- **Auth:** Yes (Bearer token)
- **Response:**
  ```json
  {
    "error": null,
    "complement": {
      "id": 1,
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

### `POST /user/complement`
- **Description:** Adiciona um complemento para o usuário logado.
- **Auth:** Yes (Bearer token)
- **Body:**
  ```json
  {
    "phoneNumber": "(94) 98169-1243",
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

### `GET /contact`
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
      // ... restante dos contatos
    ]
  }
  ```

### `GET /contact (com Paginação)`
- **Descrição:** Obter listar paginada de contatos.
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
      }
        // ... mais 9 contatos
    ],
    "pagination": {
      "totalContacts": 100,
      "totalPages": 10,
      "currentPage": 1,
      "limit": 10
    }
  }
  ```

## Pet

### `POST /pet/register`
- **Description:** Registrar um novo pet.
- **Auth:** None
- **Response:**
  ```json
  {
    "error": null,
    "products": [
      {
        "id": 1,
        "label": "Product Name",
        "price": 99.99,
        "image": "media/products/<filename>",
        "liked": false
      }
    ]
  }
  ```

### `GET /pet`
- **Description:** Listar produtos com filtros opcionais.
- **Auth:** None
- **Query Parameters:**
  | Name     | Type   | Required | Description                      |
  | -------- | ------ | -------- | -------------------------------- |
  | metadata | string | No       | JSON string of metadata filters  |
  | orderBy  | string | No       | "views", "selling", or "price"   |
  | limit    | string | No       | Max number of products to return |
- **Response:**
  ```json
  {
    "error": null,
    "products": [
      {
        "id": 1,
        "label": "Product Name",
        "price": 99.99,
        "image": "media/products/<filename>",
        "liked": false
      }
    ]
  }
  ```

### `GET /pet/:id`
- **Description:** Buscar pet por ID.
- **Auth:** None
- **Params:**
  | Name | Type             | Required |
  | ---- | ---------------- | -------- |
  | id   | string (numeric) | Yes      |
- **Response:**
  ```json
  {
    "error": null,
    "product": {
      "id": 1,
      "label": "Product Name",
      "price": 99.99,
      "description": "...",
      "categoryId": 1,
      "images": ["media/products/<filename>"]
    },
    "category": {
      "id": 1,
      "name": "Category Name",
      "slug": "category-slug"
    }
  }
  ```

### `GET /pet/:species`
- **Description:** Buscar pets relacionados da mesma espécie.
- **Auth:** None
- **Params:**
  | Name | Type             | Required |
  | ---- | ---------------- | -------- |
  | id   | string (numeric) | Yes      |
- **Query:**
  | Name  | Type             | Required |
  | ----- | ---------------- | -------- |
  | limit | string (numeric) | No       |
- **Response:**
  ```json
  {
    "error": null,
    "products": [ ... ]
  }
  ```

## Banners

### `GET /banners`
- **Description:** Get all banners.
- **Auth:** None
- **Response:**
  ```json
  {
    "error": null,
    "banners": [
      {
        "img": "media/banners/<filename>",
        "link": "<url>"
      }
    ]
  }
  ```

---

## Products

### `GET /products`
- **Description:** List products with optional filters.
- **Auth:** None
- **Query Parameters:**
  | Name     | Type   | Required | Description                      |
  | -------- | ------ | -------- | -------------------------------- |
  | metadata | string | No       | JSON string of metadata filters  |
  | orderBy  | string | No       | "views", "selling", or "price"   |
  | limit    | string | No       | Max number of products to return |
- **Response:**
  ```json
  {
    "error": null,
    "products": [
      {
        "id": 1,
        "label": "Product Name",
        "price": 99.99,
        "image": "media/products/<filename>",
        "liked": false
      }
    ]
  }
  ```

### `GET /product/:id`
- **Description:** Get a single product by ID.
- **Auth:** None
- **Params:**
  | Name | Type             | Required |
  | ---- | ---------------- | -------- |
  | id   | string (numeric) | Yes      |
- **Response:**
  ```json
  {
    "error": null,
    "product": {
      "id": 1,
      "label": "Product Name",
      "price": 99.99,
      "description": "...",
      "categoryId": 1,
      "images": ["media/products/<filename>"]
    },
    "category": {
      "id": 1,
      "name": "Category Name",
      "slug": "category-slug"
    }
  }
  ```

### `GET /product/:id/related`
- **Description:** Get related products from the same category.
- **Auth:** None
- **Params:**
  | Name | Type             | Required |
  | ---- | ---------------- | -------- |
  | id   | string (numeric) | Yes      |
- **Query:**
  | Name  | Type             | Required |
  | ----- | ---------------- | -------- |
  | limit | string (numeric) | No       |
- **Response:**
  ```json
  {
    "error": null,
    "products": [ ... ]
  }
  ```

---

## Categories

### `GET /category/:slug/metadata`
- **Description:** Get category and its metadata by slug.
- **Auth:** None
- **Params:**
  | Name | Type   | Required |
  | ---- | ------ | -------- |
  | slug | string | Yes      |
- **Response:**
  ```json
  {
    "error": null,
    "category": {
      "id": 1,
      "name": "Category Name",
      "slug": "category-slug"
    },
    "metadata": [
      {
        "id": "meta_id",
        "name": "Meta Name",
        "values": [
          { "id": "value_id", "label": "Value Label" }
        ]
      }
    ]
  }
  ```

---

## Cart

### `POST /cart/mount`
- **Description:** Get product details for a list of product IDs.
- **Auth:** None
- **Body:**
  ```json
  { "ids": [1, 2, 3] }
  ```
- **Response:**
  ```json
  {
    "error": null,
    "products": [
      {
        "id": 1,
        "label": "Product Name",
        "price": 99.99,
        "image": "media/products/<filename>"
      }
    ]
  }
  ```

### `GET /cart/shipping`
- **Description:** Calculate shipping cost and days for a zipcode.
- **Auth:** None
- **Query:**
  | Name    | Type   | Required |
  | ------- | ------ | -------- |
  | zipcode | string | Yes      |
- **Response:**
  ```json
  {
    "error": null,
    "zipcode": "12345-678",
    "cost": 7,
    "days": 3
  }
  ```

### `POST /cart/finish`
- **Description:** Finish the cart and create an order (returns Stripe checkout URL).
- **Auth:** Yes (Bearer token)
- **Body:**
  ```json
  {
    "cart": [
      { "productId": 1, "quantity": 2 }
    ],
    "addressId": 1
  }
  ```
- **Response:**
  ```json
  {
    "error": null,
    "url": "https://checkout.stripe.com/..."
  }
  ```

## Webhooks

### `POST /webhook/stripe`
- **Description:** Handle Stripe payment events and update order statuses.
- **Auth:** None (verified via Stripe signature)
- **Purpose:** Processes Stripe webhook events to automatically update order statuses
- **Supported Events:**
  - `checkout.session.completed` - Marks order as `paid`
  - `checkout.session.expired` - Marks order as `expired`
  - `payment_intent.payment_failed` - Marks order as `failed`
- **Order Status Values:**
  - `pending` - Order created, waiting for payment
  - `paid` - Payment completed successfully
  - `expired` - Checkout session expired
  - `failed` - Payment failed

---

## Authentication

Some endpoints require authentication via a Bearer token. Pass the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Error Handling

All endpoints return an `error` field. If the request is successful, `error` is `null`. Otherwise, it contains an error message.

---

## Data Models

See `prisma/schema.prisma` for full database models.

---

## Stripe Webhook Setup

The application includes a Stripe webhook endpoint to handle payment events and automatically update order statuses.

### Environment Variables Required

Add these environment variables to your `.env` file:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Setting up the Webhook in Stripe Dashboard

1. Go to your Stripe Dashboard
2. Navigate to Developers > Webhooks
3. Click "Add endpoint"
4. Set the endpoint URL to: `https://your-domain.com/webhook/stripe`
5. Select the following events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
6. Copy the webhook signing secret and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

### Security

The webhook endpoint verifies the Stripe signature to ensure requests are legitimate. Make sure to:
- Keep your `STRIPE_WEBHOOK_SECRET` secure
- Use HTTPS in production
- Never expose the webhook secret in client-side code 