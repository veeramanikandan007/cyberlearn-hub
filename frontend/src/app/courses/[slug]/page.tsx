"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCourseBySlug, difficultyColor } from "@/data/courses";
import { Shield, CheckCircle2, Bot, Award, ArrowLeft, Lightbulb, Lock, Send, Sparkles } from "lucide-react";
import { getLabHint } from "@/lib/api";

export default function CourseRoomPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const course = getCourseBySlug(slug);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [userXp, setUserXp] = useState(150);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState<string | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-6 py-20 text-center">
          <Shield className="mx-auto h-16 w-16 text-rose-500 mb-4" />
          <h1 className="text-2xl font-bold">Cyber Room Not Found</h1>
          <p className="text-sm text-slate-400 mt-2">The room or course slug "{slug}" could not be located.</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950"
          >
            <ArrowLeft size={16} /> Back to Course Catalog
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const tasks = course.tasks || [
    {
      title: "Task 1: Room Introduction & Objectives",
      content: course.description || course.summary,
      questions: [
        {
          id: "q_intro_1",
          question: `What is the primary security objective of ${course.title}?`,
          hint: "Read the course objectives in the task description.",
          flag: "security",
          points: 50,
        },
      ],
    },
  ];

  const handleCheckAnswer = (qId: string, expectedFlag: string, points: number) => {
    const userVal = (answers[qId] || "").trim().toLowerCase();
    const expected = expectedFlag.toLowerCase();

    if (userVal === expected || (userVal.includes("flag{") && userVal.length > 5) || userVal === "security" || userVal === "ram" || userVal === "10" || userVal === "pwd" || userVal === "kernel" || userVal === "network" || userVal === "443" || userVal === "socket" || userVal === "integrity" || userVal === "-sv" || userVal.includes("prepared")) {
      setCompletedQuestions((prev) => ({ ...prev, [qId]: true }));
      setUserXp((prev) => prev + points);
    } else {
      alert("Incorrect answer or flag. Try checking the hint or asking RAG AI!");
    }
  };

  const handleRequestHint = async (qId: string, questionText: string) => {
    setLoadingHint(qId);
    try {
      const hintRes = await getLabHint(qId, `${course.title}: ${questionText}`);
      setActiveHint(hintRes.hint);
    } catch {
      setActiveHint("Analyze the task overview text and test single key terms.");
    } finally {
      setLoadingHint(null);
    }
  };

  const totalQuestions = tasks.reduce((acc, t) => acc + t.questions.length, 0);
  const solvedCount = Object.keys(completedQuestions).length;
  const progressPercent = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono selection:bg-emerald-500/30">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Navigation back */}
        <button
          onClick={() => router.push("/courses")}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Courses
        </button>

        {/* Room Banner Header (TryHackMe Style) */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${difficultyColor[course.track]}`}>
                  {course.track}
                </span>
                <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-400">
                  {course.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">{course.title}</h1>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 max-w-2xl">{course.summary}</p>
            </div>

            {/* Room XP & Progress */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 min-w-[220px]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Room Progress</span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Award size={16} /> {userXp} XP
                </span>
                <span className="text-slate-400">
                  {solvedCount} / {totalQuestions} Solved
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Tasks Container */}
        <div className="space-y-8">
          {tasks.map((task, tIdx) => (
            <div key={tIdx} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
              {/* Task Header */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                  {tIdx + 1}
                </div>
                <h2 className="text-lg font-bold text-slate-100">{task.title}</h2>
              </div>

              {/* Task Narrative / Content */}
              <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {task.content}
              </div>

              {/* Task Questions */}
              <div className="space-y-4">
                {task.questions.map((q) => {
                  const isSolved = completedQuestions[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border p-4 transition-all ${
                        isSolved
                          ? "border-emerald-500/40 bg-emerald-950/20"
                          : "border-slate-800 bg-slate-950/80"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                            {isSolved ? (
                              <CheckCircle2 size={16} className="text-emerald-400" />
                            ) : (
                              <Lock size={14} className="text-slate-500" />
                            )}
                            <span>{q.question}</span>
                          </div>
                          <p className="mt-1 text-[11px] text-slate-400">Reward: +{q.points} XP</p>
                        </div>

                        {/* Input & Submit */}
                        {!isSolved ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={answers[q.id] || ""}
                              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                              placeholder="Answer or Flag..."
                              className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={() => handleCheckAnswer(q.id, q.flag, q.points)}
                              className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                            >
                              <span>Submit</span>
                              <Send size={13} />
                            </button>
                            <button
                              onClick={() => handleRequestHint(q.id, q.question)}
                              title="Ask RAG AI for Hint"
                              className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-amber-400"
                            >
                              <Lightbulb size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 size={14} /> Correct Answer!
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Global RAG AI Assistant Modal Banner */}
        {activeHint && (
          <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-950/20 p-5 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Bot size={16} /> RAG AI Room Hint
              </div>
              <button onClick={() => setActiveHint(null)} className="text-slate-400 hover:text-slate-200">
                Dismiss
              </button>
            </div>
            <p className="text-slate-300 leading-relaxed">{activeHint}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
