import Link from "next/link";
import { GlobalSearch } from "@/components/ui/global-search";
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
          <GlobalSearch />
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
