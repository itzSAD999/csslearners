import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { academicYears } from "@/lib/mock-data";

type ProgramPageProps = {
  params: Promise<{ school: string; program: string }>;
};

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { school, program } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title={`${program.toUpperCase()} Program`}
        description="Select an academic year to view course offerings and resources."
        badges={["Program"]}
        context={school.toUpperCase()}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: school.toUpperCase(), href: `/${school}` },
          { label: program.toUpperCase() },
        ]}
      >
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Academic Years
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {academicYears.map((year) => (
            <Link
              key={year.id}
              href={`/${school}/${program}/${year.slug}`}
              className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-lighter)] text-lg">
                  📅
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {year.label}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {year.isActive ? "Current Year" : "Past Year"}
                  </p>
                </div>
              </div>
              {year.isActive && (
                <span className="absolute right-4 top-4 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
            href="/programs/computer-science"
          >
            <span>View this program across all schools</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </PageShell>
    </div>
  );
}
