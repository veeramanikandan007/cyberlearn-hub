import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { dashboardStats } from "@/data/site";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor your progress, streak, certificates, and current learning goals in one place.",
};

export default function DashboardPage() {
  return (
    <div>
      <PageHero
        eyebrow="Student dashboard"
        title="Track your mastery, your streak, and your next milestone"
        description="The dashboard keeps your learning momentum visible with XP, badges, active courses, and certificates."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {dashboardStats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-faint">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold text-text">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text">Current learning path</h2>
            <p className="mt-3 text-sm leading-7 text-text-dim">You are 68% of the way through the Zero to Security Analyst track, with Python automation and networking labs next on your list.</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text">Weekly goals</h2>
            <ul className="mt-4 space-y-3 text-sm text-text-dim">
              <li>• Finish one Linux lab</li>
              <li>• Complete one quiz review</li>
              <li>• Read one new article</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
