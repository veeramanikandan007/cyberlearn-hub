import Link from "next/link";
import { Terminal, Menu } from "lucide-react";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/labs", label: "Labs" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-green/30 bg-green/10 text-green">
            <Terminal size={16} strokeWidth={2.2} />
          </span>
          <span>
            CyberLearn<span className="text-green">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-mono text-[13px] text-text-dim transition-colors hover:text-green"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="font-mono text-[13px] text-text-dim transition-colors hover:text-text"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-green px-4 py-2 font-mono text-[13px] font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-glow"
          >
            Start learning
          </Link>
        </div>

        <button
          className="rounded-md border border-border p-2 text-text-dim md:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
