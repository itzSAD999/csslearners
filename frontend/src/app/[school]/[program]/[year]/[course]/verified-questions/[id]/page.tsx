import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { SolutionCard } from "@/components/ui/solution-card";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { getVerifiedQuestionById, verifiedQuestions } from "@/lib/mock-data";

type Props = {
  params: Promise<{ school: string; program: string; year: string; course: string; id: string }>;
};

const credibilityLabel: Record<string, string> = {
  LECTURER_DIRECT: "Lecturer Direct",
  TA: "Teaching Assistant",
  ADMIN: "Admin Verified",
  COMMUNITY: "Community",
};

export default async function VerifiedQuestionDetailPage({ params }: Props) {
  const { school, program, year, course, id } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;
  const question = getVerifiedQuestionById(id) ?? verifiedQuestions[0];

  return (
    <PageShell
      title="Verified Question"
      description={`Topic: ${question.topic}`}
      badges={["✅ Verified"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Verified Questions", href: `${basePath}/verified-questions` },
        { label: `Question` },
      ]}
    >
      {/* Question Content */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        {/* Status badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusPill
            label={credibilityLabel[question.sourceType]}
            tone={question.sourceType === "LECTURER_DIRECT" ? "high" : "info"}
            size="md"
          />
          <StatusPill
            label={question.verifiedType === "CONFIRMED_CAME_UP" ? "Confirmed Came Up" : "Likely to Come"}
            tone={question.verifiedType === "CONFIRMED_CAME_UP" ? "success" : "info"}
            size="md"
          />
          <PriorityBadge priority={question.priority} passcoFrequency={question.passcoFrequency} />
        </div>

        <div className="rounded-lg bg-[var(--surface-muted)] p-4 text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
          {question.questionContent}
        </div>

        {/* Evidence */}
        {question.evidenceNote && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
              💬 Evidence Note
            </p>
            <p className="text-sm text-blue-700">{question.evidenceNote}</p>
          </div>
        )}

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">Topic</p>
            <p className="mt-1 font-medium text-[var(--text-primary)]">{question.topic}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">Passco Frequency</p>
            <p className="mt-1 font-medium text-[var(--text-primary)]">{question.passcoFrequency} times</p>
          </div>
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
          href={`${basePath}/verified-questions`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Back to verified questions</span>
        </Link>
      </div>
    </PageShell>
  );
}
