import Link from "next/link";

export default function AdminYearsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Admin - Academic Years</h1>
      <div className="mt-4">
        <Link href="/admin/years/new" className="text-indigo-700 underline">
          Open year rollover wizard
        </Link>
      </div>
    </main>
  );
}
