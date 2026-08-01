import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Certificates",
  description: "View your earned certificates and the practical projects that support them.",
};

export default function CertificatesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Certificates"
        title="Earn verifiable recognition for practical work"
        description="Certificates are granted upon project completion, assessment performance, and demonstrated mastery."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["Web Application Security Fundamentals", "Issued on 14 June 2026"],
            ["Linux Fundamentals for Security", "Issued on 2 July 2026"],
            ["Networking Essentials", "Issued on 11 July 2026"],
          ].map(([title, issued]) => (
            <div key={title} className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-text">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{issued}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
