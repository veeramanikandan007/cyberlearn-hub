import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile details, interests, and study preferences in CyberLearn Hub.",
};

export default function ProfilePage() {
  return (
    <div>
      <PageHero
        eyebrow="Profile"
        title="Keep your learning identity up to date"
        description="Customize your profile so your learning journey stays aligned with your goals and preferred focus areas."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
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
