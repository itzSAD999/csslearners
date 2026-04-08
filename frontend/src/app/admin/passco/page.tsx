import Link from "next/link";

export default function AdminPasscoPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Admin - Passco</h1>
      <p className="mt-3 text-slate-600">Manage papers, links, and historical mapping.</p>
      <div className="mt-4">
        <Link href="/admin/passco/new" className="text-indigo-700 underline">
          Upload or link historical paper
        </Link>
      </div>
    </main>
  );
}
