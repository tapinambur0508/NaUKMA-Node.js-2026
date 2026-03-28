import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must be less than 100 characters"),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be between 8 to 16 characters")
    .max(16, "Password should be between 8 to 16 characters"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be between 8 to 16 characters")
    .max(16, "Password should be between 8 to 16 characters"),
});

export const requestPasswordResetSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password should be between 8 to 16 characters")
    .max(16, "Password should be between 8 to 16 characters"),
  code: z.string(),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
export type RequestPassWordResetDTO = z.infer<
  typeof requestPasswordResetSchema
>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
