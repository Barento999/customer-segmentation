# Schema validation tests
import pytest
from pydantic import ValidationError
from app.schema import CustomerInput, PredictionResponse, TrainResponse, ClusterStats, ClustersResponse


class TestCustomerInput:
    """Test CustomerInput schema validation"""
    
    def test_valid_customer_input(self):
        """Test valid customer input passes validation"""
        data = {
            "sex": "Male",
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 75,
            "purchase_frequency": 12
        }
        customer = CustomerInput(**data)
        assert customer.sex == "Male"
        assert customer.age == 35
        assert customer.annual_income == 65.0
        assert customer.spending_score == 75
        assert customer.purchase_frequency == 12
    
    def test_age_too_low(self):
        """Test age below 18 fails validation"""
        data = {
            "sex": "Female",
            "age": 15,  # Too low
            "annual_income": 65.0,
            "spending_score": 75,
            "purchase_frequency": 12
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)
    
    def test_age_too_high(self):
        """Test age above 100 fails validation"""
        data = {
            "sex": "Male",
            "age": 150,  # Too high
            "annual_income": 65.0,
            "spending_score": 75,
            "purchase_frequency": 12
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)
    
    def test_negative_income(self):
        """Test negative income fails validation"""
        data = {
            "sex": "Male",
            "age": 35,
            "annual_income": -10.0,  # Negative
            "spending_score": 75,
            "purchase_frequency": 12
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)
    
    def test_spending_score_too_low(self):
        """Test spending score below 1 fails validation"""
        data = {
            "sex": "Female",
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 0,  # Too low
            "purchase_frequency": 12
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)
    
    def test_spending_score_too_high(self):
        """Test spending score above 100 fails validation"""
        data = {
            "sex": "Male",
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 150,  # Too high
            "purchase_frequency": 12
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)
    
    def test_negative_purchase_frequency(self):
        """Test negative purchase frequency fails validation"""
        data = {
            "sex": "Female",
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 75,
            "purchase_frequency": -5  # Negative
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)
    
    def test_missing_required_field(self):
        """Test missing required field fails validation"""
        data = {
            "age": 35,
            "annual_income": 65.0,
            "spending_score": 75
            # Missing sex and purchase_frequency
        }
        with pytest.raises(ValidationError):
            CustomerInput(**data)


class TestPredictionResponse:
    """Test PredictionResponse schema"""
    
    def test_valid_prediction_response(self):
        """Test valid prediction response"""
        data = {
            "cluster": 2,
            "cluster_name": "High Value Customers",
            "confidence": 85.5,
            "customer_data": {
                "sex": "Male",
                "age": 35,
                "annual_income": 65.0,
                "spending_score": 75,
                "purchase_frequency": 12
            }
        }
        response = PredictionResponse(**data)
        assert response.cluster == 2
        assert response.cluster_name == "High Value Customers"
        assert response.confidence == 85.5
        assert response.customer_data["age"] == 35


class TestTrainResponse:
    """Test TrainResponse schema"""
    
    def test_valid_train_response(self):
        """Test valid train response"""
        data = {
            "message": "Model trained successfully",
            "n_clusters": 4,
            "silhouette_score": 0.65,
            "inertia": 1234.56
        }
        response = TrainResponse(**data)
        assert response.message == "Model trained successfully"
        assert response.n_clusters == 4
        assert response.silhouette_score == 0.65
        assert response.inertia == 1234.56


class TestClusterStats:
    """Test ClusterStats schema"""
    
    def test_valid_cluster_stats(self):
        """Test valid cluster statistics"""
        data = {
            "cluster_id": 0,
            "cluster_name": "Budget Shoppers",
            "size": 1250,
            "avg_age": 32.5,
            "avg_income": 45.2,
            "avg_spending_score": 55.8,
            "avg_purchase_frequency": 15.3
        }
        stats = ClusterStats(**data)
        assert stats.cluster_id == 0
        assert stats.cluster_name == "Budget Shoppers"
        assert stats.size == 1250
        assert stats.avg_age == 32.5


class TestClustersResponse:
    """Test ClustersResponse schema"""
    
    def test_valid_clusters_response(self):
        """Test valid clusters response"""
        data = {
            "total_customers": 5000,
            "n_clusters": 3,
            "clusters": [
                {
                    "cluster_id": 0,
                    "cluster_name": "Budget Shoppers",
                    "size": 1500,
                    "avg_age": 30.0,
                    "avg_income": 40.0,
                    "avg_spending_score": 50.0,
                    "avg_purchase_frequency": 10.0
                },
                {
                    "cluster_id": 1,
                    "cluster_name": "Premium Customers",
                    "size": 2000,
                    "avg_age": 45.0,
                    "avg_income": 80.0,
                    "avg_spending_score": 85.0,
                    "avg_purchase_frequency": 30.0
                },
                {
                    "cluster_id": 2,
                    "cluster_name": "Average Shoppers",
                    "size": 1500,
                    "avg_age": 35.0,
                    "avg_income": 60.0,
                    "avg_spending_score": 65.0,
                    "avg_purchase_frequency": 20.0
                }
            ]
        }
        response = ClustersResponse(**data)
        assert response.total_customers == 5000
        assert response.n_clusters == 3
        assert len(response.clusters) == 3
        assert response.clusters[0].cluster_name == "Budget Shoppers"
