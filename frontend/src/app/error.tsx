"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center animate-fade-in-up">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-5xl text-rose-500 shadow-sm border border-rose-100">
        ⚠️
      </div>
      <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)]">Something went wrong</h2>
      <p className="mb-8 max-w-md text-[var(--text-secondary)]">
        We encountered an unexpected error while loading this segment. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-xl bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] hover:shadow-lg"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="rounded-xl border border-[var(--border)] px-8 py-3.5 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition-all hover:bg-[var(--surface-muted)]"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
