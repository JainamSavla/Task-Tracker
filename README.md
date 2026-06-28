#  — Task Tracker (MERN Stack + JWT Auth):-https://task-tracker-sooty-beta.vercel.app/

A full-stack Task Tracker with user authentication. Each user sees only their own tasks.

---

## 📁 Project Structure

```
task-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js          ← User schema (bcrypt password hashing)
│   │   └── Task.js          ← Task schema (linked to user)
│   ├── routes/
│   │   ├── authRoutes.js    ← POST /api/auth/register & /login
│   │   └── taskRoutes.js    ← Full CRUD, JWT protected
│   ├── middleware/
│   │   ├── authMiddleware.js ← JWT verification
│   │   └── errorHandler.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx  ← Global auth state
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── AuthPage.css
    │   ├── components/
    │   │   ├── AddTaskForm.jsx / .css
    │   │   ├── TaskCard.jsx / .css
    │   │   ├── EditModal.jsx / .css
    │   │   └── Toast.jsx / .css
    │   ├── api.js           ← Axios with JWT interceptor
    │   ├── App.jsx
    │   └── index.js
    └── package.json
```

---

## 🚀 Setup & Run

### 1. Backend

```bash
cd backend
npm install
```

Edit `.env` (already configured for local):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tasktracker
JWT_SECRET=coll_edge_connect_super_secret_key_2026
JWT_EXPIRES_IN=7d
```

> For MongoDB Atlas: replace MONGO_URI with your Atlas connection string.
> For production: change JWT_SECRET to a long random string.

```bash
npm run dev    # development
npm start      # production
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔌 REST API Endpoints

### Auth (public)
| Method | Endpoint              | Body                          |
|--------|-----------------------|-------------------------------|
| POST   | /api/auth/register    | { name, email, password }     |
| POST   | /api/auth/login       | { email, password }           |

### Tasks (requires Bearer token)
| Method | Endpoint         | Description                    |
|--------|-----------------|--------------------------------|
| GET    | /api/tasks       | Get current user's tasks       |
| POST   | /api/tasks       | Create task                    |
| PUT    | /api/tasks/:id   | Update task (owner only)       |
| DELETE | /api/tasks/:id   | Delete task (owner only)       |

---

## ✅ Features

- JWT Authentication (register / login / logout)
- Passwords hashed with bcryptjs
- Token stored in localStorage, auto-attached to all requests
- Each user sees ONLY their own tasks
- Full CRUD with form validation (frontend + backend)
- Filter by status + text search
- Toast notifications
- Responsive UI

---

## 🌐 Deployment

**Backend** → Render / Railway (set environment variables in dashboard)  
**Frontend** → Vercel / Netlify (set REACT_APP_API_URL if not using proxy)

For production, update `frontend/src/api.js` baseURL to your deployed backend URL:
```js
const API = axios.create({ baseURL: 'https://your-backend.onrender.com/api' });
```
