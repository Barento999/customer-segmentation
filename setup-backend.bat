@echo off
echo ========================================
echo Setting Up Backend Environment
echo ========================================
echo.

cd backend

echo Creating Python virtual environment...
python -m venv venv

echo.
echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo ========================================
echo Backend setup complete!
echo ========================================
echo.
echo To start the backend server, run:
echo   start-backend.bat
echo.
pause
