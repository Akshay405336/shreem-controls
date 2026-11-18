import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { prisma } from "../src/lib/db/prisma";
import { seedSuperAdmin } from "../src/lib/auth/application/seed";
import { verifyPassword } from "../src/lib/auth/infrastructure/password";

describe("Super-Admin Seeding Logic", () => {
  beforeEach(async () => {
    // Clean up test database before each test
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});
  });

  afterAll(async () => {
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});
    await prisma.$disconnect();
  });

  it("should fail clearly when required environment credentials are missing", async () => {
    await expect(
      seedSuperAdmin({
        name: "",
        email: "admin@example.com",
        password: "ValidPassword123!",
      }),
    ).rejects.toThrow("ADMIN_NAME must be provided and non-empty");

    await expect(
      seedSuperAdmin({
        name: "Admin",
        email: "not-an-email",
        password: "ValidPassword123!",
      }),
    ).rejects.toThrow("ADMIN_EMAIL must be a valid email address");

    await expect(
      seedSuperAdmin({
        name: "Admin",
        email: "admin@example.com",
        password: "short",
      }),
    ).rejects.toThrow("ADMIN_PASSWORD must be at least 8 characters long");
  });

  it("should create the initial bootstrap-managed super-admin with a hashed password", async () => {
    const admin = await seedSuperAdmin({
      name: "Initial Super Admin",
      email: "super1@moorgen.com",
      password: "PasswordInitial123!",
    });

    expect(admin.id).toBeDefined();
    expect(admin.name).toBe("Initial Super Admin");
    expect(admin.email).toBe("super1@moorgen.com");
    expect(admin.role).toBe("SUPER_ADMIN");

    // Verify stored record in database
    const dbAdmin = await prisma.adminUser.findUnique({
      where: { id: admin.id },
    });

    expect(dbAdmin).not.toBeNull();
    expect(dbAdmin?.isBootstrapManaged).toBe(true);
    expect(dbAdmin?.isActive).toBe(true);
    expect(dbAdmin?.passwordHash).not.toBe("PasswordInitial123!");
    expect(dbAdmin?.passwordHash.startsWith("$argon2id$")).toBe(true);

    const isMatch = await verifyPassword(dbAdmin!.passwordHash, "PasswordInitial123!");
    expect(isMatch).toBe(true);
  });

  it("should replace the previous bootstrap super-admin and delete its sessions on reseeding", async () => {
    // 1. First seed
    const firstAdmin = await seedSuperAdmin({
      name: "Admin One",
      email: "admin1@moorgen.com",
      password: "PasswordOne123!",
    });

    // Create an active session for Admin One
    const session = await prisma.adminSession.create({
      data: {
        adminUserId: firstAdmin.id,
        refreshTokenHash: "hash-session-admin-one",
        expiresAt: new Date(Date.now() + 1000 * 60 * 15),
        refreshExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    expect(await prisma.adminSession.count()).toBe(1);

    // 2. Reseed with new credentials
    const secondAdmin = await seedSuperAdmin({
      name: "Admin Two",
      email: "admin2@moorgen.com",
      password: "PasswordTwo123!",
    });

    expect(secondAdmin.id).not.toBe(firstAdmin.id);
    expect(secondAdmin.email).toBe("admin2@moorgen.com");
    expect(secondAdmin.name).toBe("Admin Two");

    // Admin One must be permanently deleted
    const oldAdminCheck = await prisma.adminUser.findUnique({
      where: { id: firstAdmin.id },
    });
    expect(oldAdminCheck).toBeNull();

    // Admin One's sessions must be deleted
    const oldSessionCheck = await prisma.adminSession.findUnique({
      where: { id: session.id },
    });
    expect(oldSessionCheck).toBeNull();

    // Total admin users must be exactly 1
    const totalAdmins = await prisma.adminUser.count();
    expect(totalAdmins).toBe(1);
  });

  it("should preserve unrelated non-bootstrap records during reseeding", async () => {
    // Create an unrelated non-bootstrap staff admin
    const regularAdmin = await prisma.adminUser.create({
      data: {
        name: "Regular Staff Admin",
        email: "staff@moorgen.com",
        passwordHash: "$argon2id$dummyhash",
        role: "SUPER_ADMIN",
        isBootstrapManaged: false,
      },
    });

    // Seed super admin
    await seedSuperAdmin({
      name: "Bootstrap Super Admin",
      email: "bootstrap@moorgen.com",
      password: "BootstrapSecret123!",
    });

    // Verify non-bootstrap user was untouched
    const staffCheck = await prisma.adminUser.findUnique({
      where: { id: regularAdmin.id },
    });
    expect(staffCheck).not.toBeNull();
    expect(staffCheck?.email).toBe("staff@moorgen.com");

    // Reseed bootstrap super admin
    await seedSuperAdmin({
      name: "Bootstrap Super Admin Updated",
      email: "bootstrap.updated@moorgen.com",
      password: "NewBootstrapSecret123!",
    });

    // Non-bootstrap admin is still preserved
    const staffCheckAfter = await prisma.adminUser.findUnique({
      where: { id: regularAdmin.id },
    });
    expect(staffCheckAfter).not.toBeNull();
    expect(staffCheckAfter?.name).toBe("Regular Staff Admin");
  });

  it("should roll back safely and preserve previous state if replacement fails", async () => {
    // 1. Initial valid bootstrap super admin
    const originalAdmin = await seedSuperAdmin({
      name: "Original Admin",
      email: "original@moorgen.com",
      password: "OriginalPassword123!",
    });

    // Create a regular user with email conflicting-email@moorgen.com
    await prisma.adminUser.create({
      data: {
        name: "Existing User",
        email: "conflict@moorgen.com",
        passwordHash: "$argon2id$dummy",
        isBootstrapManaged: false,
      },
    });

    // 2. Attempt seeding with the conflicting email (should fail and rollback)
    await expect(
      seedSuperAdmin({
        name: "Failing Admin",
        email: "conflict@moorgen.com",
        password: "ValidPassword123!",
      }),
    ).rejects.toThrow("Cannot seed super-admin");

    // 3. Original admin must still exist because transaction rolled back
    const stillOriginal = await prisma.adminUser.findUnique({
      where: { id: originalAdmin.id },
    });
    expect(stillOriginal).not.toBeNull();
    expect(stillOriginal?.name).toBe("Original Admin");
  });
});
