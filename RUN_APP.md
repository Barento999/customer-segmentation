# Quick Run Instructions

## Backend is installing (this takes a few minutes)

The backend Python packages are still installing. This is normal - scipy and scikit-learn are large packages.

## Start Frontend Now

While backend installs, you can start the frontend:

1. Open a NEW terminal
2. Run these commands:

```bash
cd frontend
npm run dev
```

3. Frontend will start at: http://localhost:5173

## Start Backend (after installation completes)

Once the backend installation finishes:

1. Open ANOTHER terminal
2. Run:

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

3. Backend will start at: http://localhost:8000

## The 404 Error

The 404 error you're seeing is because:

- Frontend is trying to connect to backend at http://localhost:8000
- Backend is not running yet (still installing packages)

Once you start the backend server, the 404 errors will go away!

## Quick Test

After both servers are running:

1. Go to http://localhost:5173
2. Click "Dashboard"
3. Click "Train Model"
4. Wait a few seconds
5. You should see cluster statistics!
