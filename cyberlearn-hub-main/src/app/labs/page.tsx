import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { labs } from "@/data/site";

export const metadata: Metadata = {
  title: "Labs",
  description: "Practice in high-value security labs covering Linux, networking, web exploitation, and buffer overflow concepts.",
};

export default function LabsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Hands-on labs"
        title="Practice the techniques defenders and attackers both need to understand"
        description="Each lab is designed to teach a real skill: observing behavior, forming a hypothesis, applying the fix, and documenting the outcome."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {labs.map((lab) => (
            <div key={lab.title} className="glass rounded-2xl p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-text">{lab.title}</h2>
                <span className="rounded-full border border-blue/25 bg-blue/10 px-3 py-1 font-mono text-[11px] text-blue">
                  {lab.difficulty}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-dim">{lab.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
