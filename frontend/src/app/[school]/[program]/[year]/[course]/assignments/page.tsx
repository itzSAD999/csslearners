import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { StatusPill } from "@/components/ui/status-pill";
import { assignments } from "@/lib/mock-data";

type AssignmentsPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

export default async function AssignmentsPage({ params }: AssignmentsPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  return (
    <PageShell
      title="Assignments"
      description="Course assignment bank with independent solution release control. Each assignment can have multiple solutions — official, lecturer, alternative, and student-submitted."
      context={`${course.toUpperCase()}`}
      badges={["📝 Assignments"]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: school.toUpperCase(), href: `/${school}` },
        { label: course.toUpperCase(), href: basePath },
        { label: "Assignments" },
      ]}
    >
      <div className="space-y-3">
        {assignments.map((assignment) => {
          const releasedCount = assignment.solutions.filter(
            (s) => s.isReleased && s.status === "APPROVED"
          ).length;
          const pendingCount = assignment.solutions.filter(
            (s) => s.status === "PENDING"
          ).length;

          return (
            <Link
              key={assignment.id}
              href={`${basePath}/assignments/${assignment.id}`}
              className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {assignment.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {assignment.questionContent}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {assignment.dueDate && (
                      <span className="text-xs text-[var(--text-tertiary)]">
                        📅 Due: {new Date(assignment.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                    <span className="text-xs text-[var(--text-tertiary)]">
                      •
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {assignment.solutions.length} solution{assignment.solutions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {releasedCount > 0 && (
                    <StatusPill label={`${releasedCount} released`} tone="success" size="sm" />
                  )}
                  {pendingCount > 0 && (
                    <StatusPill label={`${pendingCount} pending`} tone="warning" size="sm" />
                  )}
                  {assignment.solutions.length === 0 && (
                    <StatusPill label="No solutions" tone="neutral" size="sm" />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
