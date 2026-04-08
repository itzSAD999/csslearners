"use client";

import { PageShell } from "@/components/ui/page-shell";

export default function AdminSettingsPage() {
  return (
    <PageShell
      title="Platform Settings"
      description="Configure local tenant rules, metadata, and branding for this university."
      badges={["Admin", "Configuration"]}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Settings" }
      ]}
    >
      <div className="max-w-3xl py-8 animate-fade-in-up space-y-8">
        
        {/* Profile Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#da291c] bg-opacity-80" />
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#da291c] to-[#a01d13] text-white flex items-center justify-center text-2xl font-black shadow-md border border-white/20">
              KN
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">KNUST Local Instance</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Kwame Nkrumah University of Science and Technology
              </p>
              <div className="mt-2 text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block rounded-md">
                Instance Online • Version 1.0.2
              </div>
            </div>
          </div>
        </div>

        {/* Global Access Form */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)] bg-[var(--surface-muted)]">
            <h3 className="font-bold text-[var(--text-primary)]">Global Access Control</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-[var(--text-primary)]">Require Student Login</p>
                <p className="text-xs text-[var(--text-tertiary)] max-w-sm mt-1">If enabled, students must authenticate with an `.edu.gh` email to view verified solutions.</p>
              </div>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer disabled:cursor-not-allowed" disabled />
                <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 cursor-not-allowed"></label>
              </div>
            </div>
            
            <hr className="border-[var(--border)]" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-[var(--text-primary)]">Cross-School Visibility</p>
                <p className="text-xs text-[var(--text-tertiary)] max-w-sm mt-1">Allow students from UCC or UG to view your public Passco.</p>
              </div>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle2" id="toggle2" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-emerald-500 appearance-none cursor-pointer" />
                <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-emerald-400 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
