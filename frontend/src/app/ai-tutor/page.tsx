"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bot, Sparkles, BookOpen, Shield, Send, CheckCircle2, Cpu, Zap, ArrowRight } from "lucide-react";
import { queryRAG, RAGResponse } from "@/lib/api";

const CATEGORIES = [
  { id: "all", label: "All Knowledge Bases" },
  { id: "OWASP", label: "OWASP Top 10" },
  { id: "Web Security", label: "Web Defense & Vulnerabilities" },
  { id: "Network Security", label: "Network Forensics & Nmap" },
];

const SUGGESTED_TOPICS = [
  "Explain OWASP Broken Access Control and IDOR mitigation",
  "What is the difference between Stored XSS and Reflected XSS?",
  "Nmap stealth scan syntax and firewall evasion flags",
  "How does SQL Injection work and how to fix it with prepared statements?",
  "Explain JWT algorithm confusion vulnerability",
];

export default function AITutorPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RAGResponse | null>(null);

  const handleQuery = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setQuery(searchQuery);
    try {
      const data = await queryRAG(searchQuery, activeCategory === "all" ? undefined : activeCategory);
      setResponse(data);
    } catch (err) {
      console.error("RAG Query error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono selection:bg-emerald-500/30">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400 font-bold mb-3">
                <Cpu size={14} /> FastAPI + Vector RAG Engine
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                AI Cybersecurity <span className="text-emerald-400">RAG Assistant</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Query our vector-indexed cybersecurity knowledge base covering OWASP Top 10 standards, NIST frameworks, network analysis tools, and CTF tactics.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <Zap className="text-emerald-400 h-8 w-8" />
              <div>
                <div className="text-xs text-slate-400">RAG Engine Status</div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active & Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                activeCategory === cat.id
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Query Input Section */}
        <div className="mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuery(query);
            }}
            className="flex gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any cybersecurity question (e.g. Explain SQL Injection mitigation)..."
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-5 py-4 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <Bot className="absolute right-4 top-4 h-5 w-5 text-slate-500" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <span>Query RAG</span>
              <Send size={16} />
            </button>
          </form>

          {/* Suggested Queries */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-bold">Suggested Topics:</span>
            {SUGGESTED_TOPICS.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleQuery(topic)}
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-400 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <Bot className="mx-auto h-10 w-10 text-emerald-400 animate-spin mb-4" />
            <h3 className="text-base font-bold text-slate-200">Processing RAG Embeddings Query</h3>
            <p className="text-xs text-slate-400 mt-1">Retrieving context from OWASP, NIST & Security Knowledge Bases...</p>
          </div>
        )}

        {response && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Response Box */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="text-emerald-400" size={20} />
                    <h2 className="text-base font-bold text-slate-100">Synthesized Security Response</h2>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                    {response.processing_time_ms} ms
                  </span>
                </div>

                <div className="prose prose-invert max-w-none text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {response.answer}
                </div>
              </div>
            </div>

            {/* Citations Column */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-4">
                  <BookOpen size={18} />
                  Retrieved Context ({response.citations.length})
                </h3>

                <div className="space-y-3">
                  {response.citations.map((cite, i) => (
                    <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1">
                        <span>{cite.title}</span>
                        <span className="text-emerald-400 font-mono">{(cite.relevance_score * 100).toFixed(0)}% Match</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-2 font-sans">{cite.source_document}</div>
                      <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed font-mono">
                        "{cite.snippet}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
