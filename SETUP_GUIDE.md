# Customer Segmentation ML - Complete Setup Guide

This guide will walk you through setting up and running the complete customer segmentation application.

## Prerequisites

- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- **VS Code** (recommended)
- Terminal/Command Prompt access

## Project Structure

```
customer-segmentation-ml/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py      # FastAPI app
│   │   ├── model.py     # ML model logic
│   │   ├── preprocess.py # Data preprocessing
│   │   ├── schema.py    # Pydantic schemas
│   │   └── utils.py     # Utility functions
│   ├── data/
│   │   └── customers.csv # Customer dataset
│   ├── models/          # Saved models (generated)
│   ├── notebooks/
│   │   └── experimentation.ipynb
│   ├── requirements.txt
│   └── README.md
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Step-by-Step Setup

### Part 1: Backend Setup

1. **Open Terminal in Backend Directory**

   ```bash
   cd backend
   ```

2. **Create Python Virtual Environment**

   Windows:

   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

   Mac/Linux:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Verify Installation**

   ```bash
   python -c "import fastapi, sklearn, pandas; print('All packages installed!')"
   ```

5. **Start Backend Server**

   ```bash
   uvicorn app.main:app --reload
   ```

   You should see:

   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   INFO:     Application startup complete.
   ```

6. **Test Backend** (in a new terminal)

   Open browser and visit:

   - API Docs: http://localhost:8000/docs
   - Health Check: http://localhost:8000/

### Part 2: Frontend Setup

1. **Open New Terminal in Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Node Dependencies**

   ```bash
   npm install
   ```

   This will install:

   - React
   - Tailwind CSS
   - Axios
   - Recharts
   - React Router
   - Vite

3. **Start Frontend Development Server**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   VITE v5.0.8  ready in XXX ms
   ➜  Local:   http://localhost:5173/
   ```

4. **Open Application**

   Open browser and visit: http://localhost:5173/

## Using the Application

### Step 1: Train the Model

1. Navigate to **Dashboard** page
2. Click **"Train Model"** button
3. Wait for training to complete (should take a few seconds)
4. You'll see:
   - Number of clusters created
   - Silhouette score (model quality metric)
   - Inertia value

### Step 2: Make Predictions

1. Navigate to **Home** page
2. Fill in customer information:
   - **Age**: 18-100
   - **Annual Income**: In thousands (e.g., 65.5 for $65,500)
   - **Spending Score**: 1-100 (customer spending behavior)
   - **Purchase Frequency**: Number of purchases per year
3. Click **"Predict Segment"**
4. View the predicted customer segment and confidence score

### Step 3: Explore Analytics

1. Go to **Dashboard** page
2. View cluster visualizations:
   - Pie chart showing cluster size distribution
   - Bar chart showing average metrics per cluster
   - Radar chart showing cluster profiles
   - Detailed statistics table

## Example Customer Data

Try these sample customers:

**High-Value Customer:**

- Age: 35
- Annual Income: 85.0
- Spending Score: 90
- Purchase Frequency: 25

**Budget-Conscious Customer:**

- Age: 45
- Annual Income: 25.0
- Spending Score: 20
- Purchase Frequency: 5

**Average Customer:**

- Age: 30
- Annual Income: 55.0
- Spending Score: 50
- Purchase Frequency: 12

## API Endpoints

### GET /

Health check endpoint

### POST /train

Train the K-Means model

- Returns: Training metrics

### POST /predict

Predict customer segment

- Body: `{ age, annual_income, spending_score, purchase_frequency }`
- Returns: Cluster prediction with confidence

### GET /clusters

Get cluster statistics

- Returns: All cluster information and metrics

### GET /elbow

Get elbow method data for visualization

- Returns: Optimal k and inertia values

## Troubleshooting

### Backend Issues

**Problem: Module not found**

```bash
# Ensure virtual environment is activated
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: Port 8000 already in use**

```bash
# Use different port
uvicorn app.main:app --reload --port 8001

# Update frontend API URL in src/services/api.js
```

**Problem: CORS errors**

- Backend already configured for CORS
- Ensure backend is running on port 8000
- Check browser console for specific errors

### Frontend Issues

**Problem: npm install fails**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**Problem: Tailwind styles not working**

```bash
# Ensure PostCSS and Tailwind are installed
npm install -D tailwindcss postcss autoprefixer

# Restart dev server
npm run dev
```

**Problem: API connection failed**

- Ensure backend is running on http://localhost:8000
- Check API_BASE_URL in `src/services/api.js`
- Verify no firewall blocking connections

## Development Tips

### Backend Development

1. **View API Documentation**

   - Swagger UI: http://localhost:8000/docs
   - Interactive API testing available

2. **Modify Model**

   - Edit `backend/app/model.py`
   - Changes auto-reload with `--reload` flag

3. **Add New Endpoints**
   - Add routes in `backend/app/main.py`
   - Define schemas in `backend/app/schema.py`

### Frontend Development

1. **Hot Module Replacement**

   - Changes auto-reload in browser
   - No need to restart server

2. **Add New Components**

   - Create in `src/components/`
   - Import and use in pages

3. **Styling**
   - Use Tailwind utility classes
   - Custom styles in `src/index.css`

## Building for Production

### Backend

```bash
# Install production server
pip install gunicorn

# Run with gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to hosting service
```

## Next Steps

1. **Customize Dataset**

   - Replace `backend/data/customers.csv` with your data
   - Ensure columns match: Age, Annual_Income, Spending_Score, Purchase_Frequency

2. **Adjust Clusters**

   - Modify `find_optimal_clusters()` in `backend/app/preprocess.py`
   - Change max_clusters parameter

3. **Enhance UI**

   - Customize colors in `frontend/tailwind.config.js`
   - Add more visualizations in components

4. **Add Features**
   - Export predictions to CSV
   - Save customer profiles
   - Historical analysis

## Support

For issues or questions:

1. Check API documentation at http://localhost:8000/docs
2. Review browser console for frontend errors
3. Check terminal output for backend errors
4. Verify all dependencies are installed correctly

## License

This project is for educational and portfolio purposes.
