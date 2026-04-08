import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { passcoPapers } from "@/lib/mock-data";

type PasscoPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

export default async function PasscoPage({ params }: PasscoPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  // Group by year
  const grouped = passcoPapers.reduce(
    (acc, paper) => {
      const key = paper.examYear;
      if (!acc[key]) acc[key] = [];
      acc[key].push(paper);
      return acc;
    },
    {} as Record<number, typeof passcoPapers>
  );

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  // Split into recent (last 2 years) and older
  const currentYear = new Date().getFullYear();
  const recentYears = sortedYears.filter((y) => y >= currentYear - 1);
  const olderYears = sortedYears.filter((y) => y < currentYear - 1);

  const examTypeLabel: Record<string, string> = {
    END_OF_SEM: "End of Semester",
    MID_SEM: "Mid Semester",
    QUIZ: "Quiz",
    TEST: "Test",
  };

  return (
    <PageShell
      title="Passco"
      description="Historical past examination papers grouped by year and exam type. Papers accumulate across all years — nothing is ever re-uploaded or lost."
      badges={["📄 Passco", "Historical"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: school.toUpperCase(), href: `/${school}` },
        { label: course.toUpperCase(), href: basePath },
        { label: "Passco" },
      ]}
    >
      {/* Recent Papers */}
      {recentYears.map((examYear) => (
        <div key={examYear} className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-xs font-bold text-white">
              {String(examYear).slice(2)}
            </span>
            {examYear}/{examYear + 1}
          </h2>
          <div className="space-y-2">
            {grouped[examYear].map((paper) => (
              <Link
                key={paper.id}
                href={`${basePath}/passco/${paper.id}`}
                className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm card-hover"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-lg">
                    📄
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {examTypeLabel[paper.examType]} {paper.examYear}
                      </h3>
                      <PriorityBadge
                        priority={paper.priority}
                        passcoFrequency={paper.passcoFrequency}
                      />
                    </div>
                    <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                      {paper.examSemester === "FIRST" ? "1st" : "2nd"} Semester
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {paper.hasSolutions ? (
                    <StatusPill
                      label={`${paper.solutionCount} solution${paper.solutionCount !== 1 ? "s" : ""}`}
                      tone="success"
                      size="sm"
                    />
                  ) : (
                    <StatusPill label="No solutions" tone="neutral" size="sm" />
                  )}
                  <svg
                    className="h-4 w-4 text-[var(--text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Older Papers */}
      {olderYears.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <span className="flex h-7 items-center justify-center rounded-md bg-[var(--surface-muted)] px-2 text-xs font-bold text-[var(--text-secondary)]">
              📁
            </span>
            Older Papers
          </h2>
          <div className="space-y-2">
            {olderYears.flatMap((examYear) =>
              grouped[examYear].map((paper) => (
                <Link
                  key={paper.id}
                  href={`${basePath}/passco/${paper.id}`}
                  className="group flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm card-hover"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm">📄</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {examTypeLabel[paper.examType]} {paper.examYear}
                      </span>
                      <PriorityBadge
                        priority={paper.priority}
                        passcoFrequency={paper.passcoFrequency}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {paper.hasSolutions && (
                      <StatusPill label="Solutions" tone="success" size="sm" />
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
