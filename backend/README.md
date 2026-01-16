# Backend - Customer Segmentation API

FastAPI backend for customer segmentation using K-Means clustering with JWT authentication and role-based access control.

## 📋 Table of Contents

- [Technologies & Tools](#technologies--tools)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Database Management](#database-management)
- [Testing](#testing)
- [Project Structure](#project-structure)

## 🛠️ Technologies & Tools

### Core Framework

- **FastAPI** (>=0.109.0) - Modern, fast web framework for building APIs
- **Uvicorn** (>=0.27.0) - ASGI server for running FastAPI applications
- **Pydantic** (>=2.5.0) - Data validation using Python type annotations

### Machine Learning

- **scikit-learn** (>=1.3.0) - K-Means clustering algorithm and model training
- **pandas** (>=2.0.0) - Data manipulation and analysis
- **numpy** (>=1.24.0) - Numerical computing and array operations
- **joblib** (>=1.3.0) - Model serialization and persistence

### Authentication & Security

- **python-jose[cryptography]** (>=3.3.0) - JWT token creation and validation
- **passlib[bcrypt]** (>=1.7.4) - Password hashing with bcrypt
- **python-dotenv** (>=1.0.0) - Environment variable management

### Database

- **SQLAlchemy** (>=2.0.0) - SQL toolkit and ORM
- **databases** (>=0.8.0) - Async database support
- **aiosqlite** (>=0.19.0) - Async SQLite driver

### Additional Tools

- **python-multipart** (>=0.0.6) - Form data parsing for file uploads

### Development Tools

- **pytest** (>=7.4.0) - Testing framework
- **pytest-asyncio** (>=0.21.0) - Async test support
- **pytest-cov** (>=4.1.0) - Code coverage reporting
- **httpx** (>=0.25.0) - HTTP client for testing APIs

## 🚀 Setup & Installation

### 1. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
# Production dependencies
pip install -r requirements.txt

# Development dependencies (for testing)
pip install -r requirements-dev.txt
```

### 3. Generate Dataset

```bash
python generate_dataset.py
```

This creates a CSV file with 5000 customer records in `data/customers.csv`.

### 4. Create Admin User

```bash
python create_admin.py
```

This creates:

- Admin user: `admin` / `admin123`
- Test user: `testuser` / `test123`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# JWT Configuration
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database
DATABASE_URL=sqlite:///./customer_segmentation.db

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Important:** Change `SECRET_KEY` in production!

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
uvicorn app.main:app --reload
```

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, access interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔌 API Endpoints

### Health Check

- `GET /` - Health check endpoint

### Authentication (`/auth`)

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user info
- `POST /auth/logout` - Logout user

### Machine Learning

- `POST /train` - Train K-Means clustering model
- `POST /predict` - Predict customer segment (requires auth)
- `GET /clusters` - Get cluster statistics (requires auth)
- `GET /elbow` - Get elbow method data for visualization (requires auth)
- `GET /history` - Get prediction history (requires auth)

### User Management (`/users`)

- `GET /users/me/profile` - Get current user profile with stats
- `PUT /users/me` - Update current user profile
- `DELETE /users/me` - Delete current user account
- `GET /users/` - List all users (admin only)
- `GET /users/{user_id}` - Get user by ID (admin only)
- `PUT /users/{user_id}/role` - Update user role (admin only)
- `DELETE /users/{user_id}` - Delete user (admin only)

### Customer Profiles (`/profiles`)

- `POST /profiles/` - Create customer profile
- `GET /profiles/` - List user's customer profiles
- `GET /profiles/{profile_id}` - Get specific profile
- `PUT /profiles/{profile_id}` - Update profile
- `DELETE /profiles/{profile_id}` - Delete profile

### Admin (`/admin`)

- `GET /admin/users` - Get all users with statistics
- `GET /admin/users/{user_id}` - Get user by ID
- `PUT /admin/users/{user_id}/role` - Update user role
- `DELETE /admin/users/{user_id}` - Delete user
- `PUT /admin/users/{user_id}/toggle-active` - Toggle user active status
- `GET /admin/stats` - Get system statistics

### User Roles

- **user** - Basic access to predictions and profiles
- **analyst** - Enhanced access (future features)
- **admin** - Full system access and user management

## 💾 Database Management

### Database Schema

The application uses SQLite with the following tables:

- **users** - User accounts with authentication
- **customer_profiles** - Saved customer profiles
- **prediction_history** - History of predictions made

### Database Location

`customer_segmentation.db` in the backend directory

### Reset Database

To reset the database, delete the file and restart the server:

```bash
# Windows
del customer_segmentation.db

# Mac/Linux
rm customer_segmentation.db
```

Then run `create_admin.py` again to recreate admin user.

## 🧪 Testing

### Run All Tests

```bash
pytest
```

### Run with Coverage

```bash
pytest --cov=app --cov-report=html
```

### Run Specific Test File

```bash
pytest tests/test_api.py
pytest tests/test_model.py
pytest tests/test_schema.py
```

### Test Files

- `tests/test_api.py` - API endpoint tests
- `tests/test_model.py` - ML model tests
- `tests/test_schema.py` - Data validation tests
- `tests/conftest.py` - Test fixtures and configuration

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── auth.py              # Authentication utilities
│   ├── auth_schema.py       # Authentication Pydantic schemas
│   ├── database.py          # Database models and connection
│   ├── model.py             # ML model wrapper class
│   ├── preprocess.py        # Data preprocessing functions
│   ├── schema.py            # API Pydantic schemas
│   ├── utils.py             # Utility functions
│   └── routes/
│       ├── __init__.py
│       ├── auth.py          # Authentication routes
│       ├── users.py         # User management routes
│       ├── profiles.py      # Customer profile routes
│       └── admin.py         # Admin routes
├── data/
│   └── customers.csv        # Training dataset
├── models/
│   ├── kmeans.pkl           # Trained K-Means model
│   └── scaler.pkl           # Feature scaler
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_api.py
│   ├── test_model.py
│   └── test_schema.py
├── notebooks/
│   └── experimentation.ipynb # Jupyter notebook for experiments
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Example environment variables
├── requirements.txt         # Production dependencies
├── requirements-dev.txt     # Development dependencies
├── generate_dataset.py      # Dataset generation script
├── create_admin.py          # Admin user creation script
├── pytest.ini               # Pytest configuration
└── README.md                # This file
```

## 🔐 Security Notes

1. **Change SECRET_KEY** in production
2. **Use HTTPS** in production
3. **Configure CORS** properly for your frontend domain
4. **Use strong passwords** for admin accounts
5. **Regularly update dependencies** for security patches

## 📝 License

This project is part of a customer segmentation application.
