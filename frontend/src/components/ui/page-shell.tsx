import Link from "next/link";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageShellProps {
  title: string;
  description: string;
  context?: string;
  badges?: string[];
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children?: ReactNode;
  variant?: "default" | "hero";
}

export function PageShell({
  title,
  description,
  context,
  badges = [],
  breadcrumbs = [],
  actions,
  children,
  variant = "default",
}: PageShellProps) {
  return (
    <div className="animate-fade-in-up">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-4 flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg className="h-3.5 w-3.5 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[var(--text-tertiary)]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Header Card */}
      <section
        className={`relative overflow-hidden rounded-2xl border border-[var(--border)] p-6 sm:p-8 shadow-sm ${
          variant === "hero"
            ? "hero-gradient text-white"
            : "bg-[var(--surface)]"
        }`}
      >
        {variant === "hero" && (
          <div className="dot-pattern absolute inset-0 pointer-events-none" />
        )}

        <div className="relative z-10">
          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    variant === "hero"
                      ? "bg-white/20 text-white"
                      : "bg-[var(--accent-lighter)] text-[var(--accent-text)]"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Title + Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1
                className={`text-2xl font-bold tracking-tight sm:text-3xl ${
                  variant === "hero" ? "text-white" : "text-[var(--text-primary)]"
                }`}
              >
                {title}
              </h1>
              <p
                className={`mt-2 max-w-2xl leading-relaxed ${
                  variant === "hero"
                    ? "text-blue-100"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {description}
              </p>
              {context && (
                <p
                  className={`mt-2 text-sm ${
                    variant === "hero"
                      ? "text-blue-200"
                      : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {context}
                </p>
              )}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        </div>
      </section>

      {/* Page Content */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
