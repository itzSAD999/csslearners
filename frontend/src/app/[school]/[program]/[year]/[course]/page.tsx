import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { StatCard } from "@/components/ui/stat-card";
import { getCourseBySlug, courses } from "@/lib/mock-data";
import { SECTIONS } from "@/lib/types";

type CoursePageProps = {
  params: Promise<{
    school: string;
    program: string;
    year: string;
    course: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { school, program, year, course } = await params;
  const courseData = getCourseBySlug(course) ?? courses[0];
  const basePath = `/${school}/${program}/${year}/${course}`;

  return (
    <div>
      <PageShell
        title={`${courseData.code} — ${courseData.name}`}
        description={`All resources for ${courseData.code} organized into 8 sections.`}
        badges={[courseData.code, year]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: school.toUpperCase(), href: `/${school}` },
          { label: program.toUpperCase(), href: `/${school}/${program}` },
          { label: year, href: `/${school}/${program}/${year}` },
          { label: courseData.code },
        ]}
      >
        {/* Lecturer Info */}
        {courseData.lecturers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              Course Lecturers
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {courseData.lecturers.map((lecturer) => (
                <div
                  key={lecturer.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-lighter)] text-sm font-bold text-[var(--accent)]">
                      {lecturer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {lecturer.name}
                      </p>
                      {lecturer.email && (
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {lecturer.email}
                        </p>
                      )}
                    </div>
                  </div>
                  {lecturer.officeHours && (
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">
                      🕐 {lecturer.officeHours}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon="📝"
            value={courseData.sectionCounts.assignments}
            label="Assignments"
          />
          <StatCard
            icon="📄"
            value={courseData.sectionCounts.passco}
            label="Passco Papers"
          />
          <StatCard
            icon="✅"
            value={courseData.sectionCounts.verifiedQuestions}
            label="Verified Questions"
          />
          <StatCard
            icon="🎯"
            value={courseData.sectionCounts.practiceQuestions}
            label="Practice Questions"
          />
        </div>

        {/* Section Grid */}
        <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          Course Sections
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((section, i) => (
            <Link
              key={section.slug}
              href={`${basePath}/${section.slug}`}
              className={`group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm card-hover animate-fade-in-up stagger-${i + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {section.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {section.label}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageShell>
    </div>
  );
}
