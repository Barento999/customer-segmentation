# Quick Fix Guide

## ❌ Error: POST http://localhost:8000/auth/login 500 (Internal Server Error)

### Cause

The backend server is not running or has crashed.

### Solution

**Option 1: Use Batch Script (Easiest)**

```bash
start-backend.bat
```

**Option 2: Manual Start**

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Option 3: Start Everything**

```bash
start-app.bat
```

---

## Common Issues & Fixes

### 1. Backend Won't Start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Fix**:

```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Database Error

**Error**: `Database not found` or `Table doesn't exist`

**Fix**:

```bash
cd backend
python create_admin.py
```

### 3. Model Not Trained

**Error**: `Model not trained. Please train the model first`

**Fix**:

1. Start backend
2. Go to Dashboard
3. Click "Train Model" button

Or via API:

```bash
curl -X POST http://localhost:8000/train
```

### 4. Port Already in Use

**Error**: `Address already in use: 8000`

**Fix**:

```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use different port
uvicorn app.main:app --reload --port 8001
```

### 5. Frontend Can't Connect

**Error**: `Network Error` or `ERR_CONNECTION_REFUSED`

**Fix**:

1. Make sure backend is running on port 8000
2. Check `frontend/src/services/api.js` has correct URL
3. Check CORS settings in backend

---

## Quick Health Check

```bash
# Check if backend is running
curl http://localhost:8000/

# Expected response:
# {"status":"healthy","message":"Customer Segmentation API is running","version":"1.0.0"}
```

---

## Complete Restart

If nothing works, do a complete restart:

```bash
# 1. Stop everything
stop-app.bat

# 2. Start backend
start-backend.bat

# 3. Start frontend (in new terminal)
start-frontend.bat

# 4. Check both are running
# Backend: http://localhost:8000/
# Frontend: http://localhost:5173/
```

---

## Login Credentials

**Admin**:

- Username: `admin`
- Password: `admin123`

**Test User**:

- Username: `testuser`
- Password: `test123`

If these don't work, recreate admin:

```bash
cd backend
python create_admin.py
```

---

**Last Updated**: January 2025
