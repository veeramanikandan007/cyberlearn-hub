import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the CyberLearn Hub platform and learning community.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero eyebrow="Terms" title="Platform terms and usage expectations" description="These terms define how users may access content, participate in labs, and interact with the platform responsibly." />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass rounded-2xl p-8 text-sm leading-7 text-text-dim">
          <p>By using CyberLearn Hub, you agree to use the platform for educational purposes only and to respect the boundaries of each lab environment. You may not attempt to target systems outside the authorized practice scope. All content is intended to support safe, legal learning and professional development.</p>
        </div>
      </section>
    </div>
  );
}
