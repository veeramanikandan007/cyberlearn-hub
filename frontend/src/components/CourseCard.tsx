import Link from "next/link";
import { Clock, Layers, Star, ArrowRight } from "lucide-react";
import { Course, difficultyColor } from "@/data/courses";

export default function CourseCard({ course }: { course: Course }) {
  const href = `/courses/${course.slug}`;

  return (
    <Link
      href={href}
      className="glass group flex flex-col justify-between rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-glow border border-slate-800 bg-slate-900/60"
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium ${difficultyColor[course.track]}`}
          >
            {course.track}
          </span>
          <span className="font-mono text-[11px] text-text-faint">
            {course.category}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug text-text group-hover:text-green flex items-center justify-between">
          <span>{course.title}</span>
          <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-green" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-dim">
          {course.summary}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-xs text-text-faint">
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Layers size={13} /> {course.modules} modules
        </span>
        <span className="flex items-center gap-1.5 text-severity-medium">
          <Star size={13} fill="currentColor" /> {course.rating}
        </span>
      </div>
    </Link>
  );
}
