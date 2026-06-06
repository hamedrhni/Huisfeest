/**
 * Central, environment-driven site config.
 * Everything launch-sensitive (URL, WhatsApp, email) is funneled through here
 * so it can be changed in one place or via env vars in Coolify.
 */

export const siteConfig = {
  name: "HuisFeest",

  // Swap to https://huisfeest.nl by setting NEXT_PUBLIC_BASE_URL when the domain is live.
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://huisfeest.nl",

  // PLACEHOLDER NUMBER (+31 6 00000000). Replace via NEXT_PUBLIC_WHATSAPP_NUMBER before launch.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "31600000000",

  // V1 launch service area.
  serviceArea: {
    primaryCity: "Maastricht",
    region: "Limburg",
  },

  // Public contact email shown on the site and used in email footers.
  // TODO: replace with real inbox before launch.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hallo@huisfeest.nl",

  // Admin notification email for new inquiries. Server-only (not NEXT_PUBLIC).
  // TODO: set ADMIN_EMAIL in Coolify to the real inbox before launch.
  adminEmail: process.env.ADMIN_EMAIL ?? "hallo@huisfeest.nl",

  // Resend "from" address — must be on a domain verified in your Resend account.
  // TODO: set EMAIL_FROM in Coolify once huisfeest.nl is verified in Resend.
  emailFrom: process.env.EMAIL_FROM ?? "HuisFeest <noreply@huisfeest.nl>",

  // Set SHOW_TESTIMONIALS=true in Coolify only when real testimonials are in content/.
  // Hides the testimonials section in production until genuine reviews are available.
  showTestimonials: process.env.SHOW_TESTIMONIALS === "true",

  // Soft-launch mode: shows a branded "coming soon" page for all public routes.
  // /admin is never blocked. Flip to true in Coolify to hide the site during QA.
  // Requires a redeploy to take effect (value is baked at build time for SSG pages).
  maintenanceMode: process.env.MAINTENANCE_MODE === "true",
} as const;

/** True when the WhatsApp number is still the documented placeholder. */
export const isWhatsappPlaceholder = siteConfig.whatsappNumber === "31600000000";
