# CLAUDE.md

## Project

**Project name:** HuisFeest  
**Type:** Real business website and lightweight operations platform  
**Market:** Netherlands  
**Languages:** Dutch and English  
**Stage:** Exploratory, but intended for real-world launch  
**Product direction:** Start as a direct-service business website with booking inquiry workflow, then evolve into a multi-vendor marketplace later.

## Core concept

HuisFeest is a Netherlands-based private celebration and home-hosting service that combines:
- private chef experiences
- grazing and fruit tables
- party decoration
- music and ambiance support
- event coordination for small private gatherings

The initial version is intentionally simple:
- public-facing marketing website
- cinematic scroll hero experience
- service pages/sections
- inquiry-first booking flow
- WhatsApp contact
- lightweight admin dashboard for managing leads and requests
- no online payments in V1

## Why this project exists

Most competitors focus on only one part of the experience, usually a private chef or booking marketplace. HuisFeest should present a broader promise: **we help people host beautiful food-centered celebrations at home without the stress of organizing multiple vendors**.

The website is not just informational. It should feel premium, emotional, memorable, and highly visual. The attached owner's manual shows the kind of cinematic scroll experience the founder wants, especially for the hero section and story-led flow.

## Product strategy

### V1
Build a simple but polished real-business website with:
- strong landing page
- cinematic hero using placeholder footage first
- clear packages
- gallery-style sections
- WhatsApp CTA
- booking inquiry form
- bilingual support
- admin dashboard for lead management

### V2
Add operational structure:
- calendar and availability handling
- quote generation
- package customization
- CRM-like lead status tracking
- image/content CMS support
- AI party planning assistant

### V3
Evolve toward marketplace model:
- chef/vendor onboarding
- decorator and musician profiles
- vendor availability
- service-area logic
- marketplace commissions
- optional payments via Mollie

## Business model assumptions

At this stage, HuisFeest is a real business but early and exploratory. The product should optimize for:
- trust
- conversion
- ease of inquiry
- operational simplicity
- visual differentiation

Do not overbuild V1.

## Platform recommendation

### Recommended stack
Use a simple modern stack with room to grow:

- **Frontend:** Next.js
- **Styling:** Tailwind CSS or custom CSS modules, with careful cinematic sections
- **Animation:** native scroll logic, Framer Motion where needed, GSAP only if truly necessary
- **Hero cinematic engine:** canvas + image sequence approach inspired by the owner manual pattern
- **Backend:** Next.js server actions or API routes
- **Database:** DynamoDB for leads, requests, package submissions, admin notes
- **File/image storage:** simple file-based content in repo for V1, later S3 or headless CMS
- **Auth:** simple admin auth for internal dashboard only
- **Hosting:** Vercel for frontend and app routes
- **Messaging:** WhatsApp deep links + transactional email later
- **Forms:** server-side validated inquiry form
- **AI:** optional assistant later for package recommendation and theme guidance

### Why this stack
The founder already works comfortably with modern web tooling and values simple systems. A lightweight Next.js application gives:
- good SEO
- easy bilingual routing
- strong landing-page performance
- a path to dashboard features
- a path to later marketplace expansion

## Website experience principles

### 1. Cinematic, not gimmicky
The owner's manual points to a cinematic scroll approach using image sequences rendered on canvas instead of heavy video scrubbing. For HuisFeest, this should be adapted from car storytelling to event storytelling.

### 2. Emotional trust first
People are booking life moments: birthdays, anniversaries, romantic dinners, Eid gatherings, baby showers, home celebrations. The website should feel warm, elegant, and reassuring.

### 3. Conversion over complexity
Every major section should guide toward one of three actions:
- explore services
- request a quote
- message on WhatsApp

### 4. Replaceable hero media
Claude Code should build the hero in a way that works first with placeholder stock footage and later with real brand footage without architecture changes.

## Functional scope

### Public site
- homepage
- services overview
- package explanation
- about/story section
- gallery/experience section
- FAQ
- bilingual support
- contact/inquiry form
- WhatsApp CTA

### Internal dashboard
- admin login
- lead list
- lead detail view
- status updates
- notes
- contact details
- requested package and event details
- source tracking

## Suggested features for V1

### Essential
- cinematic hero
- service packages
- event type selector
- guest count capture
- dietary preference field
- city/postcode field
- preferred date field
- WhatsApp floating action button
- admin lead management
- email confirmation placeholder

### Strong additions worth including now
- simple package recommender quiz
- downloadable sample menu PDF later
- theme selector visuals
- event-type cards such as birthday, anniversary, proposal, baby shower, private dinner
- FAQ structured for SEO
- testimonials section with placeholders until real reviews exist
- sticky CTA on mobile

## AI feature direction

Add an AI feature later, but structure the site now so it can fit naturally. The best first AI experience is not a chatbot that talks too much. It is a guided planner that helps users choose:
- event type
- guest size
- tone/theme
- food style
- extras

The output should be a suggested package that can be sent into the inquiry form.

## Design direction

### Brand feeling
- warm
- premium
- intimate
- joyful
- modern
- visually calm, not loud

### Avoid
- generic party-store look
- childish visual language
- too many colors
- cheap confetti graphics
- template-style feature grids

### Preferred palette direction
- warm cream / off-white base
- deep olive or forest green accent
- muted champagne or gold detail
- dark editorial typography

### Typography direction
- elegant serif for large editorial headings
- clean sans-serif for body copy and UI

## Hero cinematic adaptation

The owner's manual recommends a cinematic scroll engine with canvas + image sequence. Use the same principle, but adapt the narrative beats for HuisFeest.

Suggested hero chapter progression:
1. quiet anticipation
2. table styling and fresh ingredients
3. shared celebration and ambiance
4. effortless hosting experience

This should be built so placeholder frames can later be replaced with real HuisFeest footage.

## Requirements for Claude Code behavior

When implementing, Claude Code should:
- ask clarifying questions until at least 95% confidence before major architecture decisions
- avoid overengineering V1
- prioritize real launch readiness over unnecessary abstractions
- keep code clean, modular, bilingual-ready
- build a dashboard only as deep as needed for V1 operations
- favor maintainability over novelty
- document assumptions clearly

## Deliverables expected from Claude Code

- production-ready Next.js codebase for V1
- public site and admin dashboard
- bilingual structure
- lead storage design
- deployment-ready app structure
- clear setup steps
- content placeholders marked clearly
- media replacement instructions for swapping stock hero sequence with real footage

## Definition of success

V1 succeeds if HuisFeest can:
- present itself credibly as a real premium service
- capture inquiries cleanly
- handle leads in a simple dashboard
- feel visually distinct from standard catering websites
- provide a strong foundation for future AI planning and marketplace expansion
