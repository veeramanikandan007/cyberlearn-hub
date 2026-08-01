"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function Quiz({
  title,
  questions,
}: {
  title: string;
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const score = answers.filter(
    (a, i) => a === questions[i].correctIndex
  ).length;

  function select(qIndex: number, oIndex: number) {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = oIndex;
    setAnswers(next);
  }

  function reset() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="glass rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm uppercase tracking-wider text-blue">
          Knowledge check — {title}
        </h3>
        {submitted && (
          <span className="font-mono text-sm text-text-dim">
            Score:{" "}
            <span className={score === questions.length ? "text-green" : "text-severity-medium"}>
              {score}/{questions.length}
            </span>
          </span>
        )}
      </div>

      <div className="mt-6 space-y-8">
        {questions.map((q, qi) => {
          const userAnswer = answers[qi];
          return (
            <div key={qi}>
              <p className="text-[15px] font-medium text-text">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = userAnswer === oi;
                  const isCorrect = oi === q.correctIndex;
                  let style =
                    "border-border text-text-dim hover:border-border-hover";
                  if (submitted && isSelected && isCorrect) {
                    style = "border-green/50 bg-green/10 text-text";
                  } else if (submitted && isSelected && !isCorrect) {
                    style = "border-severity-critical/50 bg-severity-critical/10 text-text";
                  } else if (submitted && isCorrect) {
                    style = "border-green/50 bg-green/5 text-text";
                  } else if (isSelected) {
                    style = "border-blue/50 bg-blue/10 text-text";
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={submitted}
                      className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && (
                        <CheckCircle2 size={16} className="text-green" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle size={16} className="text-severity-critical" />
                      )}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-2 text-sm leading-relaxed text-text-dim">
                  <span className="font-medium text-text">Why: </span>
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        {!submitted ? (
          <button
            disabled={!allAnswered}
            onClick={() => setSubmitted(true)}
            className="rounded-md bg-green px-5 py-2.5 font-mono text-sm font-semibold text-bg transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            Submit answers
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-text transition-colors hover:border-border-hover"
          >
            <RotateCcw size={14} /> Retry
          </button>
        )}
      </div>
    </div>
  );
}
