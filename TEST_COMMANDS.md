# 🚀 Quick Test Commands Reference

## Setup (One-Time)

```bash
# Setup everything
setup-tests.bat

# Or manually:
cd backend && pip install -r requirements-dev.txt
cd frontend && npm install
cd e2e && npm install && npx playwright install
```

---

## Run All Tests

```bash
run-all-tests.bat
```

---

## Backend Tests

```bash
cd backend

# Basic
pytest

# With coverage
pytest --cov=app --cov-report=html

# Verbose
pytest -v

# Specific file
pytest tests/test_api.py

# Specific test
pytest tests/test_api.py::TestHealthCheck::test_health_check

# Stop on first failure
pytest -x

# Pattern matching
pytest -k "predict"
```

---

## Frontend Tests

```bash
cd frontend

# Basic
npm test

# Watch mode
npm test -- --watch

# With UI
npm run test:ui

# With coverage
npm run test:coverage

# Specific file
npm test -- CustomerForm.test.jsx
```

---

## E2E Tests

```bash
cd e2e

# All tests
npm test

# With browser visible
npm run test:headed

# Interactive UI
npm run test:ui

# Debug mode
npm run test:debug

# View report
npm run report

# Specific file
npx playwright test home.spec.js

# Specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project="Mobile Chrome"

# Generate test code
npm run codegen
```

---

## Coverage Reports

```bash
# Backend
start backend\htmlcov\index.html

# Frontend
start frontend\coverage\index.html

# E2E
cd e2e && npm run report
```

---

## Test Statistics

| Suite    | Tests | Files | Runtime | Coverage |
| -------- | ----- | ----- | ------- | -------- |
| Backend  | 75+   | 3     | ~10s    | >80%     |
| Frontend | 25+   | 3     | ~5s     | >70%     |
| E2E      | 20+   | 4     | ~2m     | N/A      |

---

## Common Issues

**Backend**: Model not found
→ Tests create temp models, check permissions

**Frontend**: Module not found
→ Run `npm install` in frontend/

**E2E**: Servers not starting
→ Ensure ports 8000 and 5173 are free

**E2E**: Browser not found
→ Run `npx playwright install`
