# Customer Segmentation Backend - Technical Documentation

## Project Overview

**Project Name:** Customer Segmentation API  
**Version:** 2.0.0  
**Technology Stack:** FastAPI, Python, Machine Learning (K-Means Clustering)  
**Database:** SQLite with SQLAlchemy ORM  
**Authentication:** JWT (JSON Web Tokens) with bcrypt password hashing

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [Authentication & Authorization](#authentication--authorization)
6. [API Endpoints](#api-endpoints)
7. [Machine Learning Model](#machine-learning-model)
8. [Data Processing Pipeline](#data-processing-pipeline)
9. [Security Features](#security-features)
10. [Installation & Setup](#installation--setup)
11. [Testing](#testing)
12. [Deployment Considerations](#deployment-considerations)

---

## 1. Introduction

The Customer Segmentation Backend is a sophisticated REST API built with FastAPI that leverages machine learning to segment customers into distinct groups based on their behavioral and demographic characteristics. This system enables businesses to:

- **Automatically classify customers** into meaningful segments
- **Predict customer behavior** using K-Means clustering algorithm
- **Manage user authentication** with role-based access control
- **Track prediction history** for analytics and reporting
- **Provide secure multi-user access** with admin capabilities

### Key Features

- ✅ Machine Learning-powered customer segmentation
- ✅ JWT-based authentication system
- ✅ Role-based access control (User, Analyst, Admin)
- ✅ RESTful API with automatic documentation
- ✅ Prediction history tracking
- ✅ Customer profile management
- ✅ Admin dashboard capabilities
- ✅ Optimal cluster detection using Elbow Method
- ✅ Real-time confidence scoring

---

## 2. System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────────────────────────┐
│      FastAPI Backend                │
│  ┌──────────────────────────────┐  │
│  │   API Layer (main.py)        │  │
│  └──────────┬───────────────────┘  │
│             │                       │
│  ┌──────────▼───────────────────┐  │
│  │   Authentication Layer       │  │
│  │   (JWT, bcrypt)              │  │
│  └──────────┬───────────────────┘  │
│             │                       │
│  ┌──────────▼───────────────────┐  │
│  │   Business Logic Layer       │  │
│  │   - Routes (auth, users,     │  │
│  │     profiles, admin)         │  │
│  │   - ML Model Management      │  │
│  └──────────┬───────────────────┘  │
│             │                       │
│  ┌──────────▼───────────────────┐  │
│  │   Data Layer                 │  │
│  │   - SQLAlchemy ORM           │  │
│  │   - Database Models          │  │
│  └──────────┬───────────────────┘  │
└─────────────┼───────────────────────┘
              │
```

              ▼
    ┌──────────────────┐
    │  SQLite Database │
    │  - Users         │
    │  - Profiles      │
    │  - History       │
    └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │  ML Models       │
    │  - KMeans Model  │
    │  - Scaler        │
    └──────────────────┘

```

### Directory Structure

```

backend/
├── app/
│ ├── **init**.py
│ ├── main.py # FastAPI application entry point
│ ├── database.py # Database models and configuration
│ ├── auth.py # Authentication utilities
│ ├── auth_schema.py # Authentication Pydantic schemas
│ ├── schema.py # API request/response schemas
│ ├── model.py # ML model wrapper class
│ ├── preprocess.py # Data preprocessing functions
│ ├── utils.py # Utility functions
│ └── routes/
│ ├── auth.py # Authentication endpoints
│ ├── users.py # User management endpoints
│ ├── profiles.py # Customer profile endpoints
│ └── admin.py # Admin-only endpoints
├── data/
│ └── customers.csv # Customer dataset
├── models/
│ ├── kmeans.pkl # Trained K-Means model
│ └── scaler.pkl # Feature scaler
├── tests/
│ ├── conftest.py # Test configuration
│ ├── test_api.py # API endpoint tests
│ ├── test_model.py # ML model tests
│ └── test_schema.py # Schema validation tests
├── requirements.txt # Python dependencies
├── requirements-dev.txt # Development dependencies
├── create_admin.py # Admin user creation script
└── README.md # Project documentation

```

---

## 3. Technology Stack

### Core Technologies

```

| Technology       | Version  | Purpose                                |
| ---------------- | -------- | -------------------------------------- |
| **FastAPI**      | ≥0.109.0 | Modern, high-performance web framework |
| **Python**       | 3.8+     | Programming language                   |
| **Uvicorn**      | ≥0.27.0  | ASGI server for FastAPI                |
| **SQLAlchemy**   | ≥2.0.0   | ORM for database operations            |
| **SQLite**       | 3.x      | Lightweight database                   |
| **Scikit-learn** | ≥1.3.0   | Machine learning library               |
| **Pandas**       | ≥2.0.0   | Data manipulation                      |
| **NumPy**        | ≥1.24.0  | Numerical computing                    |

### Authentication & Security

| Library           | Purpose                           |
| ----------------- | --------------------------------- |
| **python-jose**   | JWT token creation and validation |
| **bcrypt**        | Password hashing                  |
| **python-dotenv** | Environment variable management   |

### Data Processing

| Library      | Purpose                           |
| ------------ | --------------------------------- |
| **Joblib**   | Model serialization               |
| **Pydantic** | Data validation and serialization |

---

## 4. Database Design

### Entity Relationship Diagram

```
┌─────────────────────┐
│       Users         │
├─────────────────────┤
│ id (PK)             │
│ email (UNIQUE)      │
│ username (UNIQUE)   │
│ full_name           │
│ hashed_password     │
│ role                │
│ is_active           │
│ created_at          │
│ updated_at          │
└──────────┬──────────┘
           │
           │ 1:N
           │
     ┌─────┴──────┬──────────────────┐
     │            │                  │
     ▼            ▼                  ▼
┌────────────┐ ┌──────────────┐ ┌──────────────┐
│  Customer  │ │  Prediction  │ │   (Future    │
│  Profiles  │ │   History    │ │  Extensions) │
├────────────┤ ├──────────────┤ └──────────────┘
│ id (PK)    │ │ id (PK)      │
│ user_id(FK)│ │ user_id (FK) │
│ name       │ │ customer_data│
│ sex        │ │ cluster      │
│ age        │ │ cluster_name │
│ income     │ │ confidence   │
│ spending   │ │ created_at   │
│ frequency  │ └──────────────┘
│ notes      │
│ created_at │
│ updated_at │
└────────────┘
```

### Database Models

#### 1. User Model

**Purpose:** Stores user account information and authentication credentials

**Fields:**

- `id` (Integer, Primary Key): Unique user identifier
- `email` (String, Unique): User's email address
- `username` (String, Unique): User's login username
- `full_name` (String): User's full name
- `hashed_password` (String): Bcrypt-hashed password
- `role` (String): User role (user, analyst, admin)
- `is_active` (Boolean): Account active status
- `created_at` (DateTime): Account creation timestamp
- `updated_at` (DateTime): Last update timestamp

**Relationships:**

- One-to-Many with CustomerProfile
- One-to-Many with PredictionHistory

#### 2. CustomerProfile Model

**Purpose:** Stores saved customer profiles for quick access

**Fields:**

- `id` (Integer, Primary Key): Unique profile identifier
- `user_id` (Integer, Foreign Key): Owner user ID
- `name` (String): Customer name
- `sex` (String): Customer gender
- `age` (Integer): Customer age
- `annual_income` (Integer): Annual income in thousands
- `spending_score` (Integer): Spending score (1-100)
- `purchase_frequency` (Integer): Purchases per year
- `notes` (Text): Additional notes
- `created_at` (DateTime): Creation timestamp
- `updated_at` (DateTime): Last update timestamp

#### 3. PredictionHistory Model

**Purpose:** Tracks all predictions made by users

**Fields:**

- `id` (Integer, Primary Key): Unique history entry ID
- `user_id` (Integer, Foreign Key): User who made prediction
- `customer_data` (Text): JSON string of customer data
- `cluster` (Integer): Predicted cluster number
- `cluster_name` (String): Human-readable cluster name
- `confidence` (Integer): Prediction confidence (0-100)
- `created_at` (DateTime): Prediction timestamp

---

## 5. Authentication & Authorization

### Authentication Flow

```
1. User Registration
   ├─> POST /auth/register
   ├─> Validate input data
   ├─> Check email/username uniqueness
   ├─> Hash password with bcrypt
   ├─> Create user record
   └─> Return user data

2. User Login
   ├─> POST /auth/login
   ├─> Validate credentials
   ├─> Verify password hash
   ├─> Generate JWT token
   └─> Return token + user data

3. Protected Endpoint Access
   ├─> Include JWT in Authorization header
   ├─> Validate token signature
   ├─> Extract user information
   ├─> Check user active status
   ├─> Verify role permissions
   └─> Grant/Deny access
```

### JWT Token Structure

```json
{
  "sub": "username",
  "exp": 1234567890,
  "iat": 1234567890
}
```

**Token Configuration:**

- Algorithm: HS256
- Expiration: 30 minutes (configurable)
- Secret Key: Environment variable (SECRET_KEY)

### Password Security

- **Hashing Algorithm:** bcrypt with salt
- **Salt Rounds:** Automatic (bcrypt default)
- **Password Requirements:** Enforced at frontend level
- **Storage:** Only hashed passwords stored in database

### Role-Based Access Control (RBAC)

#### Role Hierarchy

```
Admin (Level 2)
  ├─> Full system access
  ├─> User management
  ├─> Role assignment
  └─> System statistics

Analyst (Level 1)
  ├─> All user features
  ├─> Advanced analytics
  └─> Bulk operations

User (Level 0)
  ├─> Basic predictions
  ├─> Profile management
  └─> History viewing
```

#### Permission Matrix

| Feature            | User | Analyst | Admin |
| ------------------ | ---- | ------- | ----- |
| Register/Login     | ✅   | ✅      | ✅    |
| Make Predictions   | ✅   | ✅      | ✅    |
| View Own History   | ✅   | ✅      | ✅    |
| Save Profiles      | ✅   | ✅      | ✅    |
| Update Own Profile | ✅   | ✅      | ✅    |
| View All Users     | ❌   | ❌      | ✅    |
| Manage Users       | ❌   | ❌      | ✅    |
| Change User Roles  | ❌   | ❌      | ✅    |
| System Statistics  | ❌   | ❌      | ✅    |

---

## 6. API Endpoints

### Authentication Endpoints

#### POST /auth/register

**Purpose:** Register a new user account

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2024-01-17T10:30:00"
}
```

#### POST /auth/login

**Purpose:** Authenticate user and receive JWT token

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### GET /auth/me

**Purpose:** Get current authenticated user information

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true
}
```

### Machine Learning Endpoints

#### POST /train

**Purpose:** Train the K-Means clustering model

**Authentication:** Not required (public endpoint)

**Response (200 OK):**

```json
{
  "message": "Model trained successfully",
  "n_clusters": 5,
  "silhouette_score": 0.4523,
  "inertia": 12345.67
}
```

#### POST /predict

**Purpose:** Predict customer segment

**Authentication:** Required

**Request Body:**

```json
{
  "sex": "Male",
  "age": 35,
  "annual_income": 65.0,
  "spending_score": 75,
  "purchase_frequency": 12
}
```

**Response (200 OK):**

```json
{
  "cluster": 2,
  "cluster_name": "High Value Customers",
  "confidence": 87,
  "customer_data": {
    "sex": "Male",
    "age": 35,
    "annual_income": 65.0,
    "spending_score": 75,
    "purchase_frequency": 12
  }
}
```

#### GET /clusters

**Purpose:** Get statistics for all customer clusters

**Authentication:** Required

**Response (200 OK):**

```json
{
  "total_customers": 5000,
  "n_clusters": 5,
  "clusters": [
    {
      "cluster_id": 0,
      "cluster_name": "Budget Conscious",
      "size": 1200,
      "avg_age": 42.5,
      "avg_income": 35.2,
      "avg_spending_score": 35.8,
      "avg_purchase_frequency": 8.3
    }
  ]
}
```

#### GET /elbow

**Purpose:** Get elbow method data for cluster optimization

**Authentication:** Required

**Response (200 OK):**

```json
{
  "optimal_k": 5,
  "k_range": [2, 3, 4, 5, 6, 7, 8, 9, 10],
  "inertias": [45000, 32000, 25000, 20000, 18000, 17000, 16500, 16200, 16000],
  "silhouette_scores": [0.35, 0.38, 0.42, 0.45, 0.43, 0.41, 0.39, 0.37, 0.36]
}
```

#### GET /history

**Purpose:** Get prediction history for current user

**Authentication:** Required

**Query Parameters:**

- `skip` (int): Number of records to skip (default: 0)
- `limit` (int): Maximum records to return (default: 50)

**Response (200 OK):**

```json
{
  "history": [
    {
      "id": 1,
      "customer_data": {...},
      "cluster": 2,
      "cluster_name": "High Value Customers",
      "confidence": 87,
      "created_at": "2024-01-17T10:30:00"
    }
  ],
  "total": 25
}
```

### User Management Endpoints

#### GET /users/me/profile

**Purpose:** Get current user's profile with statistics

**Authentication:** Required

**Response (200 OK):**

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user",
  "total_predictions": 25,
  "total_saved_profiles": 5
}
```

#### PUT /users/me

**Purpose:** Update current user's profile

**Authentication:** Required

**Request Body:**

```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "full_name": "New Name",
  "password": "NewPassword123!"
}
```

#### DELETE /users/me

**Purpose:** Delete current user's account

**Authentication:** Required

**Response (200 OK):**

```json
{
  "message": "Account deleted successfully"
}
```

### Customer Profile Endpoints

#### POST /profiles/

**Purpose:** Create a new customer profile

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Customer ABC",
  "sex": "Female",
  "age": 28,
  "annual_income": 55,
  "spending_score": 80,
  "purchase_frequency": 15,
  "notes": "VIP customer"
}
```

#### GET /profiles/

**Purpose:** List current user's customer profiles

**Authentication:** Required

**Query Parameters:**

- `skip` (int): Pagination offset
- `limit` (int): Maximum records

#### GET /profiles/{profile_id}

**Purpose:** Get specific customer profile

**Authentication:** Required

#### PUT /profiles/{profile_id}

**Purpose:** Update customer profile

**Authentication:** Required

#### DELETE /profiles/{profile_id}

**Purpose:** Delete customer profile

**Authentication:** Required

### Admin Endpoints

#### GET /admin/users

**Purpose:** Get all users with system statistics

**Authentication:** Admin role required

**Response (200 OK):**

```json
{
  "users": [...],
  "total": 150,
  "total_predictions": 5000,
  "total_profiles": 300
}
```

#### GET /admin/users/{user_id}

**Purpose:** Get specific user by ID

**Authentication:** Admin role required

#### PUT /admin/users/{user_id}/role

**Purpose:** Update user role

**Authentication:** Admin role required

**Request Body:**

```json
{
  "role": "analyst"
}
```

#### DELETE /admin/users/{user_id}

**Purpose:** Delete user account

**Authentication:** Admin role required

#### PUT /admin/users/{user_id}/toggle-active

**Purpose:** Toggle user active status

**Authentication:** Admin role required

#### GET /admin/stats

**Purpose:** Get comprehensive system statistics

**Authentication:** Admin role required

**Response (200 OK):**

```json
{
  "total_users": 150,
  "active_users": 145,
  "inactive_users": 5,
  "total_predictions": 5000,
  "total_profiles": 300,
  "users_by_role": {
    "user": 140,
    "analyst": 8,
    "admin": 2
  }
}
```

---

## 7. Machine Learning Model

### K-Means Clustering Algorithm

**Purpose:** Segment customers into distinct groups based on behavioral patterns

### Features Used for Clustering

1. **Age** - Customer age (18-100 years)
2. **Annual Income** - Income in thousands (normalized)
3. **Spending Score** - Spending behavior score (1-100)
4. **Purchase Frequency** - Number of purchases per year

### Model Training Process

```python
# Training Pipeline
1. Load Dataset
   └─> Read customers.csv (5000+ records)

2. Data Preprocessing
   ├─> Select features: Age, Income, Spending, Frequency
   ├─> Handle missing values
   └─> Standardize features using StandardScaler

3. Optimal Cluster Detection (Elbow Method)
   ├─> Test k values from 2 to 10
   ├─> Calculate inertia for each k
   ├─> Calculate silhouette score for each k
   └─> Select k with highest silhouette score

4. Train K-Means Model
   ├─> Initialize with optimal k
   ├─> Fit model on scaled features
   ├─> Calculate cluster centers
   └─> Evaluate with silhouette score

5. Save Models
   ├─> Serialize K-Means model (kmeans.pkl)
   └─> Serialize StandardScaler (scaler.pkl)
```

### Cluster Naming Logic

Clusters are automatically named based on their characteristics:

```python
def get_cluster_name(cluster_id, centers, features):
    """
    Analyze cluster center values to assign meaningful names

    Examples:
    - High income + High spending = "High Value Customers"
    - Low income + Low spending = "Budget Conscious"
    - High income + Low spending = "Potential Growth"
    - Young age + High frequency = "Young Enthusiasts"
    """
```

### Confidence Calculation

```python
def calculate_confidence(distances, predicted_cluster):
    """
    Calculate prediction confidence based on distance to cluster centers

    Formula:
    - Get distance to predicted cluster center
    - Get distance to nearest other cluster
    - Confidence = (1 - distance_to_predicted / distance_to_nearest) * 100

    Range: 0-100 (higher = more confident)
    """
```

### Model Evaluation Metrics

1. **Silhouette Score** (0 to 1)

   - Measures cluster cohesion and separation
   - Higher is better
   - Typical range: 0.35 - 0.55

2. **Inertia** (Sum of squared distances)

   - Measures within-cluster variance
   - Lower is better
   - Used in elbow method

3. **Cluster Size Distribution**
   - Ensures balanced cluster sizes
   - Prevents over-segmentation

---

## 8. Data Processing Pipeline

### Data Flow Diagram

```
User Input (Customer Data)
         │
         ▼
┌─────────────────────┐
│  Input Validation   │
│  (Pydantic Schema)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Feature Extraction │
│  [Age, Income,      │
│   Spending, Freq]   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Feature Scaling    │
│  (StandardScaler)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  K-Means Prediction │
│  (Cluster ID)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Post-Processing    │
│  - Cluster Name     │
│  - Confidence Score │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Save to Database   │
│  (Prediction History)│
└──────────┬──────────┘
           │
           ▼
    Return Response
```

### Data Validation

**Input Validation Rules:**

```python
class CustomerInput(BaseModel):
    sex: str                    # "Male" or "Female"
    age: int                    # 18 <= age <= 100
    annual_income: float        # >= 0
    spending_score: int         # 1 <= score <= 100
    purchase_frequency: int     # >= 0
```

**Validation Errors:**

- 400 Bad Request: Invalid input format
- 422 Unprocessable Entity: Validation failed

### Feature Scaling

**StandardScaler Transformation:**

```
scaled_value = (value - mean) / standard_deviation
```

**Benefits:**

- Normalizes feature ranges
- Prevents feature dominance
- Improves clustering accuracy

---

## 9. Security Features

### Security Measures Implemented

#### 1. Password Security

- **Hashing:** bcrypt with automatic salt generation
- **Storage:** Only hashed passwords stored
- **Verification:** Constant-time comparison
- **No Plain Text:** Passwords never logged or stored in plain text

#### 2. JWT Token Security

- **Signing:** HMAC-SHA256 algorithm
- **Secret Key:** Environment variable (not hardcoded)
- **Expiration:** 30-minute token lifetime
- **Validation:** Signature and expiration checked on every request

#### 3. CORS Configuration

```python
CORSMiddleware(
    allow_origins=["*"],        # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
```

**Production Recommendation:** Specify exact frontend origins

#### 4. SQL Injection Prevention

- **ORM Usage:** SQLAlchemy prevents SQL injection
- **Parameterized Queries:** All queries use bound parameters
- **No Raw SQL:** Direct SQL execution avoided

#### 5. Input Validation

- **Pydantic Schemas:** Automatic validation
- **Type Checking:** Strict type enforcement
- **Range Validation:** Min/max constraints on numeric fields

#### 6. Role-Based Access Control

- **Hierarchical Roles:** User < Analyst < Admin
- **Endpoint Protection:** Decorators enforce permissions
- **Self-Protection:** Admins cannot delete/demote themselves

#### 7. Database Security

- **Connection String:** Environment variable
- **Cascade Deletion:** Automatic cleanup of related records
- **Foreign Key Constraints:** Data integrity enforcement

### Security Best Practices

**Environment Variables (.env):**

```bash
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./customer_segmentation.db
```

**Production Checklist:**

- ✅ Change SECRET_KEY to strong random value
- ✅ Use HTTPS for all communications
- ✅ Configure specific CORS origins
- ✅ Use PostgreSQL instead of SQLite
- ✅ Enable rate limiting
- ✅ Implement request logging
- ✅ Add API key authentication for sensitive endpoints
- ✅ Regular security audits

---

## 10. Installation & Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment tool (venv or virtualenv)

### Step-by-Step Installation

#### 1. Clone Repository

```bash
git clone <repository-url>
cd backend
```

#### 2. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

**Core Dependencies:**

```
fastapi>=0.109.0
uvicorn>=0.27.0
scikit-learn>=1.3.0
pandas>=2.0.0
numpy>=1.24.0
joblib>=1.3.0
python-multipart>=0.0.6
pydantic>=2.5.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
python-dotenv>=1.0.0
sqlalchemy>=2.0.0
```

#### 4. Configure Environment Variables

```bash
# Create .env file
cp .env.example .env

# Edit .env with your configuration
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./customer_segmentation.db
```

#### 5. Initialize Database

```bash
# Database tables are created automatically on first run
python -c "from app.database import init_db; init_db()"
```

#### 6. Generate Dataset (Optional)

```bash
python generate_dataset.py
```

#### 7. Create Admin User

```bash
python create_admin.py
```

**Admin Credentials:**

- Username: admin
- Password: admin123 (change immediately!)
- Email: admin@example.com

#### 8. Train ML Model

```bash
# Start the server first
uvicorn app.main:app --reload

# In another terminal, train the model
curl -X POST http://localhost:8000/train
```

#### 9. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Server will be available at:**

- API: http://localhost:8000
- Swagger Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Quick Start Scripts

**Windows:**

```batch
setup-backend.bat    # Install dependencies
start-backend.bat    # Start server
```

---

## 11. Testing

### Test Structure

```
tests/
├── conftest.py           # Test configuration and fixtures
├── test_api.py           # API endpoint tests
├── test_model.py         # ML model tests
└── test_schema.py        # Schema validation tests
```

### Running Tests

#### Install Test Dependencies

```bash
pip install -r requirements-dev.txt
```

**Test Dependencies:**

```
pytest>=7.4.0
pytest-cov>=4.1.0
httpx>=0.24.0
```

#### Run All Tests

```bash
pytest
```

#### Run with Coverage

```bash
pytest --cov=app --cov-report=html
```

#### Run Specific Test File

```bash
pytest tests/test_api.py
```

#### Run Specific Test Function

```bash
pytest tests/test_api.py::test_register_user
```

### Test Categories

#### 1. API Tests (test_api.py)

- User registration
- User login
- Authentication flow
- Protected endpoints
- Admin endpoints
- Prediction endpoints
- Profile management

#### 2. Model Tests (test_model.py)

- Model training
- Prediction accuracy
- Cluster statistics
- Feature scaling
- Model persistence

#### 3. Schema Tests (test_schema.py)

- Input validation
- Response serialization
- Error handling
- Edge cases

### Test Coverage Goals

- **Overall Coverage:** > 80%
- **Critical Paths:** > 95%
- **Authentication:** 100%
- **ML Model:** > 85%

---

## 12. Deployment Considerations

### Production Deployment Checklist

#### Infrastructure

- [ ] Use production-grade database (PostgreSQL, MySQL)
- [ ] Configure reverse proxy (Nginx, Apache)
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

#### Application Configuration

- [ ] Change SECRET_KEY to strong random value
- [ ] Update CORS origins to specific domains
- [ ] Set appropriate token expiration times
- [ ] Configure database connection pooling
- [ ] Enable production logging
- [ ] Disable debug mode

#### Security Hardening

- [ ] Implement rate limiting
- [ ] Add request size limits
- [ ] Configure security headers
- [ ] Enable HTTPS only
- [ ] Implement API versioning
- [ ] Add request validation middleware

### Deployment Options

#### 1. Docker Deployment

**Dockerfile:**

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Docker Compose:**

```yaml
version: "3.8"

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - DATABASE_URL=${DATABASE_URL}
    volumes:
      - ./data:/app/data
      - ./models:/app/models
```

#### 2. Cloud Platforms

**AWS Deployment:**

- Elastic Beanstalk
- ECS/Fargate
- Lambda (with API Gateway)

**Google Cloud:**

- Cloud Run
- App Engine
- Compute Engine

**Azure:**

- App Service
- Container Instances
- Functions

#### 3. Traditional Server

**Using Gunicorn:**

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Systemd Service:**

```ini
[Unit]
Description=Customer Segmentation API
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/backend
Environment="PATH=/var/www/backend/venv/bin"
ExecStart=/var/www/backend/venv/bin/gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker

[Install]
WantedBy=multi-user.target
```

### Performance Optimization

#### 1. Database Optimization

- Use connection pooling
- Add database indexes on frequently queried fields
- Implement query optimization
- Use database caching (Redis)

#### 2. API Optimization

- Implement response caching
- Use async/await for I/O operations
- Add pagination to list endpoints
- Compress responses (gzip)

#### 3. ML Model Optimization

- Cache loaded models in memory
- Use model versioning
- Implement batch prediction endpoints
- Consider model quantization for faster inference

#### 4. Monitoring & Logging

**Recommended Tools:**

- **Logging:** Python logging module, Loguru
- **Monitoring:** Prometheus, Grafana
- **Error Tracking:** Sentry
- **Performance:** New Relic, DataDog

**Key Metrics to Monitor:**

- Request rate and latency
- Error rates by endpoint
- Database query performance
- Model prediction time
- Memory and CPU usage
- Active user sessions

### Scaling Strategies

#### Horizontal Scaling

- Deploy multiple instances behind load balancer
- Use stateless architecture
- Implement distributed caching
- Database read replicas

#### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize database configuration
- Tune application settings

---

## Appendix A: API Response Codes

| Code | Meaning               | Usage                              |
| ---- | --------------------- | ---------------------------------- |
| 200  | OK                    | Successful GET, PUT, DELETE        |
| 201  | Created               | Successful POST (resource created) |
| 400  | Bad Request           | Invalid input data                 |
| 401  | Unauthorized          | Missing or invalid token           |
| 403  | Forbidden             | Insufficient permissions           |
| 404  | Not Found             | Resource doesn't exist             |
| 422  | Unprocessable Entity  | Validation error                   |
| 500  | Internal Server Error | Server-side error                  |

---

## Appendix B: Database Schema SQL

```sql
-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR,
    hashed_password VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'user',
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customer Profiles Table
CREATE TABLE customer_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    sex VARCHAR,
    age INTEGER,
    annual_income INTEGER,
    spending_score INTEGER,
    purchase_frequency INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Prediction History Table
CREATE TABLE prediction_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    customer_data TEXT NOT NULL,
    cluster INTEGER,
    cluster_name VARCHAR,
    confidence INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_profiles_user_id ON customer_profiles(user_id);
CREATE INDEX idx_history_user_id ON prediction_history(user_id);
CREATE INDEX idx_history_created_at ON prediction_history(created_at);
```

---

## Appendix C: Environment Variables Reference

| Variable                      | Type   | Default              | Description         |
| ----------------------------- | ------ | -------------------- | ------------------- |
| `SECRET_KEY`                  | string | "your-secret-key..." | JWT signing secret  |
| `ALGORITHM`                   | string | "HS256"              | JWT algorithm       |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | int    | 30                   | Token lifetime      |
| `DATABASE_URL`                | string | "sqlite:///..."      | Database connection |
| `FASTMCP_LOG_LEVEL`           | string | "INFO"               | Logging level       |

---

## Appendix D: Common Issues & Solutions

### Issue 1: Model Not Trained Error

**Error:** "Model not trained. Please train the model first"

**Solution:**

```bash
curl -X POST http://localhost:8000/train
```

### Issue 2: Database Connection Error

**Error:** "Could not connect to database"

**Solution:**

- Check DATABASE_URL in .env
- Ensure database file has write permissions
- Run `init_db()` to create tables

### Issue 3: Authentication Failed

**Error:** "Could not validate credentials"

**Solution:**

- Check token expiration
- Verify SECRET_KEY matches between sessions
- Ensure Authorization header format: "Bearer <token>"

### Issue 4: CORS Error

**Error:** "CORS policy blocked"

**Solution:**

- Update CORS origins in main.py
- Ensure frontend URL is in allowed origins
- Check credentials flag is set

### Issue 5: Import Errors

**Error:** "ModuleNotFoundError"

**Solution:**

```bash
pip install -r requirements.txt
# Ensure virtual environment is activated
```

---

## Appendix E: API Testing with cURL

### Register User

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "full_name": "Test User",
    "password": "TestPass123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123!"
  }'
```

### Make Prediction

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "sex": "Male",
    "age": 35,
    "annual_income": 65.0,
    "spending_score": 75,
    "purchase_frequency": 12
  }'
```

### Get Clusters

```bash
curl -X GET http://localhost:8000/clusters \
  -H "Authorization: Bearer <your-token>"
```

---

## Conclusion

This Customer Segmentation Backend provides a robust, scalable, and secure foundation for ML-powered customer analytics. The system combines modern web technologies with machine learning to deliver actionable insights through an intuitive API.

### Key Achievements

✅ **Secure Authentication** - JWT-based auth with role-based access control  
✅ **ML Integration** - K-Means clustering with automatic optimization  
✅ **RESTful API** - Well-documented, standards-compliant endpoints  
✅ **Database Management** - Efficient data storage and retrieval  
✅ **Production Ready** - Comprehensive testing and deployment guides

### Future Enhancements

- 🔄 Real-time model retraining
- 📊 Advanced analytics dashboard
- 🔔 Webhook notifications
- 📈 A/B testing framework
- 🌐 Multi-language support
- 🤖 Additional ML algorithms (Random Forest, Neural Networks)
- 📱 Mobile API optimization
- 🔐 OAuth2 social login integration

---

**Document Version:** 1.0  
**Last Updated:** January 17, 2026  
**Author:** Backend Development Team  
**Contact:** support@customersegmentation.com

---

_This documentation is maintained as part of the Customer Segmentation project. For updates and contributions, please refer to the project repository._
