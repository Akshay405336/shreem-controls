import type { Metadata } from "next";
import { requireServerAdmin } from "@/lib/auth/presentation/guard";
import { GalleryClientView } from "@/components/admin/gallery/gallery-client-view";

export const metadata: Metadata = {
  title: "Gallery Management | ShreemControls Administration",
  description: "Manage ShreemControls website gallery photos and visual assets.",
};

export const instant = false;

export default async function AdminGalleryPage() {
  await requireServerAdmin();

  return <GalleryClientView />;
}
