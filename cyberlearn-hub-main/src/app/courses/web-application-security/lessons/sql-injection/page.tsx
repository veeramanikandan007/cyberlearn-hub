import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, FlaskConical } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";
import Quiz from "@/components/Quiz";
import type { QuizQuestion } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "SQL Injection",
  description:
    "How SQL injection happens at the query-construction level, classic vs blind injection, and how parameterized queries actually fix it.",
};

const questions: QuizQuestion[] = [
  {
    question:
      "Why does string-concatenating user input into a SQL query create a vulnerability?",
    options: [
      "Because SQL databases are inherently insecure by design",
      "Because the input can contain characters the database interprets as query syntax instead of data",
      "Because SQL queries run faster with concatenation, which attackers can exploit",
      "Because the web server logs the query in plaintext",
    ],
    correctIndex: 1,
    explanation:
      "The database can't tell the difference between 'data the developer intended' and 'syntax the attacker snuck in' once they're concatenated into the same string — the input is parsed as part of the query structure itself.",
  },
  {
    question:
      "A login form is vulnerable to SQL injection. Which input in the username field would most likely bypass authentication on a naive query like `SELECT * FROM users WHERE username = '<input>' AND password = '<input2>'`?",
    options: [
      "admin123",
      "' OR '1'='1' -- ",
      "<script>alert(1)</script>",
      "../../etc/passwd",
    ],
    correctIndex: 1,
    explanation:
      "This closes the username string early, adds a condition that's always true (`'1'='1'`), and comments out the rest of the query (`--`) so the password check never runs.",
  },
  {
    question:
      "What makes 'blind' SQL injection different from classic SQL injection?",
    options: [
      "Blind injection only works on blind (visually impaired) users",
      "Blind injection can't extract any data at all",
      "The application doesn't display query output or errors directly, so data is inferred through true/false or timing behavior",
      "Blind injection only works over HTTPS",
    ],
    correctIndex: 2,
    explanation:
      "With no visible output, an attacker asks the database yes/no questions (boolean-based) or measures response delays (time-based) to extract data one bit or character at a time.",
  },
  {
    question:
      "What's the actual fix for SQL injection — not a mitigation, the fix?",
    options: [
      "Blocklisting dangerous keywords like SELECT, DROP, and UNION",
      "Escaping single quotes in user input before concatenating",
      "Using parameterized queries / prepared statements so input is always sent as data, never as query structure",
      "Hiding SQL error messages from the user",
    ],
    correctIndex: 2,
    explanation:
      "Parameterized queries send the query structure and the data in separate channels to the database driver — the input is never parsed as SQL syntax, regardless of what characters it contains. Escaping and blocklists are brittle and routinely bypassed.",
  },
];

export default function SqlInjectionLesson() {
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
            Module 01 · Lesson 1 of 1 · 2h 10m
          </div>
          <h1 className="mt-2 text-3xl font-bold text-text">
            SQL Injection
          </h1>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <section>
          <h2 className="text-xl font-semibold text-text">
            What's actually happening
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            SQL injection isn't really about "bad characters." It's about a
            confusion of trust: a database driver receives one string and
            treats all of it as SQL — both the parts the developer wrote and
            the parts a user typed into a form. If those two things get
            concatenated together before the database ever sees them, the
            database has no way to know where "the query" ends and "the
            data" begins.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            Here's the vulnerable pattern, in a login check that looks
            reasonable at a glance:
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="vulnerable — string concatenation"
            code={`const query = "SELECT id, role FROM users " +
  "WHERE username = '" + username + "' " +
  "AND password = '" + password + "'";

const result = await db.query(query);`}
          />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-text-dim">
          If a legitimate user submits <code className="font-mono text-text">alice</code> and
          <code className="font-mono text-text"> hunter2</code>, the final
          query looks exactly like the developer intended. But nothing stops
          the username field from containing SQL syntax of its own:
        </p>

        <div className="mt-6">
          <CodeBlock
            label="what the database actually receives"
            code={`SELECT id, role FROM users
WHERE username = '' OR '1'='1' -- '
AND password = 'anything'`}
          />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-text-dim">
          The <code className="font-mono text-text">--</code> starts a SQL
          comment, so everything after it — including the password check —
          is discarded. <code className="font-mono text-text">'1'='1'</code>{" "}
          is always true, so the <code className="font-mono text-text">WHERE</code>{" "}
          clause matches every row in the table. The query doesn't error.
          It just quietly returns the first user in the database — often an
          administrator, because admin accounts are frequently created
          first.
        </p>

        <Callout type="note">
          This exact payload is decades old and every security scanner
          checks for it. Real attacks today are rarely this obvious — but
          the underlying mechanism (input parsed as syntax) hasn't changed
          since it was first documented in 1998.
        </Callout>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Classic vs. blind injection
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            <strong className="text-text">Classic (in-band) injection</strong>{" "}
            happens when the application reflects query results or database
            errors straight back to the user — an attacker can read stolen
            data directly in the response.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            <strong className="text-text">Blind injection</strong> is what
            you'll actually face most often, because most production apps
            don't leak raw errors. The app gives no visible signal about
            what the query returned — so the attacker asks yes/no questions
            instead of reading data directly:
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="boolean-based blind injection — is the DB version > 8?"
            code={`username=admin' AND (SELECT SUBSTRING(@@version,1,1))='8' -- `}
          />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-text-dim">
          If the page behaves differently for a true condition than a false
          one — a different redirect, a "welcome back" vs. an error — that
          difference is enough to extract data one character at a time,
          automatically, across thousands of requests. When there's no
          visible difference at all, attackers fall back to{" "}
          <strong className="text-text">time-based</strong> injection:
          asking the database to <code className="font-mono text-text">SLEEP(5)</code>{" "}
          only if a condition is true, and measuring the response time.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            The real fix: parameterized queries
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            Escaping quotes or blocklisting keywords like{" "}
            <code className="font-mono text-text">DROP</code> or{" "}
            <code className="font-mono text-text">UNION</code> are patches,
            not fixes — both have well-documented bypasses (alternate
            encodings, case variation, comments splitting keywords). The
            actual fix separates the query structure from the data at the
            protocol level, so user input is never parsed as SQL no matter
            what it contains:
          </p>
        </section>

        <div className="mt-6">
          <CodeBlock
            label="fixed — parameterized query"
            code={`const query =
  "SELECT id, role FROM users WHERE username = $1 AND password = $2";

const result = await db.query(query, [username, password]);
// username and password are sent as data, over a separate channel —
// the database will never interpret them as SQL syntax.`}
          />
        </div>

        <Callout type="tip">
          Every mainstream database driver supports parameterized queries or
          an ORM that generates them for you (Prisma, SQLAlchemy,
          ActiveRecord). If you find yourself building a query string with{" "}
          <code className="font-mono">+</code> or an f-string next to user
          input, stop — that's the exact pattern this lesson just broke.
        </Callout>

        {/* Lab walkthrough */}
        <section className="mt-16 rounded-xl border border-green/20 bg-green/[0.03] p-6 md:p-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-green">
            <FlaskConical size={14} /> Hands-on lab
          </div>
          <h2 className="mt-3 text-xl font-semibold text-text">
            Lab: Bypass a login form in the practice environment
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-dim">
            The lab environment (launched from your dashboard) spins up an
            isolated, intentionally-vulnerable login page seeded with sample
            accounts — no real user data, no external network access.
          </p>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-text-dim">
            <li>
              <strong className="text-text">1. Recon.</strong> Submit a
              single quote (<code className="font-mono">'</code>) alone in
              the username field. If the app returns a database error
              instead of "invalid login," that's a strong signal the input
              reaches a query unsanitized.
            </li>
            <li>
              <strong className="text-text">2. Confirm the bypass.</strong>{" "}
              Try <code className="font-mono">' OR '1'='1' -- </code> as the
              username with any password. Note whether you land on an
              authenticated page.
            </li>
            <li>
              <strong className="text-text">3. Identify the account.</strong>{" "}
              Check which user you're logged in as — the lab grader checks
              specifically that you land on the <em>admin</em> account, not
              just any account, to confirm you understand row ordering.
            </li>
            <li>
              <strong className="text-text">4. Fix it.</strong> Switch to
              the code editor tab and replace the vulnerable query with a
              parameterized one. Re-run the grader — it re-attempts the same
              payload and confirms the login now correctly fails.
            </li>
          </ol>
          <Callout type="warning">
            Only run these payloads against the lab environment or systems
            you're explicitly authorized to test. Running this against a
            real, non-consenting system is illegal in most jurisdictions —
            that boundary is covered in full in the Ethics & Legality
            module before offensive labs unlock on your account.
          </Callout>
        </section>

        <section className="mt-16">
          <Quiz title="SQL Injection" questions={questions} />
        </section>

        <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/courses/web-application-security"
            className="flex items-center gap-1.5 font-mono text-sm text-text-dim hover:text-text"
          >
            <ArrowLeft size={14} /> Course overview
          </Link>
          <Link
            href="/courses/web-application-security/lessons/cross-site-scripting"
            className="flex items-center gap-1.5 rounded-md bg-green px-5 py-2.5 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
          >
            Next: Cross-Site Scripting <ArrowRight size={14} />
          </Link>
        </nav>
      </article>
    </div>
  );
}
