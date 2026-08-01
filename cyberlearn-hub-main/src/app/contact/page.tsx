import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to CyberLearn Hub for questions about courses, partnerships, or platform support.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Questions, partnerships, and platform support"
        description="Use the form below to get in touch with the team about curriculum, enterprise learning, or technical questions."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text">Reach us</h2>
            <p className="mt-4 text-sm leading-7 text-text-dim">Email us at hello@cyberlearnhub.example.com for support, curriculum questions, or enterprise partnerships.</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <form className="space-y-4">
              <div>
                <label className="font-mono text-xs text-text-faint">Name</label>
                <input className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text" />
              </div>
              <div>
                <label className="font-mono text-xs text-text-faint">Email</label>
                <input className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text" />
              </div>
              <div>
                <label className="font-mono text-xs text-text-faint">Message</label>
                <textarea rows={5} className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text" />
              </div>
              <button className="rounded-md bg-green px-5 py-2.5 font-mono text-sm font-semibold text-bg">Send message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
