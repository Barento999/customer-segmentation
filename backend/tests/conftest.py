"""
Pytest configuration and fixtures
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.model import CustomerSegmentationModel
import os
import tempfile


@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    return TestClient(app)


@pytest.fixture
def sample_customer_data():
    """Sample customer data for testing"""
    return {
        "sex": "Male",
        "age": 35,
        "annual_income": 65.0,
        "spending_score": 75,
        "purchase_frequency": 12
    }


@pytest.fixture
def invalid_customer_data():
    """Invalid customer data for testing validation"""
    return {
        "sex": "Male",
        "age": 150,  # Invalid: > 100
        "annual_income": -10,  # Invalid: < 0
        "spending_score": 150,  # Invalid: > 100
        "purchase_frequency": -5  # Invalid: < 0
    }


@pytest.fixture
def ml_model():
    """Create a fresh ML model instance for testing"""
    return CustomerSegmentationModel()


@pytest.fixture
def temp_model_dir(tmp_path):
    """Create a temporary directory for model files"""
    model_dir = tmp_path / "models"
    model_dir.mkdir()
    return model_dir
