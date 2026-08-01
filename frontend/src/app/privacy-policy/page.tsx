import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CyberLearn Hub handles student data, account information, and learning activity.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero eyebrow="Privacy policy" title="Protection, transparency, and responsible handling of learner data" description="CyberLearn Hub is committed to safeguarding learner information and keeping the platform privacy-conscious by design." />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass rounded-2xl p-8 text-sm leading-7 text-text-dim">
          <p>We collect the minimum information needed to create your account, track your progress, and provide a personalized learning experience. This may include your name, email address, authentication details, course progress, and preferences. We do not sell your data and only use it to improve product stability, delivery of educational content, and account support.</p>
        </div>
      </section>
    </div>
  );
}
