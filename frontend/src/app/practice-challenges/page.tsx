import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { practiceChallenges } from "@/data/site";

export const metadata: Metadata = {
  title: "Practice Challenges",
  description: "Challenge yourself with scenario-based exercises covering detection, investigation, and reverse engineering.",
};

export default function PracticeChallengesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Practice challenges"
        title="Turn knowledge into instinct with scenario-based exercises"
        description="Each challenge is designed to reflect the pace and uncertainty of real operational work."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {practiceChallenges.map((challenge) => (
            <div key={challenge.title} className="glass rounded-2xl p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue">{challenge.type}</p>
              <h2 className="mt-3 text-xl font-semibold text-text">{challenge.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{challenge.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
