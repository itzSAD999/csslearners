import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { getPasscoPaperById, passcoPapers } from "@/lib/mock-data";

type PasscoDetailPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string; id: string }>;
};

const examTypeLabel: Record<string, string> = {
  END_OF_SEM: "End of Semester",
  MID_SEM: "Mid Semester",
  QUIZ: "Quiz",
  TEST: "Test",
};

export default async function PasscoDetailPage({ params }: PasscoDetailPageProps) {
  const { school, program, year, course, id } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;
  const paper = getPasscoPaperById(id) ?? passcoPapers[0];

  return (
    <PageShell
      title={`${examTypeLabel[paper.examType]} ${paper.examYear}`}
      description={paper.title}
      badges={["📄 Passco"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Passco", href: `${basePath}/passco` },
        { label: paper.title },
      ]}
    >
      {/* Paper Info */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <PriorityBadge priority={paper.priority} passcoFrequency={paper.passcoFrequency} />
          <StatusPill
            label={paper.examSemester === "FIRST" ? "1st Semester" : "2nd Semester"}
            tone="info"
            size="sm"
          />
          {paper.isHistorical && (
            <StatusPill label="Historical" tone="neutral" size="sm" />
          )}
        </div>

        {/* PDF Viewer Placeholder */}
        <div className="rounded-lg bg-[var(--surface-muted)] border border-dashed border-[var(--border)] p-12 text-center">
          <span className="text-4xl block mb-3">📄</span>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Paper Viewer
          </p>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            PDF viewer will render here once connected to Supabase Storage
          </p>
        </div>

        {/* Metadata */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">Exam Type</p>
            <p className="mt-1 font-medium text-[var(--text-primary)]">{examTypeLabel[paper.examType]}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">Year</p>
            <p className="mt-1 font-medium text-[var(--text-primary)]">{paper.examYear}/{paper.examYear + 1}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">Passco Frequency</p>
            <p className="mt-1 font-medium text-[var(--text-primary)]">{paper.passcoFrequency} appearances</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">Solutions</p>
            <p className="mt-1 font-medium text-[var(--text-primary)]">{paper.solutionCount} available</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`${basePath}/passco`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Back to all papers</span>
        </Link>
      </div>
    </PageShell>
  );
}
