type AdminContentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminContentDetailPage({
  params,
}: AdminContentDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">
        Admin - Content Item #{id}
      </h1>
      <p className="mt-3 text-slate-600">
        Link to course or clone for independent course-level versioning.
      </p>
    </main>
  );
}
