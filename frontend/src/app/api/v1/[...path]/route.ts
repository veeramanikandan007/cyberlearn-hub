export const dynamic = "force-dynamic";

async function proxyBackend(request: Request): Promise<Response> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return Response.json(
      { detail: "The backend service binding (BACKEND_URL) is not configured." },
      { status: 503 }
    );
  }

  const incomingUrl = new URL(request.url);
  const backendBaseUrl = new URL(backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`);
  const apiPath = incomingUrl.pathname.replace(/^\/+/, "");
  const targetUrl = new URL(`${apiPath}${incomingUrl.search}`, backendBaseUrl);
  const headers = new Headers(request.headers);

  for (const header of [
    "host",
    "connection",
    "content-length",
    "expect",
    "transfer-encoding",
  ]) {
    headers.delete(header);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(targetUrl, init);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-length");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyBackend;
export const HEAD = proxyBackend;
export const POST = proxyBackend;
export const PUT = proxyBackend;
export const PATCH = proxyBackend;
export const DELETE = proxyBackend;
export const OPTIONS = proxyBackend;
