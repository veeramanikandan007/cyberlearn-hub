from fastapi import APIRouter, Query
from typing import List, Optional
from app.models.schemas import CourseItem

router = APIRouter()

COURSES_DATA = [
    {
        "id": "web-sec-101",
        "title": "Web Security Essentials & OWASP Top 10",
        "description": "Master SQL Injection, XSS, CSRF, IDOR, and modern web application defense techniques.",
        "category": "Web Security",
        "level": "Beginner to Intermediate",
        "lessons_count": 14,
        "duration": "6.5 Hours"
    },
    {
        "id": "net-def-201",
        "title": "Network Traffic Analysis & Packet Forensics",
        "description": "Hands-on packet investigation using Wireshark, tcpdump, and network intrusion detection systems.",
        "category": "Network Security",
        "level": "Intermediate",
        "lessons_count": 10,
        "duration": "5 Hours"
    },
    {
        "id": "ctf-pwn-301",
        "title": "Offensive Security & CTF Challenge Tactics",
        "description": "Learn privilege escalation, payload crafting, reverse engineering basics, and binary exploitation.",
        "category": "Offensive Security",
        "level": "Advanced",
        "lessons_count": 18,
        "duration": "9 Hours"
    },
    {
        "id": "cloud-sec-202",
        "title": "Cloud Hardening & AWS/Azure IAM Security",
        "description": "Secure S3 buckets, IAM roles, cloud network firewalls, and prevent misconfigurations.",
        "category": "Cloud Security",
        "level": "Intermediate",
        "lessons_count": 12,
        "duration": "6 Hours"
    }
]

@router.get("", response_model=List[CourseItem], summary="Get Course Catalog")
async def get_courses(category: Optional[str] = Query(None, description="Filter courses by category")):
    if category:
        return [c for c in COURSES_DATA if category.lower() in c["category"].lower()]
    return COURSES_DATA

@router.get("/{course_id}", response_model=CourseItem, summary="Get Single Course Details")
async def get_course_details(course_id: str):
    for c in COURSES_DATA:
        if c["id"] == course_id:
            return c
    return COURSES_DATA[0]
