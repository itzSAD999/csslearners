import type { Priority } from "@/lib/types";

interface PriorityBadgeProps {
  priority: Priority | null;
  passcoFrequency?: number;
}

export function PriorityBadge({ priority, passcoFrequency = 0 }: PriorityBadgeProps) {
  // Derive effective priority
  const effective =
    priority ??
    (passcoFrequency >= 5 ? "HIGH" : passcoFrequency >= 2 ? "MEDIUM" : null);

  if (!effective) return null;

  if (effective === "HIGH") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
        <span>🔥</span> High Priority
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
      <span>⭐</span> Medium Priority
    </span>
  );
}
