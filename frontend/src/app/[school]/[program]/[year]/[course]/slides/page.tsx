import { PageShell } from "@/components/ui/page-shell";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { slideResources } from "@/lib/mock-data";

type SlidesPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

export default async function SlidesPage({ params }: SlidesPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  return (
    <PageShell
      title="Slides & Resources"
      description="Lecture slides, reference materials, and academic resources. Priority-flagged for exam preparation."
      badges={["📎 Slides"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Slides" },
      ]}
    >
      <div className="space-y-3">
        {slideResources.map((slide) => (
          <div
            key={slide.id}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
          >
            <div className="flex items-start gap-4">
              {/* File icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-xl">
                {slide.fileType === "pdf" ? "📑" : "🖼️"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {slide.title}
                  </h3>
                  <PriorityBadge priority={slide.priority} />
                </div>

                {slide.description && (
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {slide.description}
                  </p>
                )}

                <div className="mt-2 flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                  <span className="uppercase font-medium">
                    {slide.fileType}
                  </span>
                  {slide.weekNumber && (
                    <span>Week {slide.weekNumber}</span>
                  )}
                </div>
              </div>

              {/* Download CTA */}
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
