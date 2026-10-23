# CyberLearn Hub

CyberLearn Hub is a modern, dark-themed cybersecurity learning platform built with Next.js 15, React 19, TypeScript, Tailwind CSS, and a content-first architecture for hands-on education.

## What is included

- A polished public experience with home, about, courses, learning paths, roadmaps, labs, practice challenges, blog, resources, community, pricing, contact, login, register, forgot password, terms, and privacy policy pages
- A reusable UI system with a cyber-inspired visual language, glass cards, strong accessibility contrast, and responsive layouts
- Rich educational content and sample data for courses, labs, blog articles, glossary terms, pricing plans, and dashboards
- API routes for health checks, course data, and blog content
- Prisma schema and environment example files for database and auth integration

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

- src/app — route-based pages and API handlers
- src/components — reusable interface building blocks
- src/data — course, site, and content datasets
- src/lib — shared app utilities and auth config
- prisma — database schema for future integration

## Deployment notes

The repository root `vercel.json` configures a Vercel project with two services:

- `frontend` builds this Next.js app and receives all public paths.
- `backend` builds the FastAPI app and remains internal; it has no public rewrite.
- The frontend declares a service binding named `BACKEND_URL`. The `/api/v1/*` Next.js route handler proxies browser requests to the backend server-side, so the backend URL is not exposed to the browser.

Import the repository as one Vercel project with the repository root as the project root so Vercel can read `vercel.json` and build both services. Configure `DATABASE_URL` with a PostgreSQL connection string and a unique random `SECRET_KEY` in the backend service's environment, along with any required AI provider keys. Do not define `BACKEND_URL` manually in Vercel; the service binding injects it. For local development, the frontend `.env.example` value is for running the frontend proxy against a local backend. Run `vercel dev` from the repository root to test the Vercel service binding and routing.

Registration and login use the backend's PostgreSQL `cyberlearn_users` table; the API creates the table if it does not yet exist. Passwords are stored as PBKDF2 hashes. No credentials or signing secrets are committed to the repository.

The following are intentional limitations of the Vercel demo deployment:

- Vercel Functions cannot run a Docker daemon. `LabOrchestrator` falls back to simulated `sim-*` lab sessions so the demo works without a Docker host.
- Session tracking is in memory and intended for ephemeral demo sessions; use persistent storage such as Redis or PostgreSQL if sessions need to survive function invocations.
- The terminal WebSocket endpoint (`/ws/shell/{session_id}`) is reserved for persistent hosting environments and is not proxied through the Vercel HTTP API route. For real container isolation and interactive WebSockets, run the backend with the provided `docker-compose.yml` or on a dedicated container host such as Fly.io or a VPS.

Run `npm run build` from the `frontend` directory to verify the Next.js build locally.
