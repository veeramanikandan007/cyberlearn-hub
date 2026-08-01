"use client";

import { useEffect, useState } from "react";

const LINES = [
  { prompt: "$", text: "whoami", delay: 0 },
  { prompt: ">", text: "guest — access level: none", delay: 400, dim: true },
  { prompt: "$", text: "cat career-path.txt", delay: 900 },
  {
    prompt: ">",
    text: "networking → linux → web security → red team",
    delay: 1300,
    dim: true,
  },
  { prompt: "$", text: "./cyberlearn-hub --enroll", delay: 1900 },
  {
    prompt: ">",
    text: "access level upgraded: student",
    delay: 2400,
    accent: true,
  },
];

export default function TerminalHero() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisible((v) => Math.max(v, i + 1)), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="glass w-full max-w-md overflow-hidden rounded-xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-severity-critical/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-severity-medium/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-severity-low/70" />
        <span className="ml-3 font-mono text-[11px] text-text-faint">
          student@cyberlearnhub:~
        </span>
      </div>
      <div className="min-h-[220px] p-5 font-mono text-[13px] leading-relaxed">
        {LINES.slice(0, visible).map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-green">{line.prompt}</span>
            <span
              className={
                line.accent
                  ? "text-green"
                  : line.dim
                    ? "text-text-dim"
                    : "text-text"
              }
            >
              {line.text}
              {i === visible - 1 && <span className="caret" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
