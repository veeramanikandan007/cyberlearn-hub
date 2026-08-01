import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { resources, glossaryTerms } from "@/data/site";

export const metadata: Metadata = {
  title: "Resources",
  description: "Access cheat sheets, glossary entries, exam prep, and printable materials for your studies.",
};

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Reference material built for fast review and deeper study"
        description="Use these resources as a second layer of support when the labs get tricky or the assessments demand more depth."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <div key={resource.title} className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-text">{resource.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{resource.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-text">Cybersecurity glossary</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {glossaryTerms.map((term) => (
              <div key={term.term} className="rounded-xl border border-border/70 bg-black/20 p-5">
                <h3 className="font-semibold text-text">{term.term}</h3>
                <p className="mt-2 text-sm leading-7 text-text-dim">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
