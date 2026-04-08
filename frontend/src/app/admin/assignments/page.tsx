"use client";

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/mock-data";

export default function AdminAssignmentsPage() {
  const mockAssignments = [
    { id: "a1", course: "CSM 158", title: "Assignment 1: C++ Pointers", dueDate: "2024-05-10", released: true },
    { id: "a2", course: "CSM 281", title: "Mini Project: Inheritance", dueDate: "2024-06-01", released: false },
    { id: "a3", course: "MATH 161", title: "Problem Set 4: Matrices", dueDate: "2024-04-15", released: true },
  ];

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
              {mockAssignments.map((assignment) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
