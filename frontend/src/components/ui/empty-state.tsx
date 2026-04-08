interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
}

export function EmptyState({
  icon = "📭",
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-6 py-16 text-center">
      <span className="text-4xl mb-4 animate-float">{icon}</span>
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}
