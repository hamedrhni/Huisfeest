import { nl } from "@/content/nl";

/**
 * Maps stored option values (locale-independent keys) to human labels for the
 * admin UI. Uses the Dutch dictionary as the founder-facing source.
 */
const eventTypeMap = new Map(nl.inquiry.form.eventTypeOptions.map((o) => [o.value, o.label]));
const packageMap = new Map(nl.inquiry.form.packageOptions.map((o) => [o.value, o.label]));

export function optionLabel(kind: "eventType" | "package", value: string): string {
  if (!value) return "—";
  const map = kind === "eventType" ? eventTypeMap : packageMap;
  return map.get(value) ?? value;
}
