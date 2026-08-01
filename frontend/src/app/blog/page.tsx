import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { articles } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read practical cybersecurity articles on ethics, Linux, Windows, networking, Python, malware, SOC, SIEM, and more.",
};

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Practical writing for learners who want to build real-world understanding"
        description="The blog covers the concepts that show up in labs, interviews, and day-to-day security operations."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="glass rounded-2xl p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-green">{article.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-text">{article.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-dim">{article.summary}</p>
              <p className="mt-4 font-mono text-xs text-text-faint">{article.readTime}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
