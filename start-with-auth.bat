@echo off
echo ========================================
echo Starting Customer Segmentation ML
echo WITH AUTHENTICATION
echo ========================================
echo.

echo Backend is already running on http://localhost:8000
echo.

echo Starting Frontend...
echo ========================================
cd frontend
start cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo ✅ System Starting!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173 (opening in new window)
echo API Docs: http://localhost:8000/docs
echo.
echo Test Accounts:
echo   Admin: admin / admin123
echo   User: testuser / test123
echo.
echo Press any key to open browser...
pause
start http://localhost:5173
