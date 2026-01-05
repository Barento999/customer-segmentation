"""
Data preprocessing and feature engineering
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from app.utils import DATASET_PATH


def load_dataset():
    """Load customer dataset from CSV"""
    try:
        df = pd.read_csv(DATASET_PATH)
        return df
    except FileNotFoundError:
        # Generate sample dataset if file doesn't exist
        print("Dataset not found. Generating sample data...")
        return generate_sample_data()


def generate_sample_data(n_samples=5000):
    """Generate sample customer data for demonstration"""
    np.random.seed(42)
    
    data = {
        'CustomerID': range(1, n_samples + 1),
        'Sex': np.random.choice(['Male', 'Female'], n_samples),
        'Age': np.random.randint(18, 70, n_samples),
        'Annual_Income': np.random.uniform(15, 150, n_samples).round(1),
        'Spending_Score': np.random.randint(1, 100, n_samples),
        'Purchase_Frequency': np.random.randint(1, 50, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Save to CSV
    df.to_csv(DATASET_PATH, index=False)
    print(f"Sample dataset created at {DATASET_PATH}")
    
    return df


def preprocess_data(df):
    """
    Preprocess customer data for clustering
    Returns: features array, feature names, and scaler
    """
    # Select features for clustering (excluding Sex and CustomerID)
    feature_columns = ['Age', 'Annual_Income', 'Spending_Score', 'Purchase_Frequency']
    
    # Extract features
    X = df[feature_columns].values
    
    # Scale features using StandardScaler
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, feature_columns, scaler


def find_optimal_clusters(X, max_clusters=10):
    """
    Use Elbow Method to find optimal number of clusters
    Returns: optimal k and inertia values for plotting
    """
    inertias = []
    silhouette_scores = []
    K_range = range(2, min(max_clusters + 1, len(X)))
    
    for k in K_range:
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        kmeans.fit(X)
        inertias.append(kmeans.inertia_)
        
        # Calculate silhouette score
        score = silhouette_score(X, kmeans.labels_)
        silhouette_scores.append(score)
    
    # Find optimal k using silhouette score
    optimal_k = K_range[np.argmax(silhouette_scores)]
    
    return optimal_k, inertias, silhouette_scores, list(K_range)


def train_kmeans_model(X, n_clusters=None):
    """
    Train K-Means clustering model
    If n_clusters is None, find optimal number automatically
    """
    if n_clusters is None:
        n_clusters, _, _, _ = find_optimal_clusters(X)
        print(f"Optimal number of clusters: {n_clusters}")
    
    # Train K-Means model
    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42,
        n_init=10,
        max_iter=300
    )
    kmeans.fit(X)
    
    # Calculate silhouette score for evaluation
    sil_score = silhouette_score(X, kmeans.labels_)
    
    return kmeans, sil_score
