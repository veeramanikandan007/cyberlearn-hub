"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, BookOpen, Shield, ChevronRight, X } from "lucide-react";
import { queryRAG, RAGResponse } from "@/lib/api";

const PRESET_QUERIES = [
  "Explain OWASP Broken Access Control",
  "How to prevent SQL Injection?",
  "Nmap stealth scan flags & commands",
  "JWT algorithm confusion attacks",
];

export default function AICyberTutorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RAGResponse | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setQuery(searchQuery);
    try {
      const data = await queryRAG(searchQuery);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-900/90 px-4 py-3 font-mono text-sm font-medium text-emerald-400 shadow-lg shadow-emerald-500/10 backdrop-blur-md transition-all hover:scale-105 hover:border-emerald-400 hover:shadow-emerald-500/25"
      >
        <Bot className="h-5 w-5 text-emerald-400 animate-pulse" />
        <span>RAG AI Tutor</span>
        <Sparkles className="h-4 w-4 text-emerald-300" />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[92vw] max-w-lg rounded-2xl border border-slate-800 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Shield size={18} />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-slate-100 flex items-center gap-2">
                  CyberLearn RAG Assistant
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                    FastAPI
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Contextual Cybersecurity Knowledge Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="mt-4 max-h-[380px] overflow-y-auto pr-1 space-y-4">
            {!response && !loading && (
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 p-4 text-center">
                <p className="font-mono text-xs text-slate-300">
                  Ask any question about Web Security, OWASP, Networks, or CTF labs.
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {PRESET_QUERIES.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleSearch(preset)}
                      className="rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center gap-2 py-8 font-mono text-xs text-emerald-400">
                <Bot className="h-5 w-5 animate-spin" />
                <span>Searching Cybersecurity Vector Database...</span>
              </div>
            )}

            {response && !loading && (
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-xs leading-relaxed text-slate-200 font-mono">
                  <div className="whitespace-pre-wrap">{response.answer}</div>
                </div>

                {/* Citations List */}
                {response.citations && response.citations.length > 0 && (
                  <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3">
                    <h4 className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-400">
                      <BookOpen size={13} />
                      Verified Source Citations ({response.citations.length})
                    </h4>
                    <div className="mt-2 space-y-1.5">
                      {response.citations.map((cite, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2 text-[11px]"
                        >
                          <div className="flex justify-between font-mono font-semibold text-slate-200">
                            <span>{cite.title}</span>
                            <span className="text-emerald-400">{cite.relevance_score * 100}% match</span>
                          </div>
                          <p className="mt-1 text-[10px] text-slate-400 line-clamp-2">{cite.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="mt-4 flex gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask RAG AI (e.g. How to prevent XSS?)"
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 font-mono text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center rounded-xl bg-emerald-500 px-3.5 py-2 font-mono text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-all disabled:opacity-50"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
