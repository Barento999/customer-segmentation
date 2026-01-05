@echo off
echo ========================================
echo Starting Customer Segmentation App
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend will be at: http://localhost:8000
echo Frontend will be at: http://localhost:5173 (or 5175)
echo.
echo Two terminal windows will open.
echo Close them to stop the servers.
echo.
pause
