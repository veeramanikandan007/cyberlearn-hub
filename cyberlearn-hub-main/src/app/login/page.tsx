import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, Github } from "lucide-react";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
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

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="font-mono text-xs text-text-faint">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
              placeholder="you@example.com"
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
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-green/50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
          >
            Log in
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-text-faint">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border py-2.5 font-mono text-sm text-text hover:border-border-hover">
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
