"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function NewQuestionPage() {
  const [formData, setFormData] = useState({
    courseId: "",
    topic: "",
    difficulty: "medium",
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
    explanation: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.courseId.trim()) newErrors.courseId = "Please select a course";
    if (!formData.topic.trim()) newErrors.topic = "Topic is required";
    if (!formData.question.trim()) newErrors.question = "Question text cannot be empty";
    
    formData.options.forEach((opt, idx) => {
      if (!opt.trim()) newErrors[`option_${idx}`] = "Option cannot be empty";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[idx] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
    setIsSubmitting(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        ...formData,
        question: "",
        options: ["", "", "", ""],
        explanation: "",
        correctAnswerIndex: 0
      }); // Reset question but keep course/topic context for rapid entry
    }, 2500);
  };

  return (
    <PageShell
      title="Question Builder"
      description="Add a new Multiple Choice Question to the global question bank."
      badges={["Admin", "Quiz Engine"]}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Questions", href: "/admin/questions" },
        { label: "New MCQ" },
      ]}
    >
      <div className="max-w-3xl mx-auto py-8 animate-fade-in-up">
        
        {/* Context Hint */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 flex items-start gap-3">
          <span className="text-xl">💡</span>
          <p>
            When adding questions, ensure the <strong>Topic</strong> precisely matches learning modules from the course syllabus to ensure quiz filtering works correctly for students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          {/* Section 1: Classification */}
          <div className="p-6 border-b border-[var(--border)] bg-slate-50">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Course <span className="text-red-500">*</span></label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className={`w-full rounded-md border ${errors.courseId ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"} px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    <option value="">-- Select Course --</option>
                    <option value="CSM 151">CSM 151 - Info Tech I</option>
                    <option value="CSM 158">CSM 158 - Programming with C++</option>
                    <option value="CSM 281">CSM 281 - OOP with JAVA</option>
                  </select>
                  {errors.courseId && <p className="text-xs text-red-500 mt-1">{errors.courseId}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Topic <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g. Arrays & Pointers"
                    className={`w-full rounded-md border ${errors.topic ? "border-red-500 ring-1 ring-red-500" : "border-slate-300"} px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {errors.topic && <p className="text-xs text-red-500 mt-1">{errors.topic}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
             </div>
          </div>
          
          {/* Section 2: Question Setup */}
          <div className="p-6 space-y-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--text-primary)]">Question Text <span className="text-red-500">*</span></label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                rows={3}
                placeholder="Type the actual quiz question here..."
                className={`w-full rounded-lg border ${errors.question ? "border-red-500 focus:ring-red-500/20" : "border-[var(--border)] focus:border-[var(--border-focus)] focus:ring-[var(--accent)]/20"} px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none font-medium`}
              />
              {errors.question && <p className="text-xs text-red-500 mt-1">{errors.question}</p>}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[var(--text-primary)]">Multiple Choices <span className="text-red-500">*</span></label>
              <p className="text-xs text-[var(--text-secondary)] mb-2">Fill in 4 options. Select the radio button next to the correct answer.</p>
              
              {formData.options.map((option, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswerIndex === idx}
                    onChange={() => setFormData({ ...formData, correctAnswerIndex: idx })}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className={`w-full rounded-md border ${errors[`option_${idx}`] ? "border-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"} pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-1`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-[var(--border)]">
              <label className="block text-sm font-semibold text-[var(--text-primary)]">Explanation (Optional)</label>
              <p className="text-xs text-[var(--text-secondary)] mb-2">This is shown to students after they submit their answer.</p>
              <textarea
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                rows={2}
                placeholder="Explain why the correct answer is right..."
                className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all resize-none"
              />
            </div>

          </div>

          <div className="p-6 bg-[var(--surface-muted)] border-t border-[var(--border)] flex items-center justify-between">
             {success ? (
                 <div className="flex bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold items-center gap-2 animate-fade-in-up">
                    ✅ Question added to bank!
                 </div>
              ) : (
                <div className="text-sm text-slate-500">
                  {Object.keys(errors).length > 0 && <span className="text-red-500 flex items-center gap-1">⚠️ Fix errors before saving</span>}
                </div>
              )}
            
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[var(--accent)] px-8 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:transform-none transition-all"
              >
                {isSubmitting ? "Saving to Bank..." : "Save Question"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
