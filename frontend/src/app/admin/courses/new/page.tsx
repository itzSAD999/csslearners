"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function NewCoursePage() {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
    yearLevel: "1",
    semester: "1",
    schoolId: "knust", // Default mock
    programId: "computer-science", 
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.code.trim()) newErrors.code = "Course Code is required";
    else if (!/^[A-Z]{3,4} \d{3}$/.test(formData.code)) newErrors.code = "Format must be like 'CSM 151'";
    
    if (!formData.name.trim()) newErrors.name = "Course Name is required";
    if (!formData.credits || isNaN(Number(formData.credits))) newErrors.credits = "Valid Credit Hours required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({ ...formData, code: "", name: "", credits: "" });
    }, 3000);
  };

  return (
    <PageShell
      title="Add New Course"
      description="Create a new course entry in the curriculum database."
      badges={["Admin", "Curriculum"]}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Courses", href: "/admin/courses" },
        { label: "New" },
      ]}
    >
      <div className="max-w-2xl mx-auto py-8 animate-fade-in-up">
        <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)] bg-[var(--surface-muted)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Course Information</h2>
            <p className="text-sm text-[var(--text-secondary)]">Details must exactly match the official syllabus.</p>
          </div>
          
          <div className="p-6 space-y-6">
            
            {/* Split row: Code & Credits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--text-primary)]">Course Code <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. CSM 151"
                  className={`w-full rounded-lg border ${errors.code ? "border-red-500 focus:ring-red-500/20" : "border-[var(--border)] focus:border-[var(--border-focus)] focus:ring-[var(--accent)]/20"} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all uppercase`}
                />
                {errors.code && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="text-base">⚠️</span> {errors.code}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--text-primary)]">Credit Hours <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                  placeholder="e.g. 3"
                  className={`w-full rounded-lg border ${errors.credits ? "border-red-500 focus:ring-red-500/20" : "border-[var(--border)] focus:border-[var(--border-focus)] focus:ring-[var(--accent)]/20"} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.credits && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="text-base">⚠️</span> {errors.credits}</p>}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--text-primary)]">Course Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Introduction to Structured Program Design"
                className={`w-full rounded-lg border ${errors.name ? "border-red-500 focus:ring-red-500/20" : "border-[var(--border)] focus:border-[var(--border-focus)] focus:ring-[var(--accent)]/20"} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span className="text-base">⚠️</span> {errors.name}</p>}
            </div>

            {/* Split row: Year Level & Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--text-primary)]">Academic Year Level</label>
                <select
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all text-slate-800"
                >
                  <option value="1">Level 100</option>
                  <option value="2">Level 200</option>
                  <option value="3">Level 300</option>
                  <option value="4">Level 400</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--text-primary)]">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all text-slate-800"
                >
                  <option value="1">First Semester</option>
                  <option value="2">Second Semester</option>
                </select>
              </div>
            </div>

          </div>

          <div className="p-6 bg-[var(--surface-muted)] border-t border-[var(--border)] flex items-center justify-between">
            <Link 
              href="/admin/courses"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Cancel
            </Link>
            
            <div className="flex items-center gap-4">
              {success && (
                 <span className="text-sm font-medium text-emerald-600 animate-fade-in-up flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    Saved Successfully!
                 </span>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : "Create Course"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
