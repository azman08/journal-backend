# 📓 Journal Backend API

A RESTful backend for the Journal Website built with **Node.js**, **Express**, and **MongoDB**.

---

## 🗂️ Project Structure

```
journal-backend/
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Journal.js             # Journal schema
│   ├── routes/
│   │   ├── auth.routes.js         # /api/auth
│   │   └── journal.routes.js      # /api/journals
│   ├── controllers/
│   │   ├── auth.controller.js     # Signup, login, me
│   │   └── journal.controller.js  # CRUD + visibility
│   └── app.js                     # Entry point
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Setup

```bash
# 1. Clone and install
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

---

## 🔑 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/journal_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000   # for CORS in production
```

---

## 🗄️ Database Schema

### User
| Field     | Type   | Notes                  |
|-----------|--------|------------------------|
| name      | String | required, 2–50 chars   |
| email     | String | required, unique       |
| password  | String | hashed, never returned |
| createdAt | Date   | auto                   |
| updatedAt | Date   | auto                   |

### Journal
| Field      | Type     | Notes                    |
|------------|----------|--------------------------|
| title      | String   | required, 3–150 chars    |
| content    | String   | required, min 10 chars   |
| author     | ObjectId | ref: User                |
| visibility | String   | "public" or "private"    |
| tags       | [String] | optional                 |
| createdAt  | Date     | auto                     |
| updatedAt  | Date     | auto                     |

---

## 📡 API Reference

### Auth Endpoints

| Method | Endpoint         | Access  | Description         |
|--------|-----------------|---------|---------------------|
| POST   | /api/auth/signup | Public  | Register a new user |
| POST   | /api/auth/login  | Public  | Login, get token    |
| GET    | /api/auth/me     | Private | Get current user    |

#### POST /api/auth/signup
```json
// Request body
{ "name": "Alice", "email": "alice@example.com", "password": "secret123" }

// Response 201
{ "success": true, "token": "jwt...", "user": { "_id": "...", "name": "Alice", "email": "..." } }
```

#### POST /api/auth/login
```json
// Request body
{ "email": "alice@example.com", "password": "secret123" }

// Response 200
{ "success": true, "token": "jwt...", "user": { ... } }
```

---

### Journal Endpoints

| Method | Endpoint                        | Access   | Description                   |
|--------|---------------------------------|----------|-------------------------------|
| GET    | /api/journals/feed              | Public   | All public journals (paginated)|
| GET    | /api/journals/my                | Private  | Current user's journals        |
| POST   | /api/journals                   | Private  | Create new journal             |
| GET    | /api/journals/:id               | Mixed*   | Get journal by ID              |
| PUT    | /api/journals/:id               | Private  | Update journal                 |
| PATCH  | /api/journals/:id/visibility    | Private  | Toggle public/private          |
| DELETE | /api/journals/:id               | Private  | Delete journal                 |

\* Public journals are accessible to all; private journals only to the owner.

#### Query Params (feed & my)
- `page` (default: 1)
- `limit` (default: 10)
- `visibility` — for `/my` only: `"public"` or `"private"`

#### POST /api/journals
```json
// Headers: Authorization: Bearer <token>
// Body
{
  "title": "My First Entry",
  "content": "Today was a great day...",
  "visibility": "public",
  "tags": ["life", "gratitude"]
}
```

#### PATCH /api/journals/:id/visibility
Toggles visibility — no request body needed.

---

## 🔐 Authentication

All private routes require:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Dev**: nodemon
