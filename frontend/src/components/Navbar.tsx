"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/team", label: "Team" },
  { href: "/experiment-1", label: "Exp 1: Image Map" },
  { href: "/ai-tutor", label: "AI Tutor (RAG)" },
  { href: "/courses", label: "Courses" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/labs", label: "Labs" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
];

export interface UserSession {
  name: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  const checkUserSession = () => {
    try {
      const stored = localStorage.getItem("cyberlearn_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserSession();
    const handleAuthChange = () => checkUserSession();
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cyberlearn_user");
    localStorage.removeItem("cyberlearn_token");
    window.dispatchEvent(new Event("auth-change"));
    setUser(null);
    setIsMenuOpen(false);
    router.push("/");
  };

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

        {/* Right Navigation Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 font-mono text-[13px] text-text-dim transition-colors hover:text-text"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-md border border-green/30 bg-green/10 px-3 py-1.5 font-mono text-[13px] font-medium text-green transition-colors hover:bg-green/20"
              >
                <User size={14} />
                <span>{user.name || "Student Profile"}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-md border border-border p-2 font-mono text-[13px] text-text-dim transition-colors hover:border-red-500/40 hover:text-red-400"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-md border border-border p-2 text-text-dim transition-colors hover:border-border-hover hover:text-text md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="border-b border-border bg-bg/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 font-mono text-sm">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-1.5 text-text-dim transition-colors hover:text-green"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2.5 border-t border-border pt-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-md border border-border py-2 text-text-dim transition-colors hover:text-text"
                  >
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-md border border-green/30 bg-green/10 py-2 font-semibold text-green"
                  >
                    <User size={15} /> {user.name || "My Profile"}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 py-2 text-red-400"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md border border-border py-2 text-center text-text-dim transition-colors hover:border-border-hover hover:text-text"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md bg-green py-2 text-center font-semibold text-bg transition-transform hover:-translate-y-0.5"
                  >
                    Start learning
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

