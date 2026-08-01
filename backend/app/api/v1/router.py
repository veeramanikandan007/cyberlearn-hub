from fastapi import APIRouter
from app.api.v1.endpoints import rag, courses, labs, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(rag.router, prefix="/rag", tags=["RAG AI Engine"])
api_router.include_router(courses.router, prefix="/courses", tags=["Courses Catalog"])
api_router.include_router(labs.router, prefix="/labs", tags=["Hands-On Cyber Labs"])
