import Link from "next/link";
import { StatCard } from "@/components/ui/stat-card";

export default function AdminDashboardPage() {
  const recentActivities = [
    { id: 1, action: "Uploaded Passco", target: "CSM 158 - 2023 End of Sem", time: "2 hours ago", user: "Admin", icon: "📄" },
    { id: 2, action: "Added MCQ Question", target: "Data Structures - Trees", time: "5 hours ago", user: "Dr. Mensah", icon: "🎯" },
    { id: 3, action: "Created Course", target: "MATH 161", time: "1 day ago", user: "Admin", icon: "🎓" },
    { id: 4, action: "Verified Solution", target: "CSM 281 Assignment 1", time: "2 days ago", user: "TA Kwame", icon: "✅" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Overview</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Welcome back. Here's what's happening across your connected universities today.
        </p>
      </div>

      {/* ── Top Level Metrics ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="🎓" value={56} label="Active Courses" />
        <StatCard icon="🎯" value={1240} label="Question Bank" />
        <StatCard icon="📄" value={312} label="Uploaded Passco" />
        <StatCard icon="⏳" value={14} label="Pending Reviews" />
      </div>

      {/* ── Dashboard Grid ── */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left Column: Quick Actions & Alerts */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              <Link href="/admin/upload" className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors">
                <span className="flex items-center gap-2"><span className="text-lg">📤</span> Upload Resource</span>
                <span>+</span>
              </Link>
              <Link href="/admin/questions/new" className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors">
                <span className="flex items-center gap-2"><span className="text-lg">🎯</span> Add MCQ Question</span>
                <span>+</span>
              </Link>
              <Link href="/admin/courses/new" className="flex items-center justify-between rounded-lg bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-100 transition-colors">
                <span className="flex items-center gap-2"><span className="text-lg">🎓</span> Create Course</span>
                <span>+</span>
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
              <span>⚠️</span> Year Rollover Approaching
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed mb-3">
              The 2023/2024 academic year ends soon. Run the Rollover Wizard to cleanly transition students to the new year.
            </p>
            <Link href="/admin/years" className="text-sm font-bold text-amber-800 hover:underline">
              Run Wizard →
            </Link>
          </div>

        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm h-full">
            <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                Recent Activity
              </h2>
              <Link href="/admin/activity" className="text-sm font-semibold text-[var(--accent)] hover:underline">
                View All
              </Link>
            </div>
            
            <div className="p-0">
              <ul className="divide-y divide-[var(--border)]">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="p-5 hover:bg-[var(--surface-muted)] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl shadow-sm border border-slate-200">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {activity.action} <span className="text-slate-400 font-normal mx-1">in</span> <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-1">
                          {activity.time} • by {activity.user}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-5 border-t border-[var(--border)] bg-[var(--surface-muted)] rounded-b-xl flex items-center justify-center">
                <span className="text-xs text-slate-400 font-medium tracking-wide">End of recent history</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
