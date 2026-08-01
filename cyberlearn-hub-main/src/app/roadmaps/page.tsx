import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { roadmapStages } from "@/data/site";

export const metadata: Metadata = {
  title: "Roadmaps",
  description: "Follow a clear cybersecurity roadmap from fundamentals through advanced specialization.",
};

export default function RoadmapsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Roadmaps"
        title="One roadmap for foundations, one for specialization, one for advanced practice"
        description="The roadmap is designed to reduce decision fatigue and make your progress feel measurable at every milestone."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass rounded-2xl p-8">
          <div className="space-y-6">
            {roadmapStages.map((stage, index) => (
              <div key={stage.stage} className="flex gap-4 rounded-xl border border-border/70 bg-black/20 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green/30 bg-green/10 font-mono text-sm text-green">
                  0{index + 1}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text">{stage.stage}</h2>
                  <p className="mt-2 text-sm leading-7 text-text-dim">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
