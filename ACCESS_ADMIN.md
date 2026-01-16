# How to Access Admin Dashboard

## Quick Start (3 Steps)

### Step 1: Create Admin User

```bash
test-admin-setup.bat
```

This creates:

- Admin user: `admin` / `admin123`
- Test user: `testuser` / `test123`

### Step 2: Start the Application

```bash
start-with-auth.bat
```

This starts both backend and frontend.

### Step 3: Login as Admin

1. Open browser: `http://localhost:5173/admin/login`
2. Username: `admin`
3. Password: `admin123`
4. Click "👑 Admin Sign In"

You'll be automatically redirected to: `http://localhost:5173/admin/dashboard`

## Access Methods

### Method 1: Direct URL

- Go to: `http://localhost:5173/admin/dashboard`
- If not logged in, you'll be redirected to admin login

### Method 2: Admin Login Page

- Go to: `http://localhost:5173/admin/login`
- Login with admin credentials
- Automatically redirected to dashboard

### Method 3: Navbar (After Login)

**Desktop:**

- Login as admin
- Click the orange "👑 Admin" button in navbar

**Mobile:**

- Login as admin
- Open menu (hamburger icon)
- Click "👑 Admin Dashboard"

**User Menu:**

- Login as admin
- Click your username in navbar
- Click "👑 Admin Dashboard" in dropdown

## What You'll See

### Admin Dashboard Features:

1. **Welcome Header** - Shows your admin name with crown icon 👑
2. **Statistics Cards:**
   - 👥 Total Users (blue)
   - 📊 Total Predictions (green)
   - 📋 Total Profiles (purple)
3. **User Management Table:**
   - Username
   - Email
   - Full Name
   - Role (with color badges)
   - Status (Active/Inactive)

### Navigation for Admins:

- **Desktop:** Orange "👑 Admin" button in navbar
- **Mobile:** "👑 Admin Dashboard" in menu
- **User Menu:** "👑 Admin Dashboard" option

### Navigation for Regular Users:

- Home, Dashboard, History, Settings (normal purple theme)
- No admin button visible

## Routes Available

### Public Routes:

- `/login` - User login
- `/admin/login` - Admin login
- `/register` - User registration
- `/about` - About page
- `/documentation` - Documentation

### Admin Routes (Admin Only):

- `/admin/dashboard` - Admin dashboard

### User Routes (Authenticated):

- `/` - Home
- `/dashboard` - User dashboard
- `/history` - Prediction history
- `/settings` - Settings
- `/profile` - User profile

## Security Features

✅ **Role-Based Access:**

- Only users with `role: "admin"` can access admin routes
- Regular users are redirected to login if they try to access admin routes

✅ **Separate Login Portals:**

- Admin login: Red/orange theme with crown 👑
- User login: Purple/pink theme

✅ **Session Isolation:**

- Each browser tab has independent session
- Admin and user can be logged in different tabs

✅ **Visual Indicators:**

- Admin navbar button is orange (stands out)
- Admin badge shown in mobile menu
- Admin dashboard link in user dropdown

## Troubleshooting

### Can't see admin button?

- Make sure you're logged in as admin
- Check user role: Should be "admin"
- Try refreshing the page

### Redirected to login?

- You're not logged in as admin
- Login at `/admin/login` with admin credentials

### Dashboard shows no data?

- Backend might not be running
- Check if admin user exists (run `test-admin-setup.bat`)
- Check browser console for errors

### Backend errors?

- Make sure backend is running: `cd backend && uvicorn app.main:app --reload`
- Check if admin routes are imported in `backend/app/main.py`
- Verify `backend/app/routes/__init__.py` includes admin import

## Summary

The admin dashboard is fully accessible via:

1. Direct URL: `/admin/dashboard`
2. Admin login redirect
3. Navbar button (orange "👑 Admin")
4. User menu dropdown
5. Mobile menu

All routes are protected and only accessible to users with admin role!
