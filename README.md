# Customer Segmentation ML Project

A full-stack machine learning application for customer segmentation using K-Means clustering with JWT authentication, role-based access control, and interactive visualizations.

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies & Tools](#technologies--tools)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Detailed Setup](#detailed-setup)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## 🎯 Overview

This application provides an end-to-end solution for customer segmentation using machine learning. It features:

- **Machine Learning**: K-Means clustering with automatic optimal cluster detection
- **Authentication**: JWT-based user authentication and authorization
- **Role-Based Access**: User, Analyst, and Admin roles with different permissions
- **Interactive UI**: Real-time predictions with visualizations
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **Testing**: Unit, integration, and E2E tests

## 🛠️ Technologies & Tools

### Frontend Stack

#### Core Framework

- **React** (^18.2.0) - UI library
- **React Router DOM** (^6.21.1) - Client-side routing
- **Vite** (^5.0.8) - Build tool and dev server

#### Styling & UI

- **Tailwind CSS** (^3.4.0) - Utility-first CSS framework
- **PostCSS** (^8.4.32) - CSS processing
- **Autoprefixer** (^10.4.16) - CSS vendor prefixing

#### Data & Visualization

- **Axios** (^1.6.5) - HTTP client
- **Recharts** (^2.10.3) - React charting library

#### Testing

- **Vitest** (^1.1.0) - Unit testing framework
- **@testing-library/react** (^14.1.2) - React testing utilities
- **@testing-library/jest-dom** (^6.1.5) - DOM matchers
- **@testing-library/user-event** (^14.5.1) - User interaction simulation
- **jsdom** (^23.0.1) - DOM implementation

### Backend Stack

#### Core Framework

- **FastAPI** (>=0.109.0) - Modern Python web framework
- **Uvicorn** (>=0.27.0) - ASGI server
- **Pydantic** (>=2.5.0) - Data validation

#### Machine Learning

- **scikit-learn** (>=1.3.0) - ML algorithms and tools
- **pandas** (>=2.0.0) - Data manipulation
- **numpy** (>=1.24.0) - Numerical computing
- **joblib** (>=1.3.0) - Model persistence

#### Authentication & Security

- **python-jose[cryptography]** (>=3.3.0) - JWT tokens
- **passlib[bcrypt]** (>=1.7.4) - Password hashing
- **python-dotenv** (>=1.0.0) - Environment variables

#### Database

- **SQLAlchemy** (>=2.0.0) - ORM
- **databases** (>=0.8.0) - Async database support
- **aiosqlite** (>=0.19.0) - Async SQLite driver

#### Testing

- **pytest** (>=7.4.0) - Testing framework
- **pytest-asyncio** (>=0.21.0) - Async test support
- **pytest-cov** (>=4.1.0) - Coverage reporting
- **httpx** (>=0.25.0) - HTTP client for testing

### E2E Testing

- **Playwright** (^1.40.1) - Browser automation and E2E testing

### Additional Tools

- **python-multipart** (>=0.0.6) - Form data parsing

## ✨ Features

### Authentication & Authorization

- User registration and login
- JWT token-based authentication
- Role-based access control (User, Analyst, Admin)
- Protected routes and endpoints
- Session management

### Machine Learning

- K-Means clustering algorithm
- Automatic optimal cluster detection using elbow method
- Real-time customer segment predictions
- Confidence scoring
- Model training and persistence

### User Management

- User profile management
- Password updates
- Account deletion
- Admin dashboard for user management
- Role assignment and modification

### Data Visualization

- Interactive cluster charts
- Elbow method visualization
- Cluster statistics dashboard
- Prediction history tracking
- Responsive charts with Recharts

### UI/UX

- Clean, professional design
- Mobile-responsive layout
- Smooth animations
- Form validation
- Error handling
- Loading states

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Clone Repository

```bash
git clone <repository-url>
cd customer-segmentation-ml
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python generate_dataset.py
python create_admin.py
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### 4. Login Credentials

- **Admin**: `admin` / `admin123`
- **Test User**: `testuser` / `test123`

## 📁 Project Structure

```
customer-segmentation-ml/
├── backend/                      # Python FastAPI backend
│   ├── app/
│   │   ├── routes/              # API route handlers
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── users.py         # User management
│   │   │   ├── profiles.py      # Customer profiles
│   │   │   └── admin.py         # Admin endpoints
│   │   ├── main.py              # FastAPI application
│   │   ├── auth.py              # Auth utilities
│   │   ├── database.py          # Database models
│   │   ├── model.py             # ML model wrapper
│   │   ├── preprocess.py        # Data preprocessing
│   │   ├── schema.py            # Pydantic schemas
│   │   └── utils.py             # Utility functions
│   ├── data/
│   │   └── customers.csv        # Training dataset
│   ├── models/
│   │   ├── kmeans.pkl           # Trained model
│   │   └── scaler.pkl           # Feature scaler
│   ├── tests/                   # Backend tests
│   ├── requirements.txt         # Python dependencies
│   ├── requirements-dev.txt     # Dev dependencies
│   ├── generate_dataset.py      # Dataset generator
│   ├── create_admin.py          # Admin user creator
│   └── README.md                # Backend documentation
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── ClusterChart.jsx
│   │   │   ├── CustomerForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── pages/               # Page components
│   │   │   ├── About.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Documentation.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios API client
│   │   ├── tests/               # Frontend tests
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Node dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── vitest.config.js         # Test configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── README.md                # Frontend documentation
├── e2e/                         # End-to-end tests
│   ├── tests/
│   │   ├── api.spec.js
│   │   ├── dashboard.spec.js
│   │   ├── full-workflow.spec.js
│   │   └── home.spec.js
│   ├── playwright.config.js
│   └── package.json
├── .gitignore
├── package.json                 # Root package.json
└── README.md                    # This file
```

## 🔧 Detailed Setup

### Backend Configuration

1. **Create `.env` file** in `backend/` directory:

```env
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./customer_segmentation.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

2. **Generate dataset**:

```bash
python generate_dataset.py
```

Creates 5000 customer records in `data/customers.csv`

3. **Create admin user**:

```bash
python create_admin.py
```

4. **Train ML model** (optional, can be done via API):

```bash
# Start server first, then call /train endpoint
curl -X POST http://localhost:8000/train
```

### Frontend Configuration

1. **Create `.env` file** in `frontend/` directory (optional):

```env
VITE_API_URL=http://localhost:8000
```

2. **Install dependencies**:

```bash
npm install
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest                          # Run all tests
pytest --cov=app               # With coverage
pytest tests/test_api.py       # Specific test file
```

### Frontend Tests

```bash
cd frontend
npm test                       # Run all tests
npm run test:ui                # Interactive UI
npm run test:coverage          # With coverage
```

### E2E Tests

```bash
cd e2e
npm install
npm test                       # Run all E2E tests
npm run test:headed            # With browser visible
npm run test:ui                # Interactive mode
```

## 📚 API Documentation

Once the backend is running, access interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key Endpoints

#### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user info

#### Machine Learning

- `POST /train` - Train K-Means model
- `POST /predict` - Predict customer segment
- `GET /clusters` - Get cluster statistics
- `GET /elbow` - Get elbow method data

#### User Management

- `GET /users/me/profile` - Get user profile
- `PUT /users/me` - Update profile
- `DELETE /users/me` - Delete account

#### Admin

- `GET /admin/users` - List all users
- `PUT /admin/users/{id}/role` - Update user role
- `DELETE /admin/users/{id}` - Delete user
- `GET /admin/stats` - System statistics

## 🚀 Deployment

### Backend Deployment

**Options:**

- Heroku
- AWS EC2/ECS
- Google Cloud Run
- DigitalOcean App Platform

**Requirements:**

- Python 3.8+
- PostgreSQL (for production, replace SQLite)
- Environment variables configured

### Frontend Deployment

**Options:**

- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

**Build command:**

```bash
npm run build
```

**Output directory:** `dist/`

### Environment Variables

**Backend (.env):**

- `SECRET_KEY` - JWT secret (change in production!)
- `DATABASE_URL` - Database connection string
- `CORS_ORIGINS` - Allowed frontend origins

**Frontend (.env):**

- `VITE_API_URL` - Backend API URL

## 🔐 Security Notes

1. Change `SECRET_KEY` in production
2. Use HTTPS in production
3. Configure CORS properly
4. Use PostgreSQL instead of SQLite in production
5. Implement rate limiting
6. Regular security updates
7. Use strong passwords
8. Enable CSRF protection

## 📝 License

This project is part of a customer segmentation application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using React, FastAPI, and scikit-learn**
