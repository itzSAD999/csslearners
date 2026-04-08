import Link from "next/link";

export function Navbar() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-[var(--border)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-white font-bold text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
            CS
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            CSS <span className="text-[var(--accent)]">Learners</span>
          </span>
        </Link>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search courses, questions, passco..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all duration-200 focus:border-[var(--border-focus)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden rounded border border-[var(--border)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-tertiary)] sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          <Link
            href="/programs/computer-science"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Programs
          </Link>
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            Admin
          </Link>
          <Link
            href="/"
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white transition-transform hover:scale-105"
          >
            ?
          </Link>
        </nav>
      </div>
    </header>
  );
}
