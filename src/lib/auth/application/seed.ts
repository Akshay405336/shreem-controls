import { prisma } from "../../db/prisma";
import { getAuthConfig } from "../infrastructure/env";
import { hashPassword } from "../infrastructure/password";
import type { AdminSafeUser } from "../domain/types";

export interface SeedOptions {
  name?: string;
  email?: string;
  password?: string;
  prismaClient?: typeof prisma;
}

/**
 * Seeds or replaces the bootstrap-managed super-admin using environment credentials.
 * Every run replaces the previous bootstrap-managed account and revokes its sessions inside a transaction.
 */
export async function seedSuperAdmin(options: SeedOptions = {}): Promise<AdminSafeUser> {
  const config = getAuthConfig();
  const db = options.prismaClient ?? prisma;

  const rawName = options.name ?? config.ADMIN_NAME;
  const rawEmail = options.email ?? config.ADMIN_EMAIL;
  const rawPassword = options.password ?? config.ADMIN_PASSWORD;

  if (!rawName || typeof rawName !== "string" || !rawName.trim()) {
    throw new Error("[Seed Error] ADMIN_NAME must be provided and non-empty.");
  }
  if (!rawEmail || typeof rawEmail !== "string" || !rawEmail.includes("@")) {
    throw new Error("[Seed Error] ADMIN_EMAIL must be a valid email address.");
  }
  if (!rawPassword || typeof rawPassword !== "string" || rawPassword.length < 8) {
    throw new Error("[Seed Error] ADMIN_PASSWORD must be at least 8 characters long.");
  }

  const name = rawName.trim();
  const email = rawEmail.trim().toLowerCase();
  const passwordHash = await hashPassword(rawPassword);

  const createdSuperAdmin = await db.$transaction(async (tx) => {
    // 1. Locate previous bootstrap-managed super-admin
    const previousBootstrap = await tx.adminUser.findFirst({
      where: { isBootstrapManaged: true },
    });

    if (previousBootstrap) {
      // 2. Revoke and delete all sessions belonging to the previous bootstrap super-admin
      await tx.adminSession.deleteMany({
        where: { adminUserId: previousBootstrap.id },
      });

      // 3. Permanently delete the previous bootstrap super-admin account
      await tx.adminUser.deleteMany({
        where: { id: previousBootstrap.id },
      });
    }

    // 4. Ensure no non-bootstrap account is colliding with the target email
    const conflictingNonBootstrap = await tx.adminUser.findUnique({
      where: { email },
    });

    if (conflictingNonBootstrap) {
      throw new Error(
        `[Seed Error] Cannot seed super-admin: A non-bootstrap account already exists with email "${email}".`,
      );
    }

    // 5. Create the new bootstrap-managed super-admin
    return await tx.adminUser.create({
      data: {
        name,
        email,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
        isBootstrapManaged: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  });

  return createdSuperAdmin;
}
