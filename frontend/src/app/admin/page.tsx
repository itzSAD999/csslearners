import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function AdminPage() {
  const sections = [
    { label: "Assignments", href: "/admin/assignments", icon: "📝", desc: "Manage questions and solution releases" },
    { label: "Passco", href: "/admin/passco", icon: "📄", desc: "Upload and link past papers" },
    { label: "Verified Questions", href: "/admin/questions/verified", icon: "✅", desc: "Manage credibility levels" },
    { label: "Practice Questions", href: "/admin/questions/practice", icon: "🎯", desc: "Topic and difficulty filters" },
    { label: "Content Library", href: "/admin/content", icon: "📚", desc: "Browse and link platform content" },
    { label: "Courses", href: "/admin/courses", icon: "🎓", desc: "Course and lecturer management" },
    { label: "Lecturers", href: "/admin/lecturers", icon: "👨‍🏫", desc: "Lecturer profiles and assignments" },
    { label: "Upload", href: "/admin/upload", icon: "📤", desc: "Upload new content" },
    { label: "Academic Years", href: "/admin/years", icon: "📅", desc: "Year rollover wizard" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title="Admin Dashboard"
        description="Manage content, approvals, release toggles, and academic years for your school."
        badges={["⚙️ Admin"]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Admin" },
        ]}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm card-hover"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {section.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {section.label}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {section.desc}
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
