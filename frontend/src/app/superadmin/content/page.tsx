import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function SuperAdminContentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title="Super Admin — Content"
        description="Control platform-wide content visibility and cross-school sharing."
        badges={["🛡️ Super Admin", "Platform Content"]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Super Admin" },
          { label: "Content" },
        ]}
      >
        <Link
          href="/superadmin/schools"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          Go to schools →
        </Link>
      </PageShell>
    </div>
  );
}
