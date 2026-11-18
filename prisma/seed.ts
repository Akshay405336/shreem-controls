import { seedSuperAdmin } from "../src/lib/auth/application/seed";
import { prisma } from "../src/lib/db/prisma";

async function main() {
  try {
    console.log("=================================================");
    console.log(" Moorgen Admin Seeding: Super-Admin Provisioning ");
    console.log("=================================================");

    const admin = await seedSuperAdmin();

    console.log("[Seed] Super-admin provisioned successfully.");
    console.log(`[Seed] ID: ${admin.id}`);
    console.log(`[Seed] Role: ${admin.role}`);
    console.log("[Seed] Note: Previous bootstrap-managed account and its sessions were invalidated.");
    console.log("=================================================");
  } catch (error) {
    console.error("[Seed Error] Failed to seed super-admin:", error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
