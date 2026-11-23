import type { Metadata } from "next";
import { requireServerAdmin } from "@/lib/auth/presentation/guard";
import { VisitingCardsClientView } from "@/components/admin/visiting-cards/visiting-cards-client-view";

export const metadata: Metadata = {
  title: "Visiting Cards | ShreemControls Administration",
  description: "Manage digital visiting cards and QR codes.",
};

export const instant = false;

export default async function AdminVisitingCardsPage() {
  await requireServerAdmin();

  return <VisitingCardsClientView />;
}