"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({
      type: "error",
      message: "Password reset email delivery is not configured yet. No reset link was sent.",
    });
  };

  return (
    <div className="grid-bg flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-16">
      <div className="glass w-full max-w-sm rounded-xl p-8">
        <h1 className="text-xl font-semibold text-text">Reset your password</h1>
        <p className="mt-1 text-sm text-text-dim">
          We'll email you a link to set a new one.
        </p>

        {status && (
          <div
            className={`mt-4 flex items-center gap-2 rounded-md p-3 text-xs font-mono ${
              status.type === "success"
                ? "border border-green/30 bg-green/10 text-green"
                : "border border-severity-critical/30 bg-severity-critical/10 text-severity-critical"
            }`}
          >
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="font-mono text-xs text-text-faint">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-green py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-50"
          >
            Send reset link
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-text-dim">
          <Link href="/login" className="text-green hover:underline">
            Back to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
