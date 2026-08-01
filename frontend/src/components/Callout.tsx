import { Lightbulb, AlertTriangle, Info } from "lucide-react";

const variants = {
  tip: {
    icon: Lightbulb,
    label: "Security tip",
    classes: "border-green/25 bg-green/5 text-green",
  },
  warning: {
    icon: AlertTriangle,
    label: "Common mistake",
    classes: "border-severity-medium/25 bg-severity-medium/5 text-severity-medium",
  },
  note: {
    icon: Info,
    label: "Note",
    classes: "border-blue/25 bg-blue/5 text-blue",
  },
};

export default function Callout({
  type = "tip",
  children,
}: {
  type?: keyof typeof variants;
  children: React.ReactNode;
}) {
  const v = variants[type];
  return (
    <div className={`rounded-lg border px-5 py-4 ${v.classes}`}>
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide">
        <v.icon size={14} />
        {v.label}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-text">{children}</div>
    </div>
  );
}
