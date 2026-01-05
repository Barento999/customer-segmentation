# Customer Segmentation ML Project

A full-stack machine learning application for customer segmentation using K-Means clustering.

## Tech Stack

**Frontend:**

- React (JavaScript)
- Tailwind CSS
- Axios
- Recharts
- Vite

**Backend:**

- Python
- FastAPI
- Scikit-learn
- Pandas
- NumPy
- Joblib
- Uvicorn

## Project Structure

```
customer-segmentation-ml/
├── backend/          # FastAPI backend with ML model
├── frontend/         # React frontend
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Create virtual environment:

```bash
python -m venv venv
```

3. Activate virtual environment:

- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Run the server:

```bash
uvicorn app.main:app --reload
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features

- Customer data input form
- K-Means clustering with optimal cluster detection
- Real-time predictions
- Interactive cluster visualizations
- Cluster statistics dashboard
- Responsive design

## API Endpoints

- `GET /` - Health check
- `POST /train` - Train the ML model
- `POST /predict` - Predict customer segment
- `GET /clusters` - Get cluster statistics

## Usage

1. Start both backend and frontend servers
2. Navigate to the frontend URL
3. Train the model from the dashboard
4. Input customer data to get segment predictions
5. View cluster visualizations and statistics
