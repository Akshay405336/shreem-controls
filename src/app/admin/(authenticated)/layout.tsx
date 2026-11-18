import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminAuthProvider } from "@/components/admin/auth-context";
import { getServerAdmin } from "@/lib/auth/presentation/guard";

// In Next.js 16 with cacheComponents, instant = false indicates runtime dynamic session data
export const instant = false;

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getServerAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminAuthProvider initialAdmin={admin}>
      <div className="flex h-screen overflow-hidden bg-[#F8FAFA]">
        {/* Left Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6 md:p-8 font-sans">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}
