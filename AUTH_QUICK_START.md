# 🚀 Authentication System - Quick Start

## ⚡ 3-Step Setup

### Step 1: Install Dependencies

```bash
setup-auth.bat
```

This will:

- Install authentication packages
- Create `.env` file
- Initialize database

### Step 2: Start Backend

```bash
cd backend
uvicorn app.main:app --reload
```

### Step 3: Test Authentication

Visit: http://localhost:8000/docs

---

## 🧪 Quick Test

### 1. Register a User

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "full_name": "Test User",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Save the `access_token` from response!**

### 3. Make Authenticated Request

```bash
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📚 Key Endpoints

| Endpoint            | Method | Auth | Description                        |
| ------------------- | ------ | ---- | ---------------------------------- |
| `/auth/register`    | POST   | No   | Register new user                  |
| `/auth/login`       | POST   | No   | Login and get token                |
| `/auth/me`          | GET    | Yes  | Get current user                   |
| `/users/me/profile` | GET    | Yes  | Get profile with stats             |
| `/profiles/`        | POST   | Yes  | Save customer profile              |
| `/profiles/`        | GET    | Yes  | List saved profiles                |
| `/predict`          | POST   | Yes  | Make prediction (saves to history) |
| `/history`          | GET    | Yes  | View prediction history            |

---

## 🔑 User Roles

- **user** - Basic access (default)
- **analyst** - Extended analytics
- **admin** - Full system access

---

## 📖 Full Documentation

See `AUTH_SYSTEM_COMPLETE.md` for:

- Complete API reference
- All endpoints with examples
- Security features
- Database schema
- Troubleshooting

---

## ✅ What You Get

✅ JWT Authentication
✅ User Registration/Login
✅ Password Hashing (bcrypt)
✅ User Profiles
✅ Save Customer Profiles
✅ Prediction History
✅ Role-Based Access Control
✅ Admin User Management

---

**Ready to use! 🎉**
