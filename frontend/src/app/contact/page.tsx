"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({
      type: "error",
      message: "Message delivery is not configured yet. Your message has not been sent.",
    });
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Questions, partnerships, and platform support"
        description="Use the form below to get in touch with the team about curriculum, enterprise learning, or technical questions."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text">Reach us</h2>
            <p className="mt-4 text-sm leading-7 text-text-dim">Email us at hello@cyberlearnhub.example.com for support, curriculum questions, or enterprise partnerships.</p>
          </div>
          <div className="glass rounded-2xl p-8">
            {status && (
              <div
                className={`mb-4 flex items-center gap-2 rounded-md p-3 text-xs font-mono ${
                  status.type === "success"
                    ? "border border-green/30 bg-green/10 text-green"
                    : "border border-severity-critical/30 bg-severity-critical/10 text-severity-critical"
                }`}
              >
                <span>{status.message}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-text-faint">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-xs text-text-faint">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-xs text-text-faint">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md bg-green px-5 py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-50"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
