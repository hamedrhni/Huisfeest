"use server";

import { randomUUID } from "node:crypto";
import { inquirySchema } from "@/lib/validation/inquiry";
import { getLeadStore } from "@/lib/storage";
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/email";
import type { Lead } from "@/lib/storage/types";

export interface InquiryResult {
  ok: boolean;
  /** Field-keyed error codes (mapped to localized copy in the client). */
  errors?: Record<string, string>;
}

function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Server action for the public inquiry form (used with useActionState).
 * Validates server-side, then persists to the active lead store BEFORE the
 * client is allowed to show the success state.
 */
export async function submitInquiry(
  _prev: InquiryResult | null,
  formData: FormData,
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse({
    fullName: str(formData, "fullName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    whatsapp: formData.get("whatsapp") === "on" || formData.get("whatsapp") === "true",
    eventType: str(formData, "eventType"),
    packageInterest: str(formData, "packageInterest"),
    guestCount: str(formData, "guestCount"),
    eventDate: str(formData, "eventDate"),
    city: str(formData, "city"),
    postcode: str(formData, "postcode"),
    dietaryNotes: str(formData, "dietaryNotes"),
    themePreference: str(formData, "themePreference"),
    message: str(formData, "message"),
    company: str(formData, "company"), // honeypot
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "generic");
      // The schema uses the error code as the message (e.g. "name", "email", "contact").
      errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  // Honeypot tripped: silently accept (don't tell the bot) but don't store.
  if (parsed.data.company) {
    return { ok: true };
  }

  const language = str(formData, "language") || "nl";
  const now = new Date().toISOString();

  const lead: Lead = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    source: "website",
    language,
    fullName: parsed.data.fullName,
    email: parsed.data.email ?? "",
    phone: parsed.data.phone ?? "",
    whatsapp: parsed.data.whatsapp,
    eventType: parsed.data.eventType,
    packageInterest: parsed.data.packageInterest ?? "",
    guestCount: parsed.data.guestCount ?? "",
    eventDate: parsed.data.eventDate ?? "",
    city: parsed.data.city ?? "",
    postcode: parsed.data.postcode ?? "",
    dietaryNotes: parsed.data.dietaryNotes ?? "",
    themePreference: parsed.data.themePreference ?? "",
    message: parsed.data.message ?? "",
    adminNotes: "",
  };

  try {
    await getLeadStore().create(lead);
  } catch (err) {
    console.error("[inquiry] failed to persist lead:", err);
    return { ok: false, errors: { generic: "generic" } };
  }

  // Emails are best-effort — a failure must not affect the success response.
  void Promise.all([
    sendCustomerConfirmation(lead).catch((e) =>
      console.error("[inquiry] customer confirmation failed:", e),
    ),
    sendAdminNotification(lead).catch((e) =>
      console.error("[inquiry] admin notification failed:", e),
    ),
  ]);

  return { ok: true };
}
