import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { SolutionCard } from "@/components/ui/solution-card";
import { getAssignmentById, assignments } from "@/lib/mock-data";

type AssignmentDetailPageProps = {
  params: Promise<{
    school: string;
    program: string;
    year: string;
    course: string;
    id: string;
  }>;
};

export default async function AssignmentDetailPage({
  params,
}: AssignmentDetailPageProps) {
  const { school, program, year, course, id } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;
  const assignment = getAssignmentById(id) ?? assignments[0];

  return (
    <PageShell
      title={assignment.title}
      description="View the question and all available solutions."
      badges={["📝 Assignment"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Assignments", href: `${basePath}/assignments` },
        { label: assignment.title },
      ]}
    >
      {/* Question */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          Question
        </h2>
        <div className="rounded-lg bg-[var(--surface-muted)] p-4 text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
          {assignment.questionContent}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
          <span>Type: {assignment.questionType.toUpperCase()}</span>
          {assignment.dueDate && (
            <span>
              Due:{" "}
              {new Date(assignment.dueDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {/* Solutions */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          Solutions ({assignment.solutions.length})
        </h2>

        {assignment.solutions.length > 0 ? (
          <div className="space-y-3">
            {assignment.solutions.map((solution) => (
              <SolutionCard
                key={solution.id}
                label={solution.label}
                source={solution.solutionSource}
                status={solution.status}
                isReleased={solution.isReleased}
                contributorName={solution.contributorName}
                content={
                  solution.isReleased && solution.status === "APPROVED"
                    ? solution.solutionContent
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-6 py-12 text-center">
            <span className="text-3xl mb-3">📭</span>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              No solutions yet
            </p>
            <p className="mt-1 text-xs text-[var(--text-tertiary)]">
              Solutions will appear here when released by the admin.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href={`${basePath}/assignments`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Back to all assignments</span>
        </Link>
      </div>
    </PageShell>
  );
}
