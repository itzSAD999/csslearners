import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center animate-fade-in-up">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface-muted)] text-5xl shadow-sm">
        🔍
      </div>
      <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)]">Page Not Found</h2>
      <p className="mb-8 max-w-md text-[var(--text-secondary)]">
        We couldn't find what you were looking for. The resource may have been moved, removed, or doesn't exist yet.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-xl bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] hover:shadow-lg"
      >
        Return to Safety
      </Link>
    </div>
  );
}
