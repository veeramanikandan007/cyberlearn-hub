"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { User, Mail, ShieldCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cyberlearn_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cyberlearn_user");
    localStorage.removeItem("cyberlearn_token");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  return (
    <div>
      <PageHero
        eyebrow="Profile"
        title="Keep your learning identity up to date"
        description="Customize your profile so your learning journey stays aligned with your goals and preferred focus areas."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 space-y-8">
        {/* User Identity Card */}
        <div className="glass rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-emerald-500/20 bg-slate-900/60">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xl font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                {user?.name || "Guest Learner"}
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
                  Active Student
                </span>
              </h2>
              <p className="text-sm text-text-dim flex items-center gap-1.5 mt-1 font-mono">
                <Mail size={14} /> {user?.email || "guest@cyberlearnhub.example.com"}
              </p>
            </div>
          </div>

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 font-mono text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all"
            >
              <LogOut size={15} /> Log out of Account
            </button>
          )}
        </div>

        {/* Learning Preferences */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-text">Learning preferences</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Primary focus", "Web application security"],
              ["Preferred difficulty", "Intermediate"],
              ["Learning pace", "3 sessions per week"],
              ["Notification frequency", "Daily"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-border/70 bg-black/20 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-faint">{label}</p>
                <p className="mt-2 text-sm text-text">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
