"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "I've never written a line of code. Can I actually start here?",
    a: "Yes. The Beginner track assumes nothing — it starts with how a computer boots and how files and permissions work before it ever mentions a vulnerability. Most students with zero background reach the Web Security track within 6-8 weeks at a casual pace.",
  },
  {
    q: "Are the labs real vulnerable systems, or just quizzes?",
    a: "Real, intentionally-vulnerable practice applications and virtual machines you interact with over the browser or your own terminal — the same SQL injection, XSS, and misconfiguration classes you'd find in a bug bounty report, in an isolated environment built for learning.",
  },
  {
    q: "Is this legal? Am I 'hacking' anything real?",
    a: "Every lab runs against infrastructure built specifically for this platform, isolated from the public internet. We teach the legal and ethical boundaries (authorization, scope, responsible disclosure) as a required part of the curriculum before any offensive lab unlocks.",
  },
  {
    q: "How is this different from just reading OWASP docs for free?",
    a: "OWASP tells you what a vulnerability is. We put you in front of the vulnerable code, let you break it, show you why the break worked at the query or DOM level, and then have you fix it — with a grader confirming your fix actually holds.",
  },
  {
    q: "Do I get a certificate, and does it mean anything?",
    a: "Yes — each course and each learning path ends in a practical final assessment (not just multiple choice) and issues a verifiable certificate with a public credential ID you can link on LinkedIn or a resume.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="py-5">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-[15px] font-medium text-text">
                {item.q}
              </span>
              <Plus
                size={18}
                className={`shrink-0 text-green transition-transform ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="mt-3 pr-8 text-sm leading-relaxed text-text-dim">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
