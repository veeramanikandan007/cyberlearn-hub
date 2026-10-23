import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { pricingPlans } from "@/data/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose a plan that matches your learning goals, from free exploration to team-based training.",
};

export default function PricingPage() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Flexible plans for learners, professionals, and teams"
        description="Start free, upgrade when you want more labs, deeper content, and verifiable credentials."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const isEnterprise = plan.name.toLowerCase().includes("enterprise");
            const href = isEnterprise ? "/contact" : "/register";
            const buttonText = isEnterprise
              ? "Contact Enterprise"
              : plan.highlight
              ? "Start Pro Trial"
              : "Get Started Free";

            return (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-2xl p-8 ${
                  plan.highlight ? "border border-green/30 bg-green/10" : "glass"
                }`}
              >
                <div>
                  <h2 className="text-xl font-semibold text-text">{plan.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-text-dim">{plan.description}</p>
                  <p className="mt-6 text-3xl font-semibold text-text">{plan.price}</p>
                  <ul className="mt-6 space-y-3 text-sm text-text-dim">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4">
                  <Link
                    href={href}
                    className={`flex w-full items-center justify-center gap-2 rounded-md py-3 font-mono text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                      plan.highlight
                        ? "bg-green text-bg shadow-glow"
                        : "border border-border text-text hover:border-border-hover"
                    }`}
                  >
                    {buttonText} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

