# HuisFeest — Pre-launch QA checklist

Run this checklist before making the site public. Test on desktop (1280px+) and mobile (375px) using a real device or browser dev tools.

Check each item as you verify it. All items must pass before going live.

---

## 1. Public site — Dutch

- [ ] `https://huisfeest.nl` loads and shows the Dutch homepage
- [ ] Browser tab title reads: "HuisFeest — Vier thuis, zonder zorgen"
- [ ] Language toggle in the header is visible and shows "EN"
- [ ] Clicking EN toggle navigates to `/en` and shows English content
- [ ] Navigating back to `/` shows Dutch content again
- [ ] Skip-to-content link is accessible via keyboard (Tab on page load)

### Sections (Dutch homepage)
- [ ] Cinematic hero loads — canvas renders, scroll chapters appear as you scroll
- [ ] Hero loading indicator appears briefly, then disappears after load
- [ ] `Reduced-motion` mode: enable in OS accessibility settings → hero shows static fallback, no canvas errors in console
- [ ] Positioning section renders all 5 service pillars without overflow
- [ ] Occasions grid shows 6 occasions, all readable on mobile
- [ ] Packages section shows 4 editorial cards, no prices shown (only "Prijzen op aanvraag")
- [ ] How it works shows 4 numbered steps
- [ ] Gallery section renders placeholder tiles with labels (no broken images)
- [ ] Testimonials section is **not visible** (SHOW_TESTIMONIALS=false)
- [ ] FAQ section: clicking a question expands the answer
- [ ] Inquiry section is visible with a complete form

### Navigation
- [ ] All header nav links scroll to correct sections
- [ ] "Vraag jouw avond aan" CTA scrolls to inquiry form
- [ ] "WhatsApp" header link opens WhatsApp in new tab with correct number
- [ ] Header becomes solid background on scroll (not transparent)
- [ ] Sticky WhatsApp FAB (bottom-right button) is visible on mobile
- [ ] FAB opens WhatsApp with the default Dutch message

---

## 2. Public site — English

- [ ] `https://huisfeest.nl/en` loads and shows the English homepage
- [ ] All section headings and body text are in English
- [ ] "EN" toggle in header shows "NL" (already on English)
- [ ] Clicking NL navigates back to Dutch at `/`
- [ ] Inquiry form labels are in English
- [ ] WhatsApp FAB opens with the English default message

---

## 3. Pricing page

- [ ] `/prijzen` loads the Dutch pricing page
- [ ] `/en/prijzen` loads the English pricing page (same layout, English copy)
- [ ] All 4 package cards display correctly
- [ ] Price range shows "Prijs op aanvraag" / "Price on request" (TODO not yet filled) OR real range if filled
- [ ] CTA button on each card links to `/#contact`
- [ ] FAQ section renders 4 questions
- [ ] Footer CTA section is visible with a link to `/#contact`
- [ ] Footer link to "Prijzen" works (if added to nav)

---

## 4. Legal pages

- [ ] `/privacy` renders Dutch privacy policy with all sections
- [ ] `/en/privacy` renders English privacy policy with all sections
- [ ] `/voorwaarden` renders Dutch terms with all sections
- [ ] `/en/voorwaarden` renders English terms with all sections
- [ ] All `TODO:` items are visible to the founder as text (not hidden)
- [ ] Footer links to privacy and terms work correctly in both locales
- [ ] "Cookie-instellingen" / "Cookie settings" link appears in footer

---

## 5. Cookie banner

- [ ] Clear cookies for site → reload → cookie banner appears at the bottom of the page
- [ ] Banner text is in Dutch on `/` and English on `/en`
- [ ] Clicking "Akkoord" / "Accept" → banner disappears
- [ ] Reload page → banner does not reappear (consent cookie is set)
- [ ] Click "Cookie-instellingen" link in footer → banner reappears
- [ ] Clicking "Weigeren" / "Decline" → banner disappears
- [ ] Reload → banner does not reappear
- [ ] Banner is keyboard-navigable (Tab key reaches both buttons)
- [ ] "Meer informatie" link navigates to the privacy page

---

## 6. Inquiry form

- [ ] All required fields are marked correctly
- [ ] Submit with all fields empty → validation errors appear for required fields
- [ ] Fill in only email (no name) → name validation error appears
- [ ] Fill in all required fields → form submits successfully
- [ ] Success state appears after submission
- [ ] "Verder via WhatsApp" button in success state opens WhatsApp
- [ ] Check `/admin` → new lead appears in the list
- [ ] Lead detail shows all submitted field values correctly
- [ ] Honeypot field (`company`) is NOT visible to users (check page source: it's there but hidden)
- [ ] Submitting with the honeypot field filled → form appears to succeed but no lead is stored
- [ ] If RESEND_API_KEY is set: confirmation email arrives to the submitted email address
- [ ] If RESEND_API_KEY is set: admin notification email arrives to ADMIN_EMAIL inbox

---

## 7. Admin dashboard

- [ ] Visiting `/admin` while not logged in → redirects to `/admin/login`
- [ ] Login page renders with a password field and submit button
- [ ] Entering wrong password → error message appears, no redirect
- [ ] Entering correct `ADMIN_PASSWORD` → redirected to lead list
- [ ] Lead list shows all submitted inquiries
- [ ] Search field filters leads correctly (try name, city, or event type)
- [ ] Status filter works (e.g., show only "new" leads)
- [ ] Clicking a lead row → lead detail page loads
- [ ] Lead detail shows: name, email, phone, event type, guest count, date, city, package, notes
- [ ] Status dropdown: change status → click save → status updates in the list
- [ ] Internal notes: type something → save → note persists on reload
- [ ] Logout button ends the session
- [ ] After logout, `/admin` redirects to login again
- [ ] `/admin` shows `noindex` in page source (robots meta tag)

---

## 8. Infrastructure

- [ ] `npm run check-content` exits with **1** if any TODO: items remain in content files
- [ ] `npm run check-content` exits with **0** once all TODOs are filled
- [ ] `npx prisma db push` runs without errors against real `DATABASE_URL`
- [ ] `npm run build` produces **0 errors** and **at least 14 static pages**
- [ ] `https://huisfeest.nl/sitemap.xml` returns XML listing all public pages
- [ ] `https://huisfeest.nl/robots.txt` disallows `/admin`

---

## 9. Maintenance mode (soft-launch test)

- [ ] Set `MAINTENANCE_MODE=true` in Coolify → redeploy
- [ ] `https://huisfeest.nl` shows the "Binnenkort beschikbaar" / "Coming soon" page
- [ ] `/admin` still loads and works normally (not blocked)
- [ ] Coming soon page shows WhatsApp button
- [ ] Coming soon page shows `noindex` in source
- [ ] Set `MAINTENANCE_MODE=false` → redeploy → full site returns

---

## 10. Performance & SEO (final pass)

- [ ] Run Lighthouse on `https://huisfeest.nl` → target: 90+ Performance, 100 Accessibility, 100 SEO
- [ ] No console errors on homepage (check browser dev tools)
- [ ] Images have alt text (gallery placeholders, logo)
- [ ] Open Graph preview: paste URL into `https://opengraph.xyz` or similar → title, description, locale show correctly
- [ ] Mobile test on real iPhone or Android device: hero scrolls, form works, banner visible, FAB visible

---

## Sign-off

All items above checked: **[ ]**

Signed off by: _______________________  
Date: _______________________  

The site is ready to go live.
