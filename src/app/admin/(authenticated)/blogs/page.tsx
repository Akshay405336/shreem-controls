import type { Metadata } from "next";
import { requireServerAdmin } from "@/lib/auth/presentation/guard";
import { BlogsClientView } from "@/components/admin/blogs/blogs-client-view";

export const metadata: Metadata = {
  title: "Blogs Management | ShreemControls Administration",
  description: "Manage ShreemControls website blog articles and publications.",
};

export const instant = false;

export default async function AdminBlogsPage() {
  await requireServerAdmin();

  return <BlogsClientView />;
}
