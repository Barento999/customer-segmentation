@echo off
echo ========================================
echo Setting Up Test Environment
echo ========================================
echo.

echo [1/3] Installing Backend Test Dependencies
echo ========================================
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
cd ..
echo Backend test dependencies installed!
echo.

echo [2/3] Installing Frontend Test Dependencies
echo ========================================
cd frontend
call npm install
cd ..
echo Frontend test dependencies installed!
echo.

echo [3/3] Installing E2E Test Dependencies
echo ========================================
cd e2e
call npm install
call npx playwright install --with-deps
cd ..
echo E2E test dependencies installed!
echo.

echo ========================================
echo ✅ Test Environment Setup Complete!
echo ========================================
echo.
echo You can now run tests:
echo - Backend: cd backend ^&^& pytest
echo - Frontend: cd frontend ^&^& npm test
echo - E2E: cd e2e ^&^& npm test
echo - All: run-all-tests.bat
echo.
pause
