"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard Overview", href: "/admin", icon: "📊" },
    { name: "Manage Courses", href: "/admin/courses", icon: "🎓" },
    { name: "Question Bank", href: "/admin/questions", icon: "🎯" },
    { name: "Upload Content", href: "/admin/upload", icon: "📤" },
    { name: "Assignments", href: "/admin/assignments", icon: "📝" },
    { name: "Academic Years", href: "/admin/years", icon: "📅" },
    { name: "Platform Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6 pb-2 border-b border-[var(--border)] flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-4 md:mb-0 md:mt-2">
          Admin Portal
        </p>
        {/* Mobile close button inside sidebar header */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden p-2 -mr-2 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] rounded-lg transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className={`text-xl ${isActive ? "opacity-100" : "opacity-70"}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
        <div className="flex flex-col gap-3">
           <div className="flex items-center gap-3">
             <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
               TA
             </div>
             <div className="text-sm">
               <p className="font-semibold text-slate-800">Kwame Mensah</p>
               <p className="text-xs text-slate-500">Local Administrator</p>
             </div>
           </div>
           
           <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 font-medium">
             <span className="text-slate-400 block mb-0.5 text-[10px] uppercase">Assigned Scope</span>
             KNUST - Computer Science
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[var(--background)] flex-col md:flex-row relative">
      
      {/* ── Mobile Header Overlay Trigger ── */}
      <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 flex items-center justify-between sticky top-[4rem] z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚙️</span>
          <span className="font-semibold text-[var(--text-primary)] text-sm">Admin Portal</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-2 text-[var(--text-secondary)] shadow-sm hover:bg-[var(--border)] transition-colors focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Slide-over panel */}
          <div className="fixed inset-y-0 left-0 z-[100] w-72 bg-[var(--surface)] shadow-2xl animate-[slide-in-right_0.3s_ease-out]">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* ── Desktop Persistent Sidebar ── */}
      <aside className="w-64 flex-shrink-0 border-r border-[var(--border)] bg-[var(--surface)] hidden md:block sticky top-[4rem] h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
        <SidebarContent />
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
