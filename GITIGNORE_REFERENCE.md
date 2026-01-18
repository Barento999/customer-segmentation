# .gitignore Reference

Quick reference for what files are ignored in this project.

## 🚫 Ignored Files & Folders

### 📦 Dependencies & Packages

- `node_modules/` - Node.js dependencies (frontend)
- `venv/`, `env/`, `ENV/` - Python virtual environments
- `__pycache__/` - Python bytecode cache
- `*.egg-info/` - Python package metadata

### 🏗️ Build Artifacts

- `dist/`, `build/` - Build output directories
- `*.pyc`, `*.pyo` - Python compiled files
- `*.pkl` - Trained ML model files

### 💾 Database Files

- `*.db`, `*.sqlite`, `*.sqlite3` - SQLite database files
- `backend/customer_segmentation.db` - Main application database

**Why?** Database files can be large and contain user data. They should be generated locally.

### 🔐 Sensitive Data

- `.env`, `.env.local` - Environment variables with secrets
- API keys, passwords, JWT secrets

**Why?** Never commit sensitive credentials to git!

### 🧪 Testing

- `.pytest_cache/` - Pytest cache
- `coverage/`, `htmlcov/` - Coverage reports
- `playwright-report/` - E2E test reports
- `test-results/` - Test output

### 💻 IDE & Editor

- `.vscode/`, `.idea/` - IDE settings
- `*.swp`, `*.swo` - Vim swap files

### 📝 Temporary Files

- `*.log` - Log files
- `*.tmp`, `*.temp` - Temporary files
- `*.bak` - Backup files
- `~$*.docx` - Word temporary files

### 🖥️ OS Files

- `.DS_Store` - macOS folder settings
- `Thumbs.db` - Windows thumbnail cache
- `desktop.ini` - Windows folder settings

---

## ✅ What SHOULD Be Committed

### Source Code

- `*.py` - Python source files
- `*.js`, `*.jsx` - JavaScript/React files
- `*.css` - Stylesheets
- `*.html` - HTML templates

### Configuration

- `requirements.txt` - Python dependencies list
- `package.json` - Node.js dependencies list
- `.env.example` - Example environment variables (no secrets!)
- Config files (vite.config.js, tailwind.config.js, etc.)

### Documentation

- `*.md` - Markdown documentation
- `README.md` - Project documentation

### Scripts

- `*.bat` - Batch scripts
- `*.sh` - Shell scripts

### Data

- `backend/data/customers.csv` - Sample dataset (if not too large)
- `backend/generate_dataset.py` - Dataset generator script

---

## 🔧 How to Use

### Check What Will Be Committed

```bash
git status
```

### See Ignored Files

```bash
git status --ignored
```

### Force Add an Ignored File (if needed)

```bash
git add -f filename
```

### Check If File Is Ignored

```bash
git check-ignore -v filename
```

---

## 🛡️ Security Best Practices

1. **Never commit**:
   - `.env` files with real secrets
   - Database files with user data
   - API keys or passwords
   - JWT secret keys

2. **Always commit**:
   - `.env.example` with placeholder values
   - `requirements.txt` and `package.json`
   - Source code and documentation

3. **Before committing**:
   - Review `git status`
   - Check for sensitive data
   - Verify `.env` is not included

---

## 📝 Common Issues

### "I accidentally committed .env"

```bash
# Remove from git but keep locally
git rm --cached .env
git commit -m "Remove .env from git"

# Then change all secrets in .env!
```

### "I want to commit a .pkl file"

```bash
# Force add specific file
git add -f backend/models/specific_model.pkl
```

### "node_modules is too large"

```bash
# It's already ignored! Just don't add it
# If accidentally added:
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

---

## ✅ Verification Checklist

Before pushing to git:

- [ ] No `.env` files with real secrets
- [ ] No database files (\*.db)
- [ ] No `node_modules/` or `venv/`
- [ ] No large model files (\*.pkl) unless intended
- [ ] No sensitive user data
- [ ] `.env.example` is included (without secrets)
- [ ] All source code is included
- [ ] Documentation is up to date

---

**Last Updated**: January 2025  
**Status**: ✅ Configured and Secure
