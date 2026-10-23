"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Github, Loader2, CheckCircle2 } from "lucide-react";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus({ type: "error", message: "Please enter both email and password." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const result = await loginUser(email, password);
      localStorage.setItem("cyberlearn_token", result.access_token);
      localStorage.setItem("cyberlearn_user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("auth-change"));
      setStatus({ type: "success", message: "Successfully logged in! Redirecting..." });
      setTimeout(() => {
        router.push("/labs");
      }, 800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to log in. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGithubClick = () => {
    setStatus({
      type: "error",
      message: "GitHub sign-in is not configured yet. Please use your email and password.",
    });
  };

  return (
    <div className="grid-bg flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-16">
      <div className="glass w-full max-w-sm rounded-xl p-8">
        <div className="flex items-center gap-2 font-mono text-sm text-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-green/30 bg-green/10 text-green">
            <Terminal size={16} />
          </span>
          CyberLearn<span className="text-green">Hub</span>
        </div>
        <h1 className="mt-6 text-xl font-semibold text-text">Welcome back</h1>
        <p className="mt-1 text-sm text-text-dim">
          Log in to pick up where you left off.
        </p>

        {status && (
          <div
            className={`mt-4 flex items-center gap-2 rounded-md p-3 text-xs font-mono ${
              status.type === "success"
                ? "border border-green/30 bg-green/10 text-green"
                : "border border-severity-critical/30 bg-severity-critical/10 text-severity-critical"
            }`}
          >
            {status.type === "success" && <CheckCircle2 size={14} />}
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
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-mono text-xs text-text-faint">
                Password
              </label>
              <Link href="/forgot-password" className="font-mono text-xs text-text-faint hover:text-green">
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-green py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Log in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-text-faint">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGithubClick}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-border py-2.5 font-mono text-sm text-text transition-colors hover:border-border-hover disabled:opacity-50"
          >
            <Github size={15} /> Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-text-dim">
          New here?{" "}
          <Link href="/register" className="text-green hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
