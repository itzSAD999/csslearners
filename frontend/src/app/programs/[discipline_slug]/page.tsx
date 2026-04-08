import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { StatCard } from "@/components/ui/stat-card";
import { disciplinePrograms } from "@/lib/mock-data";

type Props = {
  params: Promise<{ discipline_slug: string }>;
};

export default async function DisciplineDiscoveryPage({ params }: Props) {
  const { discipline_slug } = await params;
  const displayName = discipline_slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const totalCourses = disciplinePrograms.reduce((s, d) => s + d.courseCount, 0);
  const totalPassco = disciplinePrograms.reduce((s, d) => s + d.passcoCount, 0);
  const totalQuestions = disciplinePrograms.reduce((s, d) => s + d.questionCount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title={displayName}
        description={`All schools offering ${displayName} — browse courses, past papers, and questions across universities.`}
        badges={["🌐 Cross-School", displayName]}
        variant="hero"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs" },
          { label: displayName },
        ]}
      >
        {/* Aggregate Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <StatCard icon="📚" value={totalCourses} label="Total Courses" />
          <StatCard icon="📄" value={totalPassco} label="Past Papers" />
          <StatCard icon="❓" value={totalQuestions} label="Questions" />
        </div>

        {/* Schools offering this program */}
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Schools Offering {displayName}
        </h2>

        <div className="space-y-4">
          {disciplinePrograms.map((dp) => (
            <Link
              key={dp.school.id}
              href={`/${dp.school.slug}/${dp.program.slug}`}
              className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md"
                  style={{ backgroundColor: dp.school.primaryColor }}
                >
                  {dp.school.slug.toUpperCase().slice(0, 2)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {dp.school.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {dp.program.name} Program
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--text-tertiary)]">
                    <span className="rounded bg-[var(--surface-muted)] px-2 py-1">
                      📚 {dp.courseCount} courses
                    </span>
                    <span className="rounded bg-[var(--surface-muted)] px-2 py-1">
                      📄 {dp.passcoCount} past papers
                    </span>
                    <span className="rounded bg-[var(--surface-muted)] px-2 py-1">
                      ❓ {dp.questionCount} questions
                    </span>
                  </div>
                </div>

                <svg
                  className="h-5 w-5 shrink-0 text-[var(--text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
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
      </PageShell>
    </div>
  );
}
