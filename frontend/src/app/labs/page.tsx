"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { labs } from "@/data/site";
import { Bot, Lightbulb, Play, Square, Terminal, Loader2 } from "lucide-react";
import {
  getLabHint,
  launchLabContainer,
  LabHintResponse,
  LabSession,
  stopLabContainer,
} from "@/lib/api";

export default function LabsPage() {
  const [activeHintLab, setActiveHintLab] = useState<string | null>(null);
  const [hintData, setHintData] = useState<Record<string, LabHintResponse>>({});
  const [loadingLab, setLoadingLab] = useState<string | null>(null);
  const [hintErrors, setHintErrors] = useState<Record<string, string>>({});

  // Active running lab instance state
  const [runningLabs, setRunningLabs] = useState<Record<string, LabSession>>({});
  const [launchingLab, setLaunchingLab] = useState<string | null>(null);
  const [labErrors, setLabErrors] = useState<Record<string, string>>({});

  const fetchHint = async (labTitle: string) => {
    setLoadingLab(labTitle);
    setHintErrors((prev) => ({ ...prev, [labTitle]: "" }));
    try {
      const data = await getLabHint(labTitle.toLowerCase().replace(/\s+/g, "-"), labTitle);
      setHintData((prev) => ({ ...prev, [labTitle]: data }));
      setActiveHintLab(labTitle);
    } catch (error) {
      setHintErrors((prev) => ({
        ...prev,
        [labTitle]: error instanceof Error ? error.message : "Unable to fetch a hint.",
      }));
    } finally {
      setLoadingLab(null);
    }
  };

  const toggleLabInstance = async (labTitle: string) => {
    const labId = labTitle.toLowerCase().replace(/\s+/g, "-");
    setLaunchingLab(labTitle);
    setLabErrors((prev) => ({ ...prev, [labTitle]: "" }));
    try {
      if (runningLabs[labTitle]) {
        await stopLabContainer(labId);
        setRunningLabs((prev) => {
          const next = { ...prev };
          delete next[labTitle];
          return next;
        });
      } else {
        const result = await launchLabContainer(labId);
        setRunningLabs((prev) => ({ ...prev, [labTitle]: result.session }));
      }
    } catch (error) {
      setLabErrors((prev) => ({
        ...prev,
        [labTitle]: error instanceof Error ? error.message : "Unable to update the lab session.",
      }));
    } finally {
      setLaunchingLab(null);
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
            const isLoadingHint = loadingLab === lab.title;
            const session = runningLabs[lab.title];
            const isRunning = Boolean(session);
            const isLaunching = launchingLab === lab.title;

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

                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => toggleLabInstance(lab.title)}
                      disabled={isLaunching}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all disabled:opacity-50 ${
                        isRunning
                          ? "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                      }`}
                    >
                      {isLaunching ? (
                        <>
                          <Loader2 size={15} className="animate-spin" /> Provisioning Environment...
                        </>
                      ) : isRunning ? (
                        <>
                          <Square size={14} /> Stop Lab Instance
                        </>
                      ) : (
                        <>
                          <Play size={14} /> Start Lab Instance
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => fetchHint(lab.title)}
                      disabled={isLoadingHint}
                      className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                    >
                      <Lightbulb size={15} />
                      {isLoadingHint ? "Generating Hint..." : "Ask RAG AI Hint"}
                    </button>
                  </div>

                  {isRunning && (
                    <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 font-mono text-xs text-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Terminal size={15} />
                        <span>
                          Target:{" "}
                          <code className="rounded bg-slate-950 px-2 py-0.5 text-emerald-300">
                            {session?.target_ip}
                          </code>
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span> Live
                      </span>
                    </div>
                  )}

                  {labErrors[lab.title] && (
                    <p role="alert" className="text-xs text-red-400">
                      {labErrors[lab.title]}
                    </p>
                  )}

                  {hintErrors[lab.title] && (
                    <p role="alert" className="text-xs text-red-400">
                      {hintErrors[lab.title]}
                    </p>
                  )}

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
