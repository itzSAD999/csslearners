"use client";

import { useState } from "react";
import { schools } from "@/lib/mock-data";

export default function SuperadminSchoolsPage() {
  const [tenantList, setTenantList] = useState(schools);

  const toggleStatus = (id: string) => {
    setTenantList(tenantList.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

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

      <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden mt-8">
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
              {tenantList.map((tenant) => (
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
                       className={`relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in focus:outline-none`}
                     >
                       <span className={`block w-6 h-6 rounded-full bg-white border-2 absolute top-0 transition-transform duration-200 ease-in-out ${tenant.isActive ? "translate-x-6 border-emerald-500" : "translate-x-0 border-slate-600"}`} />
                       <span className={`block overflow-hidden h-6 rounded-full transition-colors duration-200 ${tenant.isActive ? "bg-emerald-500" : "bg-slate-700"}`} />
                     </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-400 hover:text-blue-300 font-medium">Config</button>
                    <button className="text-red-400 hover:text-red-300 font-medium">Drop Tenant</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
