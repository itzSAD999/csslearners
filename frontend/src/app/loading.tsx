export default function Loading() {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 animate-fade-in">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]"></div>
      <p className="text-sm font-medium text-[var(--text-tertiary)] tracking-wide">Loading content...</p>
    </div>
  );
}
