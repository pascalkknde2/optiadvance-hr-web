import { z } from "zod";

const passwordField = z
  .string()
  .min(8, "Password must be more than 8 characters")
  .max(15, "Password must be less than 15 characters")
  .regex(/[a-zA-Z]/, "Contain at least one letter.")
  .regex(/[0-9]/, "Contain at least one number.")
  .regex(/[^a-zA-Z0-9]/, "Contain at least one special character.")
  .trim();

const emailField = z.string().min(1, "Email is required").email("Invalid email!");

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(2, "Username must be at least 2 characters."),
  acceptTerms: z.literal(true, "You must accept the terms and conditions"),
});

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const createPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, "You must accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
