# Backend - Customer Segmentation API

FastAPI backend for customer segmentation using K-Means clustering.

## Setup

1. Create virtual environment:

```bash
python -m venv venv
```

2. Activate:

- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run server:

```bash
uvicorn app.main:app --reload
```

## API Documentation

Once running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

- `GET /` - Health check
- `POST /train` - Train K-Means model
- `POST /predict` - Predict customer segment
- `GET /clusters` - Get cluster statistics
