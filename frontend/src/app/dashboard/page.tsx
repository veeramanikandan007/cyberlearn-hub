"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Award, Terminal, Zap, BookOpen, Flame, ArrowRight, CheckCircle2 } from "lucide-react";
import { courses } from "@/data/courses";

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ email: "user@cyberlearn.com", name: "Cyber Learner", role: "student" });
      }
    } else {
      setUser({ email: "user@cyberlearn.com", name: "Cyber Learner", role: "student" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono selection:bg-emerald-500/30">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* User Welcome Header */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/50 p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold text-xl shadow-lg shadow-emerald-500/10">
                <Shield size={28} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-bold text-emerald-400 mb-1">
                  <Zap size={13} /> Level 3 Cyber Defender
                </div>
                <h1 className="text-2xl font-bold text-slate-100">
                  Welcome, <span className="text-emerald-400">{user?.name || "Cyber Learner"}</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">{user?.email || "user@cyberlearn.com"}</p>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-center min-w-[110px]">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Award size={14} className="text-amber-400" /> Total XP
                </div>
                <div className="text-lg font-bold text-amber-400 mt-1">450 XP</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-center min-w-[110px]">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Flame size={14} className="text-rose-400" /> Day Streak
                </div>
                <div className="text-lg font-bold text-rose-400 mt-1">5 Days</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-center min-w-[110px]">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Solved
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-1">4 Rooms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths & Beginner Rooms Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="text-emerald-400" size={18} />
              Recommended Beginner Cyber Rooms
            </h2>
            <Link href="/courses" className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {courses.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="glass group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-glow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-400 font-semibold">
                      {c.track}
                    </span>
                    <span className="text-slate-400 font-mono">{c.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {c.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Enter Cyber Room</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
