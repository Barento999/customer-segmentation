# Authentication and User schemas
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserProfile(UserResponse):
    total_predictions: int = 0
    total_saved_profiles: int = 0


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


# Customer Profile Schemas
class CustomerProfileBase(BaseModel):
    name: str
    sex: str
    age: int = Field(..., ge=18, le=100)
    annual_income: float = Field(..., ge=0)
    spending_score: int = Field(..., ge=1, le=100)
    purchase_frequency: int = Field(..., ge=0)
    notes: Optional[str] = None


class CustomerProfileCreate(CustomerProfileBase):
    pass


class CustomerProfileUpdate(BaseModel):
    name: Optional[str] = None
    sex: Optional[str] = None
    age: Optional[int] = Field(None, ge=18, le=100)
    annual_income: Optional[float] = Field(None, ge=0)
    spending_score: Optional[int] = Field(None, ge=1, le=100)
    purchase_frequency: Optional[int] = Field(None, ge=0)
    notes: Optional[str] = None


class CustomerProfileResponse(CustomerProfileBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Prediction History Schemas
class PredictionHistoryResponse(BaseModel):
    id: int
    user_id: int
    customer_data: str
    cluster: int
    cluster_name: str
    confidence: float
    created_at: datetime
    
    class Config:
        from_attributes = True


# Admin Schemas
class UserListResponse(BaseModel):
    users: List[UserResponse]
    total: int


class UpdateUserRole(BaseModel):
    role: str = Field(..., pattern="^(user|analyst|admin)$")
