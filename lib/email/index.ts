import "server-only";
import { siteConfig } from "@/lib/config";
import type { Lead } from "@/lib/storage/types";

async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping email send");
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // TODO: replace with verified Resend sender domain once huisfeest.nl is set up
      from: siteConfig.emailFrom,
      to,
      subject,
      text,
    });
    if (error) {
      console.error("[email] send failed:", error);
    }
  } catch (err) {
    console.error("[email] unexpected error:", err);
  }
}

export async function sendCustomerConfirmation(lead: Lead): Promise<void> {
  if (!lead.email) return;

  const isNL = lead.language !== "en";
  const subject = isNL
    ? "Bedankt voor je aanvraag — HuisFeest"
    : "Thank you for your enquiry — HuisFeest";

  const waNumber = siteConfig.whatsappNumber;
  const text = isNL
    ? [
        `Hoi ${lead.fullName},`,
        "",
        "Bedankt voor je aanvraag bij HuisFeest. We hebben je verzoek goed ontvangen en nemen zo snel mogelijk — en zeker binnen 24 uur — persoonlijk contact met je op.",
        "",
        `Liever direct schakelen? Stuur ons een berichtje op WhatsApp: +${waNumber}`,
        "",
        "Tot snel!",
        "Het HuisFeest-team",
      ].join("\n")
    : [
        `Hi ${lead.fullName},`,
        "",
        "Thank you for your enquiry at HuisFeest. We've received your request and will be in touch personally as soon as possible — and always within 24 hours.",
        "",
        `Prefer to chat right away? Send us a message on WhatsApp: +${waNumber}`,
        "",
        "Speak soon!",
        "The HuisFeest team",
      ].join("\n");

  await sendEmail(lead.email, subject, text);
}

export async function sendAdminNotification(lead: Lead): Promise<void> {
  const adminEmail = siteConfig.adminEmail;

  const date = lead.eventDate || "datum onbekend";
  const subject = `Nieuwe aanvraag — ${lead.eventType} · ${lead.guestCount || "?"} personen · ${date}`;

  const text = [
    `Nieuwe aanvraag via HuisFeest (taal: ${lead.language})`,
    "",
    `Naam:        ${lead.fullName}`,
    `E-mail:      ${lead.email}`,
    `Telefoon:    ${lead.phone}`,
    `WhatsApp:    ${lead.whatsapp ? "ja" : "nee"}`,
    "",
    `Gelegenheid: ${lead.eventType}`,
    `Arrangement: ${lead.packageInterest || "-"}`,
    `Gasten:      ${lead.guestCount || "-"}`,
    `Datum:       ${lead.eventDate || "-"}`,
    `Plaats:      ${lead.city} ${lead.postcode}`.trim() || "-",
    "",
    `Dieetwensen: ${lead.dietaryNotes || "-"}`,
    `Thema:       ${lead.themePreference || "-"}`,
    "",
    `Bericht:`,
    lead.message || "-",
    "",
    `Aanvraag-ID: ${lead.id}`,
    `Ontvangen:   ${lead.createdAt}`,
  ].join("\n");

  await sendEmail(adminEmail, subject, text);
}
