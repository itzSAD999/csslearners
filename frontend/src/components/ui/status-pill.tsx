type StatusTone = "neutral" | "high" | "medium" | "success" | "warning" | "danger" | "info";

const toneClass: Record<StatusTone, string> = {
  neutral: "bg-slate-100 text-slate-700",
  high: "bg-rose-50 text-rose-700 border border-rose-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-orange-50 text-orange-700 border border-orange-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  info: "bg-blue-50 text-blue-700 border border-blue-200",
};

const toneIcon: Partial<Record<StatusTone, string>> = {
  high: "🔥",
  medium: "⭐",
  success: "✓",
  warning: "⚠",
};

type StatusPillProps = {
  label: string;
  tone?: StatusTone;
  size?: "sm" | "md";
  showIcon?: boolean;
  pulse?: boolean;
};

export function StatusPill({
  label,
  tone = "neutral",
  size = "sm",
  showIcon = false,
  pulse = false,
}: StatusPillProps) {
  const icon = showIcon ? toneIcon[tone] : undefined;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-semibold
        ${toneClass[tone]}
        ${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"}
        ${pulse ? "animate-pulse" : ""}
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
