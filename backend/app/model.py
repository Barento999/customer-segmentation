# Machine Learning model management
import numpy as np
import pandas as pd
from app.preprocess import (
    load_dataset,
    preprocess_data,
    train_kmeans_model,
    find_optimal_clusters
)
from app.utils import (
    save_model,
    load_model,
    get_cluster_name,
    calculate_confidence,
    KMEANS_MODEL_PATH,
    SCALER_MODEL_PATH,
    DATASET_PATH
)


class CustomerSegmentationModel:
    
    def __init__(self):
        self.kmeans = None
        self.scaler = None
        self.feature_names = ['Age', 'Annual_Income', 'Spending_Score', 'Purchase_Frequency']
        self.df = None
        self.X_scaled = None
        
    def train(self, n_clusters=None):
        # Load and preprocess dataset
        self.df = load_dataset()
        self.X_scaled, self.feature_names, self.scaler = preprocess_data(self.df)
        
        # Train model
        self.kmeans, sil_score = train_kmeans_model(self.X_scaled, n_clusters)
        
        # Save models
        save_model(self.kmeans, KMEANS_MODEL_PATH)
        save_model(self.scaler, SCALER_MODEL_PATH)
        
        return {
            'n_clusters': self.kmeans.n_clusters,
            'silhouette_score': float(sil_score),
            'inertia': float(self.kmeans.inertia_)
        }
    
    def load_models(self):
        # Load trained models from disk
        self.kmeans = load_model(KMEANS_MODEL_PATH)
        self.scaler = load_model(SCALER_MODEL_PATH)
        
        if self.kmeans is None or self.scaler is None:
            return False
        
        # Load dataset for cluster statistics
        self.df = load_dataset()
        self.X_scaled, self.feature_names, _ = preprocess_data(self.df)
        
        return True
    
    def predict(self, customer_data):
        # Predict customer segment
        if self.kmeans is None or self.scaler is None:
            raise ValueError("Model not trained or loaded")
        
        # Prepare and scale input data
        features = np.array([[
            customer_data['age'],
            customer_data['annual_income'],
            customer_data['spending_score'],
            customer_data['purchase_frequency']
        ]])
        features_scaled = self.scaler.transform(features)
        
        # Predict cluster
        cluster = int(self.kmeans.predict(features_scaled)[0])
        
        # Calculate confidence
        distances = self.kmeans.transform(features_scaled)[0]
        confidence = calculate_confidence(distances, cluster)
        
        # Get cluster name
        cluster_name = get_cluster_name(cluster, self.kmeans.cluster_centers_, self.feature_names)
        
        return {
            'cluster': cluster,
            'cluster_name': cluster_name,
            'confidence': confidence
        }
    
    def get_cluster_statistics(self):
        # Get statistics for each cluster
        if self.kmeans is None or self.df is None:
            raise ValueError("Model not trained or loaded")
        
        # Predict clusters for all customers
        clusters = self.kmeans.predict(self.X_scaled)
        self.df['Cluster'] = clusters
        
        # Calculate statistics for each cluster
        cluster_stats = []
        
        for cluster_id in range(self.kmeans.n_clusters):
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
    
    def get_elbow_data(self):
        # Get elbow method data for visualization
        if self.X_scaled is None:
            self.df = load_dataset()
            self.X_scaled, self.feature_names, self.scaler = preprocess_data(self.df)
        
        optimal_k, inertias, silhouette_scores, k_range = find_optimal_clusters(self.X_scaled)
        
        return {
            'optimal_k': optimal_k,
            'k_range': k_range,
            'inertias': inertias,
            'silhouette_scores': silhouette_scores
        }


# Global model instance
ml_model = CustomerSegmentationModel()
