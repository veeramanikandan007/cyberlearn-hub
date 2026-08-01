import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Layers,
  Star,
  Users,
  ArrowRight,
  CheckCircle2,
  Database,
  Code2,
  ShieldAlert,
} from "lucide-react";
import { getCourseBySlug, difficultyColor } from "@/data/courses";

export const metadata: Metadata = {
  title: "Web Application Security Fundamentals",
  description:
    "Understand and defend against SQL injection, XSS, and missing security headers — the vulnerability classes behind most real-world breaches.",
};

const modules = [
  {
    slug: "sql-injection",
    icon: Database,
    title: "SQL Injection",
    summary:
      "How untrusted input becomes part of a query, classic vs. blind injection, and parameterized queries as the real fix.",
    lessons: 1,
    duration: "2h 10m",
  },
  {
    slug: "cross-site-scripting",
    icon: Code2,
    title: "Cross-Site Scripting (XSS)",
    summary:
      "Stored, reflected, and DOM-based XSS — where each one lives in the request/response cycle and how to stop it at the right layer.",
    lessons: 1,
    duration: "2h 05m",
  },
  {
    slug: "secure-headers",
    icon: ShieldAlert,
    title: "Security Headers & Defense in Depth",
    summary:
      "CSP, HSTS, and the headers that turn a successful injection into a contained, low-impact incident instead of a breach.",
    lessons: 1,
    duration: "2h 15m",
  },
];

export default function CoursePage() {
  const course = getCourseBySlug("web-application-security")!;

  return (
    <div>
      {/* Header */}
      <div className="grid-bg border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium ${difficultyColor[course.track]}`}
            >
              {course.track}
            </span>
            <span className="font-mono text-[11px] text-text-faint">
              {course.category}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-text md:text-4xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-dim">
            {course.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs text-text-faint">
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers size={13} /> {course.modules} modules
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={13} /> {course.students} students
            </span>
            <span className="flex items-center gap-1.5 text-severity-medium">
              <Star size={13} fill="currentColor" /> {course.rating}
            </span>
          </div>

          <Link
            href={`/courses/${course.slug}/lessons/${modules[0].slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-green px-6 py-3 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
          >
            Start module 1 <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Objectives */}
        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-green">
            What you'll be able to do
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {course.objectives.map((o) => (
              <li key={o} className="flex gap-2 text-sm text-text-dim">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" />
                {o}
              </li>
            ))}
          </ul>
        </section>

        {/* Curriculum */}
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-wider text-blue">
            Curriculum
          </h2>
          <div className="mt-4 space-y-4">
            {modules.map((m, i) => (
              <Link
                key={m.slug}
                href={`/courses/${course.slug}/lessons/${m.slug}`}
                className="glass flex flex-col gap-4 rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-glow-blue sm:flex-row sm:items-center"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.02] text-blue">
                  <m.icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] text-text-faint">
                    Module 0{i + 1}
                  </div>
                  <h3 className="mt-0.5 font-semibold text-text">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-dim">
                    {m.summary}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 font-mono text-xs text-text-faint">
                  <Clock size={12} /> {m.duration}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
