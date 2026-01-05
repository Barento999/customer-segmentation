"""
FastAPI main application
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json
from app.schema import (
    CustomerInput,
    PredictionResponse,
    TrainResponse,
    ClustersResponse
)
from app.model import ml_model
from app.database import init_db, get_db, PredictionHistory, User
from app.auth import get_current_active_user
from app.routes import auth, users, profiles

# Initialize database
init_db()

# Create FastAPI app
app = FastAPI(
    title="Customer Segmentation API",
    description="ML-powered customer segmentation using K-Means clustering with authentication",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(profiles.router)


@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Customer Segmentation API is running",
        "version": "1.0.0"
    }


@app.post("/train", response_model=TrainResponse)
async def train_model():
    """
    Train the K-Means clustering model
    Automatically determines optimal number of clusters
    """
    try:
        # Train model
        metrics = ml_model.train()
        
        return TrainResponse(
            message="Model trained successfully",
            n_clusters=metrics['n_clusters'],
            silhouette_score=metrics['silhouette_score'],
            inertia=metrics['inertia']
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")


@app.post("/predict", response_model=PredictionResponse)
async def predict_segment(
    customer: CustomerInput,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Predict customer segment based on input features
    Requires authentication
    """
    try:
        # Load models if not already loaded
        if ml_model.kmeans is None:
            loaded = ml_model.load_models()
            if not loaded:
                raise HTTPException(
                    status_code=400,
                    detail="Model not trained. Please train the model first using /train endpoint"
                )
        
        # Prepare customer data
        customer_data = {
            'sex': customer.sex,
            'age': customer.age,
            'annual_income': customer.annual_income,
            'spending_score': customer.spending_score,
            'purchase_frequency': customer.purchase_frequency
        }
        
        # Make prediction
        prediction = ml_model.predict(customer_data)
        
        # Save to prediction history
        history_entry = PredictionHistory(
            user_id=current_user.id,
            customer_data=json.dumps(customer_data),
            cluster=prediction['cluster'],
            cluster_name=prediction['cluster_name'],
            confidence=prediction['confidence']
        )
        db.add(history_entry)
        db.commit()
        
        return PredictionResponse(
            cluster=prediction['cluster'],
            cluster_name=prediction['cluster_name'],
            confidence=prediction['confidence'],
            customer_data=customer_data
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/clusters", response_model=ClustersResponse)
async def get_clusters(current_user: User = Depends(get_current_active_user)):
    """
    Get statistics for all customer clusters
    Requires authentication
    """
    try:
        # Load models if not already loaded
        if ml_model.kmeans is None:
            loaded = ml_model.load_models()
            if not loaded:
                raise HTTPException(
                    status_code=400,
                    detail="Model not trained. Please train the model first using /train endpoint"
                )
        
        # Get cluster statistics
        stats = ml_model.get_cluster_statistics()
        
        return ClustersResponse(**stats)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get clusters: {str(e)}")


@app.get("/elbow")
async def get_elbow_data(current_user: User = Depends(get_current_active_user)):
    """
    Get elbow method data for cluster optimization visualization
    Requires authentication
    """
    try:
        elbow_data = ml_model.get_elbow_data()
        return elbow_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get elbow data: {str(e)}")


@app.get("/history")
async def get_prediction_history(
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get prediction history for current user
    """
    history = db.query(PredictionHistory).filter(
        PredictionHistory.user_id == current_user.id
    ).order_by(PredictionHistory.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "history": [
            {
                "id": h.id,
                "customer_data": json.loads(h.customer_data),
                "cluster": h.cluster,
                "cluster_name": h.cluster_name,
                "confidence": h.confidence,
                "created_at": h.created_at
            }
            for h in history
        ],
        "total": db.query(PredictionHistory).filter(
            PredictionHistory.user_id == current_user.id
        ).count()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
