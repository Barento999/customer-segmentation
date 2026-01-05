@echo off
echo ========================================
echo Customer Segmentation ML - Test Suite
echo ========================================
echo.

echo [1/3] Running Backend Tests (pytest)
echo ========================================
cd backend
call venv\Scripts\activate
pytest --cov=app --cov-report=term-missing --cov-report=html
if %ERRORLEVEL% NEQ 0 (
    echo Backend tests FAILED!
    cd ..
    exit /b 1
)
cd ..
echo Backend tests PASSED!
echo.

echo [2/3] Running Frontend Tests (Vitest)
echo ========================================
cd frontend
call npm test -- --run
if %ERRORLEVEL% NEQ 0 (
    echo Frontend tests FAILED!
    cd ..
    exit /b 1
)
cd ..
echo Frontend tests PASSED!
echo.

echo [3/3] Running E2E Tests (Playwright)
echo ========================================
cd e2e
call npm test
if %ERRORLEVEL% NEQ 0 (
    echo E2E tests FAILED!
    cd ..
    exit /b 1
)
cd ..
echo E2E tests PASSED!
echo.

echo ========================================
echo ✅ All Tests Passed Successfully!
echo ========================================
echo.
echo Coverage Reports:
echo - Backend: backend\htmlcov\index.html
echo - Frontend: frontend\coverage\index.html
echo - E2E: e2e\playwright-report\index.html
echo.
pause
