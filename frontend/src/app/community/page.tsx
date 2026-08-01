import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { communityHighlights } from "@/data/site";

export const metadata: Metadata = {
  title: "Community",
  description: "Join a supportive cybersecurity community with live study rooms, discussions, and announcements.",
};

export default function CommunityPage() {
  return (
    <div>
      <PageHero
        eyebrow="Community"
        title="Connect with learners, mentors, and practitioners around the world"
        description="Community forums and live study sessions turn isolated practice into a shared growth experience."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {communityHighlights.map((item) => (
            <div key={item.title} className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-text">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
