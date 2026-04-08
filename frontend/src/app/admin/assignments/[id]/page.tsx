type AdminAssignmentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminAssignmentDetailPage({
  params,
}: AdminAssignmentDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">
        Admin - Manage Assignment #{id}
      </h1>
      <p className="mt-3 text-slate-600">
        Approve pending solutions and control per-solution release toggles.
      </p>
    </main>
  );
}
