const API_BASE_URL = "/api/v1";

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

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

export interface LabSession {
  session_id: string;
  target_ip: string;
  expires_at: string;
}

export interface LabLaunchResponse {
  status: string;
  session: LabSession;
}

async function requestAuth(
  endpoint: "login" | "register",
  credentials: { email: string; password: string; name?: string }
): Promise<AuthResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  } catch {
    throw new Error("Unable to reach the account service. Please try again.");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const detail =
      typeof payload === "object" &&
      payload !== null &&
      "detail" in payload &&
      typeof payload.detail === "string"
        ? payload.detail
        : `Account request failed (${response.status}).`;
    throw new Error(detail);
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("access_token" in payload) ||
    typeof payload.access_token !== "string" ||
    !("token_type" in payload) ||
    typeof payload.token_type !== "string" ||
    !("user" in payload) ||
    typeof payload.user !== "object" ||
    payload.user === null ||
    !("email" in payload.user) ||
    typeof payload.user.email !== "string" ||
    !("name" in payload.user) ||
    typeof payload.user.name !== "string" ||
    !("role" in payload.user) ||
    typeof payload.user.role !== "string"
  ) {
    throw new Error("The account service returned an invalid response.");
  }

  return {
    access_token: payload.access_token,
    token_type: payload.token_type,
    user: {
      email: payload.user.email,
      name: payload.user.name,
      role: payload.user.role,
    },
  };
}

export function loginUser(email: string, password: string): Promise<AuthResponse> {
  return requestAuth("login", { email, password });
}

export function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  return requestAuth("register", { name, email, password });
}

export async function queryRAG(query: string, category?: string): Promise<RAGResponse> {
  const res = await fetch(`${API_BASE_URL}/rag/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, category, top_k: 4 }),
  });
  if (!res.ok) throw new Error(`RAG service responded with ${res.status}.`);
  return await res.json();
}

export async function getLabHint(labId: string, labTitle: string, attempt?: string): Promise<LabHintResponse> {
  const res = await fetch(`${API_BASE_URL}/rag/lab-hint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lab_id: labId, lab_title: labTitle, user_attempt: attempt }),
  });
  if (!res.ok) throw new Error(`Unable to fetch a lab hint (${res.status}).`);
  return await res.json();
}

export async function launchLabContainer(
  labId: string,
  userId: string = "demo-user-01"
): Promise<LabLaunchResponse> {
  const res = await fetch(
    `${API_BASE_URL}/labs/${encodeURIComponent(labId)}/launch?user_id=${encodeURIComponent(userId)}`,
    { method: "POST", headers: { "Content-Type": "application/json" } }
  );
  if (!res.ok) throw new Error(`Unable to start lab (${res.status}).`);
  return (await res.json()) as LabLaunchResponse;
}

export async function stopLabContainer(labId: string, userId: string = "demo-user-01") {
  const res = await fetch(
    `${API_BASE_URL}/labs/${encodeURIComponent(labId)}/stop?user_id=${encodeURIComponent(userId)}`,
    { method: "POST", headers: { "Content-Type": "application/json" } }
  );
  if (!res.ok) throw new Error(`Unable to stop lab (${res.status}).`);
  return await res.json();
}

export function getTerminalWebSocketUrl(sessionId: string): string {
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${wsProtocol}//${window.location.host}${API_BASE_URL}/terminal/ws/shell/${encodeURIComponent(sessionId)}`;
}
