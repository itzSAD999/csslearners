import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-bold text-white">
                CS
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">
                CSS Learners
              </span>
            </div>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Open academic resources for every student. Built to start at one
              school and scale to every university — without rewriting a single
              line of code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Browse Schools", href: "/" },
                { label: "Computer Science", href: "/programs/computer-science" },
                { label: "Admin Dashboard", href: "/admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-3 space-y-2">
              {[
                { label: "How It Works", href: "#" },
                { label: "For Admins", href: "/admin" },
                { label: "Contribute", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} CSS Learners. Made for students, by
            students.
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">
            V1 — The Library
          </p>
        </div>
      </div>
    </footer>
  );
}
