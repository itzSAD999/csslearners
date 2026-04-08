"use client";

import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export function FilterBar({
  filters,
  activeFilters,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
        Filter
      </span>

      {filters.map((group) => (
        <div key={group.key} className="flex items-center gap-1.5">
          <span className="text-xs text-[var(--text-tertiary)]">
            {group.label}:
          </span>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => onFilterChange(group.key, "all")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                !activeFilters[group.key] || activeFilters[group.key] === "all"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
              }`}
            >
              All
            </button>
            {group.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onFilterChange(group.key, opt.value)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                  activeFilters[group.key] === opt.value
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                }`}
              >
                {opt.label}
                {opt.count !== undefined && (
                  <span className="ml-1 opacity-70">({opt.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple wrapper for pages that need client-side filtering
export function useFilters(initialFilters: Record<string, string> = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, setFilter };
}
