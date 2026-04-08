interface StatCardProps {
  label: string;
  value: number | string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[var(--border-accent)]">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {trend === "up" && (
          <span className="text-xs text-emerald-600 font-medium">↑</span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[var(--text-tertiary)] font-medium">
        {label}
      </p>
    </div>
  );
}
