# Admin Security Implementation

## Overview

Comprehensive role-based access control (RBAC) with separate admin and user portals.

## Security Features

### 1. Separate Login Portals

**User Portal** (`/login`)

- Purple/pink gradient theme
- Only allows users with role: `user` or `analyst`
- Blocks admin accounts with error message
- Redirects admins to admin portal
- Demo: testuser / test123

**Admin Portal** (`/admin/login`)

- Red/orange gradient theme with crown icon 👑
- Only allows users with role: `admin`
- Blocks non-admin accounts with 403 error
- Separate authentication flow
- Demo: admin / admin123

### 2. Frontend Route Protection

**AdminRoute Component** (`frontend/src/components/AdminRoute.jsx`)

- Wraps all admin-only pages
- Checks user authentication status
- Verifies admin role before rendering
- Redirects non-admins to user login
- Redirects unauthenticated users to admin login

**Protected Admin Routes:**

- `/admin/dashboard` - Admin dashboard with user management

### 3. Backend API Security

**Admin Routes** (`backend/app/routes/admin.py`)

- All routes prefixed with `/admin`
- `require_admin()` dependency on every endpoint
- Returns 403 Forbidden for non-admin users
- Validates JWT token + admin role

**Admin Endpoints:**

- `GET /admin/users` - List all users with stats
- `GET /admin/users/{user_id}` - Get specific user
- `PUT /admin/users/{user_id}/role` - Update user role
- `DELETE /admin/users/{user_id}` - Delete user
- `PUT /admin/users/{user_id}/toggle-active` - Enable/disable user
- `GET /admin/stats` - System statistics

**Security Rules:**

- Admins cannot demote themselves
- Admins cannot delete themselves
- Admins cannot deactivate themselves
- All actions require valid JWT token
- All actions verify admin role

### 4. Session Isolation

**sessionStorage Implementation:**

- Each browser tab has independent session
- Login in one tab doesn't affect others
- Closing tab clears that tab's session
- No cross-tab authentication sharing

### 5. Role-Based Access

**User Roles:**

- `user` - Regular users (default)
- `analyst` - Analyst role (future use)
- `admin` - Administrator with full access

**Role Enforcement:**

- Frontend: Route guards check user.role
- Backend: Dependency injection validates role
- Database: Role stored in users table
- JWT: Role included in token claims

## Admin Dashboard Features

**User Management:**

- View all registered users
- See user roles and status
- View system statistics
- Monitor user activity

**System Stats:**

- Total users count
- Total predictions made
- Total customer profiles
- Users by role breakdown

## Testing Admin Access

### Create Admin User

```bash
cd backend
python create_admin.py
```

### Test Admin Login

1. Go to `/admin/login`
2. Username: `admin`
3. Password: `admin123`
4. Should redirect to `/admin/dashboard`

### Test User Login

1. Go to `/login`
2. Username: `testuser`
3. Password: `test123`
4. Should redirect to `/` (home)

### Test Security

1. Try accessing `/admin/dashboard` as regular user → Redirected to `/login`
2. Try logging in as admin at `/login` → Error message shown
3. Try logging in as user at `/admin/login` → Access denied error
4. Try accessing admin API endpoints without admin role → 403 Forbidden

## API Security Examples

### Valid Admin Request

```bash
# Login as admin
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Use token to access admin endpoint
curl -X GET http://localhost:8000/admin/users \
  -H "Authorization: Bearer <admin_token>"
```

### Invalid Request (Non-Admin)

```bash
# Login as regular user
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Try to access admin endpoint → 403 Forbidden
curl -X GET http://localhost:8000/admin/users \
  -H "Authorization: Bearer <user_token>"
```

## Security Best Practices

✅ **Implemented:**

- Separate login portals for admin/user
- Role-based route protection
- Backend API role validation
- Session isolation per tab
- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation

🔒 **Production Recommendations:**

- Use HTTPS only
- Set specific CORS origins
- Implement rate limiting
- Add audit logging
- Enable 2FA for admins
- Use environment variables for secrets
- Implement password complexity rules
- Add session timeout
- Monitor failed login attempts

## File Structure

```
frontend/src/
├── components/
│   ├── AdminRoute.jsx          # Admin route guard
│   └── ProtectedRoute.jsx      # User route guard
├── pages/
│   ├── Login.jsx               # User login portal
│   ├── AdminLogin.jsx          # Admin login portal
│   └── AdminDashboard.jsx      # Admin dashboard
└── context/
    └── AuthContext.jsx         # Auth state management

backend/app/
├── routes/
│   ├── auth.py                 # Authentication endpoints
│   ├── admin.py                # Admin-only endpoints
│   ├── users.py                # User endpoints
│   └── profiles.py             # Profile endpoints
├── auth.py                     # Auth utilities
└── database.py                 # Database models
```

## Summary

The admin system is now fully secured with:

- Separate login portals with visual distinction
- Role-based access control on frontend and backend
- Independent sessions per browser tab
- Comprehensive admin dashboard
- Protected API endpoints
- User management capabilities

Admins and regular users are completely isolated with their own authentication flows and access levels.
