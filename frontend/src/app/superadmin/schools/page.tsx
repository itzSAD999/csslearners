"use client";

import { useState } from "react";
import { schools } from "@/lib/mock-data";

export default function SuperadminSchoolsPage() {
  const [tenantList, setTenantList] = useState(schools);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleStatus = (id: string) => {
    setTenantList(tenantList.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const filteredTenants = tenantList.filter(t => {
     const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.slug.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? t.isActive : !t.isActive);
     return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in-up w-full max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Universities</h1>
          <p className="text-sm text-slate-400 mt-1">Add new schools and toggle their public accessibility.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors">
          <span>+</span> Map New University
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl mt-8">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by university name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 text-slate-200 py-2 pl-9 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 text-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active (Online)</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase text-xs font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">University Entity</th>
                <th className="px-6 py-4">Brand Hex</th>
                <th className="px-6 py-4">Routing Slug</th>
                <th className="px-6 py-4">Platform Access</th>
                <th className="px-6 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                       {tenant.name}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: tenant.primaryColor }} />
                          <span className="font-mono text-xs text-slate-400">{tenant.primaryColor}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">/{tenant.slug}</td>
                    <td className="px-6 py-4">
                       <button
                         onClick={() => toggleStatus(tenant.id)}
                         title="Toggle Accessibility"
                         className={`relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in focus:outline-none`}
                       >
                         <span className={`block w-6 h-6 rounded-full bg-white border-2 absolute top-0 transition-transform duration-200 ease-in-out ${tenant.isActive ? "translate-x-6 border-emerald-500" : "translate-x-0 border-slate-600"}`} />
                         <span className={`block overflow-hidden h-6 rounded-full transition-colors duration-200 ${tenant.isActive ? "bg-emerald-500" : "bg-slate-700"}`} />
                       </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-emerald-400 hover:text-emerald-300 font-medium">Config</button>
                      <button className="text-red-400 hover:text-red-300 font-medium">Drop</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No universities match your search criteria.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
