import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { verifiedQuestions } from "@/lib/mock-data";

type VerifiedQuestionsPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

const credibilityTone: Record<string, "high" | "medium" | "info" | "neutral"> = {
  LECTURER_DIRECT: "high",
  TA: "medium",
  ADMIN: "info",
  COMMUNITY: "neutral",
};

const credibilityLabel: Record<string, string> = {
  LECTURER_DIRECT: "Lecturer Direct",
  TA: "Teaching Assistant",
  ADMIN: "Admin Verified",
  COMMUNITY: "Community",
};

const subtypeLabel: Record<string, string> = {
  LIKELY_TO_COME: "Likely to Come",
  CONFIRMED_CAME_UP: "Confirmed Came Up",
};

export default async function VerifiedQuestionsPage({ params }: VerifiedQuestionsPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  const topics = [...new Set(verifiedQuestions.map((q) => q.topic))];

  return (
    <PageShell
      title="Verified Questions"
      description="Lecturer-predicted or confirmed exam questions with credibility levels. Questions verified by lecturers directly carry the highest confidence."
      badges={["✅ Verified Questions"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Verified Questions" },
      ]}
    >
      {/* Topic filters preview */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
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

      {/* Questions list */}
      <div className="space-y-3">
        {verifiedQuestions.map((question) => (
          <Link
            key={question.id}
            href={`${basePath}/verified-questions/${question.id}`}
            className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* Badges */}
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <StatusPill
                    label={credibilityLabel[question.sourceType]}
                    tone={credibilityTone[question.sourceType]}
                    size="sm"
                  />
                  <StatusPill
                    label={subtypeLabel[question.verifiedType]}
                    tone={question.verifiedType === "CONFIRMED_CAME_UP" ? "success" : "info"}
                    size="sm"
                  />
                  <PriorityBadge
                    priority={question.priority}
                    passcoFrequency={question.passcoFrequency}
                  />
                </div>

                {/* Question preview */}
                <p className="text-sm text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors font-medium">
                  {question.questionContent}
                </p>

                {/* Meta */}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--text-tertiary)]">
                  <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5">
                    {question.topic}
                  </span>
                  <span>{question.solutions.length} solution{question.solutions.length !== 1 ? "s" : ""}</span>
                  {question.evidenceNote && (
                    <span className="italic">💬 Has evidence note</span>
                  )}
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
  );
}
