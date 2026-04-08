"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Platform Overview", href: "/superadmin", icon: "🌐" },
    { name: "Manage Universities", href: "/superadmin/schools", icon: "🏫" },
    { name: "Global Analytics", href: "/superadmin/analytics", icon: "📈" },
    { name: "Security & Access", href: "/superadmin/security", icon: "🛡️" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-900 text-slate-300">
      {/* ── Sidebar ── */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950 hidden md:block">
        <div className="flex h-full flex-col">
          <div className="px-6 py-6 pb-2 border-b border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Superadmin
            </p>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/superadmin");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-white font-bold"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
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
          
          <div className="p-4 border-t border-slate-800 bg-slate-950 mt-auto">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-red-900 border border-red-700 text-white flex items-center justify-center font-bold font-mono">
                root
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-200">System Owner</p>
                <p className="text-xs text-slate-500">Full Auth</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
