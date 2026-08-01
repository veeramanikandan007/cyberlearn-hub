import os
import json
import re
import math
import time
from typing import List, Dict, Any, Optional, Tuple
from app.core.config import settings

class DocumentChunk:
    def __init__(self, doc_id: str, title: str, category: str, source_doc: str, content: str, tags: List[str]):
        self.doc_id = doc_id
        self.title = title
        self.category = category
        self.source_doc = source_doc
        self.content = content
        self.tags = tags
        self.tokens = self._tokenize(title + " " + content + " " + " ".join(tags))

    def _tokenize(self, text: str) -> List[str]:
        words = re.findall(r'\w+', text.lower())
        return [w for w in words if len(w) > 2]

class RAGEngine:
    def __init__(self):
        self.documents: List[DocumentChunk] = []
        self.idf: Dict[str, float] = {}
        self.is_loaded = False
        self._load_knowledge_base()

    def _load_knowledge_base(self):
        kb_dir = settings.KNOWLEDGE_BASE_DIR
        if not os.path.exists(kb_dir):
            os.makedirs(kb_dir, exist_ok=True)
            
        json_files = [f for f in os.listdir(kb_dir) if f.endswith('.json')]
        total_docs = 0
        
        for file_name in json_files:
            file_path = os.path.join(kb_dir, file_name)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for item in data:
                        chunk = DocumentChunk(
                            doc_id=item.get("id", f"doc_{total_docs}"),
                            title=item.get("title", "Cybersecurity Reference"),
                            category=item.get("category", "General Security"),
                            source_doc=item.get("source_document", file_name),
                            content=item.get("content", ""),
                            tags=item.get("tags", [])
                        )
                        self.documents.append(chunk)
                        total_docs += 1
            except Exception as e:
                print(f"Error loading {file_path}: {e}")

        self._compute_idf()
        self.is_loaded = True
        print(f"RAG Engine successfully indexed {len(self.documents)} cybersecurity knowledge chunks.")

    def _compute_idf(self):
        N = len(self.documents)
        if N == 0:
            return
        doc_counts: Dict[str, int] = {}
        for doc in self.documents:
            unique_tokens = set(doc.tokens)
            for token in unique_tokens:
                doc_counts[token] = doc_counts.get(token, 0) + 1

        for token, count in doc_counts.items():
            self.idf[token] = math.log((N + 1) / (count + 0.5)) + 1.0

    def _calculate_score(self, query_tokens: List[str], doc: DocumentChunk) -> float:
        score = 0.0
        doc_token_counts: Dict[str, int] = {}
        for t in doc.tokens:
            doc_token_counts[t] = doc_token_counts.get(t, 0) + 1

        for q_token in query_tokens:
            if q_token in doc_token_counts:
                tf = doc_token_counts[q_token] / len(doc.tokens)
                idf = self.idf.get(q_token, 1.0)
                score += tf * idf * 2.5
                
            # Boost score for title & tag matches
            if q_token in doc.title.lower():
                score += 1.5
            if any(q_token in tag.lower() for tag in doc.tags):
                score += 1.0

        return score

    def retrieve(self, query: str, category: Optional[str] = None, top_k: int = 4) -> List[Tuple[DocumentChunk, float]]:
        if not self.documents:
            return []

        query_tokens = [w for w in re.findall(r'\w+', query.lower()) if len(w) > 2]
        scored_docs: List[Tuple[DocumentChunk, float]] = []

        for doc in self.documents:
            if category and category.lower() != "all" and category.lower() not in doc.category.lower():
                continue
            score = self._calculate_score(query_tokens, doc)
            if score > 0.05:
                scored_docs.append((doc, score))

        scored_docs.sort(key=lambda x: x[1], reverse=True)
        return scored_docs[:top_k]

    def generate_rag_response(self, query: str, category: Optional[str] = None, top_k: int = 4) -> Dict[str, Any]:
        start_time = time.time()
        results = self.retrieve(query, category=category, top_k=top_k)

        citations = []
        context_blocks = []

        for doc, score in results:
            citations.append({
                "title": doc.title,
                "category": doc.category,
                "source_document": doc.source_doc,
                "snippet": doc.content[:250] + "..." if len(doc.content) > 250 else doc.content,
                "relevance_score": round(score, 4)
            })
            context_blocks.append(f"### Source: {doc.title} ({doc.source_doc})\n{doc.content}")

        if results:
            synthesized_answer = self._synthesize_answer(query, context_blocks)
        else:
            synthesized_answer = (
                f"### Cybersecurity RAG Assistant\n\n"
                f"Regarding your query **\"{query}\"**:\n\n"
                f"While no exact match was found in the indexed local security knowledge base, here is standard cybersecurity guidance:\n\n"
                f"1. **Security Verification**: Always validate untrusted input, enforce least privilege access control, and use prepared statements for queries.\n"
                f"2. **Defensive Strategy**: Apply defense-in-depth across application, network, and IAM layers.\n\n"
                f"*Tip*: Try searching for specific topics like `OWASP`, `SQL Injection`, `XSS`, `JWT`, `Nmap`, or `Wireshark`."
            )

        elapsed_ms = round((time.time() - start_time) * 1000, 2)

        return {
            "query": query,
            "answer": synthesized_answer,
            "citations": citations,
            "model_used": "CyberLearn RAG Hybrid Synthesizer v1.0",
            "processing_time_ms": elapsed_ms
        }

    def _synthesize_answer(self, query: str, context_blocks: List[str]) -> str:
        combined_context = "\n\n".join(context_blocks)
        answer = (
            f"### Cybersecurity Knowledge Synthesis\n\n"
            f"Based on authoritative security specifications and industry standards, here is the technical breakdown for **\"{query}\"**:\n\n"
            f"{combined_context}\n\n"
            f"---\n"
            f"#### Defensive Implementation Recommendations:\n"
            f"- **Input Validation & Sanitization**: Ensure all external inputs are strictly validated against allow-lists.\n"
            f"- **Least Privilege Access**: Restrict API endpoints and system credentials to minimum required privileges.\n"
            f"- **Monitoring & Logging**: Enable centralized security event logging to detect suspicious behavior early."
        )
        return answer

    def generate_lab_hint(self, lab_id: str, lab_title: str, user_attempt: Optional[str] = None) -> Dict[str, Any]:
        query = f"{lab_title} {user_attempt or ''}"
        results = self.retrieve(query, top_k=2)

        if results:
            doc, _ = results[0]
            hint = f"Review the principles of **{doc.title}**. Focus on: {doc.content[:200]}..."
            references = [doc.title, doc.source_doc]
        else:
            hint = f"Analyze the input parameters and response headers for unexpected behavior. Verify if input parameters are sanitized."
            references = ["CyberLearn Hands-On Lab Manual"]

        return {
            "lab_id": lab_id,
            "hint": hint,
            "concept_summary": f"Hands-on vulnerability analysis for {lab_title}.",
            "relevant_references": references
        }

rag_engine = RAGEngine()
