from fastapi import APIRouter, HTTPException, Body, Query
from typing import List, Dict, Any, Optional
from app.models.schemas import LabChallenge
from app.services.orchestrator import orchestrator

router = APIRouter()

LABS_DATA = [
    {
        "id": "lab-sqli-01",
        "title": "SQL Injection Auth Bypass",
        "difficulty": "Easy",
        "category": "Web Security",
        "description": "Bypass a vulnerable login form using basic SQL Injection syntax (`' OR '1'='1`).",
        "points": 100
    },
    {
        "id": "lab-xss-02",
        "title": "Stored XSS Comment Injection",
        "difficulty": "Medium",
        "category": "Web Security",
        "description": "Inject an inline script into a public comment box and capture administrator session tokens.",
        "points": 150
    },
    {
        "id": "lab-nmap-03",
        "title": "Stealth Network Reconnaissance",
        "difficulty": "Easy",
        "category": "Network Security",
        "description": "Scan a target subnet using Nmap SYN stealth scans to discover hidden HTTP & SSH ports.",
        "points": 120
    },
    {
        "id": "lab-jwt-04",
        "title": "JWT Signature Confusion Attack",
        "difficulty": "Hard",
        "category": "Cryptography",
        "description": "Exploit algorithm confusion in JWT verification to forge an administrative identity.",
        "points": 250
    }
]

@router.get("", response_model=List[LabChallenge], summary="Get Hands-On Lab Challenges")
async def get_labs():
    return LABS_DATA

@router.post("/{lab_id}/launch", summary="Launch Docker Vulnerable Lab Container")
async def launch_lab_container(
    lab_id: str,
    user_id: str = Query("demo-user-01", description="Current authenticated user ID")
):
    session = orchestrator.launch_lab(user_id=user_id, lab_id=lab_id)
    return {
        "status": "launched",
        "message": f"Lab instance for {lab_id} is running.",
        "session": session
    }

@router.post("/{lab_id}/stop", summary="Stop and Teardown Lab Container")
async def stop_lab_container(
    lab_id: str,
    user_id: str = Query("demo-user-01", description="Current authenticated user ID")
):
    orchestrator.terminate_lab(user_id=user_id, lab_id=lab_id)
    return {
        "status": "stopped",
        "message": f"Lab instance {lab_id} has been terminated."
    }

@router.get("/{lab_id}/session", summary="Get Active Lab Container Session")
async def get_lab_session(
    lab_id: str,
    user_id: str = Query("demo-user-01", description="Current authenticated user ID")
):
    session = orchestrator.get_session(user_id=user_id, lab_id=lab_id)
    if not session:
        return {"status": "inactive", "session": None}
    return {"status": "active", "session": session}

@router.post("/{lab_id}/verify", summary="Verify Lab Solution Flag")
async def verify_lab_flag(
    lab_id: str,
    payload: Dict[str, str] = Body(..., examples=[{"flag": "FLAG{sql_injection_mastered_2026}"}])
):
    flag = payload.get("flag", "").strip()
    if not flag:
        raise HTTPException(status_code=400, detail="Flag string is required.")

    # Verification simulation logic
    if "sql" in lab_id and ("1'='1" in flag.lower() or "flag{" in flag.lower()):
        return {"status": "success", "message": "Congratulations! Flag verified successfully.", "points_awarded": 100}
    elif "flag{" in flag.lower():
        return {"status": "success", "message": "Flag verified successfully!", "points_awarded": 150}
    else:
        return {"status": "failed", "message": "Incorrect flag submission. Keep trying or request an AI Hint!"}

