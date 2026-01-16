@echo off
echo ========================================
echo Testing Admin Setup
echo ========================================
echo.

echo Step 1: Creating admin user...
cd backend
python create_admin.py
cd ..
echo.

echo ========================================
echo Admin Setup Complete!
echo ========================================
echo.
echo Admin Login:
echo   URL: http://localhost:5173/admin/login
echo   Username: admin
echo   Password: admin123
echo.
echo User Login:
echo   URL: http://localhost:5173/login
echo   Username: testuser
echo   Password: test123
echo.
echo Admin Dashboard:
echo   URL: http://localhost:5173/admin/dashboard
echo.
echo Press any key to exit...
pause >nul
