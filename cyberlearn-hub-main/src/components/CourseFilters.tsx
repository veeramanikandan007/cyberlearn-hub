"use client";

import { useMemo, useState } from "react";
import { courses, Difficulty } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

const tracks: ("All" | Difficulty)[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export default function CourseFilters() {
  const [track, setTrack] = useState<(typeof tracks)[number]>("All");

  const filtered = useMemo(
    () => courses.filter((c) => track === "All" || c.track === track),
    [track]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter courses by track"
        className="flex flex-wrap gap-2"
      >
        {tracks.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={track === t}
            onClick={() => setTrack(t)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              track === t
                ? "border-green/40 bg-green/10 text-green"
                : "border-border text-text-dim hover:border-border-hover hover:text-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-xs text-text-faint">
        {filtered.length} course{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {filtered.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </div>
  );
}
