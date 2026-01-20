# Customer profile management routes
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, User, CustomerProfile
from app.auth import get_current_active_user
from app.auth_schema import (
    CustomerProfileCreate,
    CustomerProfileUpdate,
    CustomerProfileResponse
)

router = APIRouter(prefix="/profiles", tags=["Customer Profiles"])


@router.post("/", response_model=CustomerProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile_data: CustomerProfileCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new customer profile"""
    new_profile = CustomerProfile(
        user_id=current_user.id,
        **profile_data.model_dump()
    )
    
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    
    return new_profile


@router.get("/", response_model=List[CustomerProfileResponse])
async def list_my_profiles(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List current user's customer profiles"""
    profiles = db.query(CustomerProfile).filter(
        CustomerProfile.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return profiles


@router.get("/{profile_id}", response_model=CustomerProfileResponse)
async def get_profile(
    profile_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific customer profile"""
    profile = db.query(CustomerProfile).filter(
        CustomerProfile.id == profile_id,
        CustomerProfile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    return profile


@router.put("/{profile_id}", response_model=CustomerProfileResponse)
async def update_profile(
    profile_id: int,
    profile_update: CustomerProfileUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a customer profile"""
    profile = db.query(CustomerProfile).filter(
        CustomerProfile.id == profile_id,
        CustomerProfile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Update fields
    update_data = profile_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    
    return profile


@router.delete("/{profile_id}")
async def delete_profile(
    profile_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a customer profile"""
    profile = db.query(CustomerProfile).filter(
        CustomerProfile.id == profile_id,
        CustomerProfile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    db.delete(profile)
    db.commit()
    
    return {"message": "Profile deleted successfully"}
