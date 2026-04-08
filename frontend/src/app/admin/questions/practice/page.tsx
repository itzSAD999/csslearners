import Link from "next/link";

export default function AdminPracticeQuestionsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">
        Admin - Practice Questions
      </h1>
      <div className="mt-4">
        <Link href="/admin/questions/practice/new" className="text-indigo-700 underline">
          Create practice question
        </Link>
      </div>
    </main>
  );
}
