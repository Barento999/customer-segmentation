# Quick Start Guide

Get the Customer Segmentation ML app running in 5 minutes!

## Prerequisites Check

✅ Python 3.8+ installed: `python --version`  
✅ Node.js 16+ installed: `node --version`  
✅ npm installed: `npm --version`

## Windows Users - Automated Setup

### Option 1: Use Batch Scripts (Easiest)

1. **Setup Backend**

   ```
   Double-click: setup-backend.bat
   ```

2. **Setup Frontend**

   ```
   Double-click: setup-frontend.bat
   ```

3. **Start Backend** (in one terminal)

   ```
   Double-click: start-backend.bat
   ```

4. **Start Frontend** (in another terminal)
   ```
   Double-click: start-frontend.bat
   ```

### Option 2: Manual Commands

**Terminal 1 - Backend:**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm install
npm run dev
```

## Mac/Linux Users

**Terminal 1 - Backend:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm install
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## First Steps

1. **Open Frontend**: http://localhost:5173
2. **Go to Dashboard**: Click "Dashboard" in navbar
3. **Train Model**: Click "Train Model" button
4. **Wait**: Training takes ~5 seconds
5. **View Results**: See cluster statistics and charts
6. **Make Prediction**: Go to "Home" page
7. **Enter Data**: Fill in customer information
8. **Get Segment**: Click "Predict Segment"

## Sample Customer Data

Try this:

- Age: 35
- Annual Income: 75.0
- Spending Score: 85
- Purchase Frequency: 20

## Troubleshooting

**Backend won't start?**

- Check Python version: `python --version` (need 3.8+)
- Activate virtual environment first
- Install dependencies: `pip install -r requirements.txt`

**Frontend won't start?**

- Check Node version: `node --version` (need 16+)
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

**Can't connect to API?**

- Ensure backend is running on port 8000
- Check http://localhost:8000 in browser
- Look for CORS errors in browser console

**Model not trained error?**

- Go to Dashboard
- Click "Train Model" button
- Wait for success message

## Project Structure

```
customer-segmentation-ml/
├── backend/          # Python FastAPI backend
│   ├── app/         # Application code
│   ├── data/        # Customer dataset
│   └── models/      # Saved ML models
│
└── frontend/        # React frontend
    ├── src/
    │   ├── components/  # UI components
    │   ├── pages/       # Page components
    │   └── services/    # API client
    └── public/
```

## Key Files

- `backend/app/main.py` - API endpoints
- `backend/app/model.py` - ML model logic
- `frontend/src/App.jsx` - Main React component
- `frontend/src/services/api.js` - API client

## Common Commands

**Backend:**

```bash
# Start server
uvicorn app.main:app --reload

# Different port
uvicorn app.main:app --reload --port 8001

# View logs
# Check terminal output
```

**Frontend:**

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Next Steps

1. ✅ Train the model
2. ✅ Make predictions
3. ✅ Explore visualizations
4. 📖 Read SETUP_GUIDE.md for details
5. 📖 Read PROJECT_OVERVIEW.md for architecture
6. 🔧 Customize for your needs

## Need Help?

1. Check API docs: http://localhost:8000/docs
2. Read SETUP_GUIDE.md
3. Check browser console (F12)
4. Check terminal output
5. Verify all dependencies installed

## Features to Try

- [ ] Train the ML model
- [ ] Predict customer segments
- [ ] View cluster visualizations
- [ ] Check cluster statistics
- [ ] Try different customer profiles
- [ ] Explore the dashboard
- [ ] Test API endpoints in Swagger UI

## Development Mode

Both servers run in development mode with:

- **Hot reload** - Changes auto-refresh
- **Error messages** - Detailed debugging info
- **Source maps** - Easy debugging

## Production Build

When ready to deploy:

**Backend:**

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

**Frontend:**

```bash
npm run build
# Deploy dist/ folder
```

## Tech Stack

- **Backend**: Python, FastAPI, Scikit-learn, Pandas
- **Frontend**: React, Tailwind CSS, Axios, Recharts
- **ML**: K-Means Clustering, StandardScaler

## Support

- 📖 Documentation: See README.md
- 🔧 Setup Issues: See SETUP_GUIDE.md
- 🏗️ Architecture: See PROJECT_OVERVIEW.md
- 🌐 API Docs: http://localhost:8000/docs

---

**Ready to go!** 🚀

Start both servers and visit http://localhost:5173 to begin!
