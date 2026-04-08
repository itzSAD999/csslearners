import Link from "next/link";

export default function AdminContentPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Admin - Content Library</h1>
      <p className="mt-3 text-slate-600">
        Browse platform content and decide to link or clone.
      </p>
      <div className="mt-4">
        <Link href="/admin/content/1" className="text-indigo-700 underline">
          Open sample content item
        </Link>
      </div>
    </main>
  );
}
