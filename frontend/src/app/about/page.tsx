import type { Metadata } from "next";
import { ShieldCheck, Cpu, Network, BookOpenCheck } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Discover CyberLearn Hub's mission, teaching philosophy, and practical approach to cybersecurity education.",
};

const pillars = [
  {
    title: "Hands-on by design",
    body: "Every module is anchored in labs, exercises, and realistic scenarios so concepts become skills instead of memorized definitions.",
    icon: ShieldCheck,
  },
  {
    title: "Learn in order",
    body: "We teach the foundational layers first — computing, networking, Linux, Windows, and scripting — before moving into offensive and defensive security.",
    icon: Cpu,
  },
  {
    title: "Built for real roles",
    body: "Our content is shaped around common security tasks such as SOC monitoring, threat hunting, web application testing, and incident response.",
    icon: Network,
  },
  {
    title: "Professional outcomes",
    body: "Students leave with project work, practical assessments, and verifiable certificates that align with modern job expectations.",
    icon: BookOpenCheck,
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About CyberLearn Hub"
        title="A modern cybersecurity education platform for curious beginners and serious practitioners"
        description="We combine structured instruction, practical labs, and professional-grade content so learners can move from first principles to real-world readiness without feeling lost."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text">How we teach</h2>
            <p className="mt-4 text-sm leading-7 text-text-dim">
              CyberLearn Hub is built around the belief that cybersecurity is a discipline learned through repetition, context, and practice. Students do not simply read about SQL injection or privilege escalation; they study the code, run the lab, interpret the behavior, and then apply the mitigation.
            </p>
            <p className="mt-4 text-sm leading-7 text-text-dim">
              The learning experience is intentionally paced and structured. Beginners start with the basics of computers, networking, and Linux. Intermediate learners build confidence through web security, APIs, cloud, and identity topics. Advanced students tackle threat hunting, binary exploitation, and incident response with guided labs and professional framing.
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-text">What makes the experience different</h2>
            <ul className="mt-5 space-y-3 text-sm text-text-dim">
              <li>• A learning roadmap that reduces overwhelm and keeps momentum high.</li>
              <li>• Practical labs that mirror real security workflows in controlled environments.</li>
              <li>• Content that explains the why behind each topic, not just the how.</li>
              <li>• Certificates and projects that support resumes, interviews, and portfolio growth.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="glass rounded-xl p-6">
                <Icon className="text-green" size={20} />
                <h3 className="mt-4 text-lg font-semibold text-text">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-7 text-text-dim">{pillar.body}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
