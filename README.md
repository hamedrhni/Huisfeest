# HuisFeest

Premium private celebration & home-hosting service (Netherlands). This repo is the **V1 foundation**: a bilingual (Dutch default / English) marketing website with a cinematic scroll hero, inquiry-first booking flow, sticky WhatsApp CTA, and a lightweight admin dashboard for managing leads.

> **Status:** V1 build complete. Brand assets, photography, real reviews, WhatsApp number, and domain are **placeholders** — see [Placeholder inventory](#placeholder-inventory).

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- **Zod** for server-side validation
- **Prisma** + **PostgreSQL** for lead storage (auto-detected via `DATABASE_URL`)
- **Resend** for transactional email (optional — skipped gracefully if key is missing)
- Bilingual content in `content/` (no hardcoded UI strings)
- Cinematic hero via **canvas** (procedural scene, swappable to a real image sequence)
- Admin auth: single shared password + signed, httpOnly session cookie
- Deploy target: **Coolify on Hetzner** (Nixpacks builder, native Next.js support)

---

## Quick start (local dev)

```bash
# 1. Install dependencies (also runs: prisma generate)
npm install

# 2. Configure environment
cp .env.example .env.local
#    Set at minimum: ADMIN_PASSWORD and ADMIN_SESSION_SECRET
#    Leave DATABASE_URL unset → JSON file stub is used automatically

# 3. Run the dev server
npm run dev
# → http://localhost:3000        (Dutch)
# → http://localhost:3000/en     (English)
# → http://localhost:3000/admin  (dashboard → redirects to /admin/login)
```

Useful scripts: `npm run build`, `npm run start`, `npm run typecheck`.

---

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | recommended | `https://huisfeest.nl` | Absolute base URL for SEO/OG metadata |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **before launch** | `31600000000` | WhatsApp number, digits only (+31 6 00000000 placeholder) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | optional | `hallo@huisfeest.nl` | Public contact email shown on site |
| `ADMIN_PASSWORD` | **yes** | — | Shared admin login password |
| `ADMIN_SESSION_SECRET` | **yes** | — | Long random string for session cookie signing |
| `DATABASE_URL` | production | — | PostgreSQL connection string. If unset → JSON stub |
| `LEAD_STORE` | optional | auto | `postgres` or `json` to override auto-detection |
| `RESEND_API_KEY` | optional | — | Resend API key. If missing, emails are skipped |
| `ADMIN_EMAIL` | optional | `hallo@huisfeest.nl` | Inbox for new inquiry notifications |
| `EMAIL_FROM` | optional | `HuisFeest <noreply@huisfeest.nl>` | Resend sender address (must be on verified domain) |
| `SHOW_TESTIMONIALS` | optional | `false` | Set `true` to show testimonials section (only with real reviews) |

Generate `ADMIN_SESSION_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

See `.env.example` for the complete annotated list.

---

## Project structure

```
app/
  (marketing)/[locale]/      # public site — its own root layout (renders <html lang>)
    layout.tsx               # fonts, header, footer, WhatsApp FAB, CookieBanner
    page.tsx                 # homepage = all sections (testimonials gated by flag)
    privacy/page.tsx         # /privacy (NL) · /en/privacy (EN)
    voorwaarden/page.tsx     # /voorwaarden (NL) · /en/voorwaarden (EN)
  (admin)/admin/             # dashboard — separate root layout, not localized
    layout.tsx               # admin <html> + noindex
    login/page.tsx           # password login
    (dashboard)/             # protected group (requireAdmin in its layout)
      page.tsx               # leads list + filters
      leads/[id]/page.tsx    # lead detail + status/notes
  actions/
    inquiry.ts               # server action: validate → save → send emails
    admin.ts                 # status update, notes, logout
  globals.css                # Tailwind layers + design tokens
  robots.ts                  # robots.txt (public allow, /admin disallow)
  sitemap.ts                 # XML sitemap (all public pages, both locales)
components/
  marketing/                 # Header, CinematicHero, sections, InquiryForm,
                             # CookieBanner, CookieSettingsLink, ...
  admin/                     # status labels/styles
  ui/                        # Section primitives
content/                     # nl.ts (source of truth), en.ts, index.ts
lib/
  i18n/                      # locale config
  storage/                   # LeadStore interface, jsonStore, PostgresLeadStore, selector
  prisma.ts                  # PrismaClient singleton
  email/                     # Resend integration (server-only)
  validation/                # zod inquiry schema
  auth/                      # signed-cookie session
  admin/                     # value→label helpers
  config.ts                  # site config (URL, WhatsApp, feature flags)
prisma/
  schema.prisma              # leads table definition
middleware.ts                # locale routing (nl no-prefix, /en, /nl→canonical)
```

### Multiple root layouts
There is intentionally **no** `app/layout.tsx`. The marketing and admin areas each provide their own root layout.

---

## Deploy to Coolify (Hetzner)

### Prerequisites
- A Hetzner server (or any VPS) with [Coolify](https://coolify.io) installed
- A GitHub repository with this code pushed
- A domain (e.g. `huisfeest.nl`) with DNS access

### Step 1 — Add a PostgreSQL service in Coolify
1. In your Coolify project, click **New Resource → Database → PostgreSQL**.
2. Choose a name (e.g. `huisfeest-postgres`) and click **Deploy**.
3. Copy the **Connection string** from the database's Connection tab. It looks like:
   `postgresql://postgres:PASSWORD@huisfeest-postgres:5432/huisfeest?schema=public`

### Step 2 — Create the Next.js application in Coolify
1. Click **New Resource → Application**.
2. Connect your GitHub repository.
3. **Build Pack:** Nixpacks (auto-detected for Next.js).
4. **Build Command:** `npm run build` (Nixpacks handles `npm install` and `prisma generate` via postinstall).
5. **Start Command:** `npx prisma db push && npm start`
   - `prisma db push` creates the `leads` table on first deploy (safe to re-run).
   - `npm start` runs `next start`.
6. **Port:** 3000.

### Step 3 — Set environment variables in Coolify
In Application → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Connection string from Step 1 |
| `ADMIN_PASSWORD` | Strong random password |
| `ADMIN_SESSION_SECRET` | 64-character hex string (see above) |
| `NEXT_PUBLIC_BASE_URL` | `https://huisfeest.nl` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Real number, digits only |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Real contact email |
| `ADMIN_EMAIL` | Inbox for inquiry notifications |
| `RESEND_API_KEY` | From resend.com (optional — emails skipped if missing) |
| `EMAIL_FROM` | Verified Resend sender, e.g. `HuisFeest <noreply@huisfeest.nl>` |
| `SHOW_TESTIMONIALS` | `false` (flip to `true` when real reviews are in content/) |

### Step 4 — Add custom domain
1. In Coolify, go to Application → **Domains** → add `huisfeest.nl` and `www.huisfeest.nl`.
2. Coolify auto-provisions Let's Encrypt SSL.
3. Point your domain DNS A record to the Hetzner server IP.

### Step 5 — Deploy and verify
1. Click **Deploy**. Coolify builds and starts the app.
2. Verify:
   - `https://huisfeest.nl` loads Dutch homepage
   - `https://huisfeest.nl/en` loads English homepage
   - `https://huisfeest.nl/admin` redirects to login
   - Submit a test inquiry → check `/admin` for the new lead
   - If `RESEND_API_KEY` is set, verify confirmation email arrives

### Re-deploys
Push to your configured branch → Coolify auto-deploys. `prisma db push` in the start command is idempotent (safe to re-run on each deploy).

---

## Resend email setup

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your sending domain (`huisfeest.nl`) in Resend → Domains.
3. Create an API key in Resend → API Keys.
4. Set `RESEND_API_KEY` and `EMAIL_FROM` in Coolify.

Without `RESEND_API_KEY`, inquiry emails are silently skipped — the inquiry is still saved and visible in the admin dashboard.

---

## Lead storage

Business logic depends only on the `LeadStore` interface (`lib/storage/leadStore.ts`).

**Auto-selection:**
- `DATABASE_URL` set → `PostgresLeadStore` (Prisma + PostgreSQL)
- `DATABASE_URL` not set → `jsonLeadStore` (`.data/leads.json`, local dev only)
- Override: set `LEAD_STORE=json` or `LEAD_STORE=postgres` explicitly

**Warning:** The JSON store writes to the local filesystem. On a stateless container (any cloud deploy), it resets between restarts. Always use `DATABASE_URL` in production.

---

## Admin dashboard

- Visit `/admin` → redirected to `/admin/login`.
- Log in with `ADMIN_PASSWORD`. Signed httpOnly cookie, 7-day expiry.
- List view: filter by status / search; click a row for detail.
- Detail view: update status (`new → contacted → quoted → confirmed → closed`) and save internal notes.

---

## Cinematic hero — chapter photos

The hero uses **one photo per scroll chapter** (4 images). As visitors scroll, the background crossfades in sync with the chapter text.

Place your files in `public/hero/`:

| File | Chapter |
|---|---|
| `chapter-01.jpg` | 01 · arrival |
| `chapter-02.jpg` | 02 · table |
| `chapter-03.jpg` | 03 · gathering |
| `chapter-04.jpg` | 04 · hosting |

Paths are defined in `lib/hero-images.ts`. Use landscape JPEGs (~1920×1080). No video frame sequence needed.

---

## Testimonials feature flag

Testimonials are **hidden by default** (`SHOW_TESTIMONIALS=false`). To show them:
1. Add real reviews to `content/nl.ts` and `content/en.ts` → `testimonials.items`.
2. Set `SHOW_TESTIMONIALS=true` in Coolify.
3. Re-deploy.

Never show the placeholder reviews in production — they are clearly marked as samples.

---

## Cookie banner

A GDPR-compliant cookie notice appears on first visit as a bottom bar. Users can accept or decline. Their choice is stored in a `cookie-consent` cookie for 365 days. The footer "Cookie-instellingen / Cookie settings" link reopens the banner to change the choice.

In V1, no third-party analytics or advertising cookies are set — the banner fulfills the legal notification requirement.

---

## Editing content (bilingual copy)

All UI text lives in `content/nl.ts` (typed source of truth) and `content/en.ts` (must mirror its shape). Components never hardcode strings.

- Dutch copy → `content/nl.ts`
- English copy → `content/en.ts`
- Option `value` / package `id` strings must stay **identical** across both files.

---

## Placeholder inventory

Replace these before / at launch:

| Placeholder | How to replace |
|---|---|
| WhatsApp number (+31 6 00000000) | `NEXT_PUBLIC_WHATSAPP_NUMBER` in Coolify |
| Domain / base URL | `NEXT_PUBLIC_BASE_URL` in Coolify |
| Logo (SVG wordmark) | `components/marketing/Logo.tsx` |
| Hero chapter photos | `public/hero/chapter-01.jpg` … `chapter-04.jpg` (see above) |
| Gallery images | `public/gallery/Kaarslicht-01.jpg` … `dechef-06.jpg` (`lib/gallery-images.ts`) |
| Testimonials | `content/nl.ts` + `content/en.ts` → `testimonials.items`, then set `SHOW_TESTIMONIALS=true` |
| Contact email (shown on site) | `NEXT_PUBLIC_CONTACT_EMAIL` in Coolify |
| Admin notification inbox | `ADMIN_EMAIL` in Coolify |
| KvK + company address (privacy/terms) | `content/nl.ts` + `content/en.ts` → `privacyPage` + `termsPage` sections (TODO comments) |
| Cancellation policy | `content/nl.ts` + `content/en.ts` → `termsPage.sections[2]` |
| Resend sender domain | `EMAIL_FROM` in Coolify (after verifying domain in Resend) |
