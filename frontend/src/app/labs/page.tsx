"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { labs } from "@/data/site";
import { Bot, Sparkles, Lightbulb, ShieldAlert, CheckCircle2 } from "lucide-react";
import { getLabHint, LabHintResponse } from "@/lib/api";

export default function LabsPage() {
  const [activeHintLab, setActiveHintLab] = useState<string | null>(null);
  const [hintData, setHintData] = useState<Record<string, LabHintResponse>>({});
  const [loadingLab, setLoadingLab] = useState<string | null>(null);

  const fetchHint = async (labTitle: string) => {
    setLoadingLab(labTitle);
    try {
      const data = await getLabHint(labTitle.toLowerCase().replace(/\s+/g, "-"), labTitle);
      setHintData((prev) => ({ ...prev, [labTitle]: data }));
      setActiveHintLab(labTitle);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLab(null);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Hands-on labs & RAG AI Assistance"
        title="Practice cybersecurity concepts with real-time AI hints"
        description="Each lab gives you real-world scenario challenges. Stuck? Request guided hints synthesized from our FastAPI vector knowledge base without spoiling the solution."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {labs.map((lab) => {
            const hasHint = hintData[lab.title];
            const isLoading = loadingLab === lab.title;

            return (
              <div key={lab.title} className="glass rounded-2xl p-8 flex flex-col justify-between border border-slate-800 bg-slate-900/60">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-text">{lab.title}</h2>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                      {lab.difficulty}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-text-dim">{lab.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => fetchHint(lab.title)}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    <Lightbulb size={15} />
                    {isLoading ? "Generating RAG Hint..." : "Ask RAG AI for Guided Hint"}
                  </button>

                  {hasHint && activeHintLab === lab.title && (
                    <div className="mt-4 rounded-xl border border-emerald-900/40 bg-emerald-950/30 p-4 font-mono text-xs text-slate-200">
                      <div className="flex items-center gap-2 font-bold text-emerald-400 mb-2">
                        <Bot size={16} /> RAG AI Lab Hint
                      </div>
                      <p className="text-slate-300 leading-relaxed">{hasHint.hint}</p>
                      {hasHint.relevant_references.length > 0 && (
                        <div className="mt-2 text-[11px] text-slate-400">
                          <span className="font-bold text-emerald-400">Reference:</span> {hasHint.relevant_references.join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
