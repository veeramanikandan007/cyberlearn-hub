import Link from "next/link";
import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Learning Paths", href: "/learning-paths" },
      { label: "Roadmaps", href: "/roadmaps" },
      { label: "Labs", href: "/labs" },
      { label: "Practice Challenges", href: "/practice-challenges" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Community", href: "/community" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-text">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-green/30 bg-green/10 text-green">
                <Terminal size={16} />
              </span>
              CyberLearn<span className="text-green">Hub</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-dim">
              Learn cybersecurity from zero to professional — real labs,
              real vulnerabilities, real skills.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-dim transition-colors hover:border-green/40 hover:text-green"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-dim transition-colors hover:text-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-text-faint md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} CyberLearn Hub. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
