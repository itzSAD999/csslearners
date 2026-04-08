"use client";

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/mock-data";

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = yearFilter === "all" || c.yearLevel.toString() === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Courses</h1>
          <p className="text-sm text-[var(--text-secondary)]">View and edit the catalog of tracked courses for your institution.</p>
        </div>
        <Link 
          href="/admin/courses/new" 
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <span>+</span> Add Course
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
            placeholder="Search by code or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-9 pr-4 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
        >
          <option value="all">All Year Levels</option>
          <option value="1">Level 100</option>
          <option value="2">Level 200</option>
          <option value="3">Level 300</option>
          <option value="4">Level 400</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-[var(--surface-muted)] text-[var(--text-tertiary)] uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Course Code</th>
                <th className="px-6 py-4">Course Name</th>
                <th className="px-6 py-4">Year Level</th>
                <th className="px-6 py-4">Semester</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[var(--text-primary)]">
                       <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {course.code}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-primary)] font-medium">{course.name}</td>
                    <td className="px-6 py-4">Level {course.yearLevel}00</td>
                    <td className="px-6 py-4">Sem {course.semester}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No courses found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-[var(--surface-muted)] px-6 py-3 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Showing {filteredCourses.length} entries</span>
          <div className="flex gap-1">
             <button className="px-3 py-1 text-xs border border-[var(--border)] rounded bg-white text-slate-400 cursor-not-allowed">Prevent</button>
             <button className="px-3 py-1 text-xs border border-[var(--border)] rounded bg-white hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
