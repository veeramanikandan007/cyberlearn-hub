import Link from "next/link";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/register",
  primaryLabel = "Start learning",
  secondaryHref = "/courses",
  secondaryLabel = "Explore catalog",
  children,
}: PageHeroProps) {
  return (
    <section className="border-b border-border bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-green">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-text md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-dim">{description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={primaryHref} className="rounded-md bg-green px-5 py-3 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="rounded-md border border-border px-5 py-3 font-mono text-sm text-text transition-colors hover:border-border-hover">
            {secondaryLabel}
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
