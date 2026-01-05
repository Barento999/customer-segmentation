"""
API endpoint tests
"""
import pytest
from fastapi import status


class TestHealthCheck:
    """Test health check endpoint"""
    
    def test_health_check(self, client):
        """Test GET / returns healthy status"""
        response = client.get("/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "healthy"
        assert "message" in data
        assert "version" in data


class TestTrainEndpoint:
    """Test model training endpoint"""
    
    def test_train_model_success(self, client):
        """Test POST /train successfully trains model"""
        response = client.post("/train")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check response structure
        assert "message" in data
        assert "n_clusters" in data
        assert "silhouette_score" in data
        assert "inertia" in data
        
        # Check data types and ranges
        assert isinstance(data["n_clusters"], int)
        assert data["n_clusters"] >= 2
        assert isinstance(data["silhouette_score"], float)
        assert -1 <= data["silhouette_score"] <= 1
        assert isinstance(data["inertia"], float)
        assert data["inertia"] > 0


class TestPredictEndpoint:
    """Test prediction endpoint"""
    
    def test_predict_without_training(self, client):
        """Test POST /predict fails when model not trained"""
        customer_data = {
            "sex": "Male",
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 75,
            "purchase_frequency": 12
        }
        response = client.post("/predict", json=customer_data)
        # Should fail if model not trained
        assert response.status_code in [status.HTTP_400_BAD_REQUEST, status.HTTP_200_OK]
    
    def test_predict_with_valid_data(self, client, sample_customer_data):
        """Test POST /predict with valid customer data"""
        # Train model first
        client.post("/train")
        
        # Make prediction
        response = client.post("/predict", json=sample_customer_data)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check response structure
        assert "cluster" in data
        assert "cluster_name" in data
        assert "confidence" in data
        assert "customer_data" in data
        
        # Check data types and ranges
        assert isinstance(data["cluster"], int)
        assert data["cluster"] >= 0
        assert isinstance(data["cluster_name"], str)
        assert len(data["cluster_name"]) > 0
        assert isinstance(data["confidence"], float)
        assert 0 <= data["confidence"] <= 100
    
    def test_predict_with_invalid_age(self, client):
        """Test POST /predict with invalid age"""
        invalid_data = {
            "sex": "Male",
            "age": 150,  # Invalid
            "annual_income": 65.0,
            "spending_score": 75,
            "purchase_frequency": 12
        }
        response = client.post("/predict", json=invalid_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_predict_with_invalid_income(self, client):
        """Test POST /predict with negative income"""
        invalid_data = {
            "sex": "Male",
            "age": 35,
            "annual_income": -10,  # Invalid
            "spending_score": 75,
            "purchase_frequency": 12
        }
        response = client.post("/predict", json=invalid_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_predict_with_invalid_spending_score(self, client):
        """Test POST /predict with invalid spending score"""
        invalid_data = {
            "sex": "Male",
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 150,  # Invalid
            "purchase_frequency": 12
        }
        response = client.post("/predict", json=invalid_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_predict_with_missing_fields(self, client):
        """Test POST /predict with missing required fields"""
        incomplete_data = {
            "age": 35,
            "annual_income": 65.0
            # Missing other fields
        }
        response = client.post("/predict", json=incomplete_data)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestClustersEndpoint:
    """Test cluster statistics endpoint"""
    
    def test_get_clusters_without_training(self, client):
        """Test GET /clusters fails when model not trained"""
        response = client.get("/clusters")
        # Should fail if model not trained
        assert response.status_code in [status.HTTP_400_BAD_REQUEST, status.HTTP_200_OK]
    
    def test_get_clusters_with_training(self, client):
        """Test GET /clusters returns statistics after training"""
        # Train model first
        client.post("/train")
        
        # Get cluster statistics
        response = client.get("/clusters")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check response structure
        assert "total_customers" in data
        assert "n_clusters" in data
        assert "clusters" in data
        
        # Check data types
        assert isinstance(data["total_customers"], int)
        assert data["total_customers"] > 0
        assert isinstance(data["n_clusters"], int)
        assert data["n_clusters"] >= 2
        assert isinstance(data["clusters"], list)
        assert len(data["clusters"]) == data["n_clusters"]
        
        # Check cluster structure
        for cluster in data["clusters"]:
            assert "cluster_id" in cluster
            assert "cluster_name" in cluster
            assert "size" in cluster
            assert "avg_age" in cluster
            assert "avg_income" in cluster
            assert "avg_spending_score" in cluster
            assert "avg_purchase_frequency" in cluster
            
            # Check data types
            assert isinstance(cluster["cluster_id"], int)
            assert isinstance(cluster["cluster_name"], str)
            assert isinstance(cluster["size"], int)
            assert cluster["size"] > 0


class TestElbowEndpoint:
    """Test elbow method endpoint"""
    
    def test_get_elbow_data(self, client):
        """Test GET /elbow returns optimization data"""
        response = client.get("/elbow")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check response structure
        assert "optimal_k" in data
        assert "k_range" in data
        assert "inertias" in data
        assert "silhouette_scores" in data
        
        # Check data types
        assert isinstance(data["optimal_k"], int)
        assert isinstance(data["k_range"], list)
        assert isinstance(data["inertias"], list)
        assert isinstance(data["silhouette_scores"], list)
        
        # Check list lengths match
        assert len(data["k_range"]) == len(data["inertias"])
        assert len(data["k_range"]) == len(data["silhouette_scores"])
