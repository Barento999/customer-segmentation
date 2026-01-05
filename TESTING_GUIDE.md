# 🧪 Testing Guide - Customer Segmentation ML

Complete testing infrastructure for the Customer Segmentation ML application.

## 📋 Table of Contents

- [Overview](#overview)
- [Backend Tests (pytest)](#backend-tests-pytest)
- [Frontend Tests (Vitest + React Testing Library)](#frontend-tests-vitest--react-testing-library)
- [E2E Tests (Playwright)](#e2e-tests-playwright)
- [Running All Tests](#running-all-tests)
- [CI/CD Integration](#cicd-integration)

---

## 🎯 Overview

This project includes three types of tests:

1. **Backend Unit Tests** - Test API endpoints, ML model, and schemas
2. **Frontend Component Tests** - Test React components and services
3. **E2E Tests** - Test complete user workflows across the full stack

### Test Coverage

- ✅ API endpoint validation
- ✅ ML model training and prediction
- ✅ Schema validation
- ✅ React component rendering
- ✅ Form validation
- ✅ User interactions
- ✅ Full user workflows
- ✅ Mobile responsiveness
- ✅ API integration

---

## 🐍 Backend Tests (pytest)

### Setup

1. **Install test dependencies:**

```bash
cd backend
pip install -r requirements-dev.txt
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage report
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_api.py

# Run specific test class
pytest tests/test_api.py::TestHealthCheck

# Run specific test
pytest tests/test_api.py::TestHealthCheck::test_health_check

# Run with verbose output
pytest -v

# Run and stop on first failure
pytest -x
```

### Test Structure

```
backend/tests/
├── __init__.py
├── conftest.py              # Fixtures and configuration
├── test_api.py              # API endpoint tests
├── test_model.py            # ML model tests
└── test_schema.py           # Schema validation tests
```

### What's Tested

#### API Endpoints (`test_api.py`)

- ✅ Health check endpoint
- ✅ Model training endpoint
- ✅ Prediction endpoint with valid/invalid data
- ✅ Cluster statistics endpoint
- ✅ Elbow method endpoint
- ✅ Input validation
- ✅ Error handling

#### ML Model (`test_model.py`)

- ✅ Model initialization
- ✅ Training with optimal clusters
- ✅ Training with specific cluster count
- ✅ Predictions after training
- ✅ Cluster statistics calculation
- ✅ Elbow method data generation
- ✅ Error handling for untrained model

#### Schemas (`test_schema.py`)

- ✅ CustomerInput validation
- ✅ Age range validation (18-100)
- ✅ Income validation (≥ 0)
- ✅ Spending score validation (1-100)
- ✅ Purchase frequency validation (≥ 0)
- ✅ Required field validation
- ✅ Response schema validation

### Coverage Report

After running tests with coverage, open the HTML report:

```bash
# Windows
start htmlcov/index.html

# Mac/Linux
open htmlcov/index.html
```

---

## ⚛️ Frontend Tests (Vitest + React Testing Library)

### Setup

1. **Install test dependencies:**

```bash
cd frontend
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- CustomerForm.test.jsx

# Run tests matching pattern
npm test -- --grep "validation"
```

### Test Structure

```
frontend/src/tests/
├── setup.js                          # Test configuration
├── components/
│   ├── CustomerForm.test.jsx         # Form component tests
│   └── Navbar.test.jsx               # Navigation tests
└── services/
    └── api.test.js                   # API service tests
```

### What's Tested

#### CustomerForm Component

- ✅ Renders all form fields
- ✅ Validates empty fields
- ✅ Validates age range (18-100)
- ✅ Validates spending score range (1-100)
- ✅ Validates negative values
- ✅ Submits valid data
- ✅ Clears errors on input
- ✅ Shows loading state
- ✅ Disables button when loading
- ✅ Sex dropdown selection

#### Navbar Component

- ✅ Renders logo and brand
- ✅ Renders all navigation links
- ✅ Correct href attributes
- ✅ Mobile menu button

#### API Service

- ✅ Health check call
- ✅ Train model call
- ✅ Predict segment call
- ✅ Get clusters call
- ✅ Get elbow data call
- ✅ Error handling

### Coverage Report

After running tests with coverage:

```bash
# Windows
start coverage/index.html

# Mac/Linux
open coverage/index.html
```

---

## 🎭 E2E Tests (Playwright)

### Setup

1. **Install Playwright:**

```bash
cd e2e
npm install
npx playwright install
```

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test home.spec.js

# Run tests on specific browser
npx playwright test --project=chromium

# Run tests on mobile
npx playwright test --project="Mobile Chrome"

# View test report
npm run report

# Generate test code
npm run codegen
```

### Test Structure

```
e2e/tests/
├── home.spec.js              # Home page tests
├── dashboard.spec.js         # Dashboard tests
├── full-workflow.spec.js     # Complete user workflows
└── api.spec.js               # API integration tests
```

### What's Tested

#### Home Page (`home.spec.js`)

- ✅ Page loads correctly
- ✅ Form validation errors
- ✅ Age range validation
- ✅ Spending score validation
- ✅ Form submission
- ✅ Navigation between pages

#### Dashboard (`dashboard.spec.js`)

- ✅ Dashboard page loads
- ✅ Model training
- ✅ Cluster statistics display
- ✅ API status indicator

#### Full Workflow (`full-workflow.spec.js`)

- ✅ Complete workflow: train → predict → view history
- ✅ Navigate through all pages
- ✅ Mobile navigation
- ✅ Form validation scenarios

#### API Integration (`api.spec.js`)

- ✅ Health check endpoint
- ✅ Train model endpoint
- ✅ Predict endpoint with valid data
- ✅ Predict endpoint rejects invalid data
- ✅ Clusters endpoint
- ✅ Elbow endpoint
- ✅ CORS headers

### Test Reports

After running tests, view the HTML report:

```bash
npm run report
```

### Browsers Tested

- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

---

## 🚀 Running All Tests

### Quick Test Script

Create a script to run all tests:

**Windows (`run-all-tests.bat`):**

```batch
@echo off
echo ========================================
echo Running Backend Tests
echo ========================================
cd backend
call venv\Scripts\activate
pytest --cov=app --cov-report=term-missing
cd ..

echo.
echo ========================================
echo Running Frontend Tests
echo ========================================
cd frontend
call npm test -- --run
cd ..

echo.
echo ========================================
echo Running E2E Tests
echo ========================================
cd e2e
call npm test
cd ..

echo.
echo ========================================
echo All Tests Complete!
echo ========================================
```

**Mac/Linux (`run-all-tests.sh`):**

```bash
#!/bin/bash

echo "========================================"
echo "Running Backend Tests"
echo "========================================"
cd backend
source venv/bin/activate
pytest --cov=app --cov-report=term-missing
cd ..

echo ""
echo "========================================"
echo "Running Frontend Tests"
echo "========================================"
cd frontend
npm test -- --run
cd ..

echo ""
echo "========================================"
echo "Running E2E Tests"
echo "========================================"
cd e2e
npm test
cd ..

echo ""
echo "========================================"
echo "All Tests Complete!"
echo "========================================"
```

---

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: "3.10"
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      - name: Run tests
        run: |
          cd backend
          pytest --cov=app --cov-report=xml
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Run tests
        run: |
          cd frontend
          npm run test:coverage

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - uses: actions/setup-python@v4
        with:
          python-version: "3.10"
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
          cd ../frontend
          npm install
          cd ../e2e
          npm install
          npx playwright install --with-deps
      - name: Run E2E tests
        run: |
          cd e2e
          npm test
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: e2e/playwright-report/
```

---

## 📊 Test Statistics

### Backend Tests

- **Total Tests**: 40+
- **Coverage Target**: >80%
- **Test Files**: 3
- **Average Runtime**: ~10 seconds

### Frontend Tests

- **Total Tests**: 25+
- **Coverage Target**: >70%
- **Test Files**: 3
- **Average Runtime**: ~5 seconds

### E2E Tests

- **Total Tests**: 20+
- **Browsers**: 5
- **Test Files**: 4
- **Average Runtime**: ~2 minutes

---

## 🎯 Best Practices

### Writing Tests

1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **One assertion per test** (when possible)
3. **Use descriptive test names**
4. **Mock external dependencies**
5. **Test edge cases**
6. **Keep tests independent**

### Running Tests

1. **Run tests before committing**
2. **Check coverage reports**
3. **Fix failing tests immediately**
4. **Run E2E tests before deployment**
5. **Use CI/CD for automated testing**

---

## 🐛 Troubleshooting

### Backend Tests

**Issue**: Tests fail with "Model not found"
**Solution**: Tests create temporary models, ensure write permissions

**Issue**: Import errors
**Solution**: Ensure you're in the virtual environment

### Frontend Tests

**Issue**: "Cannot find module" errors
**Solution**: Run `npm install` in frontend directory

**Issue**: Tests timeout
**Solution**: Increase timeout in vitest.config.js

### E2E Tests

**Issue**: Servers not starting
**Solution**: Ensure ports 8000 and 5173 are available

**Issue**: Browser not found
**Solution**: Run `npx playwright install`

**Issue**: Tests fail on CI
**Solution**: Use `--with-deps` flag when installing Playwright

---

## 📚 Resources

- [pytest Documentation](https://docs.pytest.org/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)

---

## ✅ Checklist

Before deploying:

- [ ] All backend tests pass
- [ ] All frontend tests pass
- [ ] All E2E tests pass
- [ ] Coverage > 80% for backend
- [ ] Coverage > 70% for frontend
- [ ] Tests run in CI/CD
- [ ] No flaky tests
- [ ] Test documentation updated

---

**Happy Testing! 🎉**
