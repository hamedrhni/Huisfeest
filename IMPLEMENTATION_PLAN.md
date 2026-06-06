# IMPLEMENTATION_PLAN.md

## Current phase

This file always describes the **current implementation phase in detail**. Updated as the team moves between phases.

> ✅ **Phase 4 — Pre-launch hardening is complete.**
> Build: 0 TypeScript errors, 14 static pages.
> What shipped in Phase 4 is summarised at the bottom of this file.

---

# What needs to happen before HuisFeest goes live

No more code phases are required. The codebase is feature-complete for V1. The remaining steps are all operational — infrastructure, content, and QA.

## Go-live sequence

Run these steps in order. Each step must be verified before moving to the next.

### Step 1 — Fill all content placeholders

Run `npm run check-content` and fill every item it reports.

Specifically:
1. Open `content/nl.ts` and `content/en.ts`
2. Fill every `TODO:` marked string:
   - `privacyPage.sections[0].body` → KvK number, company address
   - `privacyPage.sections[5].body` → privacy contact email
   - `termsPage.sections[0].body` → KvK number, address, legal form
   - `termsPage.sections[2].body` → real cancellation policy percentages and timing
   - `termsPage.sections[5].body` → terms contact email/address
   - `pricingPage.packages[*].range` → indicative price range per package
   - `pricingPage.faq[2].a` → deposit policy
3. Confirm: `npm run check-content` exits with 0

### Step 2 — Provision Coolify infrastructure

See README → "Deploy to Coolify" for the full step-by-step. Summary:
1. Create a PostgreSQL service in Coolify
2. Create the Next.js application, select Nixpacks builder
3. Set start command: `npx prisma db push && npm start`
4. Set all environment variables (see README table)

### Step 3 — Set real environment variables

| Variable | What to set |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://huisfeest.nl` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Real number, digits only |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Real contact email |
| `ADMIN_PASSWORD` | Strong random password |
| `ADMIN_SESSION_SECRET` | 64-char hex string |
| `DATABASE_URL` | PostgreSQL connection string from Coolify |
| `ADMIN_EMAIL` | Inbox for inquiry notifications |
| `RESEND_API_KEY` | From resend.com |
| `EMAIL_FROM` | Verified sender address |
| `SHOW_TESTIMONIALS` | `false` (until real reviews collected) |
| `MAINTENANCE_MODE` | `true` for soft-launch, `false` to go public |

### Step 4 — Verify Resend domain

1. Log into [resend.com](https://resend.com)
2. Add `huisfeest.nl` under Domains and verify DNS records
3. Set `EMAIL_FROM=HuisFeest <noreply@huisfeest.nl>` in Coolify

### Step 5 — Deploy in maintenance mode

1. Set `MAINTENANCE_MODE=true` in Coolify
2. Push to GitHub (or trigger deploy)
3. Verify: `https://huisfeest.nl` shows "Binnenkort beschikbaar"
4. Verify: `https://huisfeest.nl/admin` still works

### Step 6 — Run internal QA

Follow `scripts/qa-checklist.md` completely. Every item must pass.

Key checks:
- Submit a real test inquiry → appears in `/admin` → status updates → emails arrive
- Cookie banner works in both locales
- Pricing page loads correctly
- Legal pages have no `TODO:` visible (Step 1 must be complete first)

### Step 7 — Replace brand assets

| Asset | How |
|---|---|
| Logo | Edit `components/marketing/Logo.tsx` with real SVG |
| Hero footage | Put frames in `public/hero/`, update `FRAME_COUNT` in `CinematicHero.tsx` |
| Gallery images | Replace placeholder tiles in `public/gallery/`, update `Gallery.tsx` |

These can be done after soft-launch if needed. The site is functional without them.

### Step 8 — Go live

1. Point `huisfeest.nl` DNS A record to your Hetzner server IP
2. Coolify auto-provisions SSL via Let's Encrypt
3. Set `MAINTENANCE_MODE=false` in Coolify → redeploy
4. Visit `https://huisfeest.nl` → full site is live

### Step 9 — Post-launch

- Submit `https://huisfeest.nl/sitemap.xml` to Google Search Console
- Run Lighthouse: target 90+ Performance, 100 Accessibility, 100 SEO
- Enable testimonials when real reviews are collected: add to `content/`, set `SHOW_TESTIMONIALS=true`, redeploy

---

## Out of scope (future phases)

- Payments, vendor onboarding, calendar/availability, quote automation
- AI party planning assistant (Phase 8)
- Marketplace with chef/vendor profiles (Phase 9)
- HTML email templates (upgrade from plain text)
- Customer accounts / booking portal

---

## Architecture notes (unchanged from Phase 3)

- Routing: `app/(marketing)/[locale]` (NL no-prefix, EN at `/en`) + `app/(admin)/admin`
- Storage: `LeadStore` interface → `PostgresLeadStore` (Prisma) when `DATABASE_URL` set, else `jsonLeadStore`
- Email: `lib/email/index.ts` — best-effort via Resend, skips gracefully if key missing
- Cookie consent: `CookieBanner.tsx` (client) ↔ `CookieSettingsLink.tsx` (custom event)
- Maintenance mode: `siteConfig.maintenanceMode` baked at build time; `/admin` unaffected
- Deploy: Coolify + Nixpacks. Start: `npx prisma db push && npm start`

---

## Appendix — What shipped in Phase 4

### 4A — Pre-launch content checker
- `scripts/check-content.ts`: scans `content/nl.ts` and `content/en.ts` for `TODO:` strings. Reports file, line number, and section heading context. Exits 1 if any remain, 0 if all clear.
- `package.json`: `"check-content": "tsx scripts/check-content.ts"`
- `tsx` added to devDependencies (TypeScript script runner).

### 4B — Pricing page
- `app/(marketing)/[locale]/prijzen/page.tsx`: bilingual pricing page at `/prijzen` (NL) and `/en/prijzen` (EN). Four editorial package cards with indicative price ranges (all marked `TODO:`). Pricing FAQ. Bottom CTA linking to `/#contact`.
- `content/nl.ts` + `content/en.ts`: added `pricingPage` dictionary (meta, packages with TODO ranges, FAQ, CTA copy).
- `app/sitemap.ts`: added `/prijzen` and `/en/prijzen` with `changeFrequency: "monthly"`, `priority: 0.8`.

### 4C — QA checklist
- `scripts/qa-checklist.md`: 60+ manual QA items covering all critical paths — public site (both locales), pricing page, legal pages, cookie banner, inquiry form, admin dashboard, infrastructure, maintenance mode, and performance.

### 4D — Maintenance mode
- `lib/config.ts`: `siteConfig.maintenanceMode = process.env.MAINTENANCE_MODE === "true"` (default `false`).
- `components/marketing/ComingSoon.tsx`: branded coming-soon page (logo, tagline, WhatsApp CTA). Shows placeholder warning if WhatsApp number is still the placeholder.
- `app/(marketing)/[locale]/layout.tsx`: when `maintenanceMode` is true, renders `<ComingSoon>` instead of the full marketing layout. `generateMetadata` returns noindex. `/admin` layout is completely separate and unaffected.
- `.env.example`: added `MAINTENANCE_MODE=false` with explanation.

### 4E — Build quality
- `npm run build`: ✅ zero TypeScript errors, zero warnings.
- **14 static pages** (up from 12): `/nl/prijzen` and `/en/prijzen` added.
- Maintenance mode build: ✅ also zero errors with `MAINTENANCE_MODE=true`.
