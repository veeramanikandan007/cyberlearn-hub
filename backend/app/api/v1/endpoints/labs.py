from fastapi import APIRouter, HTTPException, Body
from typing import List, Dict, Any
from app.models.schemas import LabChallenge

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
