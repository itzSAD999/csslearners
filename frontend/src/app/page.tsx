import Link from "next/link";
import { schools } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";

export default function Home() {
  const activeSchools = schools.filter((s) => s.isActive);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="dot-pattern absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm border border-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              V1 — The Library
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Study smarter with{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                CSS Learners
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-blue-100 leading-relaxed">
              Past papers, verified exam questions, assignments with solutions,
              video guides, and study breakdowns — everything you need, organized
              by course. No login required.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${activeSchools[0]?.slug ?? "knust"}`}
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--accent)] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Browsing →
              </Link>
              <Link
                href="/programs/computer-science"
                className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient blobs */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-blue-300/10 blur-3xl" />
      </section>

      {/* ── Stats Banner ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon="🏫" value={activeSchools.length} label="Schools Active" />
          <StatCard icon="📚" value={5} label="Courses Available" />
          <StatCard icon="📄" value={8} label="Past Papers" />
          <StatCard icon="✅" value={12} label="Verified Questions" />
        </div>
      </section>

      {/* ── Schools Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Choose a School
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Browse academic resources organized by university
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeSchools.map((school, i) => (
            <Link
              key={school.slug}
              href={`/${school.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm card-hover animate-fade-in-up stagger-${i + 1}`}
            >
              {/* Color accent bar */}
              <div
                className="absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5"
                style={{ backgroundColor: school.primaryColor }}
              />

              <div className="pl-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md"
                    style={{ backgroundColor: school.primaryColor }}
                  >
                    {school.slug.toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {school.name}
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)]">
                      /{school.slug}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                <svg className="h-5 w-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Quick Access
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link
            href="/programs/computer-science"
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  Cross-School Programs
                </p>
                <p className="mt-0.5 text-sm text-[var(--text-tertiary)]">
                  Compare resources across universities
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin"
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  Admin Dashboard
                </p>
                <p className="mt-0.5 text-sm text-[var(--text-tertiary)]">
                  Manage content and courses
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/superadmin/schools"
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm card-hover"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  Super Admin
                </p>
                <p className="mt-0.5 text-sm text-[var(--text-tertiary)]">
                  Platform-wide management
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
