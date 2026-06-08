# TASKS.md

## Purpose

This file tracks all project phases and one-level-deeper work under each phase. It should remain stable as the master task map for the project.

The detailed execution for the **current** phase belongs in `IMPLEMENTATION_PLAN.md`.

> **Build status:** Phase 3 — Operational launch readiness is implemented (see `IMPLEMENTATION_PLAN.md`).
> Checkboxes below reflect what shipped. `[~]` = partially done / placeholder pending real data.

---

## Phase 0 — Discovery and definition

### Goals
- define the business clearly
- confirm V1 scope
- align product, brand, and technical direction

### Tasks
- [x] define brand promise
- [x] confirm name: HuisFeest
- [x] define Dutch and English positioning statement
- [x] confirm service categories
- [x] confirm package architecture
- [x] define V1 vs V2 vs V3 boundaries
- [x] define trust signals needed for a real business website
- [x] review owner's manual and extract reusable cinematic principles

---

## Phase 1 — Design and experience planning

### Goals
- convert business concept into a buildable website and dashboard experience

### Tasks
- [x] define sitemap and homepage structure
- [x] write cinematic hero chapter narrative (NL + EN)
- [x] define visual tone and palette (cream / charcoal / olive / champagne)
- [x] define typography pairings (Playfair Display + Inter)
- [x] define package card layout (editorial, no prices in V1)
- [x] define inquiry form fields
- [x] define dashboard screens
- [x] define mobile behavior for hero and long-form sections
- [x] define bilingual content structure (`content/`)
- [x] create media replacement strategy for hero footage (see README)

---

## Phase 2 — Technical foundation

### Goals
- set up a clean codebase and project architecture for V1

### Tasks
- [x] initialize Next.js project (App Router + TS + Tailwind)
- [x] configure routing structure for marketing and admin (multiple root layouts)
- [x] configure styling system (Tailwind tokens)
- [x] configure bilingual content approach (default-no-prefix NL, /en)
- [x] configure PostgreSQL access patterns (PostgresLeadStore + Prisma; auto-activated by DATABASE_URL; JSON stub default)
- [x] define environment variables (`.env.example`)
- [x] set up admin authentication approach (env password + signed cookie)
- [x] create shared component and utility structure
- [x] define deployment approach (Vercel, documented in README)

---

## Phase 3 — Marketing website build

### Goals
- build the public-facing HuisFeest experience

### Tasks
- [x] build header and navigation (scroll-aware, locale toggle, CTAs)
- [x] build cinematic hero with placeholder sequence (procedural, swappable)
- [x] build services / positioning section
- [x] build occasions section
- [x] build packages section
- [x] build how-it-works section
- [x] build gallery/inspiration section (placeholder tiles)
- [x] build testimonials placeholder structure
- [x] build FAQ section
- [x] build inquiry CTA/footer
- [x] build Dutch and English variations
- [~] optimize responsiveness and performance (responsive done; perf pass in Phase 7)

---

## Phase 4 — Inquiry flow and backend

### Goals
- make the site operational for real inquiries

### Tasks
- [x] create inquiry form component
- [x] implement validation (server-side, zod)
- [x] persist inquiries to PostgreSQL via Prisma (JSON stub in local dev)
- [x] create success state
- [x] create WhatsApp handoff flow
- [x] add source and language tracking
- [x] add basic spam protection (honeypot)
- [ ] test end-to-end submission flow (manual QA pending — see handover)

---

## Phase 5 — Admin dashboard

### Goals
- enable internal operations for managing incoming leads

### Tasks
- [x] build admin login flow
- [x] build lead list page
- [x] build lead detail page
- [x] build status update flow
- [x] build notes functionality
- [x] add search/filter basics
- [x] ensure mobile usability for quick checks
- [x] secure admin routes (requireAdmin + signed cookie)
---

## Phase 4 (this phase) � Pre-launch hardening

### Goals
- add content check tooling, pricing page, maintenance mode, and QA checklist

### Tasks
- [x] add check-content script (scripts/check-content.ts � exits 1 if TODO: remain)
- [x] add pricing page (/prijzen + /en/prijzen � TODO: fill price ranges)
- [x] add maintenance mode / soft-launch (MAINTENANCE_MODE env flag, coming soon page)
- [x] add manual QA checklist (scripts/qa-checklist.md)

---

## Phase 6 — Content, legal, and trust layer

### Goals
- make the real business launch-ready

### Tasks
- [ ] write final bilingual copy (replace V1 placeholders)
- [ ] add real contact details (email, WhatsApp number)
- [ ] add FAQ refinement
- [x] add privacy policy (`/privacy` + `/en/privacy` — TODO: fill KvK and contact details)
- [x] add terms / booking policy (`/voorwaarden` + `/en/voorwaarden` — TODO: fill KvK, contact details, cancellation policy)
- [ ] add trust signals and service-area details
- [ ] replace placeholder testimonials when available
- [ ] add real gallery assets when available
- [x] add pricing page (/prijzen + /en/prijzen � TODO: fill price ranges)
- [x] add GDPR cookie consent banner (bottom bar, locale-aware, 365-day cookie)

---

## Phase 7 — Performance and polish

### Goals
- make the product stable, elegant, and fast enough for launch

### Tasks
- [ ] optimize hero frame loading (when real footage added)
- [ ] optimize images and media
- [x] add reduced-motion fallback
- [ ] test mobile and desktop thoroughly
- [ ] fix overflow and spacing issues
- [ ] improve CTA conversion points
- [ ] verify bilingual layouts
- [x] finalize SEO basics (robots.txt, sitemap.xml, OG tags, canonical URLs, admin noindex)

---

## Phase 8 — AI planner foundation

### Goals
- prepare for intelligent package suggestion

### Tasks
- [ ] define AI planner scope
- [ ] define structured event intake fields
- [ ] define recommendation output format
- [ ] define prompt and guardrail strategy
- [ ] decide whether AI lives on-site or in dashboard support flow
- [ ] plan handoff from AI suggestion to inquiry submission

---

## Phase 9 — Marketplace preparation

### Goals
- prepare the architecture for future multi-vendor evolution

### Tasks
- [ ] define vendor data model
- [ ] define vendor role permissions
- [ ] define service-area logic
- [ ] define vendor profile structure
- [ ] define commission model assumptions
- [ ] define migration path from direct-service business to marketplace

---

## Working rule

Whenever a phase becomes active, update `IMPLEMENTATION_PLAN.md` to become the deep execution guide for that phase.





