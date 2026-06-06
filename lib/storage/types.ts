/** Lead lifecycle status (kept intentionally simple for V1). */
export const LEAD_STATUSES = ["new", "contacted", "quoted", "confirmed", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Where the inquiry originated and which language the visitor used. */
export type LeadSource = "website" | "whatsapp" | "other";

/**
 * The data captured from the public inquiry form (before server-side enrichment).
 * Keep field names aligned with IMPLEMENTATION_PLAN.md data model.
 */
export interface InquiryInput {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: boolean;
  eventType: string;
  packageInterest: string;
  guestCount: string;
  eventDate: string;
  city: string;
  postcode: string;
  dietaryNotes: string;
  themePreference: string;
  message: string;
}

/** A persisted lead = inquiry input + server-managed metadata. */
export interface Lead extends InquiryInput {
  id: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  status: LeadStatus;
  source: LeadSource;
  language: string; // "nl" | "en"
  adminNotes: string;
}

export interface LeadListFilter {
  status?: LeadStatus;
  search?: string;
}
