import { requireServerAdmin } from "@/lib/auth/presentation/guard";
import { DashboardView } from "./dashboard-view";

export const instant = false;

export default async function AdminDashboardPage() {
  const admin = await requireServerAdmin();

  return <DashboardView initialAdmin={admin} />;
}
