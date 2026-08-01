from fastapi import APIRouter, HTTPException, Query, BackgroundTasks
from fastapi.responses import StreamingResponse
import json
import asyncio
from typing import Optional
from app.models.schemas import RAGQueryRequest, RAGQueryResponse, LabHintRequest, LabHintResponse
from app.services.rag_service import rag_engine

router = APIRouter()

@router.post("/query", response_model=RAGQueryResponse, summary="Query RAG AI Cybersecurity Knowledge Engine")
async def query_rag(request: RAGQueryRequest):
    """
    Retrieves context from OWASP, NIST, Web Vulnerabilities, and Network Security knowledge bases
    and synthesizes an accurate answer with source citations.
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty.")
    
    response = rag_engine.generate_rag_response(
        query=request.query,
        category=request.category,
        top_k=request.top_k or 4
    )
    return response

@router.post("/query/stream", summary="Stream RAG Response via Server-Sent Events (SSE)")
async def stream_rag_query(request: RAGQueryRequest):
    """
    Streams RAG response tokens in real-time for fluid AI typing effect in Next.js UI.
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty.")

    rag_result = rag_engine.generate_rag_response(
        query=request.query,
        category=request.category,
        top_k=request.top_k or 4
    )

    async def event_generator():
        answer = rag_result["answer"]
        citations = rag_result["citations"]

        # Send initial metadata event
        meta_event = {
            "type": "meta",
            "model": rag_result["model_used"],
            "citations": citations
        }
        yield f"data: {json.dumps(meta_event)}\n\n"
        await asyncio.sleep(0.05)

        # Stream answer chunks
        words = answer.split(" ")
        for i in range(0, len(words), 3):
            chunk = " ".join(words[i:i+3]) + " "
            payload = {"type": "token", "content": chunk}
            yield f"data: {json.dumps(payload)}\n\n"
            await asyncio.sleep(0.03)

        # Send done event
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.post("/lab-hint", response_model=LabHintResponse, summary="Generate AI Lab Hint using RAG Context")
async def get_lab_hint(request: LabHintRequest):
    """
    Provides a contextual cybersecurity hint for hands-on labs without spoiling solutions.
    """
    hint_data = rag_engine.generate_lab_hint(
        lab_id=request.lab_id,
        lab_title=request.lab_title,
        user_attempt=request.user_attempt
    )
    return hint_data
