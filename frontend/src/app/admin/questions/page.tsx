"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const mockQuestions = [
    { id: "q1", course: "CSM 151", topic: "Intro to Computing", text: "What does CPU stand for?", difficulty: "easy", options: 4 },
    { id: "q2", course: "CSM 158", topic: "Pointers", text: "What is the size of an integer pointer in a 32-bit system?", difficulty: "medium", options: 4 },
    { id: "q3", course: "CSM 281", topic: "Polymorphism", text: "Which keyword is used to prevent method overriding in Java?", difficulty: "hard", options: 4 },
    { id: "q4", course: "MATH 161", topic: "Set Theory", text: "What is the intersection of A and B?", difficulty: "easy", options: 4 },
    { id: "q5", course: "CSM 255", topic: "Linux Kernel", text: "Which command lists all running processes?", difficulty: "medium", options: 4 },
  ];

  const filteredQuestions = mockQuestions.filter((q) => {
    const matchesSearch = q.course.toLowerCase().includes(searchQuery.toLowerCase()) || q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === "all" || q.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const getDifficultyBadge = (diff: string) => {
    switch(diff) {
      case "easy": return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold uppercase tracking-wider">Easy</span>;
      case "medium": return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold uppercase tracking-wider">Medium</span>;
      case "hard": return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold uppercase tracking-wider">Hard</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Question Bank</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage the global pool of Multiple Choice Questions used for live quizzes.</p>
        </div>
        <Link 
          href="/admin/questions/new" 
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <span>+</span> Add MCQ
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
            placeholder="Search by exact phrase, topic, or course code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-9 pr-4 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all uppercase font-semibold text-slate-600"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy Only</option>
          <option value="medium">Medium Only</option>
          <option value="hard">Hard Only</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-[var(--surface-muted)] text-[var(--text-tertiary)] uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Course & Topic</th>
                <th className="px-6 py-4">Question Snippet</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                       <span className="font-bold text-[var(--text-primary)] block">{q.course}</span>
                       <span className="text-xs text-slate-500">{q.topic}</span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-primary)] font-medium max-w-md truncate">
                        "{q.text}" <span className="text-slate-400 text-xs ml-2 font-normal">({q.options} opts)</span>
                    </td>
                    <td className="px-6 py-4">
                        {getDifficultyBadge(q.difficulty)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No questions match these filters.
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
