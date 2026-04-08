import { PageShell } from "@/components/ui/page-shell";
import { courseBreakdownData } from "@/lib/mock-data";

type BreakdownPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

export default async function BreakdownPage({ params }: BreakdownPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;
  const data = courseBreakdownData;

  // Find max weight for bar chart
  const maxWeight = Math.max(...data.topicWeightings.map((t) => t.weight));

  return (
    <PageShell
      title="Course Breakdown"
      description="How to study this course — overview, weekly plan, topic weightings, study tips, and recommended reading."
      badges={["📊 Breakdown"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Breakdown" },
      ]}
    >
      {/* Overview */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          Course Overview
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {data.overview}
        </p>
      </div>

      {/* Topic Weightings */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
          Topic Weightings
        </h2>
        <div className="space-y-3">
          {data.topicWeightings.map((topic) => (
            <div key={topic.topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {topic.topic}
                </span>
                <span className="text-sm font-semibold text-[var(--accent)]">
                  {topic.weight}%
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--blue-500)] to-[var(--blue-400)] transition-all duration-700 ease-out"
                  style={{ width: `${(topic.weight / maxWeight) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
          Weekly Plan
        </h2>
        <div className="space-y-2">
          {data.weeklyPlan.map((week) => (
            <div
              key={week.week}
              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[var(--surface-muted)]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-lighter)] text-xs font-bold text-[var(--accent)]">
                W{week.week}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {week.topic}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  {week.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          💡 Study Tips
        </h2>
        <ul className="space-y-2">
          {data.studyTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-lighter)] text-[10px] font-bold text-[var(--accent)]">
                {i + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Books */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          📚 Recommended Books
        </h2>
        <ul className="space-y-2">
          {data.recommendedBooks.map((book, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg p-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <span className="text-lg">📖</span>
              <span>{book}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
