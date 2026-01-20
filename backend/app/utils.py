# Utility functions
import os
import joblib
from pathlib import Path

# Define paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"

# Create directories if they don't exist
MODELS_DIR.mkdir(exist_ok=True)
DATA_DIR.mkdir(exist_ok=True)

# Model file paths
KMEANS_MODEL_PATH = MODELS_DIR / "kmeans.pkl"
SCALER_MODEL_PATH = MODELS_DIR / "scaler.pkl"
DATASET_PATH = DATA_DIR / "customers.csv"


def save_model(model, filepath):
    joblib.dump(model, filepath)
    print(f"Model saved to {filepath}")


def load_model(filepath):
    if not os.path.exists(filepath):
        return None
    return joblib.load(filepath)


def get_cluster_name(cluster_id, cluster_centers, feature_names):
   
    cluster_names = {
        0: "Budget Conscious",
        1: "High Value",
        2: "Average Spender",
        3: "Premium Customer",
        4: "Occasional Buyer",
        5: "Loyal Shopper",
        6: "Window Shopper",
        7: "VIP Elite"
    }
    
    # Return name if available, otherwise generic
    return cluster_names.get(cluster_id, f"Segment {cluster_id}")


def calculate_confidence(distances, predicted_cluster):
   
    if len(distances) == 0:
        return 0.0
    
    min_distance = distances[predicted_cluster]
    max_distance = max(distances)
    
    if max_distance == 0:
        return 1.0
    
    # Normalize and invert (closer = higher confidence)
    confidence = 1 - (min_distance / max_distance)
    return round(confidence, 2)
