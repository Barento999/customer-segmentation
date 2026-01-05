# 🧪 How to Test - Step by Step Guide

## ⚡ Quick Start (3 Steps)

### Step 1: Setup (First Time Only)

Open Command Prompt in your project folder and run:

```bash
setup-tests.bat
```

**What this does:**

- Installs backend test dependencies (pytest)
- Installs frontend test dependencies (vitest)
- Installs E2E test dependencies (playwright)
- Downloads browser drivers

**Time:** ~5 minutes

---

### Step 2: Run All Tests

```bash
run-all-tests.bat
```

**What this does:**

- Runs 75+ backend tests
- Runs 25+ frontend tests
- Runs 20+ E2E tests across 5 browsers
- Generates coverage reports

**Time:** ~3 minutes

---

### Step 3: View Results

After tests complete, you'll see:

- ✅ Green checkmarks for passing tests
- ❌ Red X for failing tests
- Coverage percentages

**View detailed coverage reports:**

```bash
# Backend coverage
start backend\htmlcov\index.html

# Frontend coverage
start frontend\coverage\index.html

# E2E test report
cd e2e
npm run report
```

---

## 🎯 Testing Individual Parts

### Backend Tests Only

```bash
cd backend
pytest -v
```

**What you'll see:**

```
tests/test_api.py::TestHealthCheck::test_health_check PASSED
tests/test_api.py::TestTrainEndpoint::test_train_model_success PASSED
tests/test_model.py::TestModelTraining::test_train_model PASSED
...
========== 75 passed in 10.23s ==========
```

**With coverage:**

```bash
pytest --cov=app --cov-report=html
start htmlcov\index.html
```

---

### Frontend Tests Only

```bash
cd frontend
npm test
```

**What you'll see:**

```
✓ src/tests/components/CustomerForm.test.jsx (15)
✓ src/tests/components/Navbar.test.jsx (4)
✓ src/tests/services/api.test.js (6)

Test Files  3 passed (3)
Tests  25 passed (25)
```

**With UI (Interactive):**

```bash
npm run test:ui
```

**With coverage:**

```bash
npm run test:coverage
start coverage\index.html
```

---

### E2E Tests Only

```bash
cd e2e
npm test
```

**What you'll see:**

```
Running 20 tests using 5 workers

✓ [chromium] › home.spec.js:6:3 › should display the home page
✓ [chromium] › dashboard.spec.js:6:3 › should display dashboard
✓ [firefox] › home.spec.js:6:3 › should display the home page
...

20 passed (2m)
```

**With browser visible:**

```bash
npm run test:headed
```

**Interactive UI mode:**

```bash
npm run test:ui
```

---

## 📊 Understanding Test Results

### ✅ All Tests Pass

```
========================================
✅ All Tests Passed Successfully!
========================================

Coverage Reports:
- Backend: backend\htmlcov\index.html
- Frontend: frontend\coverage\index.html
- E2E: e2e\playwright-report\index.html
```

**You're good to go!** Your code is working correctly.

---

### ❌ Some Tests Fail

```
FAILED tests/test_api.py::test_predict - AssertionError
```

**What to do:**

1. Read the error message
2. Check which test failed
3. Fix the code causing the issue
4. Run tests again

**Common issues:**

- Model not trained → Run training first
- Port already in use → Close other instances
- Missing dependencies → Run `setup-tests.bat` again

---

## 🔍 Checking Specific Things

### Test a Specific File

**Backend:**

```bash
cd backend
pytest tests/test_api.py
```

**Frontend:**

```bash
cd frontend
npm test -- CustomerForm.test.jsx
```

**E2E:**

```bash
cd e2e
npx playwright test home.spec.js
```

---

### Test a Specific Function

**Backend:**

```bash
pytest tests/test_api.py::TestHealthCheck::test_health_check
```

**Frontend:**

```bash
npm test -- --grep "validation"
```

---

### Debug a Failing Test

**Backend:**

```bash
pytest -v -s  # Show print statements
pytest -x     # Stop on first failure
```

**Frontend:**

```bash
npm run test:ui  # Interactive debugging
```

**E2E:**

```bash
npm run test:debug  # Opens browser debugger
```

---

## 📈 Coverage Reports Explained

### Backend Coverage (htmlcov/index.html)

Shows which lines of Python code are tested:

- **Green lines** = Tested ✅
- **Red lines** = Not tested ❌
- **Target**: >80% coverage

### Frontend Coverage (coverage/index.html)

Shows which React components are tested:

- **Statements**: % of code lines tested
- **Branches**: % of if/else paths tested
- **Functions**: % of functions tested
- **Target**: >70% coverage

### E2E Report (playwright-report/index.html)

Shows test results across browsers:

- Screenshots of failures
- Video recordings
- Test timing
- Browser compatibility

---

## 🚀 Before Deploying Checklist

Run this checklist before deploying your app:

```bash
# 1. Run all tests
run-all-tests.bat

# 2. Check results
# ✅ All tests should pass
# ✅ Coverage should be >80% backend, >70% frontend

# 3. View coverage reports
start backend\htmlcov\index.html
start frontend\coverage\index.html

# 4. If all green, you're ready to deploy! 🎉
```

---

## 🆘 Troubleshooting

### "pytest: command not found"

**Solution:**

```bash
cd backend
venv\Scripts\activate
pip install -r requirements-dev.txt
```

---

### "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

---

### "Port 8000 already in use"

**Solution:** Stop your backend server before running E2E tests

```bash
# Or change port in e2e/playwright.config.js
```

---

### Tests are slow

**Solution:** Run specific test suites instead of all:

```bash
# Just backend (fast)
cd backend && pytest

# Just frontend (fast)
cd frontend && npm test

# E2E takes longest (~2 min)
```

---

### Browser not found (E2E)

**Solution:**

```bash
cd e2e
npx playwright install --with-deps
```

---

## 💡 Pro Tips

### 1. Run tests before committing code

```bash
run-all-tests.bat
# Only commit if all tests pass
```

### 2. Watch mode for development

```bash
# Frontend tests auto-run on file changes
cd frontend
npm test -- --watch
```

### 3. Generate test code automatically

```bash
cd e2e
npm run codegen
# Opens browser, records your actions, generates test code
```

### 4. Test on specific browser only

```bash
cd e2e
npx playwright test --project=chromium  # Faster than all browsers
```

### 5. Check what's being tested

```bash
# Backend
pytest --collect-only

# Frontend
npm test -- --list

# E2E
npx playwright test --list
```

---

## 📚 More Information

- **Full Guide**: `TESTING_GUIDE.md`
- **Quick Commands**: `TEST_COMMANDS.md`
- **What's Included**: `TESTING_COMPLETE.md`

---

## ✅ Summary

**To test your project:**

1. **First time**: `setup-tests.bat`
2. **Every time**: `run-all-tests.bat`
3. **View reports**: Open HTML files in browser

**That's it!** 🎉

Your project has 100+ tests ensuring everything works correctly.
