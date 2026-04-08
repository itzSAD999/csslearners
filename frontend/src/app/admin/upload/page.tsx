"use client";

import { useState } from "react";
import { PageShell } from "@/components/ui/page-shell";

export default function ResourceUploadPage() {
  const [formData, setFormData] = useState({
    resourceType: "passco",
    courseId: "",
    title: "",
    year: "2023",
    uploadMethod: "file",
    url: ""
  });

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.courseId) newErrors.courseId = "Course selection is required";
    if (!formData.title.trim()) newErrors.title = "A descriptive title is required";
    
    if (formData.uploadMethod === "file" && !file) {
      newErrors.file = "Please upload a file";
    } else if (formData.uploadMethod === "url" && !formData.url.trim()) {
      newErrors.url = "Please provide an external link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Fake upload delay
    setIsSubmitting(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({ ...formData, title: "", url: "" });
      setFile(null);
    }, 3000);
  };

  return (
    <PageShell
      title="Upload Curriculum Resource"
      description="Upload past papers, slides, assignment briefs, or verified solution PDFs."
      badges={["Admin", "Storage Area"]}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Resource Center" },
      ]}
    >
      <div className="max-w-4xl mx-auto py-8 lg:flex lg:gap-8 animate-fade-in-up">
        
        {/* Left Form Area */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[var(--border)] bg-[var(--surface-muted)] flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Resource Details</h2>
                <p className="text-sm text-[var(--text-secondary)]">Where should this file live?</p>
              </div>
              <span className="text-3xl">📥</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[var(--text-primary)]">Resource Type</label>
                  <select
                    value={formData.resourceType}
                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  >
                    <option value="passco">Passco (Past Question)</option>
                    <option value="slides">Lecture Slides</option>
                    <option value="assignments">Assignment Brief</option>
                    <option value="verified-solutions">Verified Solution</option>
                    <option value="video">Video Link</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[var(--text-primary)]">Linked Course <span className="text-red-500">*</span></label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className={`w-full rounded-lg border ${errors.courseId ? "border-red-500 ring-1 ring-red-500/20" : "border-[var(--border)]"} bg-white px-4 py-2 text-sm focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20`}
                  >
                    <option value="">-- Choose Course --</option>
                    <option value="CSM 151">CSM 151 - Info Tech I</option>
                    <option value="CSM 158">CSM 158 - C++</option>
                    <option value="MATH 161">MATH 161 - Algebra</option>
                  </select>
                  {errors.courseId && <p className="text-xs text-red-500 mt-1">{errors.courseId}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[var(--text-primary)]">Title / Label <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 2021 Midsem Past Question"
                  className={`w-full rounded-lg border ${errors.title ? "border-red-500 ring-1 ring-red-500/20" : "border-[var(--border)]"} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2`}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              {/* Upload method toggle */}
              <div className="pt-4 space-y-4">
                <div className="flex border-b border-[var(--border)] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, uploadMethod: "file" })}
                    className={`flex-1 py-2 text-sm font-semibold text-center border-b-2 transition-colors ${formData.uploadMethod === "file" ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, uploadMethod: "url" })}
                    className={`flex-1 py-2 text-sm font-semibold text-center border-b-2 transition-colors ${formData.uploadMethod === "url" ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
                  >
                    External Link
                  </button>
                </div>

                {formData.uploadMethod === "file" ? (
                  <div className="space-y-1">
                    <div 
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragging ? "border-blue-500 bg-blue-50" : errors.file ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"} ${file ? "bg-emerald-50 border-emerald-300" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input 
                        type="file" 
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                      />
                      
                      {file ? (
                        <div className="flex flex-col items-center">
                          <span className="text-4xl mb-2">📄</span>
                          <p className="text-sm font-bold text-emerald-800">{file.name}</p>
                          <p className="text-xs text-emerald-600 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center pointer-events-none">
                          <span className="text-3xl mb-3 text-slate-400">📤</span>
                          <p className="text-sm font-medium text-slate-700">Drag & drop your file here</p>
                          <p className="text-xs text-slate-500 mt-1">Supported: PDF, PPTX, DOCX, Images (Max 20MB)</p>
                          <div className="mt-4 px-4 py-1.5 rounded bg-white border border-slate-200 text-sm shadow-sm">
                            Browse Files
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.file && <p className="text-xs text-red-500 mt-1 text-center">{errors.file}</p>}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-[var(--text-primary)]">URL <span className="text-red-500">*</span></label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      className={`w-full rounded-lg border ${errors.url ? "border-red-500" : "border-slate-300"} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2`}
                    />
                    {errors.url && <p className="text-xs text-red-500 mt-1">{errors.url}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-[var(--surface-muted)] border-t border-[var(--border)] flex items-center justify-between">
              {success ? (
                 <div className="flex bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold items-center gap-2">
                    ✅ Uploaded securely!
                 </div>
              ) : <div/>}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[var(--accent)] px-8 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:transform-none transition-all"
              >
                {isSubmitting ? "Uploading..." : "Confirm Upload"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Info Panel */}
        <div className="hidden lg:block w-80 space-y-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <span className="text-emerald-500 text-lg">🛡️</span> Upload Guidelines
            </h3>
            <ul className="text-sm text-[var(--text-secondary)] space-y-3 mt-4">
              <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> Passco should be un-watermarked PDFs if possible.</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> Slide decks must be compressed before uploading.</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> External videos (YouTube or Google Drive) perform better than raw video uploads.</li>
            </ul>
          </div>
        </div>
        
      </div>
    </PageShell>
  );
}
