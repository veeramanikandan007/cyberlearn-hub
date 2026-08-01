import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <div className="grid-bg flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-16">
      <div className="glass w-full max-w-sm rounded-xl p-8">
        <h1 className="text-xl font-semibold text-text">Reset your password</h1>
        <p className="mt-1 text-sm text-text-dim">
          We'll email you a link to set a new one.
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
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
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
