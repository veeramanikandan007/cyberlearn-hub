import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { learningPaths } from "@/data/site";

export const metadata: Metadata = {
  title: "Learning Paths",
  description: "Follow guided learning paths that build the fundamentals, then progress into specialization and advanced practice.",
};

export default function LearningPathsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Learning paths"
        title="Choose the path that matches your next career step"
        description="Whether you are breaking into security, shifting from IT, or strengthening an existing specialty, our paths help you move forward with clarity."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <div key={path.title} className="glass rounded-2xl p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-green">{path.duration}</p>
              <h2 className="mt-3 text-xl font-semibold text-text">{path.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{path.summary}</p>
              <ul className="mt-6 space-y-3 text-sm text-text-dim">
                {path.steps.map((step) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
