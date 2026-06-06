import { z } from "zod";

/**
 * Server-side validation for the public inquiry form.
 * Rules are intentionally light (V1 is friction-light), but we guarantee:
 *  - a name is present,
 *  - at least one usable contact channel (email OR phone),
 *  - a chosen event type,
 *  - a valid email format when an email is provided.
 */
export const inquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "name").max(120),
    email: z
      .string()
      .trim()
      .max(160)
      .email("email")
      .optional()
      .or(z.literal("")),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    whatsapp: z.boolean().default(false),
    eventType: z.string().trim().min(1, "eventType").max(40),
    packageInterest: z.string().trim().max(40).optional().or(z.literal("")),
    guestCount: z.string().trim().max(20).optional().or(z.literal("")),
    eventDate: z.string().trim().max(40).optional().or(z.literal("")),
    city: z.string().trim().max(80).optional().or(z.literal("")),
    postcode: z.string().trim().max(20).optional().or(z.literal("")),
    dietaryNotes: z.string().trim().max(500).optional().or(z.literal("")),
    themePreference: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    // Honeypot: must stay empty. Bots tend to fill every field. We don't reject
    // here (so we don't reveal the trap); the action checks it and silently drops.
    company: z.string().max(100).optional().or(z.literal("")),
  })
  .refine((data) => Boolean(data.email) || Boolean(data.phone), {
    message: "contact",
    path: ["contact"],
  });

export type InquirySchema = z.infer<typeof inquirySchema>;
