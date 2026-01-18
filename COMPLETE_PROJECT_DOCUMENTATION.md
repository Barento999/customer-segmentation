# Complete Project Documentation

# Customer Segmentation ML Application

**Version**: 2.0.0  
**Last Updated**: January 2025  
**Project Type**: Full-Stack Machine Learning Web Application

> **Note**: This is comprehensive documentation covering all aspects of the project.
> For quick start, see [README.md](README.md)
> For specific topics, see [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## 📋 Table of Contents

- [Part 1: Project Overview](#part-1-project-overview)
- [Part 2: System Architecture](#part-2-system-architecture)
- [Part 3: Technical Implementation](#part-3-technical-implementation)
- [Part 4: Features & Functionality](#part-4-features--functionality)
- [Part 5: Setup & Deployment](#part-5-setup--deployment)
- [Part 6: Testing & Quality](#part-6-testing--quality)
- [Part 7: Reference](#part-7-reference)

---

# Part 1: Project Overview

## 1.1 Executive Summary

### What is This Project?

A full-stack web application that uses K-Means machine learning to automatically segment customers
into distinct groups based on demographics and behavior. Enables businesses to understand customer
patterns, target marketing, and make data-driven decisions.

### Key Capabilities

- **ML-Powered Segmentation**: Automatic customer clustering
- **Multi-Role System**: User, Analyst, and Admin roles
- **Real-Time Predictions**: Instant segment predictions with confidence scores
- **Interactive Visualizations**: Charts, graphs, and statistics
- **Complete Audit Trail**: History tracking for all predictions
- **Mobile-Responsive**: Works on all devices

### Business Value

- Reduce marketing costs through targeted campaigns
- Increase customer engagement with personalized experiences
- Improve customer retention through better understanding
- Enable data-driven decision making

## 1.2 Problem Statement

Businesses struggle to understand diverse customer bases and create effective marketing strategies.
Manual customer segmentation is time-consuming, subjective, and doesn't scale. This application
solves these problems by:

1. Automating customer segmentation using ML
2. Providing real-time insights
3. Enabling data-driven marketing decisions
4. Tracking customer behavior over time

## 1.3 Solution Approach

- **Machine Learning**: K-Means clustering for unsupervised segmentation
- **Web Application**: Accessible from anywhere, no installation needed
- **User-Friendly Interface**: Simple forms and clear visualizations
- **Secure & Scalable**: JWT authentication, role-based access
- **Extensible**: Easy to add new features and models

## 1.4 Target Users

| User Type             | Use Cases                             | Key Features                       |
| --------------------- | ------------------------------------- | ---------------------------------- |
| **Business Analysts** | Analyze segments, generate reports    | Dashboard, visualizations, history |
| **Marketing Teams**   | Target campaigns, personalize content | Predictions, customer profiles     |
| **Data Scientists**   | Train models, evaluate performance    | Model training, metrics            |
| **Administrators**    | Manage users, system settings         | User management, statistics        |

---

# Part 2: System Architecture

## 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Port 5173)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Frontend                                       │  │
│  │  - React Router (navigation)                         │  │
│  │  - Axios (API calls)                                 │  │
│  │  - Recharts (visualizations)                         │  │
│  │  - Tailwind CSS (styling)                            │  │
│  │  - Context API (state management)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (Port 8000)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FastAPI Backend                                      │  │
│  │  - RESTful API endpoints                             │  │
│  │  - JWT authentication middleware                     │  │
│  │  - Request validation (Pydantic)                     │  │
│  │  - CORS middleware                                   │  │
│  │  - Error handling                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Service │  │  ML Service  │  │ User Service │     │
│  │ - Login      │  │ - Training   │  │ - CRUD       │     │
│  │ - Register   │  │ - Prediction │  │ - Profiles   │     │
│  │ - JWT tokens │  │ - Clustering │  │ - History    │     │
│  │ - Roles      │  │ - Metrics    │  │ - Admin      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   SQLite DB  │  │  ML Models   │  │  CSV Data    │     │
│  │  - users     │  │ - kmeans.pkl │  │ - customers  │     │
│  │  - profiles  │  │ - scaler.pkl │  │   .csv       │     │
│  │  - history   │  │              │  │ (5000 rows)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Component Interaction Flows

### Authentication Flow

```
1. User enters credentials → Login Page
2. POST /auth/login → FastAPI Backend
3. Validate credentials → Check database
4. Generate JWT token (30 min expiry)
5. Return token + user info → Frontend
6. Store token in localStorage
7. Include token in Authorization header for all requests
8. Backend validates token on each request
9. Grant/deny access based on token validity
```

### Prediction Flow

```
1. User inputs customer data → Dashboard Form
2. Validate input → Frontend validation
3. POST /predict with data → Backend API
4. Check authentication → JWT validation
5. Load ML models (kmeans.pkl, scaler.pkl)
6. Preprocess data → StandardScaler
7. K-Means prediction → Cluster assignment
8. Calculate confidence score
9. Save to prediction_history table
10. Return result → Frontend
11. Display result with visualization
```

### Model Training Flow

```
1. Admin clicks "Train Model" → Dashboard
2. POST /train → Backend API
3. Load dataset (customers.csv)
4. Preprocess features
5. Find optimal K (elbow method)
6. Train K-Means model
7. Calculate metrics (silhouette score, inertia)
8. Save models to disk
9. Return metrics → Frontend
10. Display training results
```

## 2.3 Technology Stack Summary

### Frontend Stack

- **React 18.2.0**: Component-based UI
- **Vite 5.0.8**: Fast build tool
- **React Router 6.21.1**: Client-side routing
- **Tailwind CSS 3.4.0**: Utility-first styling
- **Axios 1.6.5**: HTTP client
- **Recharts 2.10.3**: Data visualization
- **Vitest 1.1.0**: Unit testing

### Backend Stack

- **FastAPI 0.109.0+**: Modern Python web framework
- **Uvicorn 0.27.0+**: ASGI server
- **scikit-learn 1.3.0+**: Machine learning
- **pandas 2.0.0+**: Data manipulation
- **numpy 1.24.0+**: Numerical computing
- **SQLAlchemy 2.0.0+**: Database ORM
- **python-jose 3.3.0+**: JWT tokens
- **passlib 1.7.4+**: Password hashing
- **pytest 7.4.0+**: Testing

### Database

- **SQLite**: Development (file-based)
- **PostgreSQL**: Production (recommended)

### Testing

- **Vitest**: Frontend unit tests
- **pytest**: Backend unit tests
- **Playwright**: E2E tests

---

# Part 3: Technical Implementation

## 3.1 Machine Learning Model

### Algorithm: K-Means Clustering

**Why K-Means?**

- Unsupervised learning (no labeled data needed)
- Fast and efficient (O(n*k*i))
- Easy to interpret results
- Scales well with data size
- Industry-standard for segmentation

### Features Used

| Feature                | Type        | Range   | Description                |
| ---------------------- | ----------- | ------- | -------------------------- |
| **Age**                | Numeric     | 18-70   | Customer age in years      |
| **Annual Income**      | Numeric     | 15-150k | Yearly income in thousands |
| **Spending Score**     | Numeric     | 1-100   | Shopping behavior score    |
| **Purchase Frequency** | Numeric     | 1-50    | Purchases per year         |
| **Sex**                | Categorical | M/F     | Gender (display only)      |

### Model Training Process

1. **Data Loading**: Load 5000 customer records from CSV
2. **Feature Selection**: Select numeric features for clustering
3. **Preprocessing**: StandardScaler normalization (mean=0, std=1)
4. **Optimal K Detection**:
   - Elbow method (inertia vs K)
   - Silhouette score analysis
   - Typically finds 4-6 optimal clusters
5. **Model Training**: Fit K-Means with optimal K
6. **Model Persistence**: Save using joblib (kmeans.pkl, scaler.pkl)

### Cluster Interpretation

Clusters are automatically named based on centroid characteristics:

- **High-Value Customers**: High income + high spending
- **Budget Shoppers**: Low income + low spending
- **Potential Targets**: High income + low spending
- **Loyal Customers**: High frequency + moderate spending
- **Occasional Buyers**: Low frequency + moderate spending

### Model Performance Metrics

- **Silhouette Score**: 0.45-0.65 (good cluster separation)
- **Inertia**: Minimized through elbow method
- **Prediction Time**: <50ms per customer
- **Confidence**: 70-95% typical range

## 3.2 Database Design

### Database Schema

**users** table:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',  -- user, analyst, admin
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**customer_profiles** table:

```sql
CREATE TABLE customer_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(255),
    sex VARCHAR(10),
    age INTEGER,
    annual_income FLOAT,
    spending_score INTEGER,
    purchase_frequency INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**prediction_history** table:

```sql
CREATE TABLE prediction_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    customer_data TEXT,  -- JSON string of input data
    cluster INTEGER,
    cluster_name VARCHAR(100),
    confidence FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Relationships

- **One-to-Many**: User → Customer Profiles
- **One-to-Many**: User → Prediction History
- **Cascade Delete**: Deleting user removes all related data

### Indexes

- Primary keys on all tables
- Unique indexes on email and username
- Foreign key indexes for performance

### Database Location

- **File**: `backend/customer_segmentation.db`
- **Size**: ~500KB (with sample data)
- **Backup**: Recommended daily backups in production

## 3.3 Authentication & Security

### JWT Authentication

**Token Structure**:

```json
{
  "sub": "username",
  "exp": 1234567890, // Expiry timestamp
  "iat": 1234567890 // Issued at timestamp
}
```

**Token Lifecycle**:

1. User logs in with username/password
2. Server validates credentials
3. Generate JWT with 30-minute expiry
4. Client stores token in localStorage
5. Token included in Authorization header: `Bearer <token>`
6. Server validates token on each request
7. Token expires after 30 minutes
8. User must re-login

### Password Security

- **Algorithm**: bcrypt with automatic salt
- **Cost Factor**: 12 rounds (default)
- **Storage**: Only hashed passwords stored
- **Validation**: Constant-time comparison prevents timing attacks

### Role-Based Access Control (RBAC)

| Role        | Permissions                                         |
| ----------- | --------------------------------------------------- |
| **user**    | View own data, make predictions, manage own profile |
| **analyst** | All user permissions + advanced analytics (future)  |
| **admin**   | All permissions + user management + system settings |

### Security Measures Implemented

1. **CORS**: Configured allowed origins
2. **SQL Injection**: Prevented by ORM (SQLAlchemy)
3. **XSS**: Input validation and sanitization
4. **Password Policy**: Minimum length requirements
5. **HTTPS**: Required in production
6. **Token Expiry**: 30-minute sessions
7. **Rate Limiting**: Recommended for production

---

# Part 4: Features & Functionality

## 4.1 User Features

### 1. Registration & Login

- **Registration**: Email, username, password, full name
- **Login**: Username or email + password
- **Validation**: Email format, password strength, unique username
- **Session**: 30-minute JWT token
- **Remember Me**: Token stored in localStorage

### 2. Dashboard

- **Customer Input Form**: 5 fields (sex, age, income, spending, frequency)
- **Real-Time Prediction**: Instant results on submit
- **Confidence Score**: 0-100% prediction confidence
- **Cluster Visualization**: Chart showing cluster distribution
- **Recent Predictions**: Last 10 predictions displayed

### 3. Prediction History

- **View All**: Paginated list of all predictions
- **Search**: Filter by date, cluster, confidence
- **Details**: Full customer data for each prediction
- **Export**: Download as CSV (future feature)
- **Pagination**: 50 records per page

### 4. Profile Management

- **View Profile**: Display user information and statistics
- **Edit Profile**: Update name, email, username
- **Change Password**: Secure password update
- **Statistics**: Total predictions, saved profiles
- **Delete Account**: Permanent account removal

### 5. Customer Profiles

- **Save Profiles**: Store frequently used customer data
- **CRUD Operations**: Create, Read, Update, Delete
- **Quick Predict**: One-click prediction from saved profile
- **Notes**: Add custom notes to profiles

## 4.2 Admin Features

### 1. User Management Dashboard

- **User List**: View all registered users
- **Search & Filter**: Find users by name, email, role
- **User Statistics**: Total users, active/inactive counts
- **Quick Actions**: Edit, delete, activate/deactivate

### 2. User Operations

- **View User Details**: Full user information
- **Update Roles**: Change user role (user/analyst/admin)
- **Activate/Deactivate**: Enable or disable user accounts
- **Delete Users**: Remove users (cannot delete self)
- **Reset Passwords**: Admin-initiated password reset (future)

### 3. System Statistics

- **Total Users**: Count by role
- **Active Users**: Currently active accounts
- **Total Predictions**: System-wide prediction count
- **Cluster Distribution**: Most common segments
- **Usage Analytics**: Predictions per day/week/month

## 4.3 ML Features

### 1. Model Training

- **Train on Demand**: Retrain model with latest data
- **Automatic Optimization**: Find optimal number of clusters
- **Performance Metrics**: Silhouette score, inertia
- **Training Time**: ~2-5 seconds for 5000 records
- **Model Versioning**: Timestamp-based versions (future)

### 2. Predictions

- **Single Prediction**: One customer at a time
- **Batch Predictions**: Multiple customers (future)
- **Confidence Scoring**: Probability-based confidence
- **Cluster Assignment**: 0 to K-1 cluster numbers
- **Cluster Names**: Human-readable segment names

### 3. Visualizations

- **Elbow Method Chart**: Line chart showing optimal K
- **Silhouette Score Plot**: Quality metric visualization
- **Cluster Distribution**: Bar chart of cluster sizes
- **Feature Importance**: Which features matter most (future)

---

# Part 5: Setup & Deployment

## 5.1 Development Setup

### Prerequisites

- **Python**: 3.8 or higher
- **Node.js**: 16 or higher
- **npm**: 7 or higher
- **Git**: For version control

### Backend Setup (Step-by-Step)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # For testing

# 5. Create .env file
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux

# 6. Generate dataset
python generate_dataset.py

# 7. Create admin user
python create_admin.py

# 8. Run server
uvicorn app.main:app --reload
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup (Step-by-Step)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file (optional)
echo "VITE_API_URL=http://localhost:8000" > .env

# 4. Run development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Environment Configuration

**Backend (.env)**:

```env
# JWT Configuration
SECRET_KEY=your-secret-key-change-in-production-use-long-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database
DATABASE_URL=sqlite:///./customer_segmentation.db

# CORS (comma-separated origins)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Frontend (.env)** (optional):

```env
VITE_API_URL=http://localhost:8000
```

### Default Login Credentials

After running `create_admin.py`:

- **Admin**: username: `admin`, password: `admin123`
- **Test User**: username: `testuser`, password: `test123`

## 5.2 Production Deployment

### Backend Deployment Options

#### Option 1: Heroku

```bash
# 1. Create Procfile
echo "web: uvicorn app.main:app --host 0.0.0.0 --port $PORT" > Procfile

# 2. Create runtime.txt
echo "python-3.11.0" > runtime.txt

# 3. Update requirements.txt (add gunicorn)
pip freeze > requirements.txt

# 4. Create Heroku app
heroku create your-app-name

# 5. Set environment variables
heroku config:set SECRET_KEY=your-production-secret-key
heroku config:set DATABASE_URL=your-postgres-url

# 6. Deploy
git push heroku main
```

#### Option 2: AWS EC2

```bash
# 1. Launch EC2 instance (Ubuntu)
# 2. SSH into instance
# 3. Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx

# 4. Clone repository
git clone your-repo-url
cd backend

# 5. Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 6. Configure Nginx as reverse proxy
# 7. Use systemd to run as service
# 8. Setup SSL with Let's Encrypt
```

#### Option 3: Docker

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Build and run
docker build -t customer-segmentation-backend .
docker run -p 8000:8000 customer-segmentation-backend
```

### Frontend Deployment Options

#### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build project
npm run build

# 3. Deploy
vercel --prod

# Or connect GitHub repo for automatic deployments
```

#### Option 2: Netlify

```bash
# 1. Build project
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=dist
```

#### Option 3: AWS S3 + CloudFront

```bash
# 1. Build project
npm run build

# 2. Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# 3. Configure CloudFront distribution
# 4. Setup custom domain and SSL
```

### Database Migration for Production

**Switch from SQLite to PostgreSQL**:

```bash
# 1. Install PostgreSQL driver
pip install psycopg2-binary

# 2. Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@host:5432/database

# 3. Run migrations (if using Alembic)
alembic upgrade head
```

### Environment Variables for Production

**Critical Settings**:

- `SECRET_KEY`: Use strong random string (32+ characters)
- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGINS`: Your frontend domain only
- `HTTPS`: Enable SSL/TLS
- `DEBUG`: Set to False

---

# Part 6: Testing & Quality

## 6.1 Testing Strategy

### Testing Pyramid

```
        /\
       /  \      E2E Tests (Playwright)
      /____\     - Full user workflows
     /      \    - Cross-browser testing
    /        \
   /__________\  Integration Tests
  /            \ - API endpoint tests
 /              \- Component integration
/________________\
  Unit Tests      - Individual functions
                  - React components
                  - ML model functions
```

### Backend Testing (pytest)

**Test Coverage**:

- Unit Tests: Individual functions and classes
- Integration Tests: API endpoints
- Model Tests: ML predictions and training
- Database Tests: CRUD operations

**Run Tests**:

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_api.py

# Run with verbose output
pytest -v
```

**Test Files**:

- `tests/test_api.py`: API endpoint tests
- `tests/test_model.py`: ML model tests
- `tests/test_schema.py`: Data validation tests
- `tests/conftest.py`: Test fixtures

**Coverage Target**: 80%+

### Frontend Testing (Vitest)

**Test Coverage**:

- Component Tests: React components
- Service Tests: API client
- Integration Tests: User interactions
- Snapshot Tests: UI consistency

**Run Tests**:

```bash
cd frontend

# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

**Test Files**:

- `src/tests/components/CustomerForm.test.jsx`
- `src/tests/components/Navbar.test.jsx`
- `src/tests/services/api.test.js`
- `src/tests/setup.js`

**Coverage Target**: 75%+

### E2E Testing (Playwright)

**Test Scenarios**:

- User registration and login
- Customer prediction workflow
- Admin user management
- Mobile responsiveness
- Cross-browser compatibility

**Run Tests**:

```bash
cd e2e

# Install browsers (first time only)
npx playwright install

# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run in UI mode
npm run test:ui

# Run specific test
npx playwright test tests/full-workflow.spec.js

# Generate report
npm run report
```

**Test Files**:

- `tests/home.spec.js`: Landing page tests
- `tests/dashboard.spec.js`: Dashboard functionality
- `tests/api.spec.js`: API integration tests
- `tests/full-workflow.spec.js`: Complete user journey

**Browsers Tested**: Chromium, Firefox, WebKit (Safari)

## 6.2 Code Quality

### Linting & Formatting

**Frontend (ESLint)**:

```bash
cd frontend
npm run lint
```

**Backend (flake8/black)** (if configured):

```bash
cd backend
flake8 app/
black app/
```

### Code Review Checklist

- [ ] All tests passing
- [ ] Code coverage meets targets
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Security considerations addressed
- [ ] Performance optimized
- [ ] Error handling implemented
- [ ] Logging added where needed

### Continuous Integration (CI)

**GitHub Actions Example** (.github/workflows/test.yml):

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: "3.11"
      - run: pip install -r backend/requirements.txt
      - run: pytest backend/tests

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: cd frontend && npm install
      - run: cd frontend && npm test
```

---

# Part 7: Reference

## 7.1 API Endpoints Reference

### Authentication Endpoints

| Method | Endpoint         | Description             | Auth Required |
| ------ | ---------------- | ----------------------- | ------------- |
| POST   | `/auth/register` | Register new user       | No            |
| POST   | `/auth/login`    | Login and get JWT token | No            |
| GET    | `/auth/me`       | Get current user info   | Yes           |
| POST   | `/auth/logout`   | Logout user             | Yes           |

### ML Endpoints

| Method | Endpoint    | Description              | Auth Required |
| ------ | ----------- | ------------------------ | ------------- |
| POST   | `/train`    | Train K-Means model      | No            |
| POST   | `/predict`  | Predict customer segment | Yes           |
| GET    | `/clusters` | Get cluster statistics   | Yes           |
| GET    | `/elbow`    | Get elbow method data    | Yes           |
| GET    | `/history`  | Get prediction history   | Yes           |

### User Management Endpoints

| Method | Endpoint            | Description         | Auth Required |
| ------ | ------------------- | ------------------- | ------------- |
| GET    | `/users/me/profile` | Get user profile    | Yes           |
| PUT    | `/users/me`         | Update user profile | Yes           |
| DELETE | `/users/me`         | Delete user account | Yes           |
| GET    | `/users/`           | List all users      | Admin         |
| GET    | `/users/{id}`       | Get user by ID      | Admin         |
| PUT    | `/users/{id}/role`  | Update user role    | Admin         |
| DELETE | `/users/{id}`       | Delete user         | Admin         |

### Customer Profile Endpoints

| Method | Endpoint         | Description             | Auth Required |
| ------ | ---------------- | ----------------------- | ------------- |
| POST   | `/profiles/`     | Create customer profile | Yes           |
| GET    | `/profiles/`     | List user's profiles    | Yes           |
| GET    | `/profiles/{id}` | Get specific profile    | Yes           |
| PUT    | `/profiles/{id}` | Update profile          | Yes           |
| DELETE | `/profiles/{id}` | Delete profile          | Yes           |

### Admin Endpoints

| Method | Endpoint                          | Description              | Auth Required |
| ------ | --------------------------------- | ------------------------ | ------------- |
| GET    | `/admin/users`                    | Get all users with stats | Admin         |
| GET    | `/admin/users/{id}`               | Get user by ID           | Admin         |
| PUT    | `/admin/users/{id}/role`          | Update user role         | Admin         |
| DELETE | `/admin/users/{id}`               | Delete user              | Admin         |
| PUT    | `/admin/users/{id}/toggle-active` | Toggle user status       | Admin         |
| GET    | `/admin/stats`                    | Get system statistics    | Admin         |

**Interactive API Documentation**: `http://localhost:8000/docs`

## 7.2 Project File Structure

```
customer-segmentation-ml/
├── backend/                          # Python FastAPI backend
│   ├── app/
│   │   ├── routes/                   # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── auth.py               # Authentication routes
│   │   │   ├── users.py              # User management
│   │   │   ├── profiles.py           # Customer profiles
│   │   │   └── admin.py              # Admin routes
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI application
│   │   ├── auth.py                   # Auth utilities
│   │   ├── auth_schema.py            # Auth Pydantic schemas
│   │   ├── database.py               # Database models
│   │   ├── model.py                  # ML model wrapper
│   │   ├── preprocess.py             # Data preprocessing
│   │   ├── schema.py                 # API Pydantic schemas
│   │   └── utils.py                  # Utility functions
│   ├── data/
│   │   └── customers.csv             # Training dataset (5000 rows)
│   ├── models/
│   │   ├── kmeans.pkl                # Trained K-Means model
│   │   └── scaler.pkl                # Feature scaler
│   ├── tests/                        # Backend tests
│   │   ├── __init__.py
│   │   ├── conftest.py               # Test fixtures
│   │   ├── test_api.py               # API tests
│   │   ├── test_model.py             # ML model tests
│   │   └── test_schema.py            # Schema validation tests
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Example env file
│   ├── requirements.txt              # Python dependencies
│   ├── requirements-dev.txt          # Dev dependencies
│   ├── generate_dataset.py           # Dataset generator
│   ├── create_admin.py               # Admin user creator
│   ├── pytest.ini                    # Pytest configuration
│   ├── customer_segmentation.db      # SQLite database
│   └── README.md                     # Backend documentation
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── AdminRoute.jsx        # Admin route guard
│   │   │   ├── ClusterChart.jsx      # Visualization charts
│   │   │   ├── CustomerForm.jsx      # Input form
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   ├── ProtectedRoute.jsx    # Auth route guard
│   │   │   └── ResultCard.jsx        # Result display
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth state management
│   │   ├── pages/                    # Page components
│   │   │   ├── About.jsx             # About page
│   │   │   ├── AdminDashboard.jsx    # Admin panel
│   │   │   ├── AdminLogin.jsx        # Admin login
│   │   │   ├── Dashboard.jsx         # Main dashboard
│   │   │   ├── Documentation.jsx     # API docs page
│   │   │   ├── History.jsx           # Prediction history
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # User login
│   │   │   ├── Profile.jsx           # User profile
│   │   │   ├── Register.jsx          # Registration
│   │   │   └── Settings.jsx          # User settings
│   │   ├── services/
│   │   │   └── api.js                # Axios API client
│   │   ├── tests/                    # Frontend tests
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── setup.js
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── index.html                    # HTML template
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── vitest.config.js              # Test configuration
│   ├── tailwind.config.js            # Tailwind config
│   ├── postcss.config.js             # PostCSS config
│   └── README.md                     # Frontend documentation
├── e2e/                              # End-to-end tests
│   ├── tests/
│   │   ├── api.spec.js               # API tests
│   │   ├── dashboard.spec.js         # Dashboard tests
│   │   ├── full-workflow.spec.js     # Complete workflows
│   │   └── home.spec.js              # Home page tests
│   ├── playwright.config.js          # Playwright config
│   └── package.json                  # E2E dependencies
├── .gitignore                        # Git ignore rules
├── package.json                      # Root package.json
├── README.md                         # Main documentation
├── COMPLETE_PROJECT_DOCUMENTATION.md # This file
├── DOCUMENTATION_INDEX.md            # Documentation index
├── TOOLS_AND_TECHNOLOGIES.md         # Tools reference
├── frontend/README.md                # Frontend docs
└── backend/README.md                 # Backend docs
```

## 7.3 Common Issues & Troubleshooting

### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'app'`
**Solution**: Make sure you're in the backend directory and virtual environment is activated

**Issue**: `Port 8000 already in use`
**Solution**: Kill the process or use a different port: `uvicorn app.main:app --port 8001`

**Issue**: `Database is locked`
**Solution**: Close all connections to the database, restart the server

**Issue**: `Model not trained error`
**Solution**: Run `POST /train` endpoint or train model manually

**Issue**: `JWT token expired`
**Solution**: Login again to get a new token (30-minute expiry)

### Frontend Issues

**Issue**: `npm install` fails
**Solution**: Delete `node_modules` and `package-lock.json`, run `npm install` again

**Issue**: `Port 5173 already in use`
**Solution**: Kill the process or change port in `vite.config.js`

**Issue**: `API calls failing with CORS error`
**Solution**: Check CORS_ORIGINS in backend `.env` file

**Issue**: `Blank page after build`
**Solution**: Check console for errors, ensure API_URL is correct

**Issue**: `Charts not displaying`
**Solution**: Check if Recharts is installed: `npm install recharts`

### Database Issues

**Issue**: `Database file not found`
**Solution**: Run the backend server once to create the database

**Issue**: `Cannot delete admin user`
**Solution**: This is by design - admins cannot delete themselves

**Issue**: `Lost admin password`
**Solution**: Run `python create_admin.py` to reset admin credentials

### Testing Issues

**Issue**: `pytest: command not found`
**Solution**: Install dev dependencies: `pip install -r requirements-dev.txt`

**Issue**: `Playwright browsers not installed`
**Solution**: Run `npx playwright install`

**Issue**: `Tests failing in CI`
**Solution**: Check environment variables and dependencies are installed

## 7.4 Performance Optimization

### Backend Optimization

1. **Database Indexing**: Add indexes on frequently queried columns
2. **Caching**: Implement Redis for model caching
3. **Async Operations**: Use async/await for I/O operations
4. **Connection Pooling**: Configure SQLAlchemy connection pool
5. **Pagination**: Limit query results (already implemented)

### Frontend Optimization

1. **Code Splitting**: Use React.lazy() for route-based splitting
2. **Image Optimization**: Compress and lazy-load images
3. **Bundle Size**: Analyze with `npm run build -- --analyze`
4. **Memoization**: Use React.memo() for expensive components
5. **Virtual Scrolling**: For large lists (future enhancement)

### ML Model Optimization

1. **Model Caching**: Keep model in memory after first load
2. **Batch Predictions**: Process multiple customers at once
3. **Feature Selection**: Remove unnecessary features
4. **Model Compression**: Use smaller model formats
5. **GPU Acceleration**: For large datasets (future)

## 7.5 Security Best Practices

### Production Checklist

- [ ] Change SECRET_KEY to strong random string
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for specific domains only
- [ ] Use PostgreSQL instead of SQLite
- [ ] Implement rate limiting
- [ ] Enable request logging
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Use environment variables for secrets
- [ ] Implement CSRF protection
- [ ] Add input sanitization
- [ ] Enable security headers
- [ ] Use strong password policy
- [ ] Implement account lockout after failed attempts

## 7.6 Future Enhancements

### Planned Features

1. **Advanced Analytics**
   - Customer lifetime value prediction
   - Churn prediction
   - Trend analysis over time

2. **Enhanced ML**
   - Multiple clustering algorithms (DBSCAN, Hierarchical)
   - Automatic feature engineering
   - Model comparison and selection
   - Real-time model retraining

3. **User Experience**
   - Batch customer upload (CSV)
   - Export reports (PDF, Excel)
   - Custom dashboards
   - Email notifications
   - Mobile app

4. **Integration**
   - CRM integration (Salesforce, HubSpot)
   - Marketing platform integration
   - API webhooks
   - Third-party data sources

5. **Administration**
   - Audit logs
   - User activity tracking
   - System health monitoring
   - Automated backups
   - Multi-tenancy support

## 7.7 Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Write tests** for new functionality
5. **Run all tests**: Ensure they pass
6. **Commit changes**: `git commit -m 'Add amazing feature'`
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open Pull Request**

### Code Style Guidelines

**Python (Backend)**:

- Follow PEP 8 style guide
- Use type hints where possible
- Write docstrings for functions
- Keep functions small and focused

**JavaScript (Frontend)**:

- Use ES6+ features
- Follow Airbnb style guide
- Use meaningful variable names
- Write JSDoc comments for complex functions

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Example**:

```
feat(ml): add DBSCAN clustering algorithm

Implemented DBSCAN as an alternative to K-Means for
density-based clustering. Added configuration options
and visualization support.

Closes #123
```

## 7.8 Support & Resources

### Documentation

- [Main README](README.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Tools Reference](TOOLS_AND_TECHNOLOGIES.md)
- [Documentation Index](DOCUMENTATION_INDEX.md)

### API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### External Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [scikit-learn User Guide](https://scikit-learn.org)
- [Tailwind CSS Docs](https://tailwindcss.com)

### Getting Help

- Open an issue on GitHub
- Check existing documentation
- Review closed issues for solutions
- Contact maintainers

---

## Conclusion

This Customer Segmentation ML Application demonstrates a complete full-stack implementation
combining modern web technologies with machine learning. It provides a solid foundation for
building production-ready ML applications with proper authentication, testing, and deployment
practices.

**Key Takeaways**:

- Full-stack architecture with React and FastAPI
- Production-ready authentication and authorization
- Scalable ML model deployment
- Comprehensive testing strategy
- Mobile-responsive design
- Extensible and maintainable codebase

**Project Statistics**:

- **Lines of Code**: ~15,000+
- **Components**: 20+ React components
- **API Endpoints**: 30+ endpoints
- **Test Coverage**: 75-80%
- **Technologies**: 30+ tools and libraries

---

**Version**: 2.0.0  
**Last Updated**: January 2025  
**License**: MIT (or your chosen license)  
**Maintainers**: Your Team

**Built with ❤️ using React, FastAPI, and scikit-learn**
