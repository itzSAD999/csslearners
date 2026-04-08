import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { getCoursesByYearLevel } from "@/lib/mock-data";

type YearPageProps = {
  params: Promise<{ school: string; program: string; year: string }>;
};

const yearLabel: Record<number, string> = {
  1: "First Year",
  2: "Second Year",
  3: "Third Year",
  4: "Final Year",
};

export default async function YearPage({ params }: YearPageProps) {
  const { school, program, year } = await params;
  const yearGroups = getCoursesByYearLevel();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title={`${year} Academic Year`}
        description="All courses organized by year level and semester. Select a course to browse its resources."
        badges={[year]}
        context={`${school.toUpperCase()} / ${program.toUpperCase()}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: school.toUpperCase(), href: `/${school}` },
          { label: program.toUpperCase(), href: `/${school}/${program}` },
          { label: year },
        ]}
      >
        {yearGroups.map((group) => (
          <div key={group.yearLevel} className="mb-8">
            {/* Year Level Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white shadow-sm">
                Y{group.yearLevel}
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {yearLabel[group.yearLevel]}
              </h2>
              <span className="text-sm text-[var(--text-tertiary)]">
                {group.sem1.length + group.sem2.length} courses
              </span>
            </div>

            {/* Semesters */}
            {[
              { label: "Semester 1", courses: group.sem1 },
              { label: "Semester 2", courses: group.sem2 },
            ].map(
              (sem) =>
                sem.courses.length > 0 && (
                  <div key={sem.label} className="mb-4">
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 pl-1">
                      {sem.label}
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {sem.courses.map((course) => {
                        const hasContent =
                          course.sectionCounts.assignments > 0 ||
                          course.sectionCounts.passco > 0;
                        return (
                          <Link
                            key={course.id}
                            href={`/${school}/${program}/${year}/${course.slug}`}
                            className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm card-hover"
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm ${
                                hasContent
                                  ? "bg-[var(--accent)]"
                                  : "bg-slate-400"
                              }`}
                            >
                              {course.code.split(" ")[1]?.slice(0, 3) ?? "—"}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                                {course.code} — {course.name}
                              </p>
                              <div className="mt-0.5 flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                                <span>
                                  {course.creditHours}cr • T{course.theoryHours}
                                  /P{course.practicalHours}
                                </span>
                                {hasContent && (
                                  <>
                                    <span>•</span>
                                    <span className="text-[var(--accent)]">
                                      {course.sectionCounts.assignments +
                                        course.sectionCounts.passco}{" "}
                                      resources
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )
            )}
          </div>
        ))}
      </PageShell>
    </div>
  );
}
