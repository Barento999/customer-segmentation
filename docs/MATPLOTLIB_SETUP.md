# Matplotlib Charts Setup Guide

## What Changed

The project now generates charts using **Matplotlib** and **Seaborn** on the Python backend instead of Recharts on the frontend.

## Installation Steps

### 1. Install Python Dependencies

```bash
cd backend
pip install matplotlib>=3.7.0 seaborn>=0.12.0
```

Or install all requirements:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Restart Backend Server

After installing, restart the backend:

```bash
# Stop the current backend (Ctrl+C)
# Then restart
python -m uvicorn app.main:app --reload
```

Or use the batch file:

```bash
start-backend.bat
```

## New Features

### Backend Endpoints

1. **GET /charts/clusters** - Returns cluster charts as base64 images
   - Pie chart (distribution)
   - Bar chart (characteristics)
   - Heatmap (feature comparison)
   - Horizontal bar chart (customer counts)

2. **GET /charts/elbow** - Returns elbow method chart as base64 image

### Frontend Component

- **MatplotlibCharts.jsx** - Displays all matplotlib-generated charts
- Located in: `frontend/src/components/MatplotlibCharts.jsx`
- Automatically fetches and displays charts from backend

## How It Works

1. **Backend generates charts** using matplotlib/seaborn
2. **Charts are converted to PNG images** and encoded as base64
3. **Frontend receives base64 strings** via API
4. **Images are displayed** using `<img>` tags with base64 src

## Chart Types Generated

### 1. Pie Chart

- Shows customer segment distribution
- Displays percentages for each cluster

### 2. Bar Chart

- Compares cluster characteristics
- Shows Age, Income, Spending Score, Purchase Frequency

### 3. Heatmap

- Normalized feature comparison across clusters
- Color-coded intensity (0-100 scale)

### 4. Size Chart

- Horizontal bar chart showing customer count per segment
- Includes value labels

### 5. Elbow Chart

- Shows optimal cluster selection
- Displays both Inertia and Silhouette Score

## Benefits

✅ **Professional visualizations** - Publication-quality charts
✅ **Server-side rendering** - No client-side chart library needed
✅ **Consistent styling** - Seaborn themes for beautiful charts
✅ **Easy to customize** - Modify Python code for different chart types
✅ **Exportable** - Can save charts as PNG/PDF files

## Files Modified

### Backend

- `backend/requirements.txt` - Added matplotlib and seaborn
- `backend/app/charts.py` - New file with chart generation functions
- `backend/app/main.py` - Added chart endpoints

### Frontend

- `frontend/src/components/MatplotlibCharts.jsx` - New component
- `frontend/src/pages/Dashboard.jsx` - Updated to use MatplotlibCharts

## Testing

1. Start backend: `start-backend.bat`
2. Start frontend: `start-frontend.bat`
3. Login to the app
4. Go to Dashboard
5. Click "Train Model"
6. Scroll down to see matplotlib charts

## Troubleshooting

### Error: "No module named 'matplotlib'"

**Solution:** Install matplotlib

```bash
cd backend
pip install matplotlib seaborn
```

### Charts not loading

**Solution:**

1. Check backend is running
2. Train the model first
3. Check browser console for errors
4. Verify authentication token is valid

### Charts look blurry

**Solution:** Increase DPI in `backend/app/charts.py`:

```python
fig.savefig(buf, format='png', dpi=150, bbox_inches='tight')  # Change from 100 to 150
```

## Customization

To modify chart appearance, edit `backend/app/charts.py`:

- **Colors:** Modify the `colors` array
- **Size:** Change `figsize=(width, height)`
- **Style:** Change `sns.set_style("whitegrid")` to other styles
- **DPI:** Adjust `dpi=100` in `fig_to_base64()`

## Performance

- Charts are generated on-demand (not cached)
- Generation takes ~1-2 seconds for all charts
- Base64 encoding increases data size by ~33%
- Consider caching for production use
