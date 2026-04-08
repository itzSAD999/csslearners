import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageShell
        title="How CSS Learners Works"
        description="Our simple, structured approach to keeping academic resources organized across every university."
        badges={["📖 Guide"]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How It Works" }
        ]}
      >
        <div className="space-y-12 py-8 animate-slide-in-up pt-4">
          
          {/* Step 1 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600 shadow-sm md:h-20 md:w-20 md:text-3xl">
              1
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
                Choose Your University
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Everything starts with your school. We build a zero-clutter environment 
                by completely isolating each university into its own silo. When you click 
                on KNUST, UG, or UCC, you will only see programs, academic years, and courses 
                relevant to your specific institution.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl font-bold text-emerald-600 shadow-sm md:h-20 md:w-20 md:text-3xl">
              2
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
                Drill Down to Your Course
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We mirror your exact academic structure. Navigate through your Program 
                (e.g., BSc Computer Science) into your Academic Year (e.g., Year 1, Semester 1). 
                There, you'll find every single course you're taking, complete with credit hours 
                and resource counts. We use a "Content Density First" approach — no dead links, 
                just courses packed with actual materials.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-2xl font-bold text-purple-600 shadow-sm md:h-20 md:w-20 md:text-3xl">
              3
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
                The 8 Resource Pillars
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Within any course, content is beautifully split into 8 intuitive sections 
                so you never have to scramble for materials:
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Passco", "Assignments", "Verified Q's", "Practice MCQ", "Guide Videos", "Course Breakdown", "Lectures", "Slides"].map(pillar => (
                  <div key={pillar} className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 text-center text-xs font-semibold text-[var(--text-secondary)]">
                    {pillar}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-2xl font-bold text-amber-600 shadow-sm md:h-20 md:w-20 md:text-3xl">
              4
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
                Study & Compare Globally
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Once you master your university's materials, zoom out using the <strong>Cross-School Programs</strong> tool. 
                Are you curious how Data Structures is taught at the University of Ghana compared to KNUST? 
                Because everything shares the same database architecture, you can instantly compare syllabuses 
                and solve another school's past questions for extra exam prep!
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-[var(--surface-muted)] p-8 text-center border border-[var(--border)]">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Ready to start studying smarter?
            </h3>
            <Link
              href="/"
              className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] hover:shadow-lg"
            >
              Browse Schools →
            </Link>
          </div>

        </div>
      </PageShell>
    </div>
  );
}
