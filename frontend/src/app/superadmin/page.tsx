"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";

export default function SuperadminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const serverHealthData = [
    { id: "knust", name: "KNUST Central", status: "online", load: "42%", uptime: "99.9%", lastBackup: "2h ago" },
    { id: "ug", name: "UG Legon", status: "online", load: "68%", uptime: "99.8%", lastBackup: "5h ago" },
    { id: "ucc", name: "UCC Cape Coast", status: "offline", load: "0%", uptime: "0%", lastBackup: "12h ago" },
    { id: "uds", name: "UDS Tamale", status: "warning", load: "92%", uptime: "98.1%", lastBackup: "1h ago" },
    { id: "knust-storage", name: "S3 Blob Storage", status: "online", load: "15%", uptime: "100%", lastBackup: "n/a" },
  ];

  const filteredData = serverHealthData.filter(server => {
     const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) || server.id.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesStatus = statusFilter === "all" || server.status === statusFilter;
     return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Health Overview</h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor API load, database health, and multitenant connections across the CSS Learners cloud.
          </p>
        </div>
      </div>

      {/* ── Top Level Metrics ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Users</p>
           <p className="text-3xl font-black text-white mt-1">12.4k</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Universities</p>
           <p className="text-3xl font-black text-white mt-1">4</p>
        </div>
        <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-5">
           <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">System Status</p>
           <p className="text-lg font-bold text-emerald-400 mt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> All Systems Nominal
           </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bandwidth (30d)</p>
           <p className="text-3xl font-black text-white mt-1">4.2 TB</p>
        </div>
      </div>

      {/* ── Filters Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl mt-8">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search clusters, universities, or database connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 text-slate-200 py-2 pl-9 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 text-slate-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
        >
          <option value="all">All Server States</option>
          <option value="online">Online / Healthy</option>
          <option value="warning">Warning / Heavy Load</option>
          <option value="offline">Offline / Degraded</option>
        </select>
      </div>

      {/* ── Dashboard Data Server Table ── */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase text-xs font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Node Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">CPU / Load</th>
                <th className="px-6 py-4">Uptime (30d)</th>
                <th className="px-6 py-4">Last Backup</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredData.length > 0 ? filteredData.map((node) => (
                <tr key={node.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                     <span className="font-bold text-white block">{node.name}</span>
                     <span className="text-xs text-slate-500 font-mono">id: {node.id}</span>
                  </td>
                  <td className="px-6 py-4">
                     {node.status === "online" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-900/30 text-emerald-400 text-xs font-bold uppercase"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Online</span>}
                     {node.status === "warning" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-900/30 text-amber-400 text-xs font-bold uppercase"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Heavy Load</span>}
                     {node.status === "offline" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-900/30 text-red-400 text-xs font-bold uppercase"><span className="w-1.5 h-1.5 rounded-full bg-red-500"/> Offline</span>}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">{node.load}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{node.uptime}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{node.lastBackup}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white font-medium text-xs border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded transition-all">
                       Examine Logs
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No server nodes match your filter criteria.
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
