# ML Model Location Guide

Complete guide showing where model training, prediction, and clustering happens.

---

## 📍 Main ML File

**File**: `backend/app/model.py`

This is the **main ML file** containing all machine learning logic.

---

## 🎓 Model Training

### Location: `backend/app/model.py`

**Class**: `CustomerSegmentationModel`  
**Method**: `train()`  
**Lines**: 33-56

```python
def train(self, n_clusters=None):
    """
    Train the K-Means model
    Returns: training metrics
    """
    # Load dataset
    self.df = load_dataset()  # Line 38

    # Preprocess data
    self.X_scaled, self.feature_names, self.scaler = preprocess_data(self.df)  # Line 41

    # Train model
    self.kmeans, sil_score = train_kmeans_model(self.X_scaled, n_clusters)  # Line 44

    # Save models
    save_model(self.kmeans, KMEANS_MODEL_PATH)  # Line 47
    save_model(self.scaler, SCALER_MODEL_PATH)  # Line 48

    return {
        'n_clusters': self.kmeans.n_clusters,
        'silhouette_score': float(sil_score),
        'inertia': float(self.kmeans.inertia_)
    }
```

**What it does**:

1. Loads customer data from CSV
2. Preprocesses and normalizes features
3. Trains K-Means clustering
4. Saves trained models to disk
5. Returns performance metrics

**Called from**: `backend/app/main.py` line 60 (POST /train endpoint)

---

## 🔮 Model Prediction

### Location: `backend/app/model.py`

**Class**: `CustomerSegmentationModel`  
**Method**: `predict()`  
**Lines**: 70-99

```python
def predict(self, customer_data):
    """
    Predict customer segment
    customer_data: dict with keys age, annual_income, spending_score, purchase_frequency
    """
    if self.kmeans is None or self.scaler is None:
        raise ValueError("Model not trained or loaded")

    # Prepare input data
    features = np.array([[
        customer_data['age'],
        customer_data['annual_income'],
        customer_data['spending_score'],
        customer_data['purchase_frequency']
    ]])  # Lines 79-84

    # Scale features
    features_scaled = self.scaler.transform(features)  # Line 87

    # Predict cluster
    cluster = int(self.kmeans.predict(features_scaled)[0])  # Line 90 ⭐ MAIN PREDICTION

    # Calculate distances to all cluster centers for confidence
    distances = self.kmeans.transform(features_scaled)[0]  # Line 93
    confidence = calculate_confidence(distances, cluster)  # Line 94

    # Get cluster name
    cluster_name = get_cluster_name(cluster, self.kmeans.cluster_centers_, self.feature_names)  # Line 97

    return {
        'cluster': cluster,
        'cluster_name': cluster_name,
        'confidence': confidence
    }
```

**What it does**:

1. Takes customer data as input
2. Converts to numpy array
3. Scales features using StandardScaler
4. **Predicts cluster using K-Means** (Line 90)
5. Calculates confidence score
6. Gets human-readable cluster name
7. Returns prediction result

**Called from**: `backend/app/main.py` line 106 (POST /predict endpoint)

---

## 📊 Cluster Statistics

### Location: `backend/app/model.py`

**Class**: `CustomerSegmentationModel`  
**Method**: `get_cluster_statistics()`  
**Lines**: 101-131

```python
def get_cluster_statistics(self):
    """Get statistics for each cluster"""
    if self.kmeans is None or self.df is None:
        raise ValueError("Model not trained or loaded")

    # Predict clusters for all customers
    clusters = self.kmeans.predict(self.X_scaled)  # Line 107
    self.df['Cluster'] = clusters

    # Calculate statistics for each cluster
    cluster_stats = []

    for cluster_id in range(self.kmeans.n_clusters):  # Line 113
        cluster_data = self.df[self.df['Cluster'] == cluster_id]

        stats = {
            'cluster_id': int(cluster_id),
            'cluster_name': get_cluster_name(cluster_id, self.kmeans.cluster_centers_, self.feature_names),
            'size': int(len(cluster_data)),
            'avg_age': float(cluster_data['Age'].mean()),
            'avg_income': float(cluster_data['Annual_Income'].mean()),
            'avg_spending_score': float(cluster_data['Spending_Score'].mean()),
            'avg_purchase_frequency': float(cluster_data['Purchase_Frequency'].mean())
        }

        cluster_stats.append(stats)

    return {
        'total_customers': len(self.df),
        'n_clusters': self.kmeans.n_clusters,
        'clusters': cluster_stats
    }
```

**What it does**:

1. Predicts clusters for all customers in dataset
2. Groups customers by cluster
3. Calculates average statistics for each cluster
4. Returns comprehensive cluster information

**Called from**: `backend/app/main.py` line 139 (GET /clusters endpoint)

---

## 🔧 Helper Functions

### Preprocessing: `backend/app/preprocess.py`

**Key Functions**:

1. **`load_dataset()`** - Loads CSV data

   ```python
   def load_dataset():
       df = pd.read_csv(DATASET_PATH)
       return df
   ```

2. **`preprocess_data()`** - Normalizes features

   ```python
   def preprocess_data(df):
       # Select features
       features = ['Age', 'Annual_Income', 'Spending_Score', 'Purchase_Frequency']
       X = df[features]

       # Normalize
       scaler = StandardScaler()
       X_scaled = scaler.fit_transform(X)

       return X_scaled, features, scaler
   ```

3. **`train_kmeans_model()`** - Trains K-Means

   ```python
   def train_kmeans_model(X_scaled, n_clusters=None):
       if n_clusters is None:
           n_clusters = find_optimal_clusters(X_scaled)

       kmeans = KMeans(n_clusters=n_clusters, random_state=42)
       kmeans.fit(X_scaled)

       silhouette_avg = silhouette_score(X_scaled, kmeans.labels_)

       return kmeans, silhouette_avg
   ```

4. **`find_optimal_clusters()`** - Elbow method
   ```python
   def find_optimal_clusters(X_scaled):
       # Try different K values
       inertias = []
       silhouette_scores = []
       K_range = range(2, 11)

       for k in K_range:
           kmeans = KMeans(n_clusters=k, random_state=42)
           kmeans.fit(X_scaled)
           inertias.append(kmeans.inertia_)
           silhouette_scores.append(silhouette_score(X_scaled, kmeans.labels_))

       # Find optimal K (highest silhouette score)
       optimal_k = K_range[np.argmax(silhouette_scores)]
       return optimal_k
   ```

### Utilities: `backend/app/utils.py`

**Key Functions**:

1. **`calculate_confidence()`** - Calculates prediction confidence

   ```python
   def calculate_confidence(distances, assigned_cluster):
       assigned_distance = distances[assigned_cluster]
       total_distance = np.sum(distances)

       if total_distance == 0:
           return 1.0

       confidence = 1 - (assigned_distance / total_distance)
       return float(confidence)
   ```

2. **`get_cluster_name()`** - Generates cluster names
   ```python
   def get_cluster_name(cluster_id, cluster_centers, feature_names):
       center = cluster_centers[cluster_id]

       income_idx = 1
       spending_idx = 2

       income = center[income_idx]
       spending = center[spending_idx]

       if income > 0.5 and spending > 0.5:
           return "High-Value Customers"
       elif income < -0.5 and spending < -0.5:
           return "Budget Shoppers"
       elif income > 0.5 and spending < -0.5:
           return "Potential Targets"
       elif spending > 0.5:
           return "Loyal Customers"
       else:
           return f"Cluster {cluster_id}"
   ```

---

## 🌐 API Endpoints (Where ML is Called)

### File: `backend/app/main.py`

**1. Train Model**

```python
@app.post("/train", response_model=TrainResponse)
async def train_model():
    metrics = ml_model.train()  # ← Calls model.py train()
    return TrainResponse(...)
```

**Line**: 60

**2. Predict Segment**

```python
@app.post("/predict", response_model=PredictionResponse)
async def predict_segment(customer: CustomerInput, ...):
    prediction = ml_model.predict(customer_data)  # ← Calls model.py predict()
    return PredictionResponse(...)
```

**Line**: 106

**3. Get Clusters**

```python
@app.get("/clusters", response_model=ClustersResponse)
async def get_clusters(...):
    stats = ml_model.get_cluster_statistics()  # ← Calls model.py get_cluster_statistics()
    return ClustersResponse(**stats)
```

**Line**: 139

---

## 💾 Model Storage

**Trained models are saved to**:

- `backend/models/kmeans.pkl` - K-Means model
- `backend/models/scaler.pkl` - StandardScaler

**Dataset location**:

- `backend/data/customers.csv` - Training data (5000 customers)

---

## 📊 Complete File Structure

```
backend/
├── app/
│   ├── model.py              ⭐ MAIN ML FILE
│   │   ├── train()           → Line 33-56 (Training)
│   │   ├── predict()         → Line 70-99 (Prediction)
│   │   └── get_cluster_statistics() → Line 101-131 (Stats)
│   │
│   ├── preprocess.py         🔧 Data preprocessing
│   │   ├── load_dataset()
│   │   ├── preprocess_data()
│   │   ├── train_kmeans_model()
│   │   └── find_optimal_clusters()
│   │
│   ├── utils.py              🛠️ Helper functions
│   │   ├── calculate_confidence()
│   │   ├── get_cluster_name()
│   │   ├── save_model()
│   │   └── load_model()
│   │
│   └── main.py               🌐 API endpoints
│       ├── POST /train       → Line 60
│       ├── POST /predict     → Line 106
│       └── GET /clusters     → Line 139
│
├── models/
│   ├── kmeans.pkl            💾 Trained K-Means model
│   └── scaler.pkl            💾 Feature scaler
│
└── data/
    └── customers.csv         📊 Training dataset
```

---

## 🎯 Quick Reference

| Task                     | File            | Method                     | Line    |
| ------------------------ | --------------- | -------------------------- | ------- |
| **Train Model**          | `model.py`      | `train()`                  | 33-56   |
| **Predict Segment**      | `model.py`      | `predict()`                | 70-99   |
| **Get Statistics**       | `model.py`      | `get_cluster_statistics()` | 101-131 |
| **Preprocess Data**      | `preprocess.py` | `preprocess_data()`        | -       |
| **Find Optimal K**       | `preprocess.py` | `find_optimal_clusters()`  | -       |
| **Calculate Confidence** | `utils.py`      | `calculate_confidence()`   | -       |
| **Name Clusters**        | `utils.py`      | `get_cluster_name()`       | -       |

---

## 🚀 How to Use

**Train the model**:

```bash
curl -X POST http://localhost:8000/train
```

**Make a prediction**:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "sex": "Female",
    "age": 35,
    "annual_income": 75.0,
    "spending_score": 80,
    "purchase_frequency": 25
  }'
```

**Get cluster statistics**:

```bash
curl http://localhost:8000/clusters \
  -H "Authorization: Bearer <token>"
```

---

**Last Updated**: January 2025  
**Main ML File**: `backend/app/model.py`  
**Key Line for Prediction**: Line 90
