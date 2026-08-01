export default function CodeBlock({
  code,
  label,
}: {
  code: string;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      {label && (
        <div className="border-b border-border bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-text-faint">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
