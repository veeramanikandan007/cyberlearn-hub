import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pricingPlans } from "@/data/site";

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
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlight ? "border border-green/30 bg-green/10" : "glass"}`}>
              <h2 className="text-xl font-semibold text-text">{plan.name}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{plan.description}</p>
              <p className="mt-6 text-3xl font-semibold text-text">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-text-dim">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green" />{feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
