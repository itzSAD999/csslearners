import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { lectureBreakdowns } from "@/lib/mock-data";

type LecturesPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

export default async function LecturesPage({ params }: LecturesPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  return (
    <PageShell
      title="Lecture Breakdown"
      description="Per-lecture summaries, key topics covered, and links to related slides. Track what each lecture covers throughout the semester."
      badges={["📚 Lectures"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Lectures" },
      ]}
    >
      <div className="space-y-3">
        {lectureBreakdowns.map((lecture) => (
          <div
            key={lecture.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[var(--border-accent)]"
          >
            <div className="flex items-start gap-4">
              {/* Lecture number */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-sm">
                L{lecture.lectureNumber}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {lecture.title}
                  </h3>
                  <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-tertiary)]">
                    Week {lecture.weekNumber}
                  </span>
                </div>

                <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                  {lecture.summary}
                </p>

                {/* Key Topics */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {lecture.keyTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-[var(--accent-lighter)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent-text)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Linked slide */}
                {lecture.linkedSlideId && (
                  <div className="mt-2">
                    <Link
                      href={`${basePath}/slides`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
                    >
                      <span>📎</span>
                      <span>View related slide</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
