# Complete Tools & Technologies Reference

This document provides a comprehensive list of all tools, libraries, and technologies used in the Customer Segmentation ML Project.

## 📋 Table of Contents

- [Frontend Technologies](#frontend-technologies)
- [Backend Technologies](#backend-technologies)
- [Testing Tools](#testing-tools)
- [Development Tools](#development-tools)
- [Deployment Tools](#deployment-tools)

## 🎨 Frontend Technologies

### Core Framework & Libraries

| Tool                 | Version | Purpose                                                 |
| -------------------- | ------- | ------------------------------------------------------- |
| **React**            | ^18.2.0 | Core UI library for building component-based interfaces |
| **React DOM**        | ^18.2.0 | React rendering for web browsers                        |
| **React Router DOM** | ^6.21.1 | Client-side routing and navigation between pages        |

### Build & Development Tools

| Tool                     | Version | Purpose                                           |
| ------------------------ | ------- | ------------------------------------------------- |
| **Vite**                 | ^5.0.8  | Fast build tool with HMR (Hot Module Replacement) |
| **@vitejs/plugin-react** | ^4.2.1  | Official React plugin for Vite with Fast Refresh  |

### Styling & CSS

| Tool             | Version  | Purpose                                              |
| ---------------- | -------- | ---------------------------------------------------- |
| **Tailwind CSS** | ^3.4.0   | Utility-first CSS framework for rapid UI development |
| **PostCSS**      | ^8.4.32  | Tool for transforming CSS with JavaScript plugins    |
| **Autoprefixer** | ^10.4.16 | PostCSS plugin to add vendor prefixes automatically  |

### HTTP & API Communication

| Tool      | Version | Purpose                                           |
| --------- | ------- | ------------------------------------------------- |
| **Axios** | ^1.6.5  | Promise-based HTTP client for making API requests |

### Data Visualization

| Tool         | Version        | Purpose                                               |
| ------------ | -------------- | ----------------------------------------------------- |
| **Recharts** | ^2.10.3        | Composable charting library built on React components |
| **d3-scale** | (via Recharts) | Scales for data transformation                        |
| **d3-shape** | (via Recharts) | SVG shape generators                                  |

### Frontend Testing

| Tool                            | Version | Purpose                                                |
| ------------------------------- | ------- | ------------------------------------------------------ |
| **Vitest**                      | ^1.1.0  | Fast unit test framework powered by Vite               |
| **@vitest/ui**                  | ^1.1.0  | Interactive UI for viewing test results                |
| **@vitest/coverage-v8**         | ^1.1.0  | Code coverage using V8 engine                          |
| **@testing-library/react**      | ^14.1.2 | React component testing utilities                      |
| **@testing-library/jest-dom**   | ^6.1.5  | Custom Jest matchers for DOM assertions                |
| **@testing-library/user-event** | ^14.5.1 | User interaction simulation for tests                  |
| **jsdom**                       | ^23.0.1 | JavaScript implementation of web standards for testing |

### Type Definitions

| Tool                 | Version  | Purpose                                   |
| -------------------- | -------- | ----------------------------------------- |
| **@types/react**     | ^18.2.43 | TypeScript type definitions for React     |
| **@types/react-dom** | ^18.2.17 | TypeScript type definitions for React DOM |

## 🐍 Backend Technologies

### Core Framework

| Tool         | Version   | Purpose                                                  |
| ------------ | --------- | -------------------------------------------------------- |
| **FastAPI**  | >=0.109.0 | Modern, fast web framework for building APIs with Python |
| **Uvicorn**  | >=0.27.0  | Lightning-fast ASGI server implementation                |
| **Pydantic** | >=2.5.0   | Data validation using Python type annotations            |

### Machine Learning & Data Science

| Tool             | Version  | Purpose                                                       |
| ---------------- | -------- | ------------------------------------------------------------- |
| **scikit-learn** | >=1.3.0  | Machine learning library (K-Means clustering, preprocessing)  |
| **pandas**       | >=2.0.0  | Data manipulation and analysis library                        |
| **numpy**        | >=1.24.0 | Fundamental package for numerical computing                   |
| **joblib**       | >=1.3.0  | Efficient serialization of Python objects (model persistence) |

### Authentication & Security

| Tool                          | Version | Purpose                                                 |
| ----------------------------- | ------- | ------------------------------------------------------- |
| **python-jose[cryptography]** | >=3.3.0 | JavaScript Object Signing and Encryption for JWT tokens |
| **passlib[bcrypt]**           | >=1.7.4 | Password hashing library with bcrypt algorithm          |
| **python-dotenv**             | >=1.0.0 | Read key-value pairs from .env file                     |

### Database & ORM

| Tool           | Version  | Purpose                                         |
| -------------- | -------- | ----------------------------------------------- |
| **SQLAlchemy** | >=2.0.0  | SQL toolkit and Object-Relational Mapping (ORM) |
| **databases**  | >=0.8.0  | Async database support for Python               |
| **aiosqlite**  | >=0.19.0 | Async driver for SQLite databases               |

### Additional Backend Tools

| Tool                 | Version | Purpose                                           |
| -------------------- | ------- | ------------------------------------------------- |
| **python-multipart** | >=0.0.6 | Streaming multipart parser for Python (form data) |

### Backend Testing

| Tool               | Version  | Purpose                            |
| ------------------ | -------- | ---------------------------------- |
| **pytest**         | >=7.4.0  | Testing framework for Python       |
| **pytest-asyncio** | >=0.21.0 | Pytest support for asyncio         |
| **pytest-cov**     | >=4.1.0  | Coverage plugin for pytest         |
| **httpx**          | >=0.25.0 | Async HTTP client for testing APIs |

## 🧪 End-to-End Testing

| Tool           | Version | Purpose                                                        |
| -------------- | ------- | -------------------------------------------------------------- |
| **Playwright** | ^1.40.1 | Browser automation for E2E testing (Chromium, Firefox, WebKit) |

## 🛠️ Development Tools

### Version Control

| Tool       | Purpose                        |
| ---------- | ------------------------------ |
| **Git**    | Version control system         |
| **GitHub** | Code hosting and collaboration |

### Code Quality

| Tool         | Purpose                         |
| ------------ | ------------------------------- |
| **ESLint**   | JavaScript/React linting        |
| **Prettier** | Code formatting (if configured) |

### Python Environment

| Tool     | Purpose                               |
| -------- | ------------------------------------- |
| **venv** | Python virtual environment management |
| **pip**  | Python package installer              |

### Node.js Environment

| Tool        | Purpose              |
| ----------- | -------------------- |
| **npm**     | Node package manager |
| **Node.js** | JavaScript runtime   |

## 📦 Package Managers

| Tool    | Purpose                     |
| ------- | --------------------------- |
| **npm** | Frontend package management |
| **pip** | Backend package management  |

## 🚀 Deployment Tools

### Frontend Deployment Options

| Platform                | Purpose                              |
| ----------------------- | ------------------------------------ |
| **Vercel**              | Serverless deployment for React apps |
| **Netlify**             | Static site hosting with CI/CD       |
| **AWS S3 + CloudFront** | Static hosting with CDN              |
| **GitHub Pages**        | Free static site hosting             |

### Backend Deployment Options

| Platform             | Purpose                       |
| -------------------- | ----------------------------- |
| **Heroku**           | Platform as a Service (PaaS)  |
| **AWS EC2**          | Virtual servers in the cloud  |
| **AWS ECS**          | Container orchestration       |
| **Google Cloud Run** | Serverless container platform |
| **DigitalOcean**     | Cloud infrastructure          |

## 📊 Data Visualization Libraries (via Recharts)

| Library            | Purpose                          |
| ------------------ | -------------------------------- |
| **d3-array**       | Array manipulation utilities     |
| **d3-color**       | Color manipulation               |
| **d3-ease**        | Easing functions for animations  |
| **d3-format**      | Number formatting                |
| **d3-interpolate** | Interpolation methods            |
| **d3-path**        | SVG path generation              |
| **d3-scale**       | Scale functions for data mapping |
| **d3-shape**       | SVG shape generators             |
| **d3-time**        | Time intervals and calculations  |
| **d3-time-format** | Time formatting                  |

## 🔧 Configuration Files

### Frontend Configuration

| File                   | Purpose                       |
| ---------------------- | ----------------------------- |
| **vite.config.js**     | Vite build tool configuration |
| **vitest.config.js**   | Vitest testing configuration  |
| **tailwind.config.js** | Tailwind CSS customization    |
| **postcss.config.js**  | PostCSS plugins configuration |
| **package.json**       | Node dependencies and scripts |
| **.env**               | Environment variables         |

### Backend Configuration

| File                     | Purpose                         |
| ------------------------ | ------------------------------- |
| **requirements.txt**     | Python production dependencies  |
| **requirements-dev.txt** | Python development dependencies |
| **pytest.ini**           | Pytest configuration            |
| **.env**                 | Environment variables           |
| **.env.example**         | Example environment variables   |

### E2E Testing Configuration

| File                     | Purpose                       |
| ------------------------ | ----------------------------- |
| **playwright.config.js** | Playwright test configuration |
| **package.json**         | E2E test dependencies         |

## 📚 Key Algorithms & Techniques

### Machine Learning

| Algorithm/Technique    | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| **K-Means Clustering** | Unsupervised learning for customer segmentation |
| **Elbow Method**       | Determining optimal number of clusters          |
| **Silhouette Score**   | Measuring cluster quality                       |
| **StandardScaler**     | Feature normalization                           |

### Security

| Technique                 | Purpose                       |
| ------------------------- | ----------------------------- |
| **JWT (JSON Web Tokens)** | Stateless authentication      |
| **bcrypt**                | Password hashing algorithm    |
| **CORS**                  | Cross-Origin Resource Sharing |
| **OAuth2**                | Authorization framework       |

### Design Patterns

| Pattern                  | Purpose                    |
| ------------------------ | -------------------------- |
| **Context API**          | React state management     |
| **Protected Routes**     | Route-level authentication |
| **Repository Pattern**   | Data access abstraction    |
| **Dependency Injection** | FastAPI dependencies       |

## 🎯 Development Workflow Tools

### Scripts & Automation

#### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run tests
npm run test:ui      # Interactive test UI
npm run test:coverage # Coverage report
```

#### Backend Scripts

```bash
uvicorn app.main:app --reload  # Start dev server
python generate_dataset.py     # Generate data
python create_admin.py         # Create admin user
pytest                         # Run tests
pytest --cov=app              # Coverage report
```

#### E2E Scripts

```bash
npm test             # Run E2E tests
npm run test:headed  # Run with browser visible
npm run test:ui      # Interactive mode
npm run test:debug   # Debug mode
```

## 📈 Performance Tools

| Tool                   | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| **Vite HMR**           | Hot Module Replacement for fast development |
| **React Fast Refresh** | Preserve component state during edits       |
| **Lazy Loading**       | Code splitting for better performance       |
| **Async/Await**        | Non-blocking operations                     |

## 🔍 Monitoring & Debugging

| Tool                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| **React DevTools**   | React component inspection               |
| **Browser DevTools** | Network, console, performance monitoring |
| **FastAPI Docs**     | Interactive API documentation            |
| **Swagger UI**       | API testing interface                    |
| **ReDoc**            | Alternative API documentation            |

## 📝 Documentation Tools

| Tool                  | Purpose                  |
| --------------------- | ------------------------ |
| **Markdown**          | Documentation format     |
| **Swagger/OpenAPI**   | API specification        |
| **JSDoc**             | JavaScript documentation |
| **Python Docstrings** | Python documentation     |

## 🌐 Browser Support

### Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💾 Database

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| **SQLite**     | Development database       |
| **PostgreSQL** | Recommended for production |

## 🔐 Security Tools

| Tool/Library        | Purpose                           |
| ------------------- | --------------------------------- |
| **CORS Middleware** | Cross-origin request handling     |
| **JWT**             | Token-based authentication        |
| **bcrypt**          | Password hashing                  |
| **HTTPS**           | Secure communication (production) |

## 📦 Total Dependencies Count

- **Frontend**: ~50+ npm packages (including transitive dependencies)
- **Backend**: ~15 Python packages (direct dependencies)
- **E2E Testing**: 1 main package (Playwright)
- **Total Direct Dependencies**: ~30 packages

## 🎓 Learning Resources

### Frontend

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)

### Backend

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [scikit-learn User Guide](https://scikit-learn.org)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org)

### Testing

- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [Testing Library](https://testing-library.com)

---

**Last Updated**: January 2025

This document provides a complete reference of all tools and technologies used in the project. For specific usage instructions, refer to the README files in each directory.
