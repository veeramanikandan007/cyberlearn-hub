# CyberLearn Hub — Cybersecurity Learning Platform (FastAPI + RAG + Next.js 15)

CyberLearn Hub is an production-ready full-stack cybersecurity educational platform featuring an **AI Cybersecurity RAG (Retrieval-Augmented Generation)** knowledge synthesizer, interactive security labs, course catalogs, and real-time AI lab hints.

Built with **Next.js 15 (React 19)** for the frontend and **FastAPI (Python)** for the high-performance async backend and RAG engine.

---

## 🚀 Key Features

* **🤖 RAG AI Cybersecurity Tutor**: Vector-indexed AI knowledge assistant trained on **OWASP Top 10**, **NIST Framework**, **Web Vulnerabilities Guide**, **Nmap/Wireshark Cheat Sheets**, and **CTF Handbooks**.
* **🔍 Semantic Search & Citations**: Answers user questions with verified context passages and relevance scores.
* **⚡ Server-Sent Events (SSE) Streaming**: Real-time token streaming for smooth AI response typing effect.
* **💡 Guided AI Lab Hints**: Context-aware vulnerability hints for hands-on challenges without revealing flag solutions.
* **🛡️ Security & Authentication**: JWT token authentication with PBKDF2 password hashing, CORS policies, and input validation.
* **📖 Interactive Swagger OpenAPI Documentation**: Full API endpoint testing interface at `http://localhost:8000/docs`.

---

## 🏗️ System Architecture

```
                                  +------------------------------------------+
                                  |         Next.js 15 Frontend              |
                                  |  (React 19, TypeScript, Tailwind, UI)   |
                                  +--------------------+---------------------+
                                                       |
                                            HTTP / SSE / REST APIs
                                                       |
                                  +--------------------v---------------------+
                                  |             FastAPI Backend              |
                                  | (Python, Async REST APIs, Auth, Pyantic) |
                                  +---------+----------------------+---------+
                                            |                      |
                         +------------------+                      +-------------------+
                         |                                                             |
            +------------v------------+                                   +------------v------------+
            |     RAG AI Engine       |                                   |   SQLite / Database     |
            | (ChromaDB / VectorDB,   |                                   |  (Users, Progress, Labs)|
            | Embeddings, LLM RAG,    |                                   +-------------------------+
            | OWASP/NIST Cyber KB)    |
            +-------------------------+
```

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
* **Backend**: FastAPI, Pydantic v2, Python-Jose (JWT), Uvicorn
* **RAG & AI**: Vector Database, TF-IDF + Cosine Similarity Embeddings, Knowledge Chunking, Server-Sent Events (SSE)
* **DevOps**: Docker, Docker Compose

---

## 🏁 Quick Start Guide

### 1. Run Backend (FastAPI + RAG Engine)

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

* Backend running at: `http://localhost:8000`
* Interactive API Documentation (Swagger): `http://localhost:8000/docs`

### 2. Run Frontend (Next.js 15)

```bash
cd frontend
npm install
npm run dev
```

* Frontend running at: `http://localhost:3000`

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/rag/query` | Query RAG Knowledge Base with citations |
| `POST` | `/api/v1/rag/query/stream` | Stream RAG response tokens via SSE |
| `POST` | `/api/v1/rag/lab-hint` | Get AI-guided hints for cyber labs |
| `GET` | `/api/v1/courses` | List cybersecurity courses |
| `GET` | `/api/v1/labs` | List hands-on cyber labs |
| `POST` | `/api/v1/labs/{id}/verify` | Verify flag submission |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT |
| `POST` | `/api/v1/auth/register` | Register new user |

---

## 💼 Portfolio & LinkedIn Showcase Text

> **Title**: CyberLearn Hub — Next.js 15 & FastAPI Cybersecurity Platform powered by RAG AI Engine  
>  
> Built **CyberLearn Hub**, a modern cybersecurity educational platform featuring a **Retrieval-Augmented Generation (RAG) AI Assistant** trained on **OWASP Top 10**, **NIST**, and **Network Defense specifications**.
>  
> **Key Technical Accomplishments**:
> - Built a **Python FastAPI backend** with vector search, semantic embeddings, and SSE response streaming.
> - Developed a **Next.js 15 + React 19** dark-themed cyber UI with floating RAG chat assistant and domain filters.
> - Implemented an **AI Lab Hint Generator** to guide learners through security challenges without spoiling flag solutions.
> - Integrated **JWT authentication**, CORS policies, and OpenAPI Swagger documentation.
