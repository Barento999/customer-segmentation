"""
ML model tests
"""
import pytest
import numpy as np
from app.model import CustomerSegmentationModel


class TestModelInitialization:
    """Test model initialization"""
    
    def test_model_init(self, ml_model):
        """Test model initializes with correct attributes"""
        assert ml_model.kmeans is None
        assert ml_model.scaler is None
        assert ml_model.feature_names == ['Age', 'Annual_Income', 'Spending_Score', 'Purchase_Frequency']
        assert ml_model.df is None
        assert ml_model.X_scaled is None


class TestModelTraining:
    """Test model training functionality"""
    
    def test_train_model(self, ml_model):
        """Test model training returns correct metrics"""
        metrics = ml_model.train()
        
        # Check metrics structure
        assert "n_clusters" in metrics
        assert "silhouette_score" in metrics
        assert "inertia" in metrics
        
        # Check metrics values
        assert isinstance(metrics["n_clusters"], int)
        assert metrics["n_clusters"] >= 2
        assert isinstance(metrics["silhouette_score"], float)
        assert -1 <= metrics["silhouette_score"] <= 1
        assert isinstance(metrics["inertia"], float)
        assert metrics["inertia"] > 0
        
        # Check model is trained
        assert ml_model.kmeans is not None
        assert ml_model.scaler is not None
        assert ml_model.df is not None
        assert ml_model.X_scaled is not None
    
    def test_train_with_specific_clusters(self, ml_model):
        """Test training with specific number of clusters"""
        n_clusters = 4
        metrics = ml_model.train(n_clusters=n_clusters)
        
        assert metrics["n_clusters"] == n_clusters
        assert ml_model.kmeans.n_clusters == n_clusters


class TestModelPrediction:
    """Test model prediction functionality"""
    
    def test_predict_without_training(self, ml_model):
        """Test prediction fails without training"""
        customer_data = {
            'age': 35,
            'annual_income': 65.0,
            'spending_score': 75,
            'purchase_frequency': 12
        }
        
        with pytest.raises(ValueError, match="Model not trained or loaded"):
            ml_model.predict(customer_data)
    
    def test_predict_with_training(self, ml_model):
        """Test prediction works after training"""
        # Train model
        ml_model.train()
        
        # Make prediction
        customer_data = {
            'age': 35,
            'annual_income': 65.0,
            'spending_score': 75,
            'purchase_frequency': 12
        }
        prediction = ml_model.predict(customer_data)
        
        # Check prediction structure
        assert "cluster" in prediction
        assert "cluster_name" in prediction
        assert "confidence" in prediction
        
        # Check prediction values
        assert isinstance(prediction["cluster"], int)
        assert prediction["cluster"] >= 0
        assert prediction["cluster"] < ml_model.kmeans.n_clusters
        assert isinstance(prediction["cluster_name"], str)
        assert len(prediction["cluster_name"]) > 0
        assert isinstance(prediction["confidence"], float)
        assert 0 <= prediction["confidence"] <= 100
    
    def test_predict_different_customers(self, ml_model):
        """Test predictions for different customer profiles"""
        ml_model.train()
        
        # Young, low income, low spending
        customer1 = {
            'age': 25,
            'annual_income': 20.0,
            'spending_score': 30,
            'purchase_frequency': 5
        }
        pred1 = ml_model.predict(customer1)
        
        # Old, high income, high spending
        customer2 = {
            'age': 65,
            'annual_income': 120.0,
            'spending_score': 90,
            'purchase_frequency': 40
        }
        pred2 = ml_model.predict(customer2)
        
        # Both should return valid predictions
        assert isinstance(pred1["cluster"], int)
        assert isinstance(pred2["cluster"], int)
        assert 0 <= pred1["confidence"] <= 100
        assert 0 <= pred2["confidence"] <= 100


class TestClusterStatistics:
    """Test cluster statistics functionality"""
    
    def test_get_statistics_without_training(self, ml_model):
        """Test statistics fails without training"""
        with pytest.raises(ValueError, match="Model not trained or loaded"):
            ml_model.get_cluster_statistics()
    
    def test_get_statistics_with_training(self, ml_model):
        """Test statistics returns correct data after training"""
        ml_model.train()
        stats = ml_model.get_cluster_statistics()
        
        # Check statistics structure
        assert "total_customers" in stats
        assert "n_clusters" in stats
        assert "clusters" in stats
        
        # Check statistics values
        assert isinstance(stats["total_customers"], int)
        assert stats["total_customers"] > 0
        assert isinstance(stats["n_clusters"], int)
        assert stats["n_clusters"] >= 2
        assert isinstance(stats["clusters"], list)
        assert len(stats["clusters"]) == stats["n_clusters"]
        
        # Check cluster statistics
        total_size = 0
        for cluster in stats["clusters"]:
            assert "cluster_id" in cluster
            assert "cluster_name" in cluster
            assert "size" in cluster
            assert "avg_age" in cluster
            assert "avg_income" in cluster
            assert "avg_spending_score" in cluster
            assert "avg_purchase_frequency" in cluster
            
            total_size += cluster["size"]
            
            # Check value ranges
            assert cluster["size"] > 0
            assert 18 <= cluster["avg_age"] <= 100
            assert cluster["avg_income"] >= 0
            assert 1 <= cluster["avg_spending_score"] <= 100
            assert cluster["avg_purchase_frequency"] >= 0
        
        # Total size should equal total customers
        assert total_size == stats["total_customers"]


class TestElbowMethod:
    """Test elbow method functionality"""
    
    def test_get_elbow_data(self, ml_model):
        """Test elbow method returns optimization data"""
        elbow_data = ml_model.get_elbow_data()
        
        # Check structure
        assert "optimal_k" in elbow_data
        assert "k_range" in elbow_data
        assert "inertias" in elbow_data
        assert "silhouette_scores" in elbow_data
        
        # Check types
        assert isinstance(elbow_data["optimal_k"], int)
        assert isinstance(elbow_data["k_range"], list)
        assert isinstance(elbow_data["inertias"], list)
        assert isinstance(elbow_data["silhouette_scores"], list)
        
        # Check values
        assert elbow_data["optimal_k"] >= 2
        assert len(elbow_data["k_range"]) > 0
        assert len(elbow_data["k_range"]) == len(elbow_data["inertias"])
        assert len(elbow_data["k_range"]) == len(elbow_data["silhouette_scores"])
        
        # Check inertias are decreasing
        inertias = elbow_data["inertias"]
        for i in range(len(inertias) - 1):
            assert inertias[i] >= inertias[i + 1]
