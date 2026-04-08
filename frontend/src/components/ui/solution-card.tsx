import type { SolutionSource, SolutionStatus } from "@/lib/types";
import { StatusPill } from "./status-pill";

interface SolutionCardProps {
  label: string;
  source: SolutionSource;
  status: SolutionStatus;
  isReleased: boolean;
  contributorName?: string;
  content?: string;
  upvoteCount?: number;
}

const sourceLabel: Record<SolutionSource, string> = {
  OFFICIAL: "Official",
  LECTURER: "Lecturer",
  ALTERNATIVE: "Alternative",
  STUDENT: "Student",
};

const sourceColor: Record<SolutionSource, string> = {
  OFFICIAL: "bg-blue-50 text-blue-700 border-blue-200",
  LECTURER: "bg-purple-50 text-purple-700 border-purple-200",
  ALTERNATIVE: "bg-teal-50 text-teal-700 border-teal-200",
  STUDENT: "bg-gray-50 text-gray-700 border-gray-200",
};

export function SolutionCard({
  label,
  source,
  status,
  isReleased,
  contributorName,
  content,
  upvoteCount,
}: SolutionCardProps) {
  const isVisible = isReleased && status === "APPROVED";

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 ${
        isVisible
          ? "border-[var(--border)] bg-[var(--surface)]"
          : "border-dashed border-[var(--border)] bg-[var(--surface-muted)] opacity-75"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              {label}
            </h4>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${sourceColor[source]}`}
            >
              {sourceLabel[source]}
            </span>
          </div>

          {/* Contributor */}
          {contributorName && (
            <p className="mt-1 text-xs text-[var(--text-tertiary)]">
              by {contributorName}
            </p>
          )}

          {/* Content preview */}
          {isVisible && content && (
            <div className="mt-3 rounded-lg bg-[var(--surface-muted)] p-3 text-sm text-[var(--text-secondary)] font-mono leading-relaxed">
              <p className="line-clamp-4 whitespace-pre-wrap">{content}</p>
            </div>
          )}

          {/* Locked message */}
          {!isVisible && (
            <p className="mt-2 text-xs text-[var(--text-tertiary)] italic">
              {status === "PENDING"
                ? "Awaiting admin approval"
                : "Solution not yet released"}
            </p>
          )}
        </div>

        {/* Status + Upvotes */}
        <div className="flex flex-col items-end gap-2">
          {isReleased && status === "APPROVED" ? (
            <StatusPill label="Released" tone="success" showIcon />
          ) : status === "PENDING" ? (
            <StatusPill label="Pending" tone="warning" />
          ) : (
            <StatusPill label="Locked" tone="neutral" />
          )}

          {upvoteCount !== undefined && upvoteCount > 0 && isVisible && (
            <span className="text-xs text-[var(--text-tertiary)]">
              👍 {upvoteCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
