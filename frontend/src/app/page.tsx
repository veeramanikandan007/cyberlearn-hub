import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Terminal,
  Network,
  FlaskConical,
  Award,
  Users,
} from "lucide-react";
import TerminalHero from "@/components/TerminalHero";
import CourseCard from "@/components/CourseCard";
import Faq from "@/components/Faq";
import { courses } from "@/data/courses";
import { articles as siteArticles, roadmapStages, testimonials as siteTestimonials } from "@/data/site";

const stats = [
  { value: "120+", label: "hands-on labs" },
  { value: "48,000+", label: "students enrolled" },
  { value: "9", label: "learning paths" },
  { value: "4.8/5", label: "average rating" },
];

const roadmap = roadmapStages;

const reasons = [
  {
    icon: FlaskConical,
    title: "Labs, not just lectures",
    body: "Every module ends in a real vulnerable environment you break and fix yourself — not a video you watch passively.",
  },
  {
    icon: Terminal,
    title: "Built by practitioners",
    body: "Course content is written and reviewed by working pentesters, SOC analysts, and incident responders.",
  },
  {
    icon: Network,
    title: "A path, not a pile of courses",
    body: "Structured learning paths sequence courses so each one builds on real prerequisites, not marketing categories.",
  },
  {
    icon: Award,
    title: "Certificates that hold up",
    body: "Every certificate is earned through a practical final assessment, with a public credential ID employers can verify.",
  },
];

const testimonials = siteTestimonials;

const articles = siteArticles.slice(0, 3).map((article) => ({
  title: article.title,
  tag: article.category,
  read: article.readTime,
}));

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grid-bg relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-green/5 px-3 py-1 font-mono text-xs text-green">
              <ShieldCheck size={13} /> 120+ hands-on labs, zero fluff
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-text md:text-5xl">
              Learn cybersecurity
              <br />
              from <span className="text-green">zero</span> to{" "}
              <span className="text-blue">professional</span>.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-text-dim">
              Structured courses, real vulnerable labs, and practical
              certificates — built for people who learn by breaking things,
              not by watching slides.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-md bg-green px-6 py-3 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
              >
                Start learning free <ArrowRight size={15} />
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-sm text-text transition-colors hover:border-border-hover"
              >
                Browse courses
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <TerminalHero />
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-border bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-mono text-2xl font-bold text-text">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-text-faint">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-green">
              Featured
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-text md:text-3xl">
              Start with what breaches actually look like
            </h2>
          </div>
          <Link
            href="/courses"
            className="hidden items-center gap-1 font-mono text-sm text-text-dim hover:text-text md:flex"
          >
            View all courses <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {courses.slice(0, 6).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-y border-border bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <span className="font-mono text-xs uppercase tracking-wider text-blue">
            Learning roadmap
          </span>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold text-text md:text-3xl">
            One sequence, five stages — no guessing what to learn next
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-5">
            {roadmap.map((r, i) => (
              <div key={r.stage} className="relative pb-10 pl-8 md:pb-0 md:pl-0 md:pr-8">
                <div className="absolute left-0 top-1 h-full w-px bg-border md:left-auto md:right-0 md:top-3 md:h-px md:w-full">
                  {i === roadmap.length - 1 && (
                    <div className="hidden md:block" />
                  )}
                </div>
                <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full border-2 border-green bg-bg md:left-auto md:right-[-5px] md:top-0" />
                <div className="font-mono text-xs text-text-faint">
                  stage_0{i + 1}
                </div>
                <h3 className="mt-1 font-semibold text-text">{r.stage}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-dim">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="font-mono text-xs uppercase tracking-wider text-purple">
          Why CyberLearn Hub
        </span>
        <h2 className="mt-2 max-w-xl text-2xl font-semibold text-text md:text-3xl">
          Most platforms teach vocabulary. We teach the exploit and the fix.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="glass rounded-xl p-6">
              <r.icon size={20} className="text-green" />
              <h3 className="mt-4 font-semibold text-text">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-green">
            <Users size={13} /> Student outcomes
          </span>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-xl p-6">
                <p className="text-sm leading-relaxed text-text">
                  “{t.quote}”
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="text-sm font-medium text-text">
                    {t.name}
                  </div>
                  <div className="font-mono text-xs text-text-faint">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="font-mono text-xs uppercase tracking-wider text-blue">
          From the blog
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-text md:text-3xl">
          Latest articles
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.title}
              className="glass rounded-xl p-6 transition-transform hover:-translate-y-1"
            >
              <span className="font-mono text-[11px] text-green">
                {a.tag}
              </span>
              <h3 className="mt-3 font-semibold leading-snug text-text">
                {a.title}
              </h3>
              <span className="mt-4 block font-mono text-xs text-text-faint">
                {a.read}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-green">
              FAQ
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-text md:text-3xl">
              Questions people actually ask
            </h2>
          </div>
          <div className="mt-12">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
