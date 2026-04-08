import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { getSchoolBySlug, getProgramsBySchool, programs } from "@/lib/mock-data";

type SchoolPageProps = {
  params: Promise<{ school: string }>;
};

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { school } = await params;
  const schoolData = getSchoolBySlug(school);
  const schoolPrograms = schoolData
    ? getProgramsBySchool(schoolData.id)
    : programs.slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title={schoolData?.name ?? school.toUpperCase()}
        description="Browse academic programs and their course resources."
        badges={["School"]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: schoolData?.name ?? school.toUpperCase() },
        ]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schoolPrograms.map((prog) => (
            <Link
              key={prog.id}
              href={`/${school}/${prog.slug}`}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-lighter)] text-lg">
                  💻
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    /{school}/{prog.slug}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
            href="/programs/computer-science"
          >
            <span>View all schools offering Computer Science</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </PageShell>
    </div>
  );
}
