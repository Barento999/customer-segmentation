# Frontend - Customer Segmentation Application

React-based frontend for customer segmentation ML application with authentication, role-based access control, and interactive visualizations.

## 📋 Table of Contents

- [Technologies & Tools](#technologies--tools)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [API Integration](#api-integration)

## 🛠️ Technologies & Tools

### Core Framework

- **React** (^18.2.0) - UI library for building user interfaces
- **React DOM** (^18.2.0) - React rendering for web
- **React Router DOM** (^6.21.1) - Client-side routing and navigation

### Build Tools

- **Vite** (^5.0.8) - Fast build tool and development server
- **@vitejs/plugin-react** (^4.2.1) - React plugin for Vite with Fast Refresh

### Styling

- **Tailwind CSS** (^3.4.0) - Utility-first CSS framework
- **PostCSS** (^8.4.32) - CSS transformation tool
- **Autoprefixer** (^10.4.16) - Automatic vendor prefixing

### HTTP & API

- **Axios** (^1.6.5) - Promise-based HTTP client for API requests

### Data Visualization

- **Recharts** (^2.10.3) - Composable charting library built on React components
  - Line charts for elbow method visualization
  - Bar charts for cluster statistics
  - Responsive and interactive charts

### Testing Tools

- **Vitest** (^1.1.0) - Fast unit test framework powered by Vite
- **@vitest/ui** (^1.1.0) - UI for Vitest test results
- **@vitest/coverage-v8** (^1.1.0) - Code coverage using V8
- **@testing-library/react** (^14.1.2) - React component testing utilities
- **@testing-library/jest-dom** (^6.1.5) - Custom Jest matchers for DOM
- **@testing-library/user-event** (^14.5.1) - User interaction simulation
- **jsdom** (^23.0.1) - JavaScript implementation of web standards

### Development Tools

- **@types/react** (^18.2.43) - TypeScript definitions for React
- **@types/react-dom** (^18.2.17) - TypeScript definitions for React DOM

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration (if needed):

```bash
# Create .env file for API URL configuration
echo "VITE_API_URL=http://localhost:8000" > .env
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally.

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests with UI

```bash
npm run test:ui
```

Opens an interactive UI for viewing and running tests.

### Run Tests with Coverage

```bash
npm run test:coverage
```

Generates code coverage report in `coverage/` directory.

### Test Files

- `src/tests/components/CustomerForm.test.jsx` - Customer form component tests
- `src/tests/components/Navbar.test.jsx` - Navigation component tests
- `src/tests/services/api.test.js` - API service tests
- `src/tests/setup.js` - Test environment setup

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AdminRoute.jsx   # Admin-only route protection
│   │   ├── ClusterChart.jsx # Cluster visualization charts
│   │   ├── CustomerForm.jsx # Customer data input form
│   │   ├── Footer.jsx       # Application footer
│   │   ├── Navbar.jsx       # Navigation bar with auth
│   │   ├── ProtectedRoute.jsx # Authentication route guard
│   │   └── ResultCard.jsx   # Prediction result display
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── pages/               # Page components
│   │   ├── About.jsx        # About page
│   │   ├── AdminDashboard.jsx # Admin user management
│   │   ├── AdminLogin.jsx   # Admin login page
│   │   ├── Dashboard.jsx    # Main dashboard with predictions
│   │   ├── Documentation.jsx # API documentation
│   │   ├── History.jsx      # Prediction history
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # User login
│   │   ├── Profile.jsx      # User profile management
│   │   ├── Register.jsx     # User registration
│   │   └── Settings.jsx     # User settings
│   ├── services/
│   │   └── api.js           # Axios API client configuration
│   ├── tests/               # Test files
│   │   ├── components/      # Component tests
│   │   ├── services/        # Service tests
│   │   └── setup.js         # Test setup
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vitest.config.js         # Vitest test configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## ✨ Features

### Authentication & Authorization

- User registration and login
- JWT token-based authentication
- Protected routes requiring authentication
- Admin-only routes and features
- Role-based access control (user, analyst, admin)
- Persistent authentication state

### Customer Segmentation

- Interactive customer data input form
- Real-time ML predictions
- Cluster visualization with charts
- Confidence scores for predictions
- Prediction history tracking

### User Management (Admin)

- View all users
- Update user roles
- Activate/deactivate users
- Delete users
- System statistics dashboard

### User Profile

- View profile information
- Update profile details
- Change password
- View prediction statistics
- Delete account

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Clean, professional UI
- Smooth animations and transitions

## 🗺️ Pages & Routes

### Public Routes

- `/` - Home/Landing page
- `/login` - User login
- `/register` - User registration
- `/admin/login` - Admin login
- `/about` - About the application
- `/documentation` - API documentation

### Protected Routes (Require Authentication)

- `/dashboard` - Main dashboard with predictions
- `/history` - Prediction history
- `/profile` - User profile
- `/settings` - User settings

### Admin Routes (Require Admin Role)

- `/admin/dashboard` - Admin dashboard with user management

## 🧩 Components

### Layout Components

- **Navbar** - Navigation with authentication state, responsive menu
- **Footer** - Application footer with links

### Form Components

- **CustomerForm** - Multi-field form for customer data input with validation

### Visualization Components

- **ClusterChart** - Interactive charts using Recharts
  - Elbow method visualization
  - Cluster statistics bar charts
  - Responsive and animated

### Display Components

- **ResultCard** - Displays prediction results with cluster information

### Route Guards

- **ProtectedRoute** - Ensures user is authenticated
- **AdminRoute** - Ensures user has admin role

## 🔌 API Integration

### API Service (`src/services/api.js`)

Centralized Axios instance with:

- Base URL configuration
- Request interceptors for JWT tokens
- Response interceptors for error handling
- Automatic token refresh handling

### API Methods

```javascript
// Authentication
api.post("/auth/register", userData);
api.post("/auth/login", credentials);
api.get("/auth/me");

// Predictions
api.post("/predict", customerData);
api.get("/history");

// Clusters
api.get("/clusters");
api.get("/elbow");

// User Management
api.get("/users/me/profile");
api.put("/users/me", updates);

// Admin
api.get("/admin/users");
api.put("/admin/users/:id/role", roleData);
api.delete("/admin/users/:id");
```

## 🎨 Styling

### Tailwind Configuration

Custom theme with:

- Professional color palette
- Clean white theme
- Accent colors for different clusters
- Responsive breakpoints
- Custom utilities

### Color Scheme

- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)
- Text: Dark gray (#1a1a1a)

## 🔐 Security

- JWT tokens stored in localStorage
- Automatic token inclusion in requests
- Protected routes with authentication checks
- Role-based access control
- Secure password handling (hashed on backend)

## 📝 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Hosting

The `dist/` folder can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📄 License

This project is part of a customer segmentation application.
