import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export default function SuperAdminAdminsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageShell
        title="Super Admin — Admins"
        description="Assign and audit SUPER_ADMIN, SCHOOL_ADMIN, and PROGRAM_ADMIN roles."
        badges={["🛡️ Super Admin", "Access Control"]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Super Admin" },
          { label: "Admins" },
        ]}
      >
        <Link
          href="/superadmin/schools"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
        >
          Manage schools →
        </Link>
      </PageShell>
    </div>
  );
}
