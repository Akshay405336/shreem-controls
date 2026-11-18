import { hash, verify } from "@node-rs/argon2";

/**
 * Hashes a plaintext password using Argon2id with secure modern parameters.
 */
export async function hashPassword(plainTextPassword: string): Promise<string> {
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    throw new Error("Password must be a non-empty string.");
  }
  return await hash(plainTextPassword, {
    memoryCost: 19456, // 19 MiB
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

/**
 * Verifies a plaintext password against an Argon2 hash.
 */
export async function verifyPassword(
  hashedPassword: string,
  plainTextPassword: string,
): Promise<boolean> {
  if (!hashedPassword || !plainTextPassword) {
    return false;
  }
  try {
    return await verify(hashedPassword, plainTextPassword);
  } catch {
    return false;
  }
}
