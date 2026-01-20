# Pydantic schemas for request/response validation
from pydantic import BaseModel, Field
from typing import List, Dict


class CustomerInput(BaseModel):
    sex: str = Field(..., description="Customer sex (Male/Female)")
    age: int = Field(..., ge=18, le=100, description="Customer age")
    annual_income: float = Field(..., ge=0, description="Annual income in thousands")
    spending_score: int = Field(..., ge=1, le=100, description="Spending score (1-100)")
    purchase_frequency: int = Field(..., ge=0, description="Number of purchases per year")

    class Config:
        json_schema_extra = {
            "example": {
                "sex": "Male",
                "age": 35,
                "annual_income": 65.0,
                "spending_score": 75,
                "purchase_frequency": 12
            }
        }


class PredictionResponse(BaseModel):
    cluster: int
    cluster_name: str
    confidence: float
    customer_data: Dict


class TrainResponse(BaseModel):
    message: str
    n_clusters: int
    silhouette_score: float
    inertia: float


class ClusterStats(BaseModel):
    cluster_id: int
    cluster_name: str
    size: int
    avg_age: float
    avg_income: float
    avg_spending_score: float
    avg_purchase_frequency: float


class ClustersResponse(BaseModel):
    total_customers: int
    n_clusters: int
    clusters: List[ClusterStats]
