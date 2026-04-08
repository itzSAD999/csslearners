import Link from "next/link";

export default function AdminAssignmentsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Admin - Assignments</h1>
      <p className="mt-3 text-slate-600">List, release toggles, and workflow status.</p>
      <div className="mt-4 flex gap-4">
        <Link href="/admin/assignments/new" className="text-indigo-700 underline">
          Create new
        </Link>
        <Link href="/admin/assignments/1" className="text-indigo-700 underline">
          Open sample
        </Link>
      </div>
    </main>
  );
}
