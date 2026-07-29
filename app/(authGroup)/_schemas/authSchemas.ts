import { z } from "zod";

const registrationBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name is too long" }),

  email: z
    .email({ message: "Please enter a valid email address" })
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" }),

  confirmPassword: z.string(),

  phone: z
    .string()
    .trim()
    .min(7, { message: "Phone number is too short" })
    .regex(/^[+\d\s()-]+$/, { message: "Phone number contains invalid characters" }),

  role: z.enum(["TENANT", "LANDLORD"], {
    message: "Please choose an account type",
  }),
});

export const registrationSchema = registrationBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export type RegistrationValues = z.infer<typeof registrationBaseSchema>;

export const registrationPayloadSchema = registrationBaseSchema.omit({
  confirmPassword: true,
});
export type RegistrationPayload = z.infer<typeof registrationPayloadSchema>;

export const loginSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .trim()
    .toLowerCase(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginValues = z.infer<typeof loginSchema>;
