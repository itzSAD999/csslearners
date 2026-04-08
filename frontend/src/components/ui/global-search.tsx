"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/lib/mock-data";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle search modal with Cmd/Ctrl + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  // Filter courses based on query
  const filteredCourses = query === "" 
    ? [] 
    : courses.filter((course) => 
        course.name.toLowerCase().includes(query.toLowerCase()) || 
        course.code.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit results for clean UI

  const handleSelect = (slug: string) => {
    setOpen(false);
    // Hardcoding routing to knust/cs/2024-25 for demo purposes since we don't have back-references from course to school yet
    router.push(`/knust/cs/2024-25/${slug}`);
  };

  return (
    <>
      {/* Search trigger button (looks like an input) */}
      <button
        onClick={() => setOpen(true)}
        className="relative w-full text-left flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-10 pr-4 text-sm text-[var(--text-tertiary)] transition-all hover:border-[var(--border-focus)] hover:bg-white focus:outline-none"
      >
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search courses, questions, passco...
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden rounded border border-[var(--border)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)] sm:inline-block shadow-sm">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm animate-fade-in flex items-start justify-center pt-[10vh] px-4">
          <div 
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center border-b border-slate-100 px-4 py-3">
              <svg className="h-5 w-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a course code or name..."
                className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-slate-400 focus:outline-none text-base"
              />
              <button 
                onClick={() => setOpen(false)}
                className="rounded p-1 ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors text-xs font-semibold"
              >
                ESC
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query === "" ? (
                <div className="py-12 px-4 text-center text-sm text-slate-500">
                  <span className="block text-2xl mb-2">🎓</span>
                  Search for courses across the platform. Try "Python" or "CS 161".
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="py-12 px-4 text-center text-sm text-slate-500">
                  <span className="block text-2xl mb-2">🤔</span>
                  No courses found for "{query}".
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 pb-2 pt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Courses
                  </div>
                  {filteredCourses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleSelect(course.slug)}
                      className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-blue-50 hover:text-blue-700 group rounded-xl transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 font-bold text-xs group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                        {course.code.split(' ')[1] || 'CSS'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                          {course.code} — {course.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {course.semester === 1 ? "First" : "Second"} Semester, Level {course.yearLevel}00
                        </p>
                      </div>
                      <svg className="h-4 w-4 text-slate-300 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Invisible backdrop click handler */}
          <div className="absolute inset-0 z-[-1]" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
