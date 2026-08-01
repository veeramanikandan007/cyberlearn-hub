import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, FlaskConical, Award } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";
import Quiz from "@/components/Quiz";
import type { QuizQuestion } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Security Headers & Defense in Depth",
  description:
    "CSP, HSTS, and the HTTP security headers that contain a successful injection instead of letting it become a full breach.",
};

const questions: QuizQuestion[] = [
  {
    question:
      "You've already fixed the stored XSS in your comment box with proper output encoding. Why would you still add a Content-Security-Policy header?",
    options: [
      "CSP replaces the need to fix the XSS in the first place",
      "It's required by law in every jurisdiction",
      "Defense in depth — CSP limits the damage of the XSS bugs you haven't found yet, including in third-party scripts you don't control",
      "It makes the page load faster",
    ],
    correctIndex: 2,
    explanation:
      "Fixing a known bug doesn't protect against unknown ones. A strict CSP means that even if a future XSS bug slips through, injected scripts typically can't execute or exfiltrate data, because the browser refuses to run unauthorized script sources.",
  },
  {
    question:
      "What does `Strict-Transport-Security: max-age=31536000; includeSubDomains` actually do?",
    options: [
      "Encrypts the database at rest",
      "Tells the browser to only ever connect to this domain (and subdomains) over HTTPS for the next year, even if the user types http://",
      "Blocks all cross-origin requests",
      "Forces users to log in again every year",
    ],
    correctIndex: 1,
    explanation:
      "HSTS closes the window for SSL-stripping attacks: once a browser has seen this header, it rewrites any future http:// request to https:// automatically, before a single byte goes over an insecure connection.",
  },
  {
    question:
      "What's the risk of setting `X-Content-Type-Options: nosniff` incorrectly (or leaving it off)?",
    options: [
      "The server becomes slower",
      "Browsers may MIME-sniff a file's content type instead of trusting the declared Content-Type, letting an uploaded file (e.g. disguised as an image) be interpreted and executed as HTML/JS",
      "Cookies stop working entirely",
      "The site becomes uncrawlable by search engines",
    ],
    correctIndex: 1,
    explanation:
      "Without nosniff, a browser might decide a file 'looks like' HTML regardless of its declared type and render it as such — turning a file upload feature into a stored XSS vector.",
  },
  {
    question:
      "A response includes `Set-Cookie: session=abc123` with no other attributes. What's missing that matters most for a session cookie?",
    options: [
      "Nothing — this is the correct, complete way to set a cookie",
      "`HttpOnly` (blocks JS access, limiting XSS impact), `Secure` (HTTPS only), and `SameSite` (limits cross-site sending, reducing CSRF risk)",
      "A larger max-age so users stay logged in longer",
      "A shorter cookie name for performance",
    ],
    correctIndex: 1,
    explanation:
      "Without HttpOnly, any XSS bug can read the session cookie directly via document.cookie and exfiltrate it — turning a script-injection bug into full account takeover. This is the single most common way this course's Module 1 and Module 2 vulnerabilities become account-takeover incidents in the real world.",
  },
];

export default function SecureHeadersLesson() {
  return (
    <div>
      <div className="border-b border-border bg-white/[0.015]">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Link
            href="/courses/web-application-security"
            className="flex items-center gap-1.5 font-mono text-xs text-text-faint hover:text-text-dim"
          >
            <ArrowLeft size={13} /> Web Application Security Fundamentals
          </Link>
          <div className="mt-3 font-mono text-xs text-text-faint">
            Module 03 · Lesson 1 of 1 · 2h 15m
          </div>
          <h1 className="mt-2 text-3xl font-bold text-text">
            Security Headers &amp; Defense in Depth
          </h1>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <section>
          <h2 className="text-xl font-semibold text-text">
            Why this module exists
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            Modules 1 and 2 fixed two specific bugs. This module assumes
            you'll ship another bug you haven't thought of yet — because
            everyone does — and asks: what configuration turns that future
            bug into a non-event instead of a breach? That's defense in
            depth: layers that hold even when one layer fails.
          </p>
        </section>

        <section className="mt-10">
          <h3 className="font-semibold text-text">
            Content-Security-Policy (CSP)
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            CSP tells the browser which sources of scripts, styles, and
            other resources are allowed to load and execute on your page.
            Even if an attacker manages to inject a{" "}
            <code className="font-mono text-text">&lt;script&gt;</code> tag,
            a correctly configured CSP makes the browser refuse to run it.
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="a reasonably strict starting policy"
            code={`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{randomPerRequest}';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';`}
          />
        </div>

        <Callout type="warning">
          <code className="font-mono">script-src 'unsafe-inline'</code> is
          the most common way teams accidentally neutralize their own CSP —
          it re-allows exactly the inline `&lt;script&gt;` injection CSP
          exists to stop. Use a per-request nonce or hash instead of
          reaching for 'unsafe-inline' to make an inline script work.
        </Callout>

        <section className="mt-10">
          <h3 className="font-semibold text-text">
            HTTP Strict Transport Security (HSTS)
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            Without HSTS, a user's very first request to your site — before
            any redirect fires — can go out over plain HTTP, giving a
            network attacker (public Wi-Fi, a compromised router) a window
            to intercept or downgrade the connection. HSTS closes that
            window for every subsequent visit.
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            code={`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`}
          />
        </div>

        <section className="mt-10">
          <h3 className="font-semibold text-text">
            X-Content-Type-Options &amp; cookie attributes
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            Two smaller headers that close specific, well-understood gaps:
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            code={`X-Content-Type-Options: nosniff

Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict`}
          />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-text-dim">
          <code className="font-mono text-text">HttpOnly</code> is the one
          worth memorizing: it's what stands between "attacker found an XSS
          bug" and "attacker has your users' session tokens." Without it,
          the fixes in Modules 1 and 2 are the only thing standing between
          a bug and an account takeover. With it, a stray XSS bug can still
          deface a page — but it can't silently steal sessions via{" "}
          <code className="font-mono text-text">document.cookie</code>.
        </p>

        {/* Lab walkthrough */}
        <section className="mt-16 rounded-xl border border-green/20 bg-green/[0.03] p-6 md:p-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-green">
            <FlaskConical size={14} /> Hands-on lab
          </div>
          <h2 className="mt-3 text-xl font-semibold text-text">
            Lab: Harden the practice app's response headers
          </h2>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-text-dim">
            <li>
              <strong className="text-text">1. Audit.</strong> The lab
              dashboard shows the current response headers from the
              practice app — note that CSP is absent and the session cookie
              has no HttpOnly flag.
            </li>
            <li>
              <strong className="text-text">2. Reproduce impact.</strong>{" "}
              Reuse the stored XSS payload from Module 2. Confirm that with
              no HttpOnly flag, `document.cookie` returns the live session
              token inside the injected script's execution context.
            </li>
            <li>
              <strong className="text-text">3. Harden.</strong> In the
              config editor, add the CSP, HSTS, nosniff, and cookie
              attribute changes from this lesson.
            </li>
            <li>
              <strong className="text-text">4. Re-verify.</strong> Re-run
              the same XSS payload. The grader confirms the script no longer
              executes (CSP) and, as a fallback check, that{" "}
              <code className="font-mono">document.cookie</code> no longer
              exposes the session token even if a script did run.
            </li>
          </ol>
        </section>

        <section className="mt-16">
          <Quiz title="Security Headers" questions={questions} />
        </section>

        {/* Course completion */}
        <section className="mt-16 rounded-xl border border-purple/25 bg-purple/[0.05] p-6 md:p-8 text-center">
          <Award size={28} className="mx-auto text-purple" />
          <h2 className="mt-3 text-xl font-semibold text-text">
            Final assessment unlocked
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-dim">
            You've completed all three modules. The practical final exam
            combines all three vulnerability classes in one unfamiliar
            application — pass it to earn your Web Application Security
            Fundamentals certificate.
          </p>
          <Link
            href="/courses/web-application-security"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-purple px-6 py-3 font-mono text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Take the final assessment <ArrowRight size={15} />
          </Link>
        </section>

        <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/courses/web-application-security/lessons/cross-site-scripting"
            className="flex items-center gap-1.5 font-mono text-sm text-text-dim hover:text-text"
          >
            <ArrowLeft size={14} /> Cross-Site Scripting
          </Link>
          <Link
            href="/courses/web-application-security"
            className="flex items-center gap-1.5 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-text hover:border-border-hover"
          >
            Back to course overview
          </Link>
        </nav>
      </article>
    </div>
  );
}
