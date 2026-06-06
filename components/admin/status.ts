import { LEAD_STATUSES, type LeadStatus } from "@/lib/storage/types";

/** Dutch labels for the internal dashboard (founder-facing). */
export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Nieuw",
  contacted: "Contact gehad",
  quoted: "Offerte verstuurd",
  confirmed: "Bevestigd",
  closed: "Afgerond",
};

export const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-terracotta/15 text-terracotta",
  contacted: "bg-champagne/40 text-charcoal-soft",
  quoted: "bg-olive/15 text-olive-dark",
  confirmed: "bg-olive text-cream",
  closed: "bg-charcoal/10 text-charcoal-muted",
};

export { LEAD_STATUSES };
export type { LeadStatus };
