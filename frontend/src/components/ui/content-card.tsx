import Link from "next/link";
import { ReactNode } from "react";

interface ContentCardProps {
  href: string;
  title: string;
  description?: string;
  meta?: string;
  badges?: ReactNode;
  icon?: string;
  footer?: ReactNode;
  variant?: "default" | "compact";
}

export function ContentCard({
  href,
  title,
  description,
  meta,
  badges,
  icon,
  footer,
  variant = "default",
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
    >
      <div className="flex gap-4">
        {/* Icon */}
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-lighter)] text-lg transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Badges */}
          {badges && (
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {badges}
            </div>
          )}

          {/* Title */}
          <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && variant === "default" && (
            <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
              {description}
            </p>
          )}

          {/* Meta */}
          {meta && (
            <p className="mt-1.5 text-xs text-[var(--text-tertiary)]">
              {meta}
            </p>
          )}

          {/* Footer */}
          {footer && (
            <div className="mt-3 border-t border-[var(--border)] pt-3">
              {footer}
            </div>
          )}
        </div>

        {/* Arrow */}
        <svg
          className="h-5 w-5 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
