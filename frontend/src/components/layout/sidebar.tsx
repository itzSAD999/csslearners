"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/types";

interface CourseSidebarProps {
  basePath: string; // e.g. /knust/cs/2024-25/cs161
}

export function CourseSidebar({ basePath }: CourseSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full lg:w-56 shrink-0">
      <div className="sticky top-20 space-y-1">
        {/* Course Home */}
        <Link
          href={basePath}
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            pathname === basePath
              ? "bg-[var(--accent)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          <span className="text-base">🏠</span>
          <span>Overview</span>
        </Link>

        <div className="my-2 border-t border-[var(--border)]" />

        {/* Section Links */}
        {SECTIONS.map((section) => {
          const href = `${basePath}/${section.slug}`;
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={section.slug}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--accent-lighter)] text-[var(--accent-dark)] border border-[var(--border-accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="text-base">{section.icon}</span>
              <span>{section.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
