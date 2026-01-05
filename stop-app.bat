@echo off
echo ========================================
echo Stopping Customer Segmentation App
echo ========================================
echo.

echo Stopping Backend Server (port 8000)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /F /PID %%a 2>nul

echo Stopping Frontend Server (ports 5173-5175)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5175') do taskkill /F /PID %%a 2>nul

echo.
echo ========================================
echo Servers stopped!
echo ========================================
echo.
pause
