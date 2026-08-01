from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserLogin, UserRegister, TokenResponse
from app.core.security import create_access_token, get_password_hash, verify_password

router = APIRouter()

# Mock user store for demo & authentication test
MOCK_USERS_DB = {
    "user@cyberlearn.com": {
        "email": "user@cyberlearn.com",
        "name": "Cyber Learner",
        "password_hash": get_password_hash("password123"),
        "role": "student"
    }
}

@router.post("/login", response_model=TokenResponse, summary="User Authentication Login")
async def login(credentials: UserLogin):
    user = MOCK_USERS_DB.get(credentials.email)
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password."
        )
    
    access_token = create_access_token(subject=user["email"])
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "name": user["name"],
            "role": user["role"]
        }
    }

@router.post("/register", response_model=TokenResponse, summary="User Registration")
async def register(user_data: UserRegister):
    if user_data.email in MOCK_USERS_DB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )
    
    hashed_pwd = get_password_hash(user_data.password)
    MOCK_USERS_DB[user_data.email] = {
        "email": user_data.email,
        "name": user_data.name,
        "password_hash": hashed_pwd,
        "role": "student"
    }

    access_token = create_access_token(subject=user_data.email)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user_data.email,
            "name": user_data.name,
            "role": "student"
        }
    }
