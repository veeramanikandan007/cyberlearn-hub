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

- Configure the environment variables from .env.example before wiring auth, Postgres, and Stripe
- Deploy on Vercel with the Next.js app router and a PostgreSQL provider such as Neon or Supabase
- The current implementation is UI- and content-focused and ready for backend integration
