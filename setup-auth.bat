@echo off
echo ========================================
echo Setting Up Authentication System
echo ========================================
echo.

echo [1/3] Installing Backend Dependencies
echo ========================================
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
echo Backend dependencies installed!
echo.

echo [2/3] Setting Up Environment
echo ========================================
if not exist .env (
    echo Creating .env file from example...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Update SECRET_KEY in .env for production!
    echo.
) else (
    echo .env file already exists
)
echo.

echo [3/3] Initializing Database
echo ========================================
echo Starting server to create database...
echo (Server will start and create tables automatically)
echo.
echo Press Ctrl+C after you see "Application startup complete"
echo.
python -c "from app.database import init_db; init_db(); print('✅ Database initialized successfully!')"
cd ..
echo.

echo ========================================
echo ✅ Authentication System Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update SECRET_KEY in backend/.env
echo 2. Start backend: cd backend ^&^& uvicorn app.main:app --reload
echo 3. Visit API docs: http://localhost:8000/docs
echo 4. Register a user via /auth/register
echo 5. Login via /auth/login
echo.
echo Documentation: AUTH_SYSTEM_COMPLETE.md
echo.
pause
