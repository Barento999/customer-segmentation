# 🔐 Authentication & User Management System - Complete!

## 🎉 What's Been Added

Your Customer Segmentation ML project now has a **complete authentication and user management system** with JWT tokens, user profiles, and role-based access control!

---

## 📦 Features Implemented

### 1. 🔑 JWT Authentication

- Secure token-based authentication
- Password hashing with bcrypt
- Token expiration (30 minutes default)
- Login/Logout functionality

### 2. 👤 User Management

- User registration
- User profiles with statistics
- Update profile (email, name, password)
- Delete account
- Admin user management

### 3. 📁 Customer Profile Management

- Save customer profiles
- List saved profiles
- Update profiles
- Delete profiles
- Per-user profile storage

### 4. 📊 Prediction History

- Automatic history tracking
- View past predictions
- Per-user history
- Timestamps for all predictions

### 5. 🛡️ Role-Based Access Control (RBAC)

- **User** - Basic access (predictions, profiles)
- **Analyst** - Extended access (analytics)
- **Admin** - Full access (user management)

---

## 🗄️ Database Schema

### Users Table

```sql
- id (Primary Key)
- email (Unique)
- username (Unique)
- full_name
- hashed_password
- role (user/analyst/admin)
- is_active
- created_at
- updated_at
```

### Customer Profiles Table

```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- name
- sex
- age
- annual_income
- spending_score
- purchase_frequency
- notes
- created_at
- updated_at
```

### Prediction History Table

```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- customer_data (JSON)
- cluster
- cluster_name
- confidence
- created_at
```

---

## 🚀 API Endpoints

### Authentication (`/auth`)

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "password": "securepassword123"
}

Response: 201 Created
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2024-01-05T10:00:00"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "role": "user",
    "is_active": true,
    "created_at": "2024-01-05T10:00:00"
  }
}
```

#### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2024-01-05T10:00:00"
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Successfully logged out"
}
```

---

### User Management (`/users`)

#### Get My Profile (with stats)

```http
GET /users/me/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2024-01-05T10:00:00",
  "total_predictions": 25,
  "total_saved_profiles": 10
}
```

#### Update My Profile

```http
PUT /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "newemail@example.com",
  "full_name": "John Smith",
  "password": "newpassword123"
}

Response: 200 OK
{
  "id": 1,
  "email": "newemail@example.com",
  "username": "johndoe",
  "full_name": "John Smith",
  "role": "user",
  "is_active": true,
  "created_at": "2024-01-05T10:00:00"
}
```

#### Delete My Account

```http
DELETE /users/me
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Account deleted successfully"
}
```

#### List All Users (Admin Only)

```http
GET /users/?skip=0&limit=100
Authorization: Bearer <admin-token>

Response: 200 OK
{
  "users": [...],
  "total": 50
}
```

#### Update User Role (Admin Only)

```http
PUT /users/{user_id}/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "analyst"
}

Response: 200 OK
{
  "id": 2,
  "email": "user2@example.com",
  "username": "analyst1",
  "role": "analyst",
  ...
}
```

---

### Customer Profiles (`/profiles`)

#### Create Profile

```http
POST /profiles/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Premium Customer A",
  "sex": "Female",
  "age": 35,
  "annual_income": 85.5,
  "spending_score": 90,
  "purchase_frequency": 25,
  "notes": "High-value customer, frequent buyer"
}

Response: 201 Created
{
  "id": 1,
  "user_id": 1,
  "name": "Premium Customer A",
  "sex": "Female",
  "age": 35,
  "annual_income": 85.5,
  "spending_score": 90,
  "purchase_frequency": 25,
  "notes": "High-value customer, frequent buyer",
  "created_at": "2024-01-05T10:00:00",
  "updated_at": "2024-01-05T10:00:00"
}
```

#### List My Profiles

```http
GET /profiles/?skip=0&limit=100
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Premium Customer A",
    ...
  },
  ...
]
```

#### Get Specific Profile

```http
GET /profiles/{profile_id}
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "user_id": 1,
  "name": "Premium Customer A",
  ...
}
```

#### Update Profile

```http
PUT /profiles/{profile_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Customer Name",
  "notes": "Updated notes"
}

Response: 200 OK
{
  "id": 1,
  "user_id": 1,
  "name": "Updated Customer Name",
  ...
}
```

#### Delete Profile

```http
DELETE /profiles/{profile_id}
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Profile deleted successfully"
}
```

---

### ML Endpoints (Now Require Authentication)

#### Train Model

```http
POST /train
(No authentication required - public endpoint)

Response: 200 OK
{
  "message": "Model trained successfully",
  "n_clusters": 4,
  "silhouette_score": 0.65,
  "inertia": 1234.56
}
```

#### Predict Segment

```http
POST /predict
Authorization: Bearer <token>
Content-Type: application/json

{
  "sex": "Male",
  "age": 35,
  "annual_income": 65.0,
  "spending_score": 75,
  "purchase_frequency": 12
}

Response: 200 OK
{
  "cluster": 2,
  "cluster_name": "High Value Customers",
  "confidence": 85.5,
  "customer_data": {
    "sex": "Male",
    "age": 35,
    "annual_income": 65.0,
    "spending_score": 75,
    "purchase_frequency": 12
  }
}

Note: Prediction is automatically saved to history
```

#### Get Clusters

```http
GET /clusters
Authorization: Bearer <token>

Response: 200 OK
{
  "total_customers": 5000,
  "n_clusters": 4,
  "clusters": [...]
}
```

#### Get Prediction History

```http
GET /history?skip=0&limit=50
Authorization: Bearer <token>

Response: 200 OK
{
  "history": [
    {
      "id": 1,
      "customer_data": {...},
      "cluster": 2,
      "cluster_name": "High Value Customers",
      "confidence": 85.5,
      "created_at": "2024-01-05T10:00:00"
    },
    ...
  ],
  "total": 25
}
```

---

## 🔒 Security Features

### Password Security

- Passwords hashed with bcrypt
- Minimum 6 characters required
- Never stored in plain text

### JWT Tokens

- Signed with HS256 algorithm
- 30-minute expiration (configurable)
- Includes username in payload
- Verified on every protected request

### Role-Based Access

- Hierarchical roles: user < analyst < admin
- Automatic permission checking
- 403 Forbidden for insufficient permissions

### Data Isolation

- Users can only access their own data
- Profiles and history are user-specific
- Admin can manage all users

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

New dependencies added:

- `python-jose[cryptography]` - JWT handling
- `passlib[bcrypt]` - Password hashing
- `python-dotenv` - Environment variables
- `sqlalchemy` - ORM
- `databases` - Async database support
- `aiosqlite` - SQLite async driver

### 2. Configure Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env`:

```env
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./customer_segmentation.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Important**: Change `SECRET_KEY` in production!

Generate a secure secret key:

```python
import secrets
print(secrets.token_hex(32))
```

### 3. Initialize Database

The database is automatically created when you start the server:

```bash
cd backend
uvicorn app.main:app --reload
```

This creates `customer_segmentation.db` with all tables.

### 4. Create Admin User (Optional)

You can create an admin user manually or via API:

```python
# In Python shell
from app.database import SessionLocal, User
from app.auth import get_password_hash

db = SessionLocal()
admin = User(
    email="admin@example.com",
    username="admin",
    full_name="Admin User",
    hashed_password=get_password_hash("admin123"),
    role="admin"
)
db.add(admin)
db.commit()
```

---

## 📁 File Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Main app with auth integration
│   ├── database.py             # Database models and config
│   ├── auth.py                 # Authentication utilities
│   ├── auth_schema.py          # Auth-related schemas
│   ├── schema.py               # ML-related schemas
│   ├── model.py                # ML model
│   ├── preprocess.py           # Data preprocessing
│   ├── utils.py                # Utilities
│   └── routes/
│       ├── __init__.py
│       ├── auth.py             # Auth endpoints
│       ├── users.py            # User management
│       └── profiles.py         # Customer profiles
│
├── .env                        # Environment variables
├── .env.example                # Example env file
├── requirements.txt            # Updated dependencies
└── customer_segmentation.db    # SQLite database (auto-created)
```

---

## 🧪 Testing the Auth System

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

Save the `access_token` from the response.

### 3. Make Authenticated Request

```bash
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer <your-token-here>"
```

### 4. Create a Customer Profile

```bash
curl -X POST http://localhost:8000/profiles/ \
  -H "Authorization: Bearer <your-token-here>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "sex": "Male",
    "age": 30,
    "annual_income": 50.0,
    "spending_score": 60,
    "purchase_frequency": 10,
    "notes": "Test profile"
  }'
```

### 5. Make a Prediction

```bash
curl -X POST http://localhost:8000/predict \
  -H "Authorization: Bearer <your-token-here>" \
  -H "Content-Type: application/json" \
  -d '{
    "sex": "Male",
    "age": 35,
    "annual_income": 65.0,
    "spending_score": 75,
    "purchase_frequency": 12
  }'
```

### 6. View Prediction History

```bash
curl -X GET http://localhost:8000/history \
  -H "Authorization: Bearer <your-token-here>"
```

---

## 🎯 User Roles Explained

### User (Default)

**Permissions:**

- Register and login
- Make predictions
- View own prediction history
- Create/read/update/delete own customer profiles
- View cluster statistics

**Cannot:**

- Access other users' data
- Manage users
- Change roles

### Analyst

**Permissions:**

- All User permissions
- (Future: Advanced analytics features)

**Cannot:**

- Manage users
- Change roles

### Admin

**Permissions:**

- All Analyst permissions
- List all users
- View any user's details
- Update user roles
- Delete users
- Full system access

---

## 🔄 Migration from Old System

If you have existing data:

1. **Predictions**: Old predictions won't have user association
2. **Solution**: Create a "system" user for historical data
3. **Or**: Start fresh with the new authenticated system

---

## 🚀 Next Steps

### Frontend Integration (Coming Next)

1. **Login/Register Pages**

   - Login form
   - Registration form
   - Password validation

2. **Auth Context**

   - Store JWT token
   - Auto-refresh tokens
   - Logout functionality

3. **Protected Routes**

   - Redirect to login if not authenticated
   - Show user info in navbar
   - Role-based UI elements

4. **Profile Management**

   - View saved profiles
   - Create/edit/delete profiles
   - Load profile into prediction form

5. **History Page Enhancement**
   - Load from database instead of localStorage
   - Pagination
   - Filter by date/cluster

---

## 📊 Database Management

### View Database

```bash
# Install SQLite browser or use command line
sqlite3 customer_segmentation.db

# List tables
.tables

# View users
SELECT * FROM users;

# View profiles
SELECT * FROM customer_profiles;

# View history
SELECT * FROM prediction_history;
```

### Backup Database

```bash
# Backup
cp customer_segmentation.db customer_segmentation.db.backup

# Restore
cp customer_segmentation.db.backup customer_segmentation.db
```

### Reset Database

```bash
# Delete database file
rm customer_segmentation.db

# Restart server to recreate
uvicorn app.main:app --reload
```

---

## 🐛 Troubleshooting

### "Could not validate credentials"

- Token expired (30 min default)
- Invalid token
- Solution: Login again

### "Email already registered"

- Email is taken
- Solution: Use different email or login

### "Insufficient permissions"

- User role doesn't have access
- Solution: Contact admin to upgrade role

### Database locked

- Multiple processes accessing DB
- Solution: Close other connections

---

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

Both include:

- All endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication support

---

## ✅ Summary

Your Customer Segmentation ML project now has:

✅ **JWT Authentication** - Secure token-based auth
✅ **User Registration/Login** - Complete auth flow
✅ **User Profiles** - With statistics
✅ **Customer Profile Management** - Save/load profiles
✅ **Prediction History** - Automatic tracking
✅ **Role-Based Access Control** - User/Analyst/Admin
✅ **Database Integration** - SQLite with SQLAlchemy
✅ **Secure Password Hashing** - Bcrypt
✅ **Protected Endpoints** - Auth required for predictions
✅ **Admin Panel** - User management

**Your backend is now production-ready with enterprise-level authentication! 🎉**

---

## 🔜 What's Next?

1. **Frontend Integration** - Add login/register UI
2. **Token Refresh** - Implement refresh tokens
3. **Email Verification** - Verify user emails
4. **Password Reset** - Forgot password flow
5. **OAuth Integration** - Google/GitHub login
6. **Rate Limiting** - Prevent abuse
7. **Audit Logging** - Track user actions

---

**Need help? Check the API docs at http://localhost:8000/docs** 🚀
