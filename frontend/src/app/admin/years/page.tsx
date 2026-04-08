"use client";

export default function AdminYearsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Academic Year Rollover Wizard</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage system-wide academic terms. Roll over to a new year to archive old data and increment student levels.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-8">
        
        <div className="flex items-center gap-4 mb-8">
           <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">🗓️</div>
           <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Current Academic Term: <span className="text-[var(--accent)]">2023/2024</span></h2>
              <p className="text-sm font-medium text-[var(--text-secondary)]">Semester 2 is currently active.</p>
           </div>
        </div>

        <div className="space-y-4 border-t border-[var(--border)] pt-8">
          <h3 className="font-bold text-[var(--text-primary)]">Execute Rollover to 2024/2025</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Warning: Running the rollover wizard will perform the following destructive actions across the platform:
          </p>
          
          <ul className="space-y-3 text-sm text-[var(--text-tertiary)] bg-red-50/50 border border-red-100 rounded-lg p-5">
            <li className="flex items-center gap-2"><span className="text-red-500">⚠️</span> Archives all current assignments into Passco.</li>
            <li className="flex items-center gap-2"><span className="text-red-500">⚠️</span> Resets student progress tracking schemas.</li>
            <li className="flex items-center gap-2"><span className="text-red-500">⚠️</span> Unpublishes lecturer profiles pending re-assignment.</li>
          </ul>

          <div className="pt-4 flex items-center gap-4">
             <button className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg shadow-md hover:bg-red-700 transition-colors">
                Run Rollover Configuration
             </button>
             <button className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Just Start New Semester
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
