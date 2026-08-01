from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any

# Auth Schemas
class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    email: str
    name: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# RAG Schemas
class RAGQueryRequest(BaseModel):
    query: str = Field(..., description="The user question or security query")
    category: Optional[str] = Field(None, description="Optional security domain filter (e.g. web, network, OWASP, ctf)")
    top_k: Optional[int] = Field(4, description="Number of context passages to retrieve")
    stream: Optional[bool] = Field(False, description="Whether to stream response tokens via SSE")

class CitationSource(BaseModel):
    title: str
    category: str
    source_document: str
    snippet: str
    relevance_score: float

class RAGQueryResponse(BaseModel):
    query: str
    answer: str
    citations: List[CitationSource]
    model_used: str
    processing_time_ms: float

class LabHintRequest(BaseModel):
    lab_id: str
    lab_title: str
    user_attempt: Optional[str] = None
    current_step: Optional[int] = 1

class LabHintResponse(BaseModel):
    lab_id: str
    hint: str
    concept_summary: str
    relevant_references: List[str]

# Course & Lab Schemas
class CourseItem(BaseModel):
    id: str
    title: str
    description: str
    category: str
    level: str
    lessons_count: int
    duration: str

class LabChallenge(BaseModel):
    id: str
    title: str
    difficulty: str
    category: str
    description: str
    points: int
