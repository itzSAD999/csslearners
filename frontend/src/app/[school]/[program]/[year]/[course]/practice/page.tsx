import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { StatusPill } from "@/components/ui/status-pill";
import { practiceQuestions } from "@/lib/mock-data";

type PracticePageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

const difficultyTone: Record<string, "success" | "warning" | "danger"> = {
  EASY: "success",
  MEDIUM: "warning",
  HARD: "danger",
};

export default async function PracticePage({ params }: PracticePageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  const topics = [...new Set(practiceQuestions.map((q) => q.topic))];
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  return (
    <PageShell
      title="Practice Questions"
      description="General drill questions filterable by topic and difficulty. Build exam confidence through regular practice."
      badges={["🎯 Practice"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Practice" },
      ]}
    >
      {/* Quiz CTA */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[var(--blue-500)] to-[var(--blue-600)] p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">🧠</span> Live Quiz Mode
            </h2>
            <p className="mt-1 text-sm text-blue-50">
              Select topics, difficulty, and question count to test your knowledge with interactive MCQs.
            </p>
          </div>
          <Link
            href={`${basePath}/practice/quiz`}
            className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[var(--blue-600)] shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
          >
            Launch Quiz →
          </Link>
        </div>
      </div>

      {/* Filter preview */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
            Difficulty:
          </span>
          {difficulties.map((d) => (
            <span
              key={d}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                d === "EASY"
                  ? "bg-emerald-50 text-emerald-700"
                  : d === "MEDIUM"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
              }`}
            >
              {d}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
            Topics:
          </span>
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {practiceQuestions.map((question) => (
          <Link
            key={question.id}
            href={`${basePath}/practice/${question.id}`}
            className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <StatusPill
                    label={question.difficulty}
                    tone={difficultyTone[question.difficulty]}
                    size="sm"
                  />
                  <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                    {question.topic}
                  </span>
                </div>

                <p className="text-sm text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors font-medium">
                  {question.questionContent}
                </p>

                <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                  {question.solutions.length} solution{question.solutions.length !== 1 ? "s" : ""}
                </p>
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
  );
}
