import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please provide a valid email address.")
    .max(255),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(1024),
});

export type LoginInput = z.infer<typeof loginSchema>;
