# User management routes
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, User, CustomerProfile, PredictionHistory
from app.auth import get_current_active_user, require_role, get_password_hash
from app.auth_schema import (
    UserResponse,
    UserProfile,
    UserUpdate,
    UserListResponse,
    UpdateUserRole
)

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me/profile", response_model=UserProfile)
async def get_my_profile(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get current user's profile with statistics"""
    total_predictions = db.query(PredictionHistory).filter(
        PredictionHistory.user_id == current_user.id
    ).count()
    
    total_saved_profiles = db.query(CustomerProfile).filter(
        CustomerProfile.user_id == current_user.id
    ).count()
    
    return {
        **current_user.__dict__,
        "total_predictions": total_predictions,
        "total_saved_profiles": total_saved_profiles
    }


@router.put("/me", response_model=UserResponse)
async def update_my_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user's profile"""
    if user_update.username:
        # Check if username is already taken by another user
        existing_user = db.query(User).filter(
            User.username == user_update.username,
            User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already in use"
            )
        current_user.username = user_update.username
    
    if user_update.email:
        # Check if email is already taken by another user
        existing_user = db.query(User).filter(
            User.email == user_update.email,
            User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use"
            )
        current_user.email = user_update.email
    
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    
    if user_update.password:
        current_user.hashed_password = get_password_hash(user_update.password)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


@router.delete("/me")
async def delete_my_account(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete current user's account"""
    db.delete(current_user)
    db.commit()
    
    return {"message": "Account deleted successfully"}


# Admin routes
@router.get("/", response_model=UserListResponse, dependencies=[Depends(require_role("admin"))])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all users (Admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    total = db.query(User).count()
    
    return {
        "users": users,
        "total": total
    }


@router.get("/{user_id}", response_model=UserResponse, dependencies=[Depends(require_role("admin"))])
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by ID (Admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/{user_id}/role", response_model=UserResponse, dependencies=[Depends(require_role("admin"))])
async def update_user_role(
    user_id: int,
    role_update: UpdateUserRole,
    db: Session = Depends(get_db)
):
    """Update user role (Admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.role = role_update.role
    db.commit()
    db.refresh(user)
    
    return user


@router.delete("/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete user (Admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}
