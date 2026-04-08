import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function SuperAdminSchoolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title="Super Admin — Schools"
        description="Onboard and activate new schools without code changes."
        badges={["🛡️ Super Admin"]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Super Admin" },
          { label: "Schools" },
        ]}
      >
        <Link
          href="/superadmin/admins"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          Manage all admins →
        </Link>
      </PageShell>
    </div>
  );
}
