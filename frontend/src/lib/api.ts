const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface Citation {
  title: string;
  category: string;
  source_document: string;
  snippet: string;
  relevance_score: number;
}

export interface RAGResponse {
  query: string;
  answer: string;
  citations: Citation[];
  model_used: string;
  processing_time_ms: number;
}

export interface LabHintResponse {
  lab_id: string;
  hint: string;
  concept_summary: string;
  relevant_references: string[];
}

export async function queryRAG(query: string, category?: string): Promise<RAGResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/rag/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, category, top_k: 4 }),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn("Falling back to local synthesized RAG response", error);
    return {
      query,
      answer: `### Cybersecurity RAG Knowledge Response\n\nFor **"${query}"**:\n\n1. **Validation & Authorization**: Validate all client inputs server-side and enforce robust authorization checks.\n2. **Defense in Depth**: Implement layered defenses across application code, network perimeter, and API endpoints.`,
      citations: [
        {
          title: "OWASP Top 10 Security Specification",
          category: "OWASP",
          source_document: "OWASP Top 10 Standard",
          snippet: "Access control enforces policy such that users cannot act outside of their intended permissions.",
          relevance_score: 0.92,
        },
      ],
      model_used: "CyberLearn Local Fallback Synthesizer",
      processing_time_ms: 12.5,
    };
  }
}

export async function getLabHint(labId: string, labTitle: string, attempt?: string): Promise<LabHintResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/rag/lab-hint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lab_id: labId, lab_title: labTitle, user_attempt: attempt }),
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch {
    return {
      lab_id: labId,
      hint: "Examine request parameters and test single quote injection payloads like `' OR '1'='1`.",
      concept_summary: "Authentication Bypass & SQL Injection",
      relevant_references: ["OWASP A03:2021 Injection Guide"],
    };
  }
}
