"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminAssignmentsPage() {
  const mockAssignments = [
    { id: "a1", course: "CSM 158", title: "Assignment 1: C++ Pointers", dueDate: "2024-05-10", released: true },
    { id: "a2", course: "CSM 281", title: "Mini Project: Inheritance", dueDate: "2024-06-01", released: false },
    { id: "a3", course: "MATH 161", title: "Problem Set 4: Matrices", dueDate: "2024-04-15", released: true },
    { id: "a4", course: "CSM 151", title: "Lab 2: Binary Conversions", dueDate: "2024-05-02", released: false },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAssignments = mockAssignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || (statusFilter === "released" ? a.released : !a.released);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Assignments</h1>
          <p className="text-sm text-[var(--text-secondary)]">Toggle the visibility of assignment solutions.</p>
        </div>
        <Link 
          href="/admin/upload" 
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <span>📤</span> Upload Assignment
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] shadow-sm">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or course code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-9 pr-4 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
        >
          <option value="all">All Statuses</option>
          <option value="released">Solutions Released</option>
          <option value="hidden">Solutions Hidden</option>
        </select>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-[var(--surface-muted)] text-[var(--text-tertiary)] uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Title & Course</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status & Solution Visibility</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                       <span className="font-bold text-[var(--text-primary)] block">{assignment.title}</span>
                       <span className="text-xs font-semibold text-[var(--accent)]">{assignment.course}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{assignment.dueDate}</td>
                    <td className="px-6 py-4">
                        {assignment.released ? (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Released Let Students View
                           </span>
                        ) : (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                              <span className="w-2 h-2 rounded-full bg-amber-500" /> Hidden Until Due Date
                           </span>
                        )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium text-xs border border-[var(--border)] hover:border-[var(--accent)] px-3 py-1.5 rounded transition-all">
                         Toggle Visibility
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No assignments match your search filters.
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
