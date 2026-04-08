import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { SolutionCard } from "@/components/ui/solution-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getPracticeQuestionById, practiceQuestions } from "@/lib/mock-data";

type Props = {
  params: Promise<{ school: string; program: string; year: string; course: string; id: string }>;
};

const difficultyTone: Record<string, "success" | "warning" | "danger"> = {
  EASY: "success",
  MEDIUM: "warning",
  HARD: "danger",
};

export default async function PracticeQuestionDetailPage({ params }: Props) {
  const { school, program, year, course, id } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;
  const question = getPracticeQuestionById(id) ?? practiceQuestions[0];

  return (
    <PageShell
      title="Practice Question"
      description={`Topic: ${question.topic} • Difficulty: ${question.difficulty}`}
      badges={["🎯 Practice"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Practice", href: `${basePath}/practice` },
        { label: "Question" },
      ]}
    >
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusPill
            label={question.difficulty}
            tone={difficultyTone[question.difficulty]}
            size="md"
          />
          <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            {question.topic}
          </span>
        </div>

        <div className="rounded-lg bg-[var(--surface-muted)] p-4 text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
          {question.questionContent}
        </div>
      </div>

      {/* Solutions */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          Solutions ({question.solutions.length})
        </h2>
        {question.solutions.length > 0 ? (
          <div className="space-y-3">
            {question.solutions.map((solution) => (
              <SolutionCard
                key={solution.id}
                label={solution.label}
                source={solution.solutionSource}
                status={solution.status}
                isReleased={solution.isReleased}
                content={solution.isReleased ? solution.solutionContent : undefined}
                upvoteCount={solution.upvoteCount}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-6 py-12 text-center">
            <span className="text-3xl block mb-3">📭</span>
            <p className="text-sm font-medium text-[var(--text-primary)]">No solutions yet</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href={`${basePath}/practice`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Back to practice questions</span>
        </Link>
      </div>
    </PageShell>
  );
}
